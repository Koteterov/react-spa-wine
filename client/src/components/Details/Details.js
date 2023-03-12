import styles from "./Details.module.css";
import { Link } from "react-router-dom";

export default function Details() {
  return (
    <>
      <section id={styles["details-page"]}>
        <div className={styles["main_card"]}>
          <div className={styles["card_left"]}>
            <div className={styles["card_datails"]}>
              <h1>Name: eee</h1>
              <h3>Created by: ...</h3>
              <div className={styles["card_wine"]}>
                <p className={styles["card-keyword"]}>TYPE: ...</p>
                <p className={styles["card-location"]}>ORIGIN: ...</p>
                <p className={styles["card-location"]}>PRICE: ...</p>
                <p className={styles["card-date"]}>POST DATE: ...</p>
              </div>

              <p className={styles["disc"]}>WINE DESCRIPTION: ...</p>

              {/* <!-- If there is no registered user, no buttons displayed--> */}
              <div className={styles["social-btn"]}>
                {/* <!-- Only for registered user and author of the post --> */}

                <Link to={"/wine/edit"}>
                  <button className={styles["edit-btn"]}>Edit</button>
                </Link>

                <button className={styles["del-btn"]}>Delete</button>

                <button className={styles["vote-up"]}>Like +1</button>

                {/* <!-- logged in user who has already liked--> */}
                <button className={styles["vote-down"]}>Unlike -1</button>
                <span className={styles["thanks-for-vote"]}>
                  Thanks For Liking
                </span>
              </div>
            </div>
          </div>
          <div className={styles["card_right"]}>
            <img src="/images/Kalkstein-Riesling.png" alt="wine_image" />
          </div>
        </div>
      </section>

      <section id={styles["votes"]}>
        <div className={styles["vote-info"]}>
          <div className={styles["card_left"]}>
            <div className={styles["card_datails"]}>
              <h1>Likes</h1>
              <div className={styles["card_vote"]}>
                <p className={styles["PV"]}>Total likes: ...</p>
              </div>
              {/* <!-- if there are likes --> */}
              <p className={styles["disc"]}>
                People who liked the wine post - ...
              </p>
              {/* <!-- No Likes --> */}
              <p className={styles["disc"]}>
                People who liked the wine post - No likes yet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
