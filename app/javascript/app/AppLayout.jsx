/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Header from "./header";

export default function ({ children }) {
  return (
    <div className="h-full">
      <Header />
      <div id="stage" className="h-full" style={{ paddingTop: "55px" }}>
        {children}
      </div>
    </div>
  );
}
