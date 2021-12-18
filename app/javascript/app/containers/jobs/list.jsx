/** @format */

import { Link } from "@reach/router";
import pluralize from "pluralize";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function ({ children }) {
  const [state, setState] = useState("loading");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs([{ id: 3, title: "Software engineer III", location: "Chennai, India", experience: [2, null] }]);
    setState("loaded");
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex">
        <div className="w-6/12">
          <p className="font-medium text-xl">All Jobs</p>
          {state == "loading" && <p className="text-sm text-gray-500">Loading jobs...</p>}
          {state == "loaded" && (
            <p className="text-sm text-gray-500 font-medium">{pluralize("Job", jobs.length, true)}</p>
          )}
        </div>
        <div className="w-6/12 flex flex-row-reverse">
          <div>
            <Link to="/jobs/create">
              <button className="btn-primary px-3.5 py-1.5">Create a job</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full">
        {state == "loaded" && (
          <>
            {jobs.length > 0 && (
              <>
                <div className="grid grid-cols-4 gap-4 mt-5">
                  {jobs.map((job) => {
                    return (
                      <div className="box p-5 cursor-pointer" key={job.id}>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm">{job.location}</p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
