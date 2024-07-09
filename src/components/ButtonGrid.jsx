import React from "react";
import styles from "./Container.module.css";

const ButtonGrid = ({ children }) => {
  return <div className={styles.buttonGrid}>{children}</div>;
};

export default ButtonGrid;
