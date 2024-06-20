import React, { useEffect, useState } from "react";
import styles from "./SupplyCard.module.css";
import editing from "../../../src/icons/editing.svg";
import editingMob from "../../../src/icons/mob-pencil.svg";
import {
  useDeleteSupplyMutation,
  useGetSuppliesQuery,
} from "../../store/apiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  deleteSupply,
  setFilteredSupplies,
  setSupplies,
} from "../../store/features/suppliesSlice";
import {
  selectSearchInput,
  selectSearchType,
} from "../../store/features/searchSlice";
import CustomOptions from "../CustomOptions/CustomOptions";

const ITEMS_PER_PAGE = 9;

interface SupplyCardProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const SupplyCard: React.FC<SupplyCardProps> = ({
  currentPage,
  onPageChange,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: supplyData, isFetching } = useGetSuppliesQuery();
  const [deleteSupplyMutation] = useDeleteSupplyMutation();

  const supplies = useSelector((state: RootState) => state.supplies.supplies);
  const filteredSupplies = useSelector(
    (state: RootState) => state.supplies.filteredSupplies
  );

  const type = useSelector(selectSearchType);
  const input = useSelector(selectSearchInput).trim().toLowerCase();

  const pageCount = Math.ceil(filteredSupplies.length / ITEMS_PER_PAGE);
  useEffect(() => {
    if (currentPage >= pageCount && pageCount > 0) {
      onPageChange(pageCount - 1);
    }
  }, [currentPage, pageCount, onPageChange]);

  useEffect(() => {
    const newFilteredSupplies = supplies.filter((supply) => {
      switch (type) {
        case "По номеру":
          return supply.number.toLowerCase().trim().includes(input);
        case "По городу":
          return supply.city.toLowerCase().trim().includes(input);
        case "По типу поставки":
          return supply.type.toLowerCase().trim().includes(input);
        case "По статусу":
          return supply.status.toLowerCase().trim().includes(input);
        default:
          return true;
      }
    });
    dispatch(setFilteredSupplies(newFilteredSupplies));
  }, [input, type, supplies, dispatch]);

  const displayedSupplies = filteredSupplies.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

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

  const options = [
    { value: "Редактировать", label: "Редактировать" },
    { value: "Отменить поставку", label: "Отменить поставку" },
  ];

  const [openOptionsId, setOpenOptionsId] = useState<string | null>(null);

  const handleOptionChange = (value: string, supplyId: string) => {
    if (value === "Редактировать") {
      navigate(`/modal/edit-supply/${supplyId}`);
    } else if (value === "Отменить поставку") {
      handleDeleteSupply(supplyId);
    }
  };

  const toggleOptions = (supplyId: string) => {
    setOpenOptionsId((prev) => (prev === supplyId ? null : supplyId));
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
        {displayedSupplies.map((supply) => (
          <div key={supply.id} className={styles.supplyCard__container}>
            <div className={styles.supplyCard__labelNumberMob}>
              <label
                htmlFor="supplyNumber"
                className={styles.supplyCard__labelMob}
              >
                Номер
              </label>
              <p
                id="supplyNumber"
                className={`${styles.supplyCard__item} ${styles.supplyCard__number}`}
              >
                {supply.number}
              </p>
            </div>
            <div className={styles.supplyCard__labelDateMob}>
              <label
                htmlFor="supplyDate"
                className={styles.supplyCard__labelMob}
              >
                Дата поставки
              </label>
              <p
                id="supplyDate"
                className={`${styles.supplyCard__item} ${styles.supplyCard__date}`}
              >
                {supply.date}
              </p>
            </div>
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
            <div
              className={styles.supplyCard__editing}
              onClick={() => toggleOptions(supply.id)}
            >
              <img
                className={styles.supplyCard__editingImg}
                src={editing}
                alt="Редактировать"
              />
              {openOptionsId === supply.id && (
                <div className={styles.supplyCard__options}>
                  <CustomOptions
                    options={options}
                    onChange={(value) => handleOptionChange(value, supply.id)}
                  />
                </div>
              )}
              <img
                className={styles.supplyCard__editingImgMob}
                src={editingMob}
                alt="Редактировать"
                onClick={() => toggleOptions(supply.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SupplyCard;
