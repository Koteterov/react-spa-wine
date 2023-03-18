import styles from "../Details.module.css";

export default function LikesSection({ likes, peopleLiked }) {

  const hasLikes = (
    <p className={styles["disc"]}>
      People who liked the wine post - {peopleLiked}
    </p>
  );

  const noLikes = (
    <p className={styles["disc"]}>
      People who liked the wine post - No likes yet.
    </p>
  );

  return (
    <section id={styles["votes"]}>
      <div className={styles["vote-info"]}>
        <div className={styles["card_left"]}>
          <div className={styles["card_datails"]}>
            <h1>Likes</h1>
            <div className={styles["card_vote"]}>
              <p className={styles["PV"]}>Total likes: {likes}</p>
            </div>
            {likes > 0 ? hasLikes : noLikes}
          </div>
        </div>
      </div>
    </section>
  );
}
