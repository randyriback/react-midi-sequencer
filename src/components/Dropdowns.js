import React, { useContext, memo, useState, useEffect} from 'react'
import { Context } from '../hooks/useStore'
import './components.css'
import { WebMidi } from 'webmidi'

const Dropdowns = () => {
    const midi = useContext(Context)
    const [disabled, setDisabled] = useState(false);

    const [midiOuts, setMidiOuts] = useState([])

         WebMidi.enable()
    .then(() => setMidiOuts(WebMidi.outputs))
    .catch(err => console.log(err));

      const deviceCheck = () => {
    if (!midi.midiDevice) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  useEffect(deviceCheck, [midi]);


    const handleChange = (e) => {
        midi.setMidiDevice(e.target.value)
    }

    const handleMidi = (e) => {
        midi.setMidiChannel(e.target.value)
    }

    return (
        <nav className="toolbar">
        <div className="selectdiv">
                <select
                className="select"
                defaultValue={'DEFAULT'}
                onChange={handleChange}
                aria-label="Select Midi Device"
            >
            <option value="DEFAULT" disabled>Select MIDI Device</option>
                {
                    midiOuts.map(out => {
                        return (
                            <option
                                key={out.id}
                                value={out.name}
                            >
                                {out.name}
                            </option>
                        )
                    })
                }
            </select>
            </div>
            <div className="selectdiv">

             <select
                className="select"
                defaultValue={'DEFAULT2'}
                onChange={handleMidi}
                aria-label="Select Midi Channel"
                style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
            >
            <option value="DEFAULT2" disabled>Channel 1 [Default]</option>
                {
                    [...Array(16)].map((num, id) => {
                        return (
                            <option
                                key={id}
                                value={id+1}
                            >
                                Channel {id+1}
                            </option>
                        )
                    })
                }
            </select>
            </div>
        </nav>
    )
}

export default memo(Dropdowns)
