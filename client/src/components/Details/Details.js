import styles from "./Details.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

import * as wineService from "../../services/wineService";
import LikesSection from "./Likes/Likes";

export default function Details() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { wineId } = useParams();
  const [wine, setWine] = useState({});
  const [creator, setCreator] = useState({});
  const [likes, setLikes] = useState([]);
  const [peopleLiked, setPeopleLiked] = useState("");
  const [hasLiked, setHasLiked] = useState();

  const hasUser = !!user._id;
  const isAuthor = user._id === creator._id;

  useEffect(() => {
    wineService
      .getOne(wineId)
      .then((data) => {
        setWine(data);
        setCreator(data._ownerId);
        setLikes(data.likesList.length);

        let hasAlreadyLiked = data.likesList
        .find((x) => x._id === user._id)?._id;

        setHasLiked(hasAlreadyLiked === user._id);

        let people = data.likesList.map((x) => {
          return [x.firstName, x.lastName].join(" ");
        });
        setPeopleLiked(people.join(", "));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [wineId, user._id, likes, hasLiked]);

  const likeHandler = () => {
    wineService.likeWine(wineId)
      .then(() => {
        setHasLiked(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const unlikeHandler = () => {
    wineService.unlikeWine(wineId)
      .then(() => {
        setHasLiked(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteHandler = () => {
    const confirm = window.confirm(
      "Are you sure you want to confirm this wine?"
    );
    if (confirm) {
      wineService.deleteWine(wineId)
        .then(() => {
          navigate("/wine/all");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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

              {hasUser && (
                <div className={styles["social-btn"]}>
                  {/* <!-- Only for registered user and author of the post --> */}
                  {isAuthor && (
                    <>
                      <Link to={`/wine/edit/${wine._id}`}>
                        <button className={styles["edit-btn"]}>Edit</button>
                      </Link>
                      <button
                        className={styles["del-btn"]}
                        onClick={deleteHandler}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {/* If not author of the post */}
                  {!isAuthor && (
                    <>
                      {!hasLiked ? (
                        <button
                          className={styles["vote-up"]}
                          onClick={likeHandler}
                        >
                          Like +1
                        </button>
                      ) : (
                        <>
                          <button
                            className={styles["vote-down"]}
                            onClick={unlikeHandler}
                          >
                            Unlike -1
                          </button>
                          <span className={styles["thanks-for-vote"]}>
                            Thanks For Liking
                          </span>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={styles["card_right"]}>
            <img src={wine.image} alt="wine_image" />
          </div>
        </div>
      </section>

      <LikesSection likes={likes} peopleLiked={peopleLiked} />
    </>
  );
}
