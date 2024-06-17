import React from "react";
import logo from "../../../src/icons/logo.svg";
import plus from "../../../src/icons/plus.svg";
import styles from "./SuppliesPage.module.scss";
import Segments from "../../components/Segments/Segments";
import Search from "../../components/Search/Search";
import SupplyCard from "../../components/SupplyCard/SupplyCard";
import { useAppDispatch, useAppSelector } from "../../store/store";
import AddSupplyModal from "../../modals/AddSupplyModal/AddSupplyModal";
import { openModal } from "../../store/features/modalSlice";

const SuppliesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const showModal = useAppSelector((state) => state.modal.showModal);

  const handleAddSupplyClick = () => {
    dispatch(openModal({ modalType: "add" }));
  };

  return (
    <div className={styles.suppliesPage}>
      <div>
        <img src={logo} alt="Логотип" className={styles.suppliesPage__logo} />
      </div>
      <div className={styles.suppliesPage__container}>
        <div className={styles.suppliesPage__segments}>
          <Segments />
        </div>
        <div className={styles.suppliesPage__content}>
          <h1 className={styles.suppliesPage__title}>Поставки</h1>
          <div className={styles.suppliesPage__actions}>
            <div
              className={styles.suppliesPage__adding}
              onClick={handleAddSupplyClick}
            >
              <img
                src={plus}
                alt="Добавить"
                className={styles.suppliesPage__addingImg}
              />
              <p>Добавить поставку</p>
            </div>
            <Search />
          </div>
        </div>
        <SupplyCard />
      </div>
      {showModal && <AddSupplyModal />}
    </div>
  );
};

export default SuppliesPage;
