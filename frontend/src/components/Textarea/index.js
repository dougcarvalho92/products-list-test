import React from "react";
import "./styles.css";

const Textarea = ({ label, name, ...rest }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} {...rest} />
    </div>
  );
};

export default Textarea;
