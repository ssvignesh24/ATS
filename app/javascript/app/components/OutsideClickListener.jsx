/** @format */

import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function useOutsideListener(ref, onClick) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function OutsideClickListener(props) {
  const wrapperRef = useRef(null);
  useOutsideListener(wrapperRef, props.onClick);

  return <div ref={wrapperRef}>{props.children}</div>;
}

OutsideClickListener.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OutsideClickListener;
