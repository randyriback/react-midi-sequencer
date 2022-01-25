import React, { createContext, useState } from "react";

export const MidiContext = createContext();

export const MidiProvider = ({ children }) => {
  const [midiDevice, setMidiDevice] = useState("");
  const [midiNote, setMidiNote] = useState(["A1", "B2", "C3"]);
  const [midiChannel, setMidiChannel] = useState(1);
  const [myNote, setMyNote] = useState({})

  return (
    <MidiContext.Provider
      value={{
        midiDevice,
        setMidiDevice,
        midiNote,
        setMidiNote,
        midiChannel,
        setMidiChannel,
        myNote,
        setMyNote
      }}
    >
      {children}
    </MidiContext.Provider>
  );
};