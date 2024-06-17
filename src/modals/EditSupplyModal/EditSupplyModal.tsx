import React from "react";
import styles from "./EditSupplyModal.module.scss";
import close from "../../../src/icons/close.svg";

const EditSupplyModal: React.FC = () => {
  return (
    <div className={styles.editSupplyModal__background}>
      <div className={styles.editSupplyModal}>
        <div className={styles.editSupplyModal__closing}>
          <button className={styles.editSupplyModal__btnClose}>
            <img src={close} alt="Кнопка закрытия" />
          </button>
        </div>
        <div className={styles.editSupplyModal__container}>
          <h1 className={styles.editSupplyModal__title}>Редактирование</h1>
          <p className={styles.editSupplyModal__supplyNumber}>&#35;154814</p>
          <div className={styles.editSupplyModal__formGroup}>
            <div className={styles.editSupplyModal__form}>
              <label
                className={styles.editSupplyModal__selectName}
                htmlFor="Город"
              >
                Город
              </label>
              <select id="city" className={styles.editSupplyModal__select}>
                <option value="Москва">Москва</option>
                <option value="Псков">Псков</option>
              </select>
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
                <option value="Короб">Короб</option>
                <option value="Паллет">Паллет</option>
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
                  id="quantity"
                  className={styles.editSupplyModal__input}
                />
                <span className={styles.editSupplyModal__inputSuffix}>шт.</span>
              </div>
            </div>
            <div className={styles.editSupplyModal__form}>
              <label
                className={styles.editSupplyModal__selectName}
                htmlFor="Склад"
              >
                Склад
              </label>
              <select id="warehouse" className={styles.editSupplyModal__select}>
                <option value="Черная грязь">Черная грязь</option>
                <option value="Склад 2">Склад 2</option>
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
                <option value="В пути">В пути</option>
                <option value="На складе">На складе</option>
              </select>
            </div>
          </div>
          <div className={styles.editSupplyModal__btns}>
            <button className={styles.editSupplyModal__btnSave}>
              Сохранить
            </button>
            <button className={styles.editSupplyModal__btnCancel}>
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSupplyModal;
