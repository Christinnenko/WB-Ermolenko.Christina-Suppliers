import React, { useEffect, useState } from "react";
import styles from "./SupplyModal.module.css";
import "./CustomCalendar.css";
import close from "../../../src/icons/close.svg";
import calendar from "../../../src/icons/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";
import {
  useAddSupplyMutation,
  useGetCitiesQuery,
  useGetStatusesQuery,
  useGetSuppliesQuery,
  useGetSupplyTypesQuery,
  useGetWarehousesQuery,
} from "../../store/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import { Supply } from "../../store/interfaces";
import { addSupply } from "../../store/features/suppliesSlice";
import { useDispatch } from "react-redux";

//русский язык для календаря
registerLocale("ru", ru);

const AddSupplyModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [message, setMessage] = useState<string>("");

  const {
    data: citiesData,
    isLoading: isCitiesLoading,
    isError: isCitiesError,
  } = useGetCitiesQuery();
  const {
    data: supplyTypesData,
    isLoading: isSupplyTypesLoading,
    isError: isSupplyTypesError,
  } = useGetSupplyTypesQuery();
  const {
    data: warehousesData,
    isLoading: isWarehousesLoading,
    isError: isWarehousesError,
  } = useGetWarehousesQuery();
  const {
    data: statusesData,
    isLoading: isStatusesLoading,
    isError: isStatusesError,
  } = useGetStatusesQuery();
  const {
    data: suppliesData,
    isLoading: isSuppliesLoading,
    isError: isSuppliesError,
    refetch: refetchSupplies,
  } = useGetSuppliesQuery();
  const [addSupplyMutation, { isLoading: isAddLoading, isError: isAddError }] =
    useAddSupplyMutation();

  const [formData, setFormData] = useState<Supply>({
    id: "",
    number: "",
    date: "",
    city: "",
    quantity: 0,
    type: "",
    warehouse: {
      name: "",
      address: "",
    },
    status: "",
  });

  const [errorsField, setErrorsField] = useState<{
    quantity: boolean;
    date: boolean;
  }>({
    quantity: false,
    date: false,
  });

  useEffect(() => {
    if (
      isSuppliesLoading ||
      isCitiesLoading ||
      isSupplyTypesLoading ||
      isWarehousesLoading ||
      isStatusesLoading ||
      isAddLoading
    ) {
      setMessage("Загрузка");
    } else if (
      isSuppliesError ||
      isCitiesError ||
      isSupplyTypesError ||
      isWarehousesError ||
      isStatusesError ||
      isAddError
    ) {
      setMessage("Произошла ошибка при загрузке данных");
    } else if (!suppliesData) {
      setMessage("Список поставок не найден");
    } else {
      setMessage("");
    }
  }, [
    isSuppliesLoading,
    isCitiesLoading,
    isSupplyTypesLoading,
    isWarehousesLoading,
    isStatusesLoading,
    isAddLoading,
    isSuppliesError,
    isCitiesError,
    isSupplyTypesError,
    isWarehousesError,
    isStatusesError,
    isAddError,
    suppliesData,
  ]);

  //для обновления поставок (необходимо для корректной генерации номера поставки)
  const [isInitialized, setIsInitialized] = useState(false);

  //генерация номера поставки, добавление номера и дефолтных значений Select в новую поставку
  useEffect(() => {
    if (
      !isInitialized &&
      suppliesData &&
      suppliesData.length > 0 &&
      citiesData &&
      supplyTypesData &&
      warehousesData &&
      statusesData
    ) {
      const lastSupply = suppliesData[suppliesData.length - 1];
      const newNumber = (parseInt(lastSupply.number, 10) + 1).toString();

      const defaultWarehouse = warehousesData[0].address;

      setFormData((prevData) => ({
        ...prevData,
        number: newNumber.toString(),
        city: citiesData[0].city,
        type: supplyTypesData[0].supplyType,
        warehouse: {
          name: warehousesData[0].name,
          address: defaultWarehouse,
        },
        status: statusesData[0].status,
      }));

      setIsInitialized(true);
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [
    suppliesData,
    citiesData,
    supplyTypesData,
    warehousesData,
    statusesData,
    isInitialized,
  ]);

  const closeModal = () => {
    refetchSupplies(); //для формирования номера поставки
    navigate("/");
  };

  //добавление введенных данных из инпута и выбранных селектов в новую поставку
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();

    const { id, value } = e.target;

    if (id === "quantity") {
      const quantity = value === "" ? 0 : parseInt(value, 10);

      if (!isNaN(quantity)) {
        setFormData((prevData) => ({
          ...prevData,
          quantity: quantity,
        }));
        setErrorsField((prevErrors) => ({
          ...prevErrors,
          quantity: false,
        }));
      }
    } else if (id === "warehouseName" && warehousesData) {
      const selectedWarehouse = warehousesData.find(
        (warehouse) => warehouse.name === value
      );

      const address = selectedWarehouse ? selectedWarehouse.address : "";
      setFormData((prevData) => ({
        ...prevData,
        warehouse: {
          name: value,
          address: address,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  //установка даты в форму и добавление даты в новую поставку
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setFormData((prevData) => ({
      ...prevData,
      date: date ? date.toLocaleDateString("ru") : "",
    }));
    setErrorsField((prevErrors) => ({
      ...prevErrors,
      date: false,
    }));
  };

  const handleSubmitAddSupply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isQuantityValid = formData.quantity > 0;
    const isDateValid = formData.date !== "";

    if (!isQuantityValid || !isDateValid) {
      setErrorsField({
        quantity: !isQuantityValid,
        date: !isDateValid,
      });
      return;
    }

    try {
      const response = await addSupplyMutation(formData);
      if ("data" in response) {
        const data = response.data as any;
        if (data) {
          dispatch(addSupply(data.supply));
        }
      }
      closeModal();
    } catch (error: any) {
      if (error.status === 500) {
        setMessage(
          "Произошла ошибка при добавлении поставки. Попробуйте добавить поставку позже"
        );
        console.error("Произошла ошибка при добавлении поставки:", error);
      } else {
        setMessage(
          "Произошла ошибка при добавлении поставки. Попробуйте добавить поставку позже"
        );
        console.error("Произошла ошибка при добавлении поставки:", error);
      }
    }
  };

  return (
    <div className={styles.addSupplyModal__background}>
      <div className={styles.addSupplyModal}>
        <div className={styles.addSupplyModal__closing}>
          <Link to="/" className={styles.addSupplyModal__btnClose}>
            <img
              src={close}
              alt="Закрыть"
              className={styles.addSupplyModal__btnImg}
            />
          </Link>
        </div>
        <form
          onSubmit={handleSubmitAddSupply}
          className={styles.addSupplyModal__container}
        >
          <h1 className={styles.addSupplyModal__title}>Новая поставка</h1>
          <p className={styles.addSupplyModal__supplyNumber}>
            &#35;{formData.number}
          </p>
          <div className={styles.addSupplyModal__formGroup}>
            <div className={styles.addSupplyModal__form}>
              <label
                className={styles.addSupplyModal__selectName}
                htmlFor="date"
              >
                Дата поставки
              </label>
              <div className={styles.addSupplyModal__inputContainer}>
                <DatePicker
                  id="date"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="__.__.____"
                  locale="ru"
                  autoComplete="off"
                  className={`${styles.addSupplyModal__input} ${
                    errorsField.date ? styles.addSupplyModal__inputError : ""
                  } ${styles.addSupplyModal__inputDate}`}
                />
                <button
                  type="button"
                  className={styles.addSupplyModal__calendarBtn}
                >
                  <img src={calendar} alt="Открыть календарь" />
                </button>
              </div>
            </div>
            <div className={styles.addSupplyModal__form}>
              <label
                className={styles.addSupplyModal__selectName}
                htmlFor="city"
              >
                Город
              </label>
              <select
                id="city"
                className={styles.addSupplyModal__select}
                onChange={handleInputChange}
                value={formData.city}
              >
                {citiesData?.map((city) => (
                  <option key={city.id} value={city.city}>
                    {city.city}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.addSupplyModal__form}>
              <label
                className={styles.addSupplyModal__selectName}
                htmlFor="quantity"
              >
                Количество
              </label>
              <div className={styles.addSupplyModal__inputContainer}>
                <input
                  id="quantity"
                  type="number"
                  autoComplete="off"
                  onChange={handleInputChange}
                  value={formData.quantity.toString()}
                  className={`${styles.addSupplyModal__input} ${
                    errorsField.quantity
                      ? styles.addSupplyModal__inputError
                      : ""
                  }`}
                />
                <span className={styles.addSupplyModal__inputSuffix}>шт.</span>
              </div>
            </div>
            <div className={styles.addSupplyModal__form}>
              <label
                className={styles.addSupplyModal__selectName}
                htmlFor="type"
              >
                Тип поставки
              </label>
              <select
                id="type"
                className={styles.addSupplyModal__select}
                onChange={handleInputChange}
                value={formData.type}
              >
                {supplyTypesData?.map((type) => (
                  <option key={type.id} value={type.supplyType}>
                    {type.supplyType}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.addSupplyModal__form}>
              <label
                className={styles.addSupplyModal__selectName}
                htmlFor="warehouseName"
              >
                Склад
              </label>
              <select
                id="warehouseName"
                className={styles.addSupplyModal__select}
                onChange={handleInputChange}
                value={formData.warehouse.name}
              >
                {warehousesData?.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.name}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.addSupplyModal__form}>
              <label
                className={styles.addSupplyModal__selectName}
                htmlFor="status"
              >
                Статус
              </label>
              <select
                id="status"
                className={styles.addSupplyModal__select}
                onChange={handleInputChange}
                value={formData.status}
              >
                {statusesData?.map((status) => (
                  <option key={status.id} value={status.status}>
                    {status.status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.addSupplyModal__btns}>
            <button type="submit" className={styles.addSupplyModal__btnSave}>
              Создать
            </button>
            <button
              type="button"
              onClick={closeModal}
              className={styles.addSupplyModal__btnCancel}
            >
              Отменить
            </button>
          </div>
          {message && <div className={styles.message}>{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddSupplyModal;
