/** @format */

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";

import AppLayout from "./AppLayout";
import DashboardContainer from "./containers/dashboard/index";
import JobsContainer from "./containers/jobs/index";
import JobsCreate from "./containers/jobs/create/index";
import JobsList from "./containers/jobs/list";
import JobsShow from "./containers/jobs/show/index";
import JobsOverview from "./containers/jobs/show/overview";
import JobsPipeline from "./containers/jobs/show/pipeline";
import JobsSettings from "./containers/jobs/show/settings";
import JobsApplicants from "./containers/jobs/show/applicants";

import CandidatePoolContainer from "./containers/candidate_pool/index";

export default function () {
  return (
    <Router primary={false}>
      <AppLayout path="/">
        <DashboardContainer path="dashboard"></DashboardContainer>
        <JobsContainer path="jobs">
          <JobsList path="/" default></JobsList>
          <JobsCreate path="/create"></JobsCreate>
          <JobsShow path="/:jobId">
            <JobsOverview path="/" default></JobsOverview>
            <JobsPipeline path="pipeline"></JobsPipeline>
            <JobsSettings path="settings"></JobsSettings>
            <JobsApplicants path="applicants"></JobsApplicants>
          </JobsShow>
        </JobsContainer>
        <CandidatePoolContainer path="candidates"></CandidatePoolContainer>
      </AppLayout>
    </Router>
  );
}
