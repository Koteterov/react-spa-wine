import styles from "./Edit.module.css";

export default function Edit() {
  return (
    <section id={styles["edit-page"]}>
      <div className={styles["editSection"]}>
        <div className={styles["info"]}>
          <h2>Edit your own wine!</h2>
        </div>

        <form className={styles["editForm"]}>
          <h2>Edit Wine</h2>
          <ul className={styles["noBullet"]}>
            <li>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="title"
                name="name"
                required
                minLength="3"
              />
            </li>
            <li>
              <label htmlFor="type">Type: Please select from the list!</label>
              <select id={styles["type"]} name="type" required>
                <option value="Red">Red</option>
                <option value="White">White</option>
                <option value="Rose">Rose</option>
                <option value="Sparkling">Sparkling</option>
              </select>
            </li>
            <li>
              <label htmlFor="origin">Origin:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="origin"
                name="origin"
                required
                minLength="3"
              />
            </li>
            <li>
              <label htmlFor="price">Price in EUR:</label>
              <input
                type="number"
                className={styles["inputFields"]}
                id="price"
                name="price"
                min="0.01"
                required
              />
            </li>
            <li>
              <label htmlFor="image">Wine image:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="image"
                name="image"
                required
              />
            </li>
            <li>
              <label htmlFor="description">Wine Description:</label>
              <textarea
                id="description"
                className={styles["inputFields"]}
                name="description"
                required
                minLength="5"
              ></textarea>
            </li>
            <li id={styles["center-btn"]}>
              <button id={styles["edit-btn"]}>Edit</button>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
}
