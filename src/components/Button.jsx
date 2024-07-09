import React from "react";
import styles from "./Container.module.css";

const Button = ({ label, type, onClick, theme }) => {
  const isOrangeOperator = ["÷", "×", "-", "+", "="].includes(label);
  const isNumber = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
  ].includes(label);
  const isRadButton = label === "Rad";
  const buttonClass = `
    ${styles.button} 
    ${styles[type]} 
    ${styles[theme]} 
    ${label === "0" ? styles.zero : ""}
    ${isNumber ? styles.number : ""}
    ${isOrangeOperator ? styles.orangeOperator : ""}
    ${isRadButton ? styles.radButton : ""}
  `;

  return (
    <button className={buttonClass} onClick={() => onClick(label, type)}>
      {label}
    </button>
  );
};

export default Button;
