/** @format */

import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Switch } from "@headlessui/react";

const ToggleSwitch = function ({ defaultState, onChange }) {
  const [enabled, setEnabled] = useState(defaultState);

  useEffect(() => {
    onChange(enabled);
  }, [enabled]);

  return (
    <>
      <Switch.Group>
        <div className="flex items-center">
          <Switch.Label className="mr-4">Enable notifications</Switch.Label>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`bg-gray-200 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}>
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
      </Switch.Group>
    </>
  );
};

ToggleSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultState: PropTypes.bool,
};

ToggleSwitch.defaultProps = {
  defaultState: false,
};

export default ToggleSwitch;
