import styles from "./Profile.module.css";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <section id={styles["user"]}>
        <div className={styles["user-info"]}>
          <div className={styles["user-logo"]}>
            <img src="/images/user-logo.webp" alt="user_logo" />
          </div>
          <h1 className={styles["user-email"]}>email.....</h1>
          <h2 className={styles["created-blogs-count"]}>
            Total Created Wines: ....
          </h2>
          <h2 className={styles["followed-blogs-count"]}>
            Total Liked Wines: ....
          </h2>
        </div>
      </section>

      <section className={styles["profile-blogs"]}>
        <div className={styles["created-blogs"]}>
          <h2 className={styles["section-title"]}>Created Wines</h2>

          <div className={styles["info"]}>
            <h2 className={styles["title"]}>wwww</h2>
            <h4 className={styles["type"]}>type: ssss</h4>
            <div className={styles["see-more"]}>
              <Link>See More...</Link>
            </div>
          </div>

          <h2 className={styles["no-blog-in-profile"]}>
            You haven't published a wine yet...
          </h2>

        </div>

        <div className={styles["followed-blogs"]}>
          <h2 className={styles["section-title"]}>Liked Wines</h2>

          <div className={styles["info"]}>
            <h2 className={styles["title"]}>sssss</h2>
            <h4 className={styles["type"]}>type: eeeee</h4>
            <div className={styles["see-more"]}>
              <Link>See More...</Link>
            </div>
          </div>

          <h2 className={styles["no-blog-in-profile"]}>
            You have not liked wines yet…
          </h2>
          
        </div>
      </section>
    </>
  );
}
