/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import InputTextField from "../../../components/fields/Text";
import TextareaField from "../../../components/fields/Textarea";
import SelectField from "../../../components/fields/Select";

export default function ({ dispatch, job, nextStep, prevStep }) {
  const [title, setTitle] = useState("");

  console.log(job);

  const saveAndMove = () => {
    nextStep();
  };

  return (
    <div className="box">
      <div className="w-full p-5">
        <p className="text-lg font-medium mb-4">Summary</p>
        <hr />
      </div>
      <div className="px-5 pb-5"></div>
      <div className="p-6 bg-gray-50 flex flex-row-reverse py-3">
        <button className="btn-primary px-3.5 py-1.5" disabled={false} onClick={saveAndMove}>
          Create job
        </button>
        <button className="btn-muted px-3.5 py-1.5 mr-2" disabled={false} onClick={prevStep}>
          Previous step
        </button>
      </div>
    </div>
  );
}
