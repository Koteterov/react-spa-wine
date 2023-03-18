import styles from "./Details.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as wineService from "../../services/wineService";

export default function Details() {
  const { wineId } = useParams();
  const [wine, setWine] = useState({});
  const [creator, setCreator] = useState({});
  const [likes, setLikes] = useState([]);
  const [peopleLiked, setPeopleLiked] = useState("");

  useEffect(() => {
    wineService.getOne(wineId).then((data) => {
      setWine(data);
      setCreator(data._ownerId);
      setLikes(data.likesList.length);
      let people = data.likesList.map((x) => {
        return [x.firstName, x.lastName].join(" ");
      });
      setPeopleLiked(people.join(", "));
    });
  }, [wineId, likes]);

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
    <>
      <section id={styles["details-page"]}>
        <div className={styles["main_card"]}>
          <div className={styles["card_left"]}>
            <div className={styles["card_datails"]}>
              <h1>Name: {wine.name}</h1>
              <h3>
                Created by: {creator.firstName} {creator.lastName}
              </h3>
              <div className={styles["card_wine"]}>
                <p className={styles["card-keyword"]}>TYPE: {wine.type}</p>
                <p className={styles["card-location"]}>ORIGIN: {wine.origin}</p>
                <p className={styles["card-location"]}>
                  PRICE: {Number(wine.price).toFixed(2)}
                </p>
                <p className={styles["card-date"]}>
                  POST DATE: {wine.createdAt?.slice(0, 10)}
                </p>
              </div>

              <p className={styles["disc"]}>
                WINE DESCRIPTION: {wine.description}
              </p>

              {/* <!-- If there is no registered user, no buttons displayed--> */}
              <div className={styles["social-btn"]}>
                {/* <!-- Only for registered user and author of the post --> */}

                <Link to={`/wine/edit/${wine._id}`}>
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
            <img src={wine.image} alt="wine_image" />
          </div>
        </div>
      </section>

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
    </>
  );
}
