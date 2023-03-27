import styles from "./CreateWinePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as wineService from "../../services/wineService";
import Error from "../Error/Error";

export default function CreateWinePost() {
  const navigate = useNavigate();

  const formData = {
    name: "",
    type: "",
    origin: "",
    price: "",
    image: "",
    description: "",
  };

  const [values, setValues] = useState(formData);

  const [formErrors, setFormErros] = useState(formData);

  const onChangeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const formValidate = (e) => {
    const value = e.target.value;
    const urlPattern = /(^https?:\/\/)|(^\/images)/i;

    if (e.target.name === "name" && value.length < 3) {
      setFormErros((state) => ({
        ...state,
        [e.target.name]: "Name must be at leat 3 letters long!",
      }));
    } else if (e.target.name === "name" && value.length >= 3) {
      setFormErros((state) => ({ ...state, [e.target.name]: "" }));
    }
    if (e.target.name === "type" && value === "") {
      setFormErros((state) => ({
        ...state,
        [e.target.name]: "Please choose a wine type",
      }));
    } else if (e.target.name === "type" && value !== "") {
      setFormErros((state) => ({ ...state, [e.target.name]: "" }));
    }

    if (e.target.name === "origin" && value.length < 3) {
      setFormErros((state) => ({
        ...state,
        [e.target.name]: "Origin must be at leat 3 letters long!",
      }));
    } else if (e.target.name === "origin" && value.length >= 3) {
      setFormErros((state) => ({ ...state, [e.target.name]: "" }));
    }

    if (e.target.name === "price" && (value < 0 || value === "")) {
      setFormErros((state) => ({
        ...state,
        [e.target.name]: "Price must be a positive number!",
      }));
    } else if (e.target.name === "price" && value > 0) {
      setFormErros((state) => ({ ...state, [e.target.name]: "" }));
    }

    if (e.target.name === "image" && !urlPattern.test(value)) {
      setFormErros((state) => ({
        ...state,
        [e.target.name]: "The field must be a valid url!",
      }));
    } else if (e.target.name === "image" && urlPattern.test(value)) {
      setFormErros((state) => ({ ...state, [e.target.name]: "" }));
    }

    if (e.target.name === "description" && value.length < 5) {
      setFormErros((state) => ({
        ...state,
        [e.target.name]: "Description must be at leat 5 letters!",
      }));
    } else if (e.target.name === "description" && value.length >= 5) {
      setFormErros((state) => ({ ...state, [e.target.name]: "" }));
    }
  };

  let enableButton =
    formErrors.name === "" &&
    formErrors.type === "" &&
    formErrors.origin === "" &&
    formErrors.price === "" &&
    formErrors.image === "" &&
    formErrors.description === "";

  const onSubmitHandler = (e) => {
    e.preventDefault();

    wineService
      .createWine(values)
      .then(() => {
        navigate("/wine/all");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section id="create-page">
      <div className={styles["createSection"]}>
        <div className={styles["info"]}>
          <h2>Create your post, share your wine preference.</h2>
        </div>

        <form className={styles["createForm"]} onSubmit={onSubmitHandler}>
          <h2>Create Post</h2>
          <ul className={styles["noBullet"]}>
            <li>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="name"
                placeholder="Ribeaupierre..."
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
                onBlur={formValidate}
              >
                <option value=""></option>
                <option value="Red">Red</option>
                <option value="White">White</option>
                <option value="Rose">Rose</option>
                <option value="Sparkling">Sparkling</option>
              </select>
              {formErrors.type && <Error formErrors={formErrors.type}></Error>}
            </li>

            <li>
              <label htmlFor="origin">Origin:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="origin"
                placeholder="France"
                name="origin"
                required
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
                placeholder="...EUR"
                name="price"
                min="0"
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
                placeholder="http:/..."
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
              <label htmlFor="description">Your wine description:</label>
              <textarea
                id="description"
                className={styles["inputFields"]}
                name="description"
                placeholder="Primary aromas are..."
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
              <button id={styles["create-btn"]} disabled={!enableButton}>
                Create
              </button>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
}
