import React from "react";
import styles from "./SupplyCard.module.scss";
import editing from "../../../src/icons/editing.svg";
import { openModal, setSelectedSupply } from "../../store/features/modalSlice";
import EditSupplyModal from "../../modals/EditSupplyModal/EditSupplyModal";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Supply } from "../types/supply";

const supplies: Supply[] = [
  {
    number: "154814",
    date: "28.06.2024",
    city: "Москва",
    quantity: "487 шт.",
    type: "Короб",
    warehouse: "Черная Грязь",
    address: "д. Черная Грязь, ул. Промышленная, с.2",
    status: "В пути",
  },
  {
    number: "342576",
    date: "26.06.2024",
    city: "Москва",
    quantity: "275 шт.",
    type: "Ящик",
    warehouse: "Белое Озеро",
    address:
      "Липкинское шоссе, 2-й километр, вл1с1, посёлок Вёшки, городской округ Мытищи, Московская область",
    status: "На складе",
  },
  {
    number: "987654",
    date: "26.06.2024",
    city: "Псков",
    quantity: "1023 шт.",
    type: "Паллет",
    warehouse: "Зеленая Долина",
    address: "г. Новосибирск, ул. Гагарина, д. 5",
    status: "Ожидается",
  },
  {
    number: "123456",
    date: "10.09.2024",
    city: "Тверь",
    quantity: "356 шт.",
    type: "Ящик",
    warehouse: "Солнечный Проспект",
    address: "г. Екатеринбург, ул. Пушкина, д. 15",
    status: "Доставлено",
  },
  {
    number: "785421",
    date: "24.06.2024",
    city: "Нижний Новгород",
    quantity: "654 шт.",
    type: "Контейнер",
    warehouse: "Лесной Бор",
    address:
      "Посёлок Кудьма, логистический комплекс Южный, ул. Индустриальная, 10",
    status: "В пути",
  },
  {
    number: "555888",
    date: "05.11.2024",
    city: "Ростов-на-Дону",
    quantity: "789 шт.",
    type: "Паллет",
    warehouse: "Золотая Долина",
    address: "г. Ростов-на-Дону, ул. Кирова, д. 20",
    status: "На складе",
  },
  {
    number: "999000",
    date: "20.12.2024",
    city: "Владивосток",
    quantity: "456 шт.",
    type: "Короб",
    warehouse: "Тихоокеанская Гавань",
    address: "г. Владивосток, ул. Портовая, д. 3",
    status: "Ожидается",
  },
  {
    number: "456123",
    date: "07.01.2025",
    city: "Калининград",
    quantity: "234 шт.",
    type: "Ящик",
    warehouse: "Балтийское Море",
    address: "г. Калининград, ул. Морская, д. 1",
    status: "Доставлено",
  },
  {
    number: "777888",
    date: "15.02.2025",
    city: "Уфа",
    quantity: "876 шт.",
    type: "Контейнер",
    warehouse: "Зеленый Лес",
    address: "г. Уфа, ул. Парковая, д. 25",
    status: "В пути",
  },
  {
    number: "333444",
    date: "30.03.2025",
    city: "Самара",
    quantity: "321 шт.",
    type: "Паллет",
    warehouse: "Волжская Звезда",
    address: "г. Самара, ул. Гагарина, д. 30",
    status: "На складе",
  },
];

const SupplyCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const showModal = useAppSelector((state) => state.modal.showModal);

  const handleEditSupplyClick = (supplyId: string) => {
    const selectedSupply = supplies.find(
      (supply) => supply.number === supplyId
    );
    if (selectedSupply) {
      dispatch(setSelectedSupply(selectedSupply));
      dispatch(openModal({ modalType: "edit" }));
    }
  };

  return (
    <>
      <div className={styles.supplyCard__titleItems}>
        <div className={styles.supplyCard__number}>Номер</div>
        <div className={styles.supplyCard__date}>Дата поставки</div>
        <div className={styles.supplyCard__city}>Город</div>
        <div className={styles.supplyCard__quantity}>Количество</div>
        <div className={styles.supplyCard__type}>Тип поставки</div>
        <div className={styles.supplyCard__storehouse}>Склад</div>
        <div className={styles.supplyCard__status}>Статус</div>
      </div>
      <div className={styles.supplyCard}>
        {supplies.map((item, index) => (
          <div key={index} className={styles.supplyCard__container}>
            <p
              className={`${styles.supplyCard__item} ${styles.supplyCard__number}`}
            >
              {item.number}
            </p>
            <p
              className={`${styles.supplyCard__item} ${styles.supplyCard__date}`}
            >
              {item.date}
            </p>
            <p
              className={`${styles.supplyCard__item} ${styles.supplyCard__city}`}
            >
              {item.city}
            </p>
            <p
              className={`${styles.supplyCard__item} ${styles.supplyCard__quantity}`}
            >
              {item.quantity}
            </p>
            <p
              className={`${styles.supplyCard__item} ${styles.supplyCard__type}`}
            >
              {item.type}
            </p>
            <div className={styles.supplyCard__items}>
              <p>{item.warehouse}</p>
              <p className={styles.supplyCard__address}>{item.address}</p>
            </div>
            <div className={styles.supplyCard__statusContainer}>
              <p
                className={`${styles.supplyCard__item} ${styles.supplyCard__status_value}`}
              >
                {item.status}
              </p>
            </div>
            <button
              className={styles.supplyCard__editing}
              onClick={() => handleEditSupplyClick(item.number)}
            >
              <img src={editing} alt="Редактировать" />
            </button>
          </div>
        ))}
      </div>
      {showModal && <EditSupplyModal />}
    </>
  );
};

export default SupplyCard;
