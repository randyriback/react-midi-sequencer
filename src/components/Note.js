import React, { useContext, useEffect, memo } from "react";
import classNames from "classnames";
import { Context } from "../hooks/useStore";
import "./components.css";
import { MidiContext } from "../hooks/useMidi";
import { WebMidi } from "webmidi";

const Note = ({ trackID, stepID, isNoteOn, isNoteOnCurrentStep }) => {
  const { toggleNote } = useContext(Context);
  const midi = useContext(MidiContext);
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
        midi.setMyNote(channel);
        midi.myNote.playNote(midi.midiNote);
        console.log("mynote (note).js", midi.myNote)
      }
    }
  }, [isNoteOn, isNoteOnCurrentStep]);

  const noteClicked = (e) => {
    e.target.classList.toggle("on");
    toggleNote({ trackID, stepID });
  };

  return <div className={noteClassNames} onClick={noteClicked} />;
};

export default memo(Note);
