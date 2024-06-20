import React, { useState } from "react";
import styles from "./Search.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setSearchType,
  setSearchInput,
  selectSearchType,
  selectSearchInput,
} from "../../store/features/searchSlice";
import CustomOptions from "../CustomOptions/CustomOptions";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const typeSearch = useSelector(selectSearchType);
  const inputSearch = useSelector(selectSearchInput);

  const [isOpen, setIsOpen] = useState(false);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;
    dispatch(setSearchInput(filterValue));
  };

  const handleOptionChange = (value: string) => {
    dispatch(setSearchType(value));
    setIsOpen(false);
  };

  const options = [
    { value: "По номеру", label: "По номеру" },
    { value: "По городу", label: "По городу" },
    { value: "По типу поставки", label: "По типу поставки" },
    { value: "По статусу", label: "По статусу" },
  ];

  return (
    <div className={styles.search}>
      <div className={styles.search__selectWrapper}>
        <div
          className={styles.search__select}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.search__selectType}>{typeSearch}</div>
          {isOpen && (
            <CustomOptions options={options} onChange={handleOptionChange} />
          )}
        </div>
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
