import styles from "./ServerMessage.module.css";

export default function ServerMessage({ message, serverMessage }) {
  if (serverMessage?.success) {
    return (
      <div className={styles["success-container"]}>
        <p>{serverMessage?.success}</p>
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

