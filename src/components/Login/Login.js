import styles from "./Login.module.css";

export default function Login() {
  return (
    <section id="login-page">
      <div className={styles["loginSection"]}>
        <div className={styles["info"]}>
          <h2>Welcome, again!</h2>
          <p>View new posts.</p>
        </div>
        <form className={styles["loginForm"]}>
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
