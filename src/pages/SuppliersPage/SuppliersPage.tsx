import React from "react";
import logo from "../../../src/icons/logo.svg";
import plus from "../../../src/icons/plus.svg";
import styles from "./SuppliersPage.module.scss";
import Segments from "../../components/Segments/Segments";
import Search from "../../components/Search/Search";
import SupplyCard from "../../components/SupplyCard/SupplyCard";

const SuppliersPage: React.FC = () => {
  return (
    <div className={styles.suppliersPage}>
      <div>
        <img src={logo} alt="Логотип" className={styles.suppliersPage__logo} />
      </div>
      <div className={styles.suppliersPage__container}>
        <div className={styles.suppliersPage__segments}>
          <Segments />
        </div>
        <div className={styles.suppliersPage__content}>
          <h1 className={styles.suppliersPage__title}>Поставки</h1>
          <div className={styles.suppliersPage__actions}>
            <div className={styles.suppliersPage__adding}>
              <img
                src={plus}
                alt="Добавить"
                className={styles.suppliersPage__addingImg}
              />
              <p>Добавить поставку</p>
            </div>
            <Search />
          </div>
        </div>
        <SupplyCard />
      </div>
    </div>
  );
};

export default SuppliersPage;
