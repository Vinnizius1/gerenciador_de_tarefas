// Desativando a regra eslint para prop-types neste arquivo
/* eslint-disable react/prop-types */

const Button = ({ children, color, type, onClick = null }) => {
  return (
    <button type={type} style={{ backgroundColor: color }} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
