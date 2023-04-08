import { useEffect, useState, useContext } from "react";
import styles from "./AllWines.module.css";
import { Link } from "react-router-dom";
import { ServerMessageContext } from "../../contexts/serverMessageContext";

import ServerMessage from "../ServerMessage/ServerMessage";
import * as wineService from "../../services/wineService";
import LoadingSpinner from "../Spinner/Spinner";
import Paginator from "../Pagination/Pagination";

export default function AllWines() {
  const [wines, setWines] = useState([]);
  const [values, setValues] = useState({ search: "" });
  const [notFound, setNotFound] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  let { successMessage } = useContext(ServerMessageContext);
  const [message, setMessage] = useState({
    success: successMessage?.success,
  });
  const [showPagination, setShowPagination] = useState(true);

  const [startIndex, setStartIndex] = useState(1);
  const [pages, setPages] = useState(0);
  const limit = 3;

  useEffect(() => {
    // if there is search
    if (values.search) {
      setShowPagination(false);
      const getData = setTimeout(() => {
        wineService
          .getAll(values.search, 0)
          .then((data) => {
            setWines(data.result);
            // setPages(Math.ceil(data.result.length / limit));

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
    setShowPagination(true);

    wineService
      .getAll("", startIndex, limit)
      .then((data) => {
        setWines(data.result);
        setPages(Math.ceil(data.totalPages / limit));
        setShowSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [values, startIndex]);

  const onChangeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  setTimeout(() => {
    successMessage.success = "";
    setMessage()?.clear();
  }, 2000);

  const firstPageOnClick = () => {
    setStartIndex(0);
  };

  const lastPageOnClick = () => {
    setStartIndex(pages * limit - limit);
  };

  const pagesOnClick = (i) => {
    setStartIndex(i * limit);
  };

  const previousPageOnClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - limit);
    }
  };

  const nextPageOnClick = () => {
    if (startIndex < limit * pages - limit) {
      setStartIndex(startIndex + limit);
    }
  };

  return (
    <section className={styles["catalog"]} id={styles["catalog"]}>
      {message && <ServerMessage successMessage={successMessage} />}
      <h1>Wine Posts </h1>
      <div>
        <div className={styles["catalog"]} id={styles["select-pages"]}>
          Select pages
        </div>

        {showPagination && (
          <div className={styles["pagination"]}>
            <Paginator
              pages={pages}
              firstPageOnClick={firstPageOnClick}
              lastPageOnClick={lastPageOnClick}
              pagesOnClick={pagesOnClick}
              previousPageOnClick={previousPageOnClick}
              nextPageOnClick={nextPageOnClick}
            />
          </div>
        )}

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
