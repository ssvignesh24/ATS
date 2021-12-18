/** @format */

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";

import AppLayout from "./AppLayout";
import DashboardContainer from "./containers/dashboard/index";
import JobsContainer from "./containers/jobs/index";
import CandidatePoolContainer from "./containers/candidate_pool/index";

export default function () {
  return (
    <Router primary={false}>
      <AppLayout path="/">
        <DashboardContainer path="dashboard"></DashboardContainer>
        <JobsContainer path="jobs"></JobsContainer>
        <CandidatePoolContainer path="candidates"></CandidatePoolContainer>
      </AppLayout>
    </Router>
  );
}
