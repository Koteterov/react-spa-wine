import styles from "./Error.module.css";

export default function Error({formErrors}) {
  return (
    <div className={styles["error-container"]}>
      <p>{formErrors}</p>
    </div>
  );
}
