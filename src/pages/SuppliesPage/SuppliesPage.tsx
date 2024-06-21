import React, { useState } from "react";
import logo from "../../../src/icons/logo.svg";
import plus from "../../../src/icons/plus.svg";
import menu from "../../../src/icons/mob-menu.svg";
import reload from "../../../src/icons/mob-log.svg";
import documents from "../../../src/icons/mob-doc.svg";
import styles from "./SuppliesPage.module.css";
import Segments from "../../components/Segments/Segments";
import Search from "../../components/Search/Search";
import SupplyCard from "../../components/SupplyCard/SupplyCard";
import { Link, Outlet } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { useAppSelector } from "../../store/store";
import { selectSupplies } from "../../store/features/suppliesSlice";

const SuppliesPage: React.FC = () => {
  const supplies = useAppSelector(selectSupplies);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleSearchClear = () => {
    setCurrentPage(0);
  };

  return (
    <div>
      <div className={styles.suppliesPage}>
        <div className={styles.suppliesPage__logoContainer}>
          <nav>
            <Link to="/" className={styles.link}>
              <img
                src={menu}
                alt="Меню"
                className={styles.suppliesPage__menuMob}
              />
            </Link>
          </nav>
          <img src={logo} alt="Логотип" className={styles.suppliesPage__logo} />
          <div className={styles.suppliesPage__logoMob}>
            <img
              src={reload}
              alt="Обновить данные"
              className={styles.suppliesPage__menuMob}
            />
            <img
              src={documents}
              alt="Документы"
              className={styles.suppliesPage__menuMob}
            />
          </div>
        </div>
        <div className={styles.suppliesPage__container}>
          <div className={styles.suppliesPage__segments}>
            <Segments />
          </div>
          <div className={styles.suppliesPage__content}>
            <h1 className={styles.suppliesPage__title}>Поставки</h1>
            <div className={styles.suppliesPage__actions}>
              <Link
                to="/modal/add-supply/"
                className={styles.suppliesPage__adding}
              >
                <img
                  src={plus}
                  alt="Добавить"
                  className={styles.suppliesPage__addingImg}
                />
                <p className={styles.suppliesPage__addingText}>
                  Добавить поставку
                </p>
              </Link>
              <Search onSearchClear={handleSearchClear} />
            </div>
          </div>
          <SupplyCard currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      </div>
      <Pagination
        pageCount={Math.ceil(supplies.length / 9)}
        onChange={handlePageChange}
        currentPage={currentPage}
      />
      <Outlet />
    </div>
  );
};

export default SuppliesPage;
