/** @format */

import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import { Link, Redirect } from "@reach/router";

import Progress from "./progress";
import StepOne from "./step_one";
import StepTwo from "./step_two";
import StepThree from "./step_three";
import StepFour from "./step_four";

const jobReducer = (state, action) => {
  switch (action.type) {
    case "step_one":
      return {
        ...state,
        title: action.title,
        summary: action.summary,
        team: action.team,
        maxExperience: action.maxExperience,
        minExperience: action.minExperience,
      };
    case "step_two":
      return {
        ...state,
        locations: action.locations,
        openPositionsCount: action.openPositionsCount,
        remote: action.remote,
        employmentType: action.employmentType,
        degrees: action.degrees,
      };
    case "step_three":
      return {
        ...state,
        description: action.description,
      };
  }
};

export default function ({ children }) {
  const [state, setState] = useState("ready");
  const [currentStep, setCurrentStep] = useState(1);
  const [job, jobDispatch] = useReducer(jobReducer, {});

  return (
    <div className="container mx-auto">
      {state == "created" && <Redirect to="/checkin" noThrow />}
      <div className="w-10/12 mx-auto">
        <div className="py-3 px-3 flex">
          <div className="w-3/12x h-1"></div>
          <div className="w-9/12 ">
            <p className="text-xl font-medium">Create Job</p>
          </div>
        </div>

        <div className="flex px-3 mt-3 mb-10">
          <div className="w-3/12">
            <Progress currentStep={currentStep}></Progress>
          </div>
          <div className="w-9/12">
            {currentStep == 1 && (
              <StepOne job={job} dispatch={jobDispatch} nextStep={() => setCurrentStep(2)}></StepOne>
            )}
            {currentStep == 2 && (
              <StepTwo
                job={job}
                dispatch={jobDispatch}
                nextStep={() => setCurrentStep(3)}
                prevStep={() => setCurrentStep(1)}></StepTwo>
            )}
            {currentStep == 3 && (
              <StepThree
                job={job}
                dispatch={jobDispatch}
                nextStep={() => setCurrentStep(4)}
                prevStep={() => setCurrentStep(2)}></StepThree>
            )}
            {currentStep == 4 && (
              <StepFour
                job={job}
                dispatch={jobDispatch}
                nextStep={() => {}}
                prevStep={() => setCurrentStep(3)}></StepFour>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
