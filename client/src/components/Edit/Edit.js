import styles from "./Edit.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as wineService from "../../services/wineService";

export default function Edit() {
  const { wineId } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    type: "",
    origin: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    wineService.getOne(wineId)
      .then((data) => {
        setValues(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [wineId]);

  const onChangeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    wineService.editWine(wineId, values)
      .then(() => {
        navigate(`/wine/details/${wineId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section id={styles["edit-page"]}>
      <div className={styles["editSection"]}>
        <div className={styles["info"]}>
          <h2>Edit your own wine!</h2>
        </div>

        <form className={styles["editForm"]} onSubmit={onSubmitHandler}>
          <h2>Edit Wine</h2>
          <ul className={styles["noBullet"]}>
            <li>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="title"
                name="name"
                required
                minLength="3"
                value={values.name}
                onChange={onChangeHandler}
              />
            </li>
            <li>
              <label htmlFor="type">Type: Please select from the list!</label>
              <select
                id={styles["type"]}
                name="type"
                required
                value={values.type}
                onChange={onChangeHandler}
              >
                <option value="Red">Red</option>
                <option value="White">White</option>
                <option value="Rose">Rose</option>
                <option value="Sparkling">Sparkling</option>
              </select>
            </li>
            <li>
              <label htmlFor="origin">Origin:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="origin"
                name="origin"
                required
                minLength="3"
                value={values.origin}
                onChange={onChangeHandler}
              />
            </li>
            <li>
              <label htmlFor="price">Price in EUR:</label>
              <input
                type="number"
                className={styles["inputFields"]}
                id="price"
                name="price"
                // min="0.01"
                required
                value={values.price}
                onChange={onChangeHandler}
              />
            </li>
            <li>
              <label htmlFor="image">Wine image:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="image"
                name="image"
                required
                value={values.image}
                onChange={onChangeHandler}
              />
            </li>
            <li>
              <label htmlFor="description">Wine Description:</label>
              <textarea
                id="description"
                className={styles["inputFields"]}
                name="description"
                required
                minLength="5"
                value={values.description}
                onChange={onChangeHandler}
              ></textarea>
            </li>
            <li id={styles["center-btn"]}>
              <button id={styles["edit-btn"]}>Edit</button>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
}
