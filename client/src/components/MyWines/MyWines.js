import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import * as wineService from "../../services/wineService";
import LoadingSpinner from "../Spinner/Spinner";
import styles from "./MyWines.module.css";

export default function MyWines() {
  const { user } = useContext(UserContext);
  const [myWines, setMyWines] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    if (user._id) {
      wineService
        .getMy(user._id)
        .then((data) => {
          setMyWines(data);
          setShowSpinner(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user._id]);

  return (
    <section className={styles["catalog"]} id={styles["catalog"]}>
      <h1>My Wine Posts</h1>

      {showSpinner && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      <div className={styles["container"]}>
        {myWines.length > 0 &&
          myWines.map((x) => (
            <div className={styles["wine"]} key={x._id}>
              <div className={styles["info-container"]}>
                <img src={x.image} alt="wine_picture" />
                <div className={styles["info"]}>
                  <h2>Name: {x.name}</h2>
                  <p>Type: {x.type}</p>
                </div>
              </div>
              <div className={styles["details-btn"]}>
                <Link to={`/wine/details/${x._id}`}>
                  <button id={styles["btn"]}>Details</button>
                </Link>
              </div>
            </div>
          ))}
        {myWines.length === 0 && !showSpinner && (
          <h2 className={styles["no-record"]}>You have not posted yet</h2>
        )}
      </div>
    </section>
  );
}
