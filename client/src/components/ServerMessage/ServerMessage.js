import styles from "./ServerMessage.module.css";

export default function ServerMessage({ message, successMessage }) {
  if (successMessage?.success) {
    return (
      <div className={styles["success-container"]}>
        <p>{successMessage?.success}</p>
      </div>
    );
  }
  if (message?.error) {
    return (
      <div className={styles["error-container"]}>
        <p>{message?.error}</p>
      </div>
    );
  }
}

