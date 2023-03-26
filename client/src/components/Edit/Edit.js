import styles from "./Edit.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as wineService from "../../services/wineService";
import Error from "../Error/Error";

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

  const [formErrors, setFormErros] = useState({
    name: "",
    type: "",
    origin: "",
    price: "",
    image: "",
    description: "",
  });

  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    wineService
      .getOne(wineId)
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

  const formValidate = (e) => {
    const value = e.target.value;
    const errors = {};
    const urlPattern = /(^https?:\/\/)|(^\/images)/i;

    if (e.target.name === "name" && value.length < 3) {
      errors.name = "Name must be at leat 3 letters long!";
    }

    if (e.target.name === "origin" && value.length < 3) {
      errors.origin = "Origin must be at leat 3 letters long!";
    }
    if (e.target.name === "price" && (value < 0 || value === "")) {
      errors.price = "Price must be a positive number!";
    }
    if (e.target.name === "image" && !urlPattern.test(value)) {
      errors.image = "The field must be a valid url!";
    }
    if (e.target.name === "description" && value.length < 5) {
      errors.description = "Description must be at leat 5 letters!";
    }
    if (
      errors.name ||
      errors.origin ||
      errors.price ||
      errors.image ||
      errors.description
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }

    setFormErros(errors);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    wineService
      .editWine(wineId, values)
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
                onBlur={formValidate}
              />
              {formErrors.name && <Error formErrors={formErrors.name}></Error>}
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
                onBlur={formValidate}
              />
              {formErrors.origin && (
                <Error formErrors={formErrors.origin}></Error>
              )}
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
                onBlur={formValidate}
              />
              {formErrors.price && (
                <Error formErrors={formErrors.price}></Error>
              )}
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
                onBlur={formValidate}
              />
              {formErrors.image && (
                <Error formErrors={formErrors.image}></Error>
              )}
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
                onBlur={formValidate}
              ></textarea>
              {formErrors.description && (
                <Error formErrors={formErrors.description}></Error>
              )}
            </li>
            <li id={styles["center-btn"]}>
              <button id={styles["edit-btn"]} disabled={disableButton}>
                Edit
              </button>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
}
