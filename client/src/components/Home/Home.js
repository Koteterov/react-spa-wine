import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <section id="home">
        <div className={styles["home-container"]}>
          <div className={styles["short-info"]}>
            <h1>The best of the wine selection</h1>
            <h2>
              Share your choice to add value to the wine market in the country
            </h2>
          </div>
        </div>
      </section>

      <section id="home-page">
        <div className={styles["offers"]}>
          <div className={styles["container"]}>
            <img src="./images/bottle-neck.jpg" alt="bottle-neck" />
          </div>
          <div className={styles["container"]}>
            <img src="./images/wine-drink.jpg" alt="wine-drink" />
          </div>
          <div className={styles["container"]}>
            <img src="./images/red-wine-glass-bottle.jpg" alt="red-wine" />
          </div>
          <div className={styles["container"]}>
            <img src="./images/red-wine-bottles.jpg" alt="red-wine-bottles" />
          </div>
        </div>
      </section>
    </>
  );
}
