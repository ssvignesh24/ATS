/** @format */

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";

import AppLayout from "./containers/candidate_app/index";
import JobPage from "./containers/candidate_app/job/show";

export default function () {
  return (
    <Router primary={false}>
      <AppLayout path="/">
        <JobPage path="job/:slug"></JobPage>
      </AppLayout>
    </Router>
  );
}
