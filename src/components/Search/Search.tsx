import React from "react";
import styles from "./Search.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setSearchType,
  setSearchInput,
  selectSearchType,
  selectSearchInput,
} from "../../store/features/searchSlice";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const typeSearch = useSelector(selectSearchType);
  const inputSearch = useSelector(selectSearchInput);

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSearchType(e.target.value));
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(e.target.value));
  };

  return (
    <div className={styles.search}>
      <div className={styles.search__selectWrapper}>
        <select
          onChange={onChangeType}
          className={styles.search__select}
          value={typeSearch}
        >
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
          onChange={onChangeSearch}
          type="text"
          className={styles.search__input}
          placeholder="Поиск..."
          value={inputSearch}
        />
      </div>
    </div>
  );
};

export default Search;
