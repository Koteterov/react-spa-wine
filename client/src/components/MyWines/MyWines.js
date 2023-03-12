import styles from "./MyWines.module.css";

export default function MyWines() {
  return (
    <section className={styles["catalog"]} id={styles["catalog"]}>
      <h1>My Wine Posts</h1>

      <div className={styles["container"]}>
        <div className={styles["wine"]}>
          <div className={styles["info-container"]}>
            <img src="/images/Kalkstein-Riesling.png" alt="wine_picture" />
            <div className={styles["info"]}>
              <h2>Name: wwww</h2>
              <p>Type: sssss</p>
            </div>
          </div>
          <div className={styles["details-btn"]}>
            <button id={styles["btn"]}>Details</button>
          </div>
        </div>

        {/* <h2 className={styles["no-record"]}>You have not posted yet</h2> */}
      </div>
    </section>
  );
}
