import { useEffect, useState, useContext } from "react";
import styles from "./AllWines.module.css";
import { Link } from "react-router-dom";
import { ServerMessageContext } from "../../contexts/serverMessageContext";

import ServerMessage from "../ServerMessage/ServerMessage";
import * as wineService from "../../services/wineService";
import LoadingSpinner from "../Spinner/Spinner";

export default function AllWines() {
  const [wines, setWines] = useState([]);
  const [values, setValues] = useState({ search: "" });
  const [notFound, setNotFound] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  const { successMessage } = useContext(ServerMessageContext);
  const [message, setMessage] = useState({
    success: successMessage?.success,
  });

  useEffect(() => {
    // if there is search
    if (values.search) {
      const getData = setTimeout(() => {
        wineService
          .getAll(values.search)
          .then((data) => {
            setWines(data.result);
            setShowSpinner(false);
            if (data.result.length === 0) {
              setNotFound(true);
            } else {
              setNotFound(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 1000);
      return () => clearTimeout(getData);
    }
    // if NO search
    wineService
      .getAll("")
      .then((data) => {
        setWines(data.result);
        setShowSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [values]);

  const onChangeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  setTimeout(() => {
    setMessage()?.clear();
  }, 2000);

  return (
    <section className={styles["catalog"]} id={styles["catalog"]}>
      {message && <ServerMessage successMessage={successMessage} />}
      <h1>Wine Posts </h1>
      <div>
        {/* for pagination
        <div className={styles["catalog"]} id={styles["select-pages"]}>
          Select pages
        </div> */}

        <div>
          <label className={styles["label"]} htmlFor="site-search">
            Search for wines:
          </label>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="search"
            id="site-search"
            name="search"
            value={values.search}
            onChange={onChangeHandler}
          />
        </form>
      </div>
      {showSpinner && (
        <div>
          <LoadingSpinner />
        </div>
      )}

      <div className={styles["container"]}>
        {wines.length > 0 &&
          wines.map((x) => (
            <div className={styles["wine"]} key={x._id}>
              <div className={styles["info-container"]}>
                <img src={x.image} alt="wine_picture" />
                <div className="info">
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
        {wines.length === 0 && !notFound && !showSpinner && (
          <h2 className={styles["no-record"]}>
            There are no wines posted yet...
          </h2>
        )}
        {notFound && <h2 className={styles["no-record"]}>No matches found</h2>}
      </div>
    </section>
  );
}
