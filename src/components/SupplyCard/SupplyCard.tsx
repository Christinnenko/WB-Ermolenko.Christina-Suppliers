import React, { useEffect } from "react";
import styles from "./SupplyCard.module.scss";
import editing from "../../../src/icons/editing.svg";
import {
  useDeleteSupplyMutation,
  useGetSuppliesQuery,
} from "../../store/apiSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deleteSupply, setSupplies } from "../../store/features/suppliesSlice";
import {
  selectSearchInput,
  selectSearchType,
} from "../../store/features/searchSlice";

const SupplyCard: React.FC = () => {
  const dispatch = useDispatch();

  const { data: supplyData, isFetching } = useGetSuppliesQuery();
  const [deleteSupplyMutation] = useDeleteSupplyMutation();

  const supplies = useSelector((state: RootState) => state.supplies.supplies);

  const type = useSelector(selectSearchType);
  const input = useSelector(selectSearchInput).trim().toLowerCase();

  const filteredSupplies = supplies.filter((supply) => {
    switch (type) {
      case "по номеру":
        return supply.number.toLowerCase().trim().includes(input);
      case "по городу":
        return supply.city.toLowerCase().trim().includes(input);
      case "по типу поставки":
        return supply.type.toLowerCase().trim().includes(input);
      case "по складу":
        return supply.warehouse.name.toLowerCase().trim().includes(input);
      case "по статусу":
        return supply.status.toLowerCase().trim().includes(input);
      default:
        return true;
    }
  });

  useEffect(() => {
    if (supplyData && !isFetching) {
      dispatch(setSupplies(supplyData));
    }
  }, [supplyData, isFetching, dispatch]);

  const handleDeleteSupply = async (supplyId: string) => {
    try {
      await deleteSupplyMutation(supplyId).unwrap();
      dispatch(deleteSupply(supplyId));
    } catch (error) {
      console.error("Failed to delete supply:", error);
    }
  };

  if (!supplyData || filteredSupplies.length === 0) {
    return (
      <div className={styles.supplyCard__noSuppliesMessage}>
        Поставки отсутствуют. Для начала работы добавьте поставку.
      </div>
    );
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
        {filteredSupplies.map((supply) => (
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
                style={{
                  backgroundColor:
                    supply.status === "В пути"
                      ? "#14532B"
                      : supply.status === "Задерживается"
                      ? "#7C3D12"
                      : "undefined",
                  color:
                    supply.status === "В пути"
                      ? "#85EF89"
                      : supply.status === "Задерживается"
                      ? "#FDB172"
                      : "undefined",
                }}
              >
                {supply.status}
              </p>
            </div>
            <button onClick={() => handleDeleteSupply(supply.id)}>
              Удалить
            </button>
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
