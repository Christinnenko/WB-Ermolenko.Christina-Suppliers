import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./EditSupplyModal.module.css";
import {
  useGetCitiesQuery,
  useGetStatusesQuery,
  useGetSuppliesQuery,
  useGetSupplyTypesQuery,
  useGetWarehousesQuery,
  useUpdateSupplyMutation,
} from "../../store/apiSlice";
import close from "../../../src/icons/close.svg";
import { useDispatch } from "react-redux";
import { Supply } from "../../store/interfaces";
import { updateSupply } from "../../store/features/suppliesSlice";

const EditSupplyModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");

  const { id } = useParams<{ id: string }>();

  const {
    data: supplyData,
    isLoading: isSuppliesLoading,
    isError: isSuppliesError,
    refetch: refetchSupplies,
  } = useGetSuppliesQuery();
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
  const [
    updateSupplyMutation,
    { isLoading: isUpdateLoading, isError: isUpdateError },
  ] = useUpdateSupplyMutation();

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
  }>({
    quantity: false,
  });

  //определение текущей поставки
  useEffect(() => {
    if (supplyData && id) {
      const currentSupply = supplyData.find((item) => item.id === id);
      if (currentSupply) {
        setFormData(currentSupply);
      }
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [supplyData, id]);

  const closeModal = () => {
    navigate("/");
  };

  //добавление введенных данных из инпута и выбранных селектов в поставку
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    if (id === "quantity") {
      const quantity = value === "" ? 0 : parseInt(value, 10);

      if (!isNaN(quantity)) {
        setFormData((prevData) => ({
          ...prevData,
          quantity: quantity,
        }));

        const isQuantityValid = quantity > 0;
        setErrorsField((prevErrors) => ({
          ...prevErrors,
          quantity: !isQuantityValid,
        }));
      } else {
        setErrorsField((prevErrors) => ({
          ...prevErrors,
          quantity: true,
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
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const currentSupply = supplyData?.find((item) => item.id === id);

  useEffect(() => {
    if (
      isSuppliesLoading ||
      isCitiesLoading ||
      isSupplyTypesLoading ||
      isWarehousesLoading ||
      isStatusesLoading ||
      isUpdateLoading
    ) {
      setMessage("Загрузка");
    } else if (
      isSuppliesError ||
      isCitiesError ||
      isSupplyTypesError ||
      isWarehousesError ||
      isStatusesError ||
      isUpdateError
    ) {
      setMessage("Произошла ошибка при загрузке данных");
    } else if (!id) {
      setMessage("Поставка не найдена");
    } else if (!currentSupply) {
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
    isUpdateLoading,
    isSuppliesError,
    isCitiesError,
    isSupplyTypesError,
    isWarehousesError,
    isStatusesError,
    isUpdateError,
    id,
    currentSupply,
  ]);

  const handleSubmitEditSupply = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (formData.quantity <= 0) {
      setErrorsField({
        quantity: true,
      });
      return;
    }

    try {
      const response = await updateSupplyMutation({
        id: formData.id,
        supply: formData,
      });

      if ("data" in response) {
        const data = response.data as any;
        if (data.updatedSupply) {
          dispatch(updateSupply(data.updatedSupply));
          refetchSupplies();
        }
      }

      closeModal();
    } catch (error: any) {
      if (error.status === 404) {
        setMessage("Не удалось найти поставку");
        console.error(
          "Произошла ошибка при добавлении поставки. Поставка не найдена:",
          error
        );
      } else if (error.status === 500) {
        setMessage(
          "Произошла ошибка при редактировании поставки. Попробуйте позже"
        );
        console.error("Произошла ошибка при добавлении поставки:", error);
      } else {
        setMessage(
          "Произошла ошибка при редактировании поставки. Попробуйте позже"
        );
        console.error("Произошла ошибка при добавлении поставки:", error);
      }
    }
  };

  return (
    <div className={styles.editSupplyModal__background}>
      <div className={styles.editSupplyModal}>
        <div className={styles.editSupplyModal__closing}>
          <Link to="/" className={styles.editSupplyModal__btnClose}>
            <img src={close} alt="Закрыть" />
          </Link>
        </div>
        <form
          onSubmit={handleSubmitEditSupply}
          className={styles.editSupplyModal__container}
        >
          <h1 className={styles.editSupplyModal__title}>Редактирование</h1>
          <p className={styles.editSupplyModal__supplyNumber}>
            &#35;{currentSupply?.number}
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
                name="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className={styles.editSupplyModal__select}
              >
                {citiesData?.map((city) => (
                  <option key={city.id} value={city.city}>
                    {city.city}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.editSupplyModal__form}>
              <label
                className={styles.editSupplyModal__selectName}
                htmlFor="type"
              >
                Тип поставки
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className={styles.editSupplyModal__select}
              >
                {supplyTypesData?.map((type) => (
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
                  id="quantity"
                  type="number"
                  autoComplete="off"
                  onChange={handleInputChange}
                  value={formData.quantity.toString()}
                  className={`${styles.editSupplyModal__input} ${
                    errorsField.quantity
                      ? styles.editSupplyModal__inputError
                      : ""
                  }`}
                />
                <span className={styles.editSupplyModal__inputSuffix}>шт.</span>
              </div>
            </div>
            <div className={styles.editSupplyModal__form}>
              <label
                className={styles.editSupplyModal__selectName}
                htmlFor="warehouseName"
              >
                Склад
              </label>
              <select
                id="warehouseName"
                name="warehouse"
                value={formData.warehouse?.name}
                onChange={handleInputChange}
                className={styles.editSupplyModal__select}
              >
                {warehousesData?.map((warehouse) => (
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
                name="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className={styles.editSupplyModal__select}
              >
                {statusesData?.map((status) => (
                  <option key={status.id} value={status.status}>
                    {status.status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.editSupplyModal__btns}>
            <button type="submit" className={styles.editSupplyModal__btnSave}>
              Сохранить
            </button>
            <button
              type="button"
              onClick={closeModal}
              className={styles.editSupplyModal__btnCancel}
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

export default EditSupplyModal;
