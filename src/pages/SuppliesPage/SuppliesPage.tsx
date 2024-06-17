import React from "react";
import logo from "../../../src/icons/logo.svg";
import plus from "../../../src/icons/plus.svg";
import styles from "./SuppliesPage.module.scss";
import Segments from "../../components/Segments/Segments";
import Search from "../../components/Search/Search";
import SupplyCard from "../../components/SupplyCard/SupplyCard";
import { Link, Outlet } from "react-router-dom";

const SuppliesPage: React.FC = () => {
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
            <Link
              to="/modal/add-supply"
              className={styles.suppliesPage__adding}
            >
              <img
                src={plus}
                alt="Добавить"
                className={styles.suppliesPage__addingImg}
              />
              <p>Добавить поставку</p>
            </Link>
            <Search />
          </div>
        </div>
        <SupplyCard />
      </div>
      <Outlet />
    </div>
  );
};

export default SuppliesPage;
