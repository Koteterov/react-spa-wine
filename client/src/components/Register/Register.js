import styles from "./Register.module.css";
import * as userService from "../../services/userService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, rePassword } =
      Object.fromEntries(new FormData(e.target));

      if (password !== rePassword) {
        console.log("pass !==");
        return;
      }

    userService
      .register(firstName, lastName, email, password)
      .then((userData) => {
        if (userData.accessToken) {
          navigate("/wine/all");
        }
        if (userData.message) {
          console.log(userData.message);
        }
      })
      .catch(() => {
        navigate("/404");
      });
  };

  return (
    <section id="register-page">
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
              />
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
              />
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
              />
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
              />
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
              />
            </li>
            <li id={styles["center-btn"]}>
              <button id={styles["join-btn"]}>Join</button>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
}
