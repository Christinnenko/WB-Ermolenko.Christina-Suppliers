import React, { useState } from "react";
import styles from "./Segments.module.css";

const menuItems = [
  "Поставки",
  "Товары",
  "Цены и скидки",
  "Аналитика",
  "Реклама",
];

const Segments: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <nav className={styles.nav}>
      {menuItems.map((item, index) => (
        <p
          key={index}
          className={`${styles["nav__item"]} ${
            activeIndex === index ? styles.active : ""
          }`}
          onClick={() => handleItemClick(index)}
        >
          {item}
        </p>
      ))}
    </nav>
  );
};

export default Segments;
