import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles["full-screen"]}>
      <div className={styles["con-not-found"]}>
        <span className={styles["error-num"]}>4</span>
        <div className={styles["eye"]}></div>
        <span className={styles["error-num"]}>4</span>

        <p className={styles["sub-text"]}>
          Something went wrong. We're <span className="italic">looking</span> to see
          what happened.
        </p>
        <p>
          Go Back to <Link to="/home">Home</Link>
        </p>
      </div>
    </div>
  );
}
