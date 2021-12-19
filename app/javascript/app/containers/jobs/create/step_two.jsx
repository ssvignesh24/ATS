/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { XIcon } from "@heroicons/react/outline";

import InputTextField from "../../../components/fields/Text";
import CheckboxField from "../../../components/fields/Checkbox";
import RadioField from "../../../components/fields/Radio";

export default function ({ dispatch, job, nextStep, prevStep }) {
  const degreesList = [
    { value: "diploma", name: "Diploma" },
    { value: "bachelor", name: "Bachelor's degree" },
    { value: "masters", name: "Master's degree" },
    { value: "phd", name: "Ph.D" },
  ];
  const remoteOptions = [
    { value: "no", name: "No remote working options" },
    { value: "partial", name: "Remote within the country" },
    { value: "timezone", name: "Remote within the timezone" },
    { value: "any", name: "Remote from anywhere" },
  ];
  const employmentTypes = [
    { value: "fulltime", name: "Full-time" },
    { value: "partime", name: "Part-time" },
    { value: "inter", name: "Internship" },
    { value: "contract", name: "Contractor" },
  ];
  const [locations, setLocations] = useState([{ city: "", state: "", country: "" }]);
  const [openPositionsCount, setOpenPositionsCount] = useState("");
  const [remote, setRemote] = useState();
  const [employmentType, setEmploymentType] = useState();
  const [degrees, setDegrees] = useState([]);

  const saveAndMove = () => {
    dispatch({ type: "step_two", locations, openPositionsCount, remote, employmentType, degrees });
    nextStep();
  };

  const setCity = (city, location) => {
    setLocations((_locations) => {
      const newLocations = _locations.map((l) => {
        if (l == location) l.city = city;
        return l;
      });
      return newLocations;
    });
  };

  const setState = (state, location) => {
    setLocations((_locations) => {
      const newLocations = _locations.map((l) => {
        if (l == location) l.state = state;
        return l;
      });
      return newLocations;
    });
  };

  const setCountry = (country, location) => {
    setLocations((_locations) => {
      const newLocations = _locations.map((l) => {
        if (l == location) l.country = country;
        return l;
      });
      return newLocations;
    });
  };

  const removeLocation = (location) => {
    if (locations.length == 1) return;
    setLocations((_locations) => locations.filter((l) => l != location));
  };

  return (
    <div className="box">
      <div className="w-full p-5">
        <p className="text-lg font-medium mb-4">Location and other details</p>
        <hr />
      </div>
      <div className="px-5 pb-5">
        <div className="w-full mb-8">
          <p className="font-medium mb-1">Location</p>
          {locations.map((location, n) => {
            return (
              <div className="h-11 w-full flex mb-3" key={n}>
                <div className="w-4/12 pr-2">
                  <input
                    type="text"
                    value={location.city}
                    onChange={(e) => setCity(e.target.value, location)}
                    placeholder="City - Eg. Toronto"
                    className="input-primary border-0 bg-transparent rounded w-full h-full"
                  />
                </div>
                <div className="w-4/12 px-2">
                  <input
                    type="text"
                    value={location.state}
                    onChange={(e) => setState(e.target.value, location)}
                    placeholder="City - Eg. Toronto"
                    className="input-primary border-0 bg-transparent rounded w-full h-full"
                  />
                </div>
                <div className="w-4/12 pl-2">
                  <input
                    type="text"
                    value={location.country}
                    onChange={(e) => setCountry(e.target.value, location)}
                    placeholder="City - Eg. Toronto"
                    className="input-primary border-0 bg-transparent rounded w-full h-full"
                  />
                </div>
                <div className="w-1/12 ml-2">
                  {locations.length > 1 && (
                    <button
                      className="w-11 h-11 rounded-full cursor-pointer hover:bg-red-100 flex items-center justify-center transition-colors"
                      onClick={() => removeLocation(location)}
                      title="Remove this location">
                      <XIcon className="w-5 h-5"></XIcon>
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          <div className="mt-3 mb-5 flex">
            <button
              className="btn-primary w-3/12 py-2"
              onClick={() => setLocations((l) => l.concat({ city: "", state: "", country: "" }))}>
              + Add another location
            </button>
          </div>
        </div>
        <div className="w-full mb-8">
          <p className="font-medium mb-1 ">Remote working policy</p>

          <div className="">
            <RadioField defaultValue={remote} options={remoteOptions} onChange={setRemote} />
          </div>
        </div>
        <div className="w-full mb-8">
          <p className="font-medium mb-1 ">Employemnt type</p>

          <div className="">
            <RadioField defaultValue={employmentType} options={employmentTypes} onChange={setEmploymentType} />
          </div>
        </div>
        <div className="w-full mb-8">
          <p className="font-medium ">No. of open positions</p>
          <p className="text-gray-500 mb-2 text-sm">Please enter 0 if there is no constrain </p>
          <div className="h-11">
            <InputTextField
              type="number"
              defaultValue={openPositionsCount}
              onChange={setOpenPositionsCount}
              placeholder="Eg. 1"
            />
          </div>
        </div>
        <div className="w-full mb-8">
          <p className="font-medium">Degree qualifications</p>
          <p className="text-gray-500 mb-1 text-sm">Please select both required and optional qualifications.</p>
          <div className="h-11">
            <CheckboxField defaultSelected={degrees} onChange={setDegrees} options={degreesList}></CheckboxField>
          </div>
        </div>
      </div>
      <div className="p-6 bg-gray-50 flex flex-row-reverse py-3">
        <button
          className="btn-primary px-3.5 py-1.5"
          disabled={!employmentType || !remote || !openPositionsCount}
          onClick={saveAndMove}>
          Next step
        </button>
        <button className="btn-muted px-3.5 py-1.5 mr-2" onClick={prevStep}>
          Previous step
        </button>
      </div>
    </div>
  );
}
