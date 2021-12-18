/** @format */

import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const TextArea = function ({ type, placeholder, defaultValue, onChange }) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => onChange(value), [value]);

  return (
    <>
      <div className={"w-full h-full"}>
        <textarea
          onChange={(e) => setValue(e.target.value)}
          className="input-primary border-0 bg-transparent rounded w-full h-full resize-none"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

TextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  conceal: PropTypes.bool,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

TextArea.defaultProps = {
  conceal: false,
  defaultValue: "",
  type: "text",
  placeholder: "",
};

export default TextArea;
