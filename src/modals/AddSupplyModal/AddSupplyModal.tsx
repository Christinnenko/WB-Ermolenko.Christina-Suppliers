import React from "react";
import styles from "./AddSupplyModal.module.scss";
import close from "../../../src/icons/close.svg";
import calendar from "../../../src/icons/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";
import "../../global.scss";
import {
  useGetCitiesQuery,
  useGetStatusesQuery,
  useGetSupplyTypesQuery,
  useGetWarehousesQuery,
} from "../../store/apiSlice";
import { Link } from "react-router-dom";

registerLocale("ru", ru);

const AddSupplyModal: React.FC = () => {
  const { data: citiesData } = useGetCitiesQuery();
  const { data: supplyTypesData } = useGetSupplyTypesQuery();
  const { data: warehousesData } = useGetWarehousesQuery();
  const { data: statusesData } = useGetStatusesQuery();

  if (!citiesData || !supplyTypesData || !warehousesData || !statusesData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.editSupplyModal__background}>
      <div className={styles.editSupplyModal}>
        <div className={styles.editSupplyModal__closing}>
          <Link to="/" className={styles.editSupplyModal__btnClose}>
            <img src={close} alt="Кнопка закрытия" />
          </Link>
        </div>
        <div className={styles.editSupplyModal__container}>
          <h1 className={styles.editSupplyModal__title}>Новая поставка</h1>
          <p className={styles.editSupplyModal__supplyNumber}>&#35;02387</p>
          <div className={styles.editSupplyModal__formGroup}>
            <div className={styles.editSupplyModal__form}>
              <label
                className={styles.editSupplyModal__selectName}
                htmlFor="Дата поставки"
              >
                Дата поставки
              </label>
              <div className={styles.editSupplyModal__inputContainer}>
                <DatePicker
                  dateFormat="dd.MM.yyyy"
                  placeholderText="__.__.____"
                  locale="ru"
                  showPopperArrow={true}
                  className={`${styles.editSupplyModal__input} ${styles.editSupplyModal__inputDate}`}
                />
                <button className={styles.editSupplyModal__calendarBtn}>
                  <img src={calendar} alt="Открыть календарь" />
                </button>
              </div>
            </div>
            <div className={styles.editSupplyModal__form}>
              <label
                className={styles.editSupplyModal__selectName}
                htmlFor="Город"
              >
                Город
              </label>
              <select id="city" className={styles.editSupplyModal__select}>
                {citiesData.map((city) => (
                  <option key={city.id} value={city.city}>
                    {city.city}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.editSupplyModal__form}>
              <label
                className={styles.editSupplyModal__selectName}
                htmlFor="Количество"
              >
                Количество
              </label>
              <div className={styles.editSupplyModal__inputContainer}>
                <input
                  type="text"
                  autoComplete="off"
                  id="quantity"
                  className={styles.editSupplyModal__input}
                />
                <span className={styles.editSupplyModal__inputSuffix}>шт.</span>
              </div>
            </div>
            <div className={styles.editSupplyModal__form}>
              <label
                className={styles.editSupplyModal__selectName}
                htmlFor="supplyType"
              >
                Тип поставки
              </label>
              <select
                id="supplyType"
                className={styles.editSupplyModal__select}
              >
                {supplyTypesData.map((type) => (
                  <option key={type.id} value={type.supplyType}>
                    {type.supplyType}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.editSupplyModal__form}>
              <label
                className={styles.editSupplyModal__selectName}
                htmlFor="Склад"
              >
                Склад
              </label>

              <select id="warehouse" className={styles.editSupplyModal__select}>
                {warehousesData.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.name}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.editSupplyModal__form}>
              <label
                className={styles.editSupplyModal__selectName}
                htmlFor="Статус"
              >
                Статус
              </label>
              <select id="status" className={styles.editSupplyModal__select}>
                {statusesData.map((status) => (
                  <option key={status.id} value={status.status}>
                    {status.status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.editSupplyModal__btns}>
            <button className={styles.editSupplyModal__btnSave}>Создать</button>
            <button className={styles.editSupplyModal__btnCancel}>
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSupplyModal;
