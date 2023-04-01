import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { ServerMessageContext } from "../../contexts/serverMessageContext";
import * as userService from "../../services/userService";
import Error from "../Error/Error";
import ServerMessage from "../ServerMessage/ServerMessage";

export default function Login() {
  const navigate = useNavigate();
  const { updateNav } = useContext(UserContext);
  const { serverMessage } = useContext(ServerMessageContext);
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });

  const formData = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(formData);
  const [formErrors, setFormErros] = useState(formData);

  const onChangeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const formValidate = (e) => {
    const value = e.target.value;

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
      setFormErros((state) => ({ ...state, [e.target.name]: "" }));
    }
  };

  let enableButton = formErrors.email === "" && formErrors.password === "";

  const onSubmit = (e) => {
    e.preventDefault();

    userService
      .login(values.email, values.password)
      .then((userData) => {
        if (userData.accessToken) {
          serverMessage.success = "Logged in successfully";
          // setMessage({ success: "Logged in successfully"});
          updateNav(userData);
          navigate("/wine/all");
        } else {
          setMessage({ error: userData.message });
          setTimeout(() => {
            setMessage()?.clear();
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/404");
      });
  };


  return (
    <section id="login-page">
      {message && <ServerMessage message={message} />}
      <div className={styles["loginSection"]}>
        <div className={styles["info"]}>
          <h2>Welcome, again!</h2>
          <p>View new posts.</p>
        </div>
        <form className={styles["loginForm"]} onSubmit={onSubmit}>
          <h2>Login</h2>
          <ul className={styles["noBullet"]}>
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
                placeholder="*******"
                required
                value={values.password}
                onChange={onChangeHandler}
                onBlur={formValidate}
              />
              {formErrors.password && (
                <Error formErrors={formErrors.password}></Error>
              )}
            </li>
            <li className={styles["center-btn"]}>
              <button className={styles["login-btn"]} disabled={!enableButton}>
                Login
              </button>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
}
