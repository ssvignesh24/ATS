/** @format */

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";

import AppLayout from "./AppLayout";

export default function () {
  return (
    <Router primary={false}>
      <AppLayout path="/"></AppLayout>
    </Router>
  );
}
