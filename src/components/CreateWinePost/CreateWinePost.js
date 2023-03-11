import styles from "./CreateWinePost.module.css";

export default function CreateWinePost() {
  return (
    <section id="create-page">
      <div className={styles["createSection"]}>
        <div className={styles["info"]}>
          <h2>Create your post, share your wine preference.</h2>
        </div>

        <form className={styles["createForm"]}>
          <h2>Create Post</h2>
          <ul className={styles["noBullet"]}>
            <li>
              <label for="name">Name:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="name"
                placeholder="Ribeaupierre..."
                name="name"
                required
                minlength="3"
              />
            </li>
            <li>
              <label for="type">Type: Please select from the list!</label>
              <select id={styles["type"]} name="type" required>
                <option value="Red">Red</option>
                <option value="White">White</option>
                <option value="Rose">Rose</option>
                <option value="Sparkling">Sparkling</option>
              </select>
            </li>

            <li>
              <label for="origin">Origin:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="origin"
                placeholder="France"
                name="origin"
                required
              />
            </li>
            <li>
              <label for="price">Price in EUR:</label>
              <input
                type="number"
                className={styles["inputFields"]}
                id="price"
                placeholder="...EUR"
                name="price"
                min="0"
                required
              />
            </li>
            <li>
              <label for="image">Wine image:</label>
              <input
                type="text"
                className={styles["inputFields"]}
                id="image"
                placeholder="http:/..."
                name="image"
                required
              />
            </li>
            <li>
              <label for="description">Your wine description:</label>
              <textarea
                id="description"
                className={styles["inputFields"]}
                name="description"
                placeholder="Primary aromas are..."
                required
                minlength="5"
              ></textarea>
            </li>
            <li id={styles["center-btn"]}>
              <button id={styles["create-btn"]}>Create</button>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
}
