import React, { useContext, memo, useState, useEffect} from 'react'
import { Context } from '../hooks/useStore'
import './components.css'
import { WebMidi } from 'webmidi'

const ToolBar = ({
    setStartTime,
    setPastLapse,
    setBPM,
    isSequencePlaying,
    startTime,
    BPM
}) => {
    const midi = useContext(Context)
    const [disabled, setDisabled] = useState(false);

    function togglePlayback() {
        if (isSequencePlaying) {
            setPastLapse(l => l + performance.now() - startTime)
            setStartTime(null)
        } else {
            setStartTime(performance.now())
        }
    }

    function stopPlayback() {
        setPastLapse(0)
        setStartTime(null)
    }

    function updateBPM(e) {
        setBPM(e.target.value)
    }


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
                 <select
                className="form_element select_device"
                defaultValue={'DEFAULT'}
                onChange={handleChange}
                aria-label="Select Midi Device"
            >
            <option value="DEFAULT" disabled>SELECT MIDI DEVICE</option>
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
             <select
                className="form_element select_midichannel"
                defaultValue={'DEFAULT2'}
                onChange={handleMidi}
                aria-label="Select Midi Channel"
                style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
            >
            <option value="DEFAULT2" disabled>SELECT MIDI CHANNEL</option>
                {
                    [...Array(16)].map((num, id) => {
                        return (
                            <option
                                key={id}
                                value={id+1}
                            >
                                {id+1}
                            </option>
                        )
                    })
                }
            </select>
            <button className="form_element button_stop" onClick={stopPlayback} aria-label="Stop" style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}>
                <svg width="14" height="14" viewBox="0 0 14 14">
                    <rect className="button_icon_path" x="2" y="2" width="10" height="10" />
                </svg>

            </button>
            <button className="form_element button_play_pause" onClick={togglePlayback} aria-label="Play / Pause" style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}>
                <svg width="14" height="14" viewBox="8 8 20 20">
                    {isSequencePlaying && <path className="button_icon_path" id="pause-icon" data-state="playing" d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26" />}
                    {!isSequencePlaying && <path className="button_icon_path" id="play-icon" data-state="paused" d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" />}
                </svg>
            </button>
            <input className="form_element input_bpm" id="bpm" type="text" value={BPM} onChange={updateBPM} style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}/>
            <label className="label_bpm" htmlFor="bpm" style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}>BPM</label>
        </nav>
    )
}

export default memo(ToolBar)
