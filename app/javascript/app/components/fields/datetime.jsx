/** @format */

import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { ThemeContext, themes } from "../../contexts/theme";

const Datetime = function ({ onChange, defaultValue, type, placeholder }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme == themes.dark;

  const [value, setValue] = useState(defaultValue);

  useEffect(() => onChange(value), [value]);

  return (
    <>
      <div
        className={"w-full h-full border  rounded " + (isDark ? "bg-dark-1 text-light" : "bg-white border-gray-200")}>
        <input
          type={type}
          onChange={(e) => setValue(e.target.value)}
          className="border-0 bg-transparent rounded w-full h-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

Datetime.propTypes = {
  onChange: PropTypes.func.isRequired,
  conceal: PropTypes.bool,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

Datetime.defaultProps = {
  conceal: false,
  defaultValue: "",
  type: "datetime-local",
  placeholder: "",
};

export default Datetime;
