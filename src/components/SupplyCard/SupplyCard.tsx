import React from "react";
import styles from "./SupplyCard.module.scss";
import editing from "../../../src/icons/editing.svg";
import { useGetSuppliesQuery } from "../../store/apiSlice";
import { Link } from "react-router-dom";

const SupplyCard: React.FC = () => {
  const { data: supplyData } = useGetSuppliesQuery();

  if (!supplyData) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className={styles.supplyCard__titleItems}>
        <div className={styles.supplyCard__number}>Номер</div>
        <div className={styles.supplyCard__date}>Дата поставки</div>
        <div className={styles.supplyCard__city}>Город</div>
        <div className={styles.supplyCard__quantity}>Количество</div>
        <div className={styles.supplyCard__type}>Тип поставки</div>
        <div className={styles.supplyCard__warehouse}>Склад</div>
        <div className={styles.supplyCard__status}>Статус</div>
      </div>
      <div className={styles.supplyCard}>
        {supplyData.map((supply) => (
          <div key={supply.id} className={styles.supplyCard__container}>
            <p
              className={`${styles.supplyCard__item} ${styles.supplyCard__number}`}
            >
              {supply.number}
            </p>
            <p
              className={`${styles.supplyCard__item} ${styles.supplyCard__date}`}
            >
              {supply.date}
            </p>
            <p
              className={`${styles.supplyCard__item} ${styles.supplyCard__city}`}
            >
              {supply.city}
            </p>
            <p
              className={`${styles.supplyCard__item} ${styles.supplyCard__quantity}`}
            >
              {supply.quantity} <span>шт.</span>
            </p>
            <p
              className={`${styles.supplyCard__item} ${styles.supplyCard__type}`}
            >
              {supply.type}
            </p>
            <div className={styles.supplyCard__items}>
              <p className={styles.supplyCard__warehouse}>
                {supply.warehouse.name}
              </p>
              <p className={styles.supplyCard__address}>
                {supply.warehouse.address}
              </p>
            </div>
            <div className={styles.supplyCard__statusContainer}>
              <p
                className={`${styles.supplyCard__item} ${styles.supplyCard__status_value}`}
              >
                {supply.status}
              </p>
            </div>
            <Link
              to={`/modal/edit-supply/${supply.id}`}
              className={styles.supplyCard__editing}
            >
              <img src={editing} alt="Редактировать" />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default SupplyCard;
