// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */

import styles from "./Button.module.css"; // Estilos padrão do botão

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

export default Button;
