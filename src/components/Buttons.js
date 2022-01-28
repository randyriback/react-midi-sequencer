import React, { useContext, memo, useState, useEffect } from "react";
import { Context } from "../hooks/useStore";
import "./components.css";

const Buttons = ({
  setStartTime,
  setPastLapse,
  setBPM,
  isSequencePlaying,
  startTime,
  BPM,
}) => {
  const midi = useContext(Context);
  const [disabled, setDisabled] = useState(false);

  function togglePlayback() {
    if (isSequencePlaying) {
      setPastLapse((l) => l + performance.now() - startTime);
      setStartTime(null);
    } else {
      setStartTime(performance.now());
    }
  }

  function stopPlayback() {
    setPastLapse(0);
    setStartTime(null);
  }

  function updateBPM(e) {
    setBPM(e.target.value);
  }

  const deviceCheck = () => {
    if (!midi.midiDevice) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  useEffect(deviceCheck, [midi]);

  return (
      <div className="bpmandbutton">
    <div className="buttons">
          <button
        className="button"
        onClick={togglePlayback}
        aria-label="Play / Pause"
        style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
      >
        <svg width="14" height="14" viewBox="8 8 20 20">
          {isSequencePlaying && (
            <path
              className="button_icon_path"
              id="pause-icon"
              data-state="playing"
              d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26"
            />
          )}
          {!isSequencePlaying && (
            <path
              className="button_icon_path"
              id="play-icon"
              data-state="paused"
              d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28"
            />
          )}
        </svg>
      </button>
      <button
        className="button"
        onClick={stopPlayback}
        aria-label="Stop"
        style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
      >
        <svg width="14" height="14" viewBox="0 0 14 14">
          <rect
            className="button_icon_path"
            x="2"
            y="2"
            width="10"
            height="10"
          />
        </svg>
      </button>
      <button
        className="button"
        aria-label="Stop"
        style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
      >
        {BPM}
      </button>
    </div>
    <div className="bpmdiv">
      <input
        className="bpmSelect"
        min="20" max="220"
        id="bpm"
        type="range"
        value={BPM}
        onChange={updateBPM}
        style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
      />
    </div>
    </div>
  );
};

export default memo(Buttons);
