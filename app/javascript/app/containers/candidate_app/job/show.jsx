/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import JobsClient from "../../../services/jobs";

export default function ({ slug }) {
  const jobsClient = new JobsClient();

  const [state, setState] = useState("loading");
  const [job, setJob] = useState();

  useEffect(() => {
    jobsClient.details(slug).then(({ data }) => {
      if (!data.status) {
        setState("error");
        return;
      }
      setJob(data.job);
      setState("loaded");
    });
    return () => jobsClient.cancel();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="w-7/12 py-10 mx-auto">
        {state == "loaded" && (
          <>
            <h1 className="text-4xl font-bold">{job.title}</h1>
            <p>{job.locations[0]?.text}</p>
            <div className="flex mt-2">
              <div className="bg-purple-600 text-white px-2.5 py-1 text-sm rounded">{job.team.name}</div>
              <div className="bg-purple-600 text-white px-2.5 py-1 text-sm rounded ml-3">{job.employmentTypeText}</div>
              <div className="bg-purple-600 text-white px-2.5 py-1 text-sm rounded ml-3">{job.experienceText}</div>
            </div>
            <div className="mt-5" dangerouslySetInnerHTML={{ __html: job.description?.body }}></div>
            <div className="my-3">
              <button className="btn-primary px-5 py-2">Apply for this job</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
