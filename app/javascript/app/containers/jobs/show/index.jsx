/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";

import JobsClient from "../../../services/jobs";

const isActive = ({ isCurrent }) => {
  let class_name = "block w-full px-5 py-4 cursor-pointer transition-colors ";
  class_name += isCurrent
    ? "bg-gray-300 font-medium "
    : "text-gray-700 bg-transparent hover:bg-gray-300 hover:bg-opacity-50";
  return { className: class_name };
};

export default function ({ jobId, children }) {
  const jobsClient = new JobsClient(jobId);

  const [state, setState] = useState("loading");
  const [job, setJob] = useState();

  useEffect(() => {
    jobsClient.show().then(({ data }) => {
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
    <div className="mx-auto w-full h-full flex fixed" style={{ top: "55px" }}>
      <div className="w-80 bg-gray-200 flex-shrink-0 h-full">
        {state == "loading" && (
          <div className="w-full h-full py-5">
            <div className="p-5">
              <div className="h-4 w-full mb-3 animate-pulse bg-gray-400 rounded-xl"></div>
              <div className="h-2.5 w-10/12 animate-pulse bg-gray-400 rounded-xl"></div>
            </div>
            <div className="mt-5 p-5">
              <ul>
                <li className="h-4 w-8/12 animate-pulse bg-gray-400 mb-8 rounded-xl"></li>
                <li className="h-4 w-8/12 animate-pulse bg-gray-400 mb-8 rounded-xl"></li>
                <li className="h-4 w-8/12 animate-pulse bg-gray-400 mb-8 rounded-xl"></li>
                <li className="h-4 w-8/12 animate-pulse bg-gray-400 mb-8 rounded-xl"></li>
              </ul>
            </div>
          </div>
        )}
        {state == "loaded" && (
          <div className="w-full h-full">
            <div className="p-5">
              <div className="bg-purple-600 inline-block px-2 py-1 mb-1 rounded text-xs text-white">
                {job.team.name}
              </div>
              <p className="font-medium text-lg">{job.title}</p>
              <p className="">{job.locations[0]?.text}</p>
            </div>
            <div className="mt-5">
              <ul>
                <li>
                  <Link getProps={isActive} to={`/jobs/${jobId}`}>
                    Overview
                  </Link>
                </li>
                <li>
                  <Link getProps={isActive} to={`/jobs/${jobId}/pipeline`}>
                    Pipeline
                  </Link>
                </li>
                <li>
                  <Link getProps={isActive} to={`/jobs/${jobId}/applicants`}>
                    All applicants
                  </Link>
                </li>
                <li>
                  <Link getProps={isActive} to={`/jobs/${jobId}/settings`}>
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
