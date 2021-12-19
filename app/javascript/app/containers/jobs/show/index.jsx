/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from "@heroicons/react/solid";

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
  const [menuState, setMenuState] = useState("open");
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
      <div
        className={
          "bg-gray-200 flex-shrink-0 h-full relative transition-[width]  " + (menuState == "open" ? "w-80" : "w-10")
        }>
        <div
          className="w-10 h-10 cursor-pointer rounded-full bg-white shadow border border-gray-200 absolute flex items-center justify-center "
          onClick={() =>
            setMenuState((currentState) => {
              if (currentState == "closed") return "open";
              else return "closed";
            })
          }
          style={{ top: "15px", right: "-1rem" }}>
          {menuState == "open" && <ChevronLeftIcon className="w-6 h-6 text-gray-700"></ChevronLeftIcon>}
          {menuState == "closed" && <ChevronRightIcon className="w-6 h-6 text-gray-700"></ChevronRightIcon>}
        </div>
        {state == "loading" && (
          <div className="w-full overflow-x-hidden">
            <div className="w-80 h-full py-5">
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
          </div>
        )}
        {state == "loaded" && (
          <div className="w-full overflow-x-hidden">
            <div className="w-80 h-full">
              <div className="p-5">
                <div className="bg-purple-600 inline-block px-2 py-1 mb-1 rounded text-xs text-white">
                  {job.team.name}
                </div>
                <p className="font-medium text-lg">{job.title}</p>
                <p className="">{job.locations[0]?.text}</p>
                <a href={`/job/${job.slug}`} target="_blank">
                  <div className="flex text-primary-700 items-center mt-2 hover:underline">
                    <p className="text-sm font-medium">Preview job</p>
                    <ExternalLinkIcon className="w-4 h-4"></ExternalLinkIcon>
                  </div>
                </a>
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
          </div>
        )}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
