import React, { memo, useContext, useState, useEffect } from "react";
import Note from "./Note";
import "./components.css";
import { Context } from "../hooks/useStore";

const Track = ({ trackID, currentStepID, title, noteCount, onNotes }) => {
  const {
    selectMidi,
    sequence: { trackList },
  } = useContext(Context);
  const midiNote = trackList[trackID].midiNote;

  const notes = [...Array(noteCount)].map((el, i) => {
    const isNoteOn = onNotes.indexOf(i) !== -1;
    const isNoteOnCurrentStep = currentStepID === i;
    const stepID = i;

    return (
      <Note
        key={i}
        trackID={trackID}
        stepID={stepID}
        isNoteOn={isNoteOn}
        isNoteOnCurrentStep={isNoteOnCurrentStep}
        midiNote={midiNote}
      />
    );
  });

  const midi = useContext(Context);
  const [disabled, setDisabled] = useState(false)

  const letters = ["A", "B", "C", "D", "E", "F", "G"];
  let newArr = [];
  let letter = letters[0];

  for (let letterIndex = 0; letterIndex < letters.length; letterIndex++) {
    for (let octave = -1; octave < 8; octave++) {
      if (letter === "B" || letter === "E") {
        newArr.push(letter + octave);
      } else {
        newArr.push(letter + octave);
        newArr.push(letter + "#" + octave);
      }
      letter = letters[letterIndex];
    }
  }

  const apiFriendly = (str) => {
    if (str.slice(2, 3) === "-" && str.slice(1, 2) === "#") {
      let newNum = Number(str.slice(-2)) + 1;
      return str.slice(0, 2) + newNum.toString();
    } else if (str.slice(1, 2) === "#") {
      let newNum = Number(str.slice(2, 3)) + 1;
      return str.slice(0, 2) + newNum.toString();
    } else {
      let newNum = Number(str.slice(1)) + 1;
      return str.slice(0, 1) + newNum.toString();
    }
  };

  const handleSelect = (e) => {
    selectMidi({ trackID, midiNote: apiFriendly(e.target.value) });
    console.log(e.target.value, "MIDINOTE!!");
  };

  const deviceCheck = () => {
    if (!midi.midiDevice) {
      setDisabled(true)
    }else{
      setDisabled(false)
    } 
  };
  useEffect(deviceCheck, [midi]);

  return (
    <div className="track" style={disabled ? {pointerEvents: "none", opacity: "0.4"} : {}}>
      <select onChange={handleSelect}>
        {newArr.map((x, index) => (
          <option value={x} key={index}>
            {x}
          </option>
        ))}
      </select>
      <header className="track_title">{title}</header>
      <main className="track_notes">{notes}</main>
    </div>
  );
};

export default memo(Track);
