/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function ({ children }) {
  return (
    <div className="h-full">
      Candidate pool
      {children}
    </div>
  );
}
