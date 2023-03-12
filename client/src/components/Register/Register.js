import styles from "./Register.module.css";

export default function Register() {
  return (
    <section id="register-page">
      <div className={styles["signupSection"]}>
        <div className={styles["info"]}>
          <h2>
            Please sing up to discover new wines and share your preference.
          </h2>
        </div>
        <form className={styles["signupForm"]}>
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
