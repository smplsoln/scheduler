import React from "react";
import { useState } from "react";

const useVisualMode = (initMode) => {
  const [mode, setMode] = useState(initMode);
  const [prevMode, setPrevMode] = useState([]);

  console.log({mode});
  console.log({prevMode});

  const transition = (nextMode, doReplace) => {
    if(!doReplace) { // if replace, skip saving current mode
      prevMode.push(mode);
    }
    setMode(nextMode);
  };

  const back = () => {
    if (!prevMode.length) {
      return;
    }
    setMode(prevMode.pop());
  };


  return { mode, transition, back };
};

export default useVisualMode ;