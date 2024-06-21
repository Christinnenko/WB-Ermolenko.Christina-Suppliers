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
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import { RootState } from "../../store/store";

const SuppliesPage: React.FC = () => {
  const supplies = useSelector((state: RootState) => state.supplies.supplies);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
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
              <Search />
            </div>
          </div>
          <SupplyCard currentPage={currentPage} onPageChange={setCurrentPage} />
          <Pagination
            pageCount={Math.ceil(supplies.length / 9)}
            onChange={handlePageChange}
          />
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default SuppliesPage;
