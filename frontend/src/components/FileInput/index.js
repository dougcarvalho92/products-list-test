import React from "react";
import "./styles.css";
const noop = () => {};
const FileInput = ({ value, onChange = noop, ...rest }) => (
  <div className="inputfile-block">
    {Boolean(value.length) && (
      <div>Selected files: {value.map((f) => f.name).join(", ")}</div>
    )}
    <label>
      Click to select some files...
      <input
        {...rest}
        style={{ display: "none" }}
        type="file"
        onChange={(e) => {
          onChange([...e.target.files]);
        }}
      />
    </label>
  </div>
);

export default FileInput;
