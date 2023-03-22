import styles from "./Profile.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import * as userService from "../../services/userService";
import * as wineService from "../../services/wineService";

import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

export default function Profile() {
  const { user } = useContext(UserContext);

  const [userData, setUserData] = useState({});
  const [myWines, setMyWines] = useState([]);
  const [myLikes, setMyLikes] = useState([]);

  useEffect(() => {
    userService.getProfile().then((profile) => {
      setUserData(profile);
    });
  }, []);

  useEffect(() => {
    if (user._id) {
      wineService
        .getMy(user._id)
        .then((myWines) => {
          setMyWines(myWines);
        })
        .catch((error) => {
          console.log(error);
        });

      wineService
        .getMyLikes(user._id)
        .then((myLikes) => {
          setMyLikes(myLikes);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user._id]);

  return (
    <>
      <section id={styles["user"]}>
        <div className={styles["user-info"]}>
          <div className={styles["user-logo"]}>
            <img src="/images/user-logo.webp" alt="user_logo" />
          </div>
          <h1 className={styles["user-email"]}>
            {userData.firstName} {userData.lastName} - {userData.email}
          </h1>
          <h2 className={styles["created-blogs-count"]}>
            Total Created Wines: {myWines.length}
          </h2>
          <h2 className={styles["followed-blogs-count"]}>
            Total Liked Wines: {myLikes.length}
          </h2>
        </div>
      </section>

      <section className={styles["profile-blogs"]}>
        <div className={styles["created-blogs"]}>
          <h2 className={styles["section-title"]}>Created Wines</h2>

          {myWines.length > 0 ? (
            myWines.map((x) => (
              <div className={styles["info"]} key={x._id}>
                <h2 className={styles["title"]}>{x.name}</h2>
                <h4 className={styles["type"]}>type: {x.type}</h4>
                <div className={styles["see-more"]}>
                  <Link to={`/wine/details/${x._id}`}>See More...</Link>
                </div>
              </div>
            ))
          ) : (
            <h2 className={styles["no-blog-in-profile"]}>
              You haven't published a wine yet...
            </h2>
          )}
        </div>

        <div className={styles["followed-blogs"]}>
          <h2 className={styles["section-title"]}>Liked Wines</h2>

          {myLikes.length > 0 ? (
            myLikes.map((x) => (
              <div className={styles["info"]} key={x._id}>
                <h2 className={styles["title"]}>{x.name}</h2>
                <h4 className={styles["type"]}>type: {x.type}</h4>
                <div className={styles["see-more"]}>
                  <Link to={`/wine/details/${x._id}`}>See More...</Link>
                </div>
              </div>
            ))
          ) : (
            <h2 className={styles["no-blog-in-profile"]}>
              You have not liked wines yet…
            </h2>
          )}
        </div>
      </section>
    </>
  );
}
