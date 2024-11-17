import { memo } from "react";

import styles from "./Button.module.css";

const Button = ({
  children,
  color,
  type = "button",
  onClick = null,
  className,
}) => {
  return (
    <button
      type={type}
      style={{ backgroundColor: color }}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default memo(Button);
