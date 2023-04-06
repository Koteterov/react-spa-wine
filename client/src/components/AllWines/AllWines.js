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

  const { successMessage } = useContext(ServerMessageContext);
  const [message, setMessage] = useState({
    success: successMessage?.success,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const indexOfLastPage = currentPage * limit;
  const indexOfFirstPage = indexOfLastPage - limit;
  const currentWines = wines.slice(indexOfFirstPage, indexOfLastPage);

  const [pages, setPages] = useState(0);

  useEffect(() => {
    // if there is search
    if (values.search) {
      const getData = setTimeout(() => {
        wineService
          .getAll(values.search, currentPage, limit)
          .then((data) => {
            setWines(data.result);
            setPages(Math.ceil(data.totalPages / limit));

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
      .getAll("", currentPage, limit)
      .then((data) => {
        setWines(data.result);
        setPages(Math.ceil(data.totalPages / limit));

        setShowSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [values, currentPage]);

  const onChangeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  setTimeout(() => {
    setMessage()?.clear();
  }, 2000);

  const firstPageOnClick = () => {
    setCurrentPage(1);
  };

  const lastPageOnClick = () => {
    setCurrentPage(pages);
  };

  const pagesOnClick = (i) => {
    setCurrentPage(i);
  };

  const previousPageOnClick = () => {
    if (currentPage > 1) {
      setCurrentPage((state) => state - 1);
    }
  };

  const nextPageOnClick = () => {
    if (currentPage < pages) {
      setCurrentPage((state) => state + 1);
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

        <div className={styles["pagination"]}>
          <Paginator
            wines={wines}
            pages={pages}
            currentPage={currentPage}
            firstPageOnClick={firstPageOnClick}
            lastPageOnClick={lastPageOnClick}
            pagesOnClick={pagesOnClick}
            previousPageOnClick={previousPageOnClick}
            nextPageOnClick={nextPageOnClick}
          />
        </div>

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
