import React, { useEffect, useRef, useState } from "react";
import styles from "./Search.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchType,
  setSearchInput,
  selectSearchType,
  selectSearchInput,
} from "../../store/features/searchSlice";
import CustomOptions from "../CustomOptions/CustomOptions";
import { SearchProps } from "../../store/interfaces";

const Search: React.FC<SearchProps> = ({ onSearchClear }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const typeSearch = useSelector(selectSearchType);
  const inputSearch = useSelector(selectSearchInput);

  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: "По номеру", label: "По номеру" },
    { value: "По городу", label: "По городу" },
    { value: "По типу поставки", label: "По типу поставки" },
    { value: "По статусу", label: "По статусу" },
  ];

  // Закрытие выпадающего списка при клике по экрану
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !(wrapperRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;
    dispatch(setSearchInput(filterValue));
    if (filterValue.trim() === "") {
      onSearchClear();
    }
  };

  const handleOptionChange = (value: string) => {
    dispatch(setSearchType(value));
    setIsOpen(false);
  };

  return (
    <div className={styles.search}>
      <div ref={wrapperRef} className={styles.search__selectWrapper}>
        <div
          className={`${styles.search__select} ${
            isOpen ? styles.search__selectOpen : ""
          }`}
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
