import React from "react";
import styles from "./Search.module.scss";

const Search: React.FC = () => {
  return (
    <div className={styles.search}>
      <div className={styles.search__selectWrapper}>
        <select className={styles.search__select}>
          <option value="по номеру" className={styles.search__selectOption}>
            По номеру
          </option>
          <option value="по городу" className={styles.search__selectOption}>
            По городу
          </option>
          <option
            value="по типу поставки"
            className={styles.search__selectOption}
          >
            По типу поставки
          </option>
          <option value="по статусу" className={styles.search__selectOption}>
            По статусу
          </option>
        </select>
      </div>
      <div className={styles.search__inputWrapper}>
        <input
          type="text"
          className={styles.search__input}
          placeholder="Поиск..."
        />
      </div>
    </div>
  );
};

export default Search;
