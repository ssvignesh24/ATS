/** @format */
/** @format */

import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CheckIcon } from "@heroicons/react/solid";

const Radio = function ({ onChange, options, defaultSelected }) {
  const [selected, setSelected] = useState(defaultSelected);

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <>
      <div className="w-full h-full flex flex-wrap">
        {options.map((option) => {
          return (
            <div
              key={option.value}
              onClick={() => setSelected(option)}
              className="h-10 flex transition-colors items-center mr-2 hover:bg-primary-500 hover:bg-opacity-10 cursor-pointer rounded pl-1.5 pr-3 py-1.5">
              <div className="w-8 h-8 flex-shrink-0 p-1">
                <div
                  className={
                    "w-full h-full rounded-full mr-1 border transition-colors flex items-center justify-center " +
                    (selected?.value == option.value ? "border-primary-500 bg-primary-500 " : "border-gray-300")
                  }>
                  {selected?.value == option.value && <CheckIcon className="w-4 h-4 text-white"></CheckIcon>}
                </div>
              </div>
              {option.name}
            </div>
          );
        })}
      </div>
    </>
  );
};

Radio.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  defaultSelected: PropTypes.object,
};

Radio.defaultProps = {};

export default Radio;
