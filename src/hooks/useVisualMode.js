// import React from "react";
import { useState } from "react";

const useVisualMode = (initMode) => {
  const [mode, setMode] = useState(initMode);
  const [prevMode, setPrevMode] = useState([]);

  console.log({mode});
  console.log({prevMode});

  const transition = (nextMode, doReplace, errors) => {
    if(!doReplace) { // if replace, skip saving current mode
    // prevMode is an array and remains the same and
    // does not change as far as react state is concerned,
    // only the value at the location addressed by
    // the array member gets updated
    // This is specifically done to AVOID
    // triggering re-render on updating this
    // The main state in VisualMode is mode
    prevMode.push(mode);
  }
  // mode state is a single string,
  // the backMode string updates it
  setMode(prev => nextMode)
};

const back = () => {
  if (!prevMode.length) {
    return;
  }

  // prevMode is an array and remains the same and
  // does not change as far as react state is concerned,
  // only the value at the location addressed by
  // the array member gets updated
  // This is specifically done to AVOID
  // triggering re-render on updating this
  // The main state in VisualMode is mode
    const backMode = prevMode.pop();

    // mode state is a single string,
    // the backMode string updates it
    setMode(prev => backMode);
  };


  return { mode, transition, back };
};

export default useVisualMode ;