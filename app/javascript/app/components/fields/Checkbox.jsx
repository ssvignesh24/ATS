/** @format */
/** @format */

import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CheckIcon } from "@heroicons/react/solid";

const Radio = function ({ onChange, options, defaultSelected }) {
  const [selected, setSelected] = useState(defaultSelected);

  const addSelected = (option) => {
    if (selected.find((s) => s.value == option.value))
      setSelected((_selected) => _selected.filter((s) => s.value != option.value));
    else setSelected((_selected) => _selected.concat(option));
  };

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <>
      <div className="w-full h-full flex flex-wrap">
        {options.map((option) => {
          const alreadySelected = selected.find((s) => s.value == option.value);
          return (
            <div
              key={option.value}
              onClick={() => addSelected(option)}
              className="h-10 flex transition-colors items-center mr-2 hover:bg-primary-500 hover:bg-opacity-10 cursor-pointer rounded pl-1.5 pr-3 py-1.5">
              <div className="w-8 h-8 mr-1 flex-shrink-0 p-1">
                <div
                  className={
                    "w-full h-full rounded border transition-colors flex items-center justify-center " +
                    (alreadySelected ? "border-primary-500 bg-primary-500 " : "border-gray-300")
                  }>
                  {alreadySelected && <CheckIcon className="w-4 h-4 text-white"></CheckIcon>}
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
  defaultSelected: PropTypes.array,
};

Radio.defaultProps = {
  defaultSelected: [],
};

export default Radio;
