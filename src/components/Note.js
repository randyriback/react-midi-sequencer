import React, { useContext, useEffect, memo } from "react";
import classNames from "classnames";
import { Context } from "../hooks/useStore";
import "./components.css";
import { WebMidi } from "webmidi";

const Note = ({ trackID, stepID, isNoteOn, isNoteOnCurrentStep, midiNote }) => {
  const { toggleNote } = useContext(Context);
  const midi = useContext(Context);
  const noteClassNames = classNames("note", {
    on: isNoteOn,
    playing: isNoteOn && isNoteOnCurrentStep,
  });

  useEffect(() => {
    if (isNoteOn && isNoteOnCurrentStep) {
      WebMidi.enable()
        .then(onEnabled)
        .catch((err) => alert(err));

      function onEnabled() {
        let myOutput = WebMidi.getOutputByName(midi.midiDevice);
        let channel = myOutput.channels[midi.midiChannel];
        channel.playNote(midiNote)
      }
    }
  }, [isNoteOn, isNoteOnCurrentStep, midiNote, midi.midiChannel, midi.midiDevice]);

  const noteClicked = (e) => {
    e.target.classList.toggle("on");
    toggleNote({ trackID, stepID });
  };

  return <div className={noteClassNames} onClick={noteClicked} />;
};

export default memo(Note);
