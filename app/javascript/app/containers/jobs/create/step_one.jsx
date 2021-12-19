/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import InputTextField from "../../../components/fields/Text";
import TextareaField from "../../../components/fields/Textarea";
import SelectField from "../../../components/fields/Select";

import TeamsClient from "../../../services/teams";

export default function ({ dispatch, job, nextStep }) {
  const teamsClient = new TeamsClient();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [team, setTeam] = useState();
  const [teams, setTeams] = useState([
    { value: 1, name: "Customer support" },
    { value: 2, name: "Engineering" },
    { value: 3, name: "Quality Assurence" },
    { value: 4, name: "Sales" },
  ]);
  const [minExperience, setMinExperience] = useState();
  const [maxExperience, setMaxExperience] = useState();

  useEffect(() => {
    teamsClient.list().then(({ data }) => {
      if (!data.status) return;
      const teams_ = data.teams.map((t) => {
        return { ...t, value: t.id };
      });
      setTeams(teams_);
    });
    return () => teamsClient.cancel();
  }, []);

  const saveAndMove = () => {
    dispatch({ type: "step_one", title, team, summary, minExperience, maxExperience });
    nextStep();
  };

  return (
    <div className="box">
      <div className="w-full p-5">
        <p className="text-lg font-medium mb-4">Basic details</p>
        <hr />
      </div>
      <div className="px-5 pb-5">
        <div className="w-full mb-6">
          <p className="font-medium mb-1 text-gray-700">Job title</p>
          <div className="h-11">
            <InputTextField onChange={setTitle} placeholder="Eg. Full-stack developer" />
          </div>
        </div>

        <div className="w-full mb-6">
          <p className="font-medium mb-1 text-gray-700">Team</p>
          <div className="h-11">
            <SelectField options={teams} onChange={setTeam} />
          </div>
        </div>

        <div className="w-full mb-6">
          <p className="font-medium mb-1 text-gray-700">Experience (in years)</p>
          <div className="h-11 w-full flex">
            <div className="w-6/12 pr-2">
              <InputTextField type="number" onChange={setMinExperience} placeholder="Min. experience" />
            </div>
            <div className="w-6/12 pl-2">
              <InputTextField type="number" onChange={setMaxExperience} placeholder="Max. experience (Optional)" />
            </div>
          </div>
        </div>

        <div className="w-full mb-2">
          <p className="font-medium mb-1.5">Short summary</p>
          <div className="h-28">
            <TextareaField onChange={setSummary} placeholder="Eg. Full-stack developer" />
          </div>
        </div>
      </div>
      <div className="p-6 bg-gray-50 flex flex-row-reverse py-3">
        <button
          className="btn-primary px-3.5 py-1.5"
          disabled={!title || !team || !minExperience}
          onClick={saveAndMove}>
          Next step
        </button>
      </div>
    </div>
  );
}
