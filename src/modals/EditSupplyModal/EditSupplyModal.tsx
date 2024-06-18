import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetCitiesQuery,
  useGetStatusesQuery,
  useGetSuppliesQuery,
  useGetSupplyTypesQuery,
  useGetWarehousesQuery,
} from "../../store/apiSlice";
import styles from "./EditSupplyModal.module.scss";
import close from "../../../src/icons/close.svg";

const EditSupplyModal: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: supplyData } = useGetSuppliesQuery();
  const { data: citiesData } = useGetCitiesQuery();
  const { data: supplyTypesData } = useGetSupplyTypesQuery();
  const { data: warehousesData } = useGetWarehousesQuery();
  const { data: statusesData } = useGetStatusesQuery();

  const [city, setCity] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [warehouse, setWarehouse] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (supplyData && id) {
      const supply = supplyData?.find((item) => item.id === parseInt(id, 10));

      if (supply) {
        setCity(supply.city);
        setType(supply.type);
        setQuantity(supply.quantity);
        setWarehouse(supply.warehouse.name);
        setStatus(supply.status);
      }
    }
  }, [supplyData, id]);

  if (!citiesData || !supplyTypesData || !warehousesData || !statusesData) {
    return <h1>Loading...</h1>;
  }

  if (!id) {
    return <h1>Id not found</h1>;
  }

  const supply = supplyData?.find((item) => item.id === parseInt(id, 10));

  if (!supply) {
    return <h1>Supply not found</h1>;
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
          <h1 className={styles.editSupplyModal__title}>Редактирование</h1>
          <p className={styles.editSupplyModal__supplyNumber}>
            &#35;{supply.number}
          </p>
          <div className={styles.editSupplyModal__formGroup}>
            <div className={styles.editSupplyModal__form}>
              <label
                className={styles.editSupplyModal__selectName}
                htmlFor="city"
              >
                Город
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={styles.editSupplyModal__select}
              >
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
                htmlFor="supplyType"
              >
                Тип поставки
              </label>
              <select
                id="supplyType"
                value={type}
                onChange={(e) => setType(e.target.value)}
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
                htmlFor="quantity"
              >
                Количество
              </label>
              <div className={styles.editSupplyModal__inputContainer}>
                <input
                  type="text"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={styles.editSupplyModal__input}
                />
                <span className={styles.editSupplyModal__inputSuffix}>шт.</span>
              </div>
            </div>
            <div className={styles.editSupplyModal__form}>
              <label
                className={styles.editSupplyModal__selectName}
                htmlFor="warehouse"
              >
                Склад
              </label>
              <select
                id="warehouse"
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                className={styles.editSupplyModal__select}
              >
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
                htmlFor="status"
              >
                Статус
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={styles.editSupplyModal__select}
              >
                {statusesData.map((status) => (
                  <option key={status.id} value={status.status}>
                    {status.status}
                  </option>
                ))}
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
