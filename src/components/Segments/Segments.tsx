import React from "react";
import styles from "./Segments.module.scss";

const menuItems = [
  "Поставки",
  "Товары",
  "Цены и скидки",
  "Аналитика",
  "Реклама",
];

const Segments: React.FC = () => {
  return (
    <nav className={styles.nav}>
      {menuItems.map((item, index) => (
        <p key={index} className={styles["nav__item"]}>
          {item}
        </p>
      ))}
    </nav>
  );
};

export default Segments;
