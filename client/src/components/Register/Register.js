import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { ServerMessageContext } from "../../contexts/serverMessageContext";
import ServerMessage from "../ServerMessage/ServerMessage";

import Error from "../Error/Error";
import * as userService from "../../services/userService";

export default function Register() {
  const navigate = useNavigate();
  const { updateNav } = useContext(UserContext);
  const { serverMessage } = useContext(ServerMessageContext);
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });

  const formData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  };

  const [values, setValues] = useState(formData);
  const [formErrors, setFormErros] = useState(formData);
  const [password, setPassword] = useState("");
  const [reRassword, setRePassword] = useState("");

  const onChangeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const formValidate = (e) => {
    const value = e.target.value;

    if (e.target.name === "firstName" && value.length < 2) {
      setFormErros((state) => ({
        ...state,
        [e.target.name]: "First name must be at least 2 characters long!",
      }));
    } else if (e.target.name === "firstName" && value.length >= 2) {
      setFormErros((state) => ({ ...state, [e.target.name]: "" }));
    }
    if (e.target.name === "lastName" && value.length < 2) {
      setFormErros((state) => ({
        ...state,
        [e.target.name]: "Last name must be at least 2 characters long!",
      }));
    } else if (e.target.name === "lastName" && value.length >= 2) {
      setFormErros((state) => ({ ...state, [e.target.name]: "" }));
    }

    if (e.target.name === "email" && value === "") {
      setFormErros((state) => ({
        ...state,
        [e.target.name]: "Email is required!",
      }));
    } else if (e.target.name === "email" && value !== "") {
      setFormErros((state) => ({ ...state, [e.target.name]: "" }));
    }

    if (e.target.name === "password" && value === "") {
      setFormErros((state) => ({
        ...state,
        [e.target.name]: "Password is required!",
      }));
    } else if (e.target.name === "password" && value !== "") {
      setPassword(value);
      setFormErros((state) => ({ ...state, [e.target.name]: "" }));

      if (value !== reRassword && reRassword !== "") {
        setFormErros((state) => ({
          ...state,
          [e.target.name]: "Passwords does not match",
        }));
      }
    }

    if (e.target.name === "rePassword" && value === "") {
      setFormErros((state) => ({
        ...state,
        [e.target.name]: "Repeat password is required!",
      }));
    } else if (e.target.name === "rePassword" && value !== "") {
      setRePassword(value);
      setFormErros((state) => ({ ...state, [e.target.name]: "" }));

      if (value !== password) {
        setFormErros((state) => ({
          ...state,
          [e.target.name]: "Passwords does not match",
        }));
      }
    }
  };

  let enableButton =
    formErrors.firstName === "" &&
    formErrors.lastName === "" &&
    formErrors.email === "" &&
    formErrors.password === "" &&
    formErrors.rePassword === "";

  const onSubmit = (e) => {
    e.preventDefault();

    userService
      .register(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      )
      .then((userData) => {
        if (userData.accessToken) {
          serverMessage.success = "Logged in successfully";
          updateNav(userData);
          navigate("/wine/all");
        } else {
          setMessage({ error: userData.message });
          setTimeout(() => {
            setMessage()?.clear();
          }, 2000);
        }
      })
      .catch(() => {
        navigate("/404");
      });
  };

  return (
    <section id="register-page">
      {message && <ServerMessage message={message} />}
      <div className={styles["signupSection"]}>
        <div className={styles["info"]}>
          <h2>
            Please sing up to discover new wines and share your preference.
          </h2>
        </div>
        <form className={styles["signupForm"]} onSubmit={onSubmit}>
          <h2>Sign Up</h2>
          <ul className={styles["noBullet"]}>
            <li>
              <label htmlFor="first-name">First Name:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="first-name"
                name="firstName"
                placeholder="Peter"
                required
                value={values.firstName}
                onChange={onChangeHandler}
                onBlur={formValidate}
              />
              {formErrors.firstName && (
                <Error formErrors={formErrors.firstName}></Error>
              )}
            </li>

            <li>
              <label htmlFor="last-name">Last Name:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="last-name"
                name="lastName"
                placeholder="Johnson"
                required
                value={values.lastName}
                onChange={onChangeHandler}
                onBlur={formValidate}
              />
              {formErrors.lastName && (
                <Error formErrors={formErrors.lastName}></Error>
              )}
            </li>
            <li>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="email"
                name="email"
                placeholder="alex@gmail.com"
                required
                value={values.email}
                onChange={onChangeHandler}
                onBlur={formValidate}
              />
              {formErrors.email && (
                <Error formErrors={formErrors.email}></Error>
              )}
            </li>

            <li>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className={styles["inputFields"]}
                id="password"
                name="password"
                placeholder="******"
                required
                value={values.password}
                onChange={onChangeHandler}
                onBlur={formValidate}
              />
              {formErrors.password && (
                <Error formErrors={formErrors.password}></Error>
              )}
            </li>
            <li>
              <label htmlFor="rePassword">Repeat-Password:</label>
              <input
                type="password"
                className={styles["inputFields"]}
                id="rePassword"
                name="rePassword"
                placeholder="******"
                required
                value={values.rePassword}
                onChange={onChangeHandler}
                onBlur={formValidate}
              />
              {formErrors.rePassword && (
                <Error formErrors={formErrors.rePassword}></Error>
              )}
            </li>
            <li id={styles["center-btn"]}>
              <button id={styles["join-btn"]} disabled={!enableButton}>
                Join
              </button>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
}
