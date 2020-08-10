import React from "react";
import "./styles.css";

const Input = ({ label, name, type, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name}  {...rest} />
    </div>
  );
};

export default Input;
