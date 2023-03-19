import styles from "./Login.module.css";
import * as userService from "../../services/userService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.target));

    userService
      .login(email, password)
      .then((userData) => {
        if (userData.accessToken) {
          navigate("/wine/all");
        }
        if (userData.message) {
          console.log(userData.message);
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/404");
      });
  };

  return (
    <section id="login-page">
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
              />
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
              />
            </li>
            <li className={styles["center-btn"]}>
              <button className={styles["login-btn"]}>Login</button>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
}
