/** @format */

import pluralize from "pluralize";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";

import JobsClient from "../../services/jobs";
import _ from "lodash";

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
        {state == "loading" && (
          <div className="grid grid-cols-3 gap-4 mt-5">
            {_.times(6, (n) => {
              return (
                <div className="box p-5 cursor-pointer" key={n}>
                  <div className="animate-pulse w-full h-4 mb-3 rounded-xl bg-gray-300"></div>
                  <div className="animate-pulse w-8/12 h-2 rounded-xl bg-gray-300"></div>
                  <hr className="my-5" />
                  <div className="animate-pulse w-full h-2 mb-3 rounded-xl bg-gray-300"></div>
                  <div className="animate-pulse w-full h-2 mb-3 rounded-xl bg-gray-300"></div>
                  <div className="animate-pulse w-10/12 h-2 rounded-xl bg-gray-300"></div>
                </div>
              );
            })}
          </div>
        )}
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
                          <div className="mt-3 max-h-24 overflow-hidden text-ellipsis">
                            {job.summary.substring(0, 180)}
                            {job.summary.length > 180 && "..."}
                          </div>
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
