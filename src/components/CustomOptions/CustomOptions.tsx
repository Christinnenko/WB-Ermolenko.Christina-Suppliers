import React from "react";
import styles from "./CustomOptions.module.css";

interface CustomOptionProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  customStyles?: React.CSSProperties;
}

const CustomOptions: React.FC<CustomOptionProps> = ({ options, onChange }) => {
  return (
    <div className={styles.сustomOptions}>
      <ul className={styles.сustomOptions__list}>
        {options.map((option, index) => (
          <li
            key={index}
            className={styles.сustomOptions__option}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomOptions;
