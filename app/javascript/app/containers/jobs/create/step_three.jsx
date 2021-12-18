/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import InputTextField from "../../../components/fields/Text";
import TextareaField from "../../../components/fields/Textarea";
import SelectField from "../../../components/fields/Select";
import { TrixEditor } from "react-trix";

export default function ({ dispatch, job, nextStep, prevStep }) {
  const [description, setDescription] = useState("");

  const saveAndMove = () => {
    dispatch({ type: "step_three", description });
    nextStep();
  };

  const handleEditorReady = (editor) => {};

  const handleChange = (html, text) => {
    setDescription(html);
  };

  return (
    <div className="box">
      <div className="w-full p-5">
        <p className="text-lg font-medium mb-4">Detailed summary</p>
        <hr />
      </div>
      <div className="px-5 pb-5">
        <TrixEditor onChange={handleChange} onEditorReady={handleEditorReady} />
      </div>
      <div className="p-6 bg-gray-50 flex flex-row-reverse py-3">
        <button className="btn-primary px-3.5 py-1.5" disabled={false} onClick={saveAndMove}>
          Next step
        </button>
        <button className="btn-muted px-3.5 py-1.5 mr-2" disabled={false} onClick={prevStep}>
          Previous step
        </button>
      </div>
    </div>
  );
}
