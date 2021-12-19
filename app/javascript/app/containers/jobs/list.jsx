/** @format */

import pluralize from "pluralize";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";

import JobsClient from "../../services/jobs";

export default function ({ children }) {
  const jobsClient = new JobsClient();
  const [state, setState] = useState("loading");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    jobsClient.list().then(({ data }) => {
      if (!data.status) {
        setState("error");
        return;
      }
      setJobs(data.jobs);
    });
    setState("loaded");
  }, []);

  return (
    <div className="container mx-auto">
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
                <div className="grid grid-cols-3 gap-4 mt-5">
                  {jobs.map((job) => {
                    return (
                      <Link to={`/jobs/${job.id}`} key={job.id}>
                        <div className="box p-5 cursor-pointer">
                          <div className="bg-purple-600 inline-block px-2 py-1 mb-1 rounded text-xs text-white">
                            {job.team.name}
                          </div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm">{job.locations[0]?.text}</p>
                          <hr className="my-3" />
                          <p className="mt-3">{job.summary}</p>
                        </div>
                      </Link>
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
