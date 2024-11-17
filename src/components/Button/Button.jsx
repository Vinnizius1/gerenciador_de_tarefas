import styles from "./Button.module.css";
import { memo } from "react";

const Button = ({ children, color, type = "button", onClick = null }) => {
  return (
    <button
      type={type}
      style={{ backgroundColor: color }}
      onClick={onClick}
      className={styles.button}
    >
      {children}
    </button>
  );
};

export default memo(Button);
