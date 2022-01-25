import React, { memo, useContext, useState, useEffect } from "react";
import Note from "./Note";
import "./components.css";
import { WebMidi } from "webmidi";
import { MidiContext } from "../hooks/useMidi";

const Track = ({
  trackID,
  currentStepID,
  title,
  noteCount,
  onNotes,
  soundFilePath,
}) => {

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
      />
    );
  });

  const midi = useContext(MidiContext);

  const letters = ["A", "B", "C", "D", "E", "F", "G"];
  let newArr = [];
  let letter = letters[0];

  for (let letterIndex = 0; letterIndex < letters.length; letterIndex++) {
    for (let octave = -2; octave < 9; octave++) {
      if (letter === "B" || letter === "E") {
        newArr.push(letter + octave);
      } else {
        newArr.push(letter + octave);
        newArr.push(letter + "#" + octave);
      }
      letter = letters[letterIndex];
    }
  }

  console.log(newArr)

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
    midi.setMidiNote(e.target.value);
    midi.setMidiChannel(1);
  };

  const deviceCheck = () => {
    if (!midi.midiDevice) {
      console.log("aw! no device selected");
    } else {
      WebMidi.enable()
        .then(onEnabled)
        .catch((err) => alert(err));

      function onEnabled() {
        let myOutput = WebMidi.getOutputByName(midi.midiDevice);
        let channel = myOutput.channels[midi.midiChannel];
        midi.setMyNote(channel)
        console.log("mynote (track).js", midi.myNote)
      }
    }
  };

  useEffect(deviceCheck, [midi]);

  return (
    <div className="track">
      <select onChange={handleSelect}>
        {newArr.map((x, index) => (
          <option value={x} key={index}>
            {x}
          </option>
        ))}
      </select>
      <header className="track_title">{title}</header>
      <p>{midi.midiNote}</p>
      <main className="track_notes">{notes}</main>
    </div>
  );
};

export default memo(Track);
