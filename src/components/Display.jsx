import React from "react";
import styles from "./Container.module.css";

const Display = ({ value, theme }) => {
  return <div className={`${styles.display} ${styles[theme]}`}>{value}</div>;
};

export default Display;
