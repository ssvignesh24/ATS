/** @format */

import React, { useContext } from "react";
import ReactDOM from "react-dom";

export default function ({ currentStep }) {
  const activeCircleClass = (step) => {
    let baseClass = "w-2.5 h-2.5 rounded-full mr-2.5";
    if (currentStep == step) baseClass += " bg-primary-400 ring-4 ring-primary-200";
    else if (currentStep > step) baseClass += " bg-primary-500";
    else baseClass += " bg-gray-400";
    return baseClass;
  };

  const activeTextClass = (step) => {
    if (currentStep == step || currentStep > step) return "text-black font-medium";
    return "text-gray-600";
  };

  return (
    <div className="w-full h-full">
      <ul>
        <li className="py-2 flex items-center">
          <div className={activeCircleClass(1)}></div>
          <div className={activeTextClass(1)}>Basic</div>
        </li>
        <li className="py-2 flex items-center">
          <div className={activeCircleClass(2)}></div>
          <div className={activeTextClass(2)}>Location and other details</div>
        </li>
        <li className="py-2 flex items-center">
          <div className={activeCircleClass(3)}></div>
          <div className={activeTextClass(3)}>Detailed description</div>
        </li>
        <li className="py-2 flex items-center">
          <div className={activeCircleClass(4)}></div>
          <div className={activeTextClass(4)}>Summary</div>
        </li>
      </ul>
    </div>
  );
}
