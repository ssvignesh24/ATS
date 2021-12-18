/** @format */

import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { SelectorIcon, XIcon } from "@heroicons/react/solid";

import OutsideClickListener from "../OutsideClickListener";

const Select = function ({ options, onChange, multi, defaultSelected }) {
  let initialValue = null;

  if (defaultSelected)
    if (multi)
      if (defaultSelected?.constructor?.name != "Array") initialValue = [defaultSelected];
      else initialValue = defaultSelected;
    else initialValue = defaultSelected;
  else if (multi) initialValue = [];

  const [selected, setSelected] = useState(initialValue);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (!multi && !selected?.value) {
      onChange(null);
      return;
    }
    onChange(selected);
  }, [selected]);

  const chooseOption = (option) => {
    setShowOptions(false);
    if (multi) {
      if (selected && selected.find((o) => o.value == option.value)) return;
      setSelected((s) => s.concat(option));
    } else setSelected(option);
  };

  const removeSelectedOption = (event, option) => {
    event.stopPropagation();
    if (!multi) return;
    setSelected((_selected) => _selected.filter((s) => s.value != option.value));
  };

  const closeOptions = () => {
    setShowOptions(false);
  };

  return (
    <OutsideClickListener onClick={closeOptions}>
      <div className="relative w-full">
        <div
          className={
            "relative w-full  border pl-3 pr-12 border-gray-300 bg-transparent rounded w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer " +
            (!multi && " h-11 py-2 ") +
            (multi && " pt-2")
          }
          style={{ minHeight: multi ? "2.5rem" : "auto" }}
          onMouseUp={() => {
            setShowOptions((s) => !s);
          }}>
          {multi && (
            <div className="flex flex-wrap">
              {selected &&
                selected.length > 0 &&
                selected
                  .filter((s) => s.value)
                  .map((s) => {
                    return (
                      <div
                        key={s.value}
                        className="flex items-center mr-2 mb-2 rounded text-sm bg-green-500 bg-opacity-20 px-3 py-2">
                        {s.name}
                        <div
                          className="flex justify-center items-center h-full right-0 top: 0 pl-2.5"
                          onMouseUp={(e) => removeSelectedOption(e, s)}>
                          <XIcon className={"s-3 h-3 text-gray-700"}></XIcon>
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}
          {multi && (selected?.length <= 0 || !selected) && "Select"}
          {!multi && selected && selected.name}
          {!multi && !selected && "Select"}
          <div className="absolute flex items-center justify-center h-10 w-10 right-0 top-0 ">
            <SelectorIcon className="w-5 h-5 text-gray-500"></SelectorIcon>
          </div>
        </div>
        {showOptions && (
          <div
            className={
              "w-full absolute max-h-48 shadow rounded left-0 text-sm overflow-x-hidden overflow-y-auto bg-white text-gray-900"
            }
            style={{ top: "102%" }}>
            <ul>
              {/* <li className="w-full h-10 px-3 py-3 text-gray-500">Searching...</li> */}
              {options.map((option) => {
                return (
                  <li
                    key={option.value}
                    onClick={() => chooseOption(option)}
                    className={"w-full h-10 px-3 py-3  cursor-pointer  transition-colors hover:bg-gray-100"}>
                    {option.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </OutsideClickListener>
  );
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  searchUrl: PropTypes.string,
  multi: PropTypes.bool,
  conceal: PropTypes.bool,
  defaultSelected: PropTypes.object,
};

Select.defaultProps = {
  options: [],
  multi: false,
  conceal: false,
};
export default Select;
