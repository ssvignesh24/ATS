/** @format */

import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Text = function ({ type, placeholder, defaultValue, onChange }) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => onChange(value), [value]);

  return (
    <>
      <div className={"w-full h-full"}>
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input-primary border-0 bg-transparent rounded w-full h-full"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

Text.propTypes = {
  onChange: PropTypes.func.isRequired,
  conceal: PropTypes.bool,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

Text.defaultProps = {
  conceal: false,
  defaultValue: "",
  type: "text",
  placeholder: "",
};

export default Text;
