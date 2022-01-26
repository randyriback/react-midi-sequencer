import React, { useReducer, createContext, useState } from 'react'

const sequenceList =
    {
        noteCount: 16,
        trackList: [
            {
            
                onNotes: [],
                midiNote: "A-1"
            },
            {
                onNotes: [],
                midiNote: "A-1"
            },
            {

                onNotes: [],
                midiNote: "A-1"
            },
            {
                onNotes: [],
                midiNote: "A-1"

            }
        ]
    }

const Context = createContext({
    sequence: {},
    toggleNote: () => { },
})

const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MIDINOTE':
            let newMidiList = state.trackList.map((track, trackID) => {
                if (action.trackID === trackID) {
                    return {
                        ...track,
                        midiNote: action.value
                    }
                } else {
                    return track
                }
            })
            return {
                ...state,
                trackList: newMidiList
            }
        case 'SET_ON_NOTES':
            let newTrackList = state.trackList.map((track, trackID) => {
                if (action.trackID === trackID) {
                    return {
                        ...track,
                        onNotes: action.value
                    }
                } else {
                    return track
                }
            })
            return {
                ...state,
                trackList: newTrackList
            }
        default:
            return state
    }
}

const Provider = ({ children }) => {
    const [sequence, dispatch] = useReducer(appReducer, { ...sequenceList })
    const [midiDevice, setMidiDevice] = useState("");
  const [midiChannel, setMidiChannel] = useState(1);
  const [myNote, setMyNote] = useState({})
    const toggleNote = ({ trackID, stepID }) => {
        let newOnNotes
        const onNotes = sequence.trackList[trackID].onNotes

        if (onNotes.indexOf(stepID) === -1) {
            newOnNotes = [...onNotes, stepID]
        } else {
            newOnNotes = onNotes.filter(col => col !== stepID)
        }
        dispatch({
            type: 'SET_ON_NOTES',
            value: newOnNotes,
            trackID
        })
    }

    const selectMidi = ( { trackID, midiNote } ) => {

        dispatch({
            type: 'SET_MIDINOTE', 
            value: midiNote,
            trackID
        })

    }


    return (
        <Context.Provider value={{ sequence, toggleNote, selectMidi, midiDevice,
        setMidiDevice,
        midiChannel,
        setMidiChannel,
        myNote,
        setMyNote }}>
            {children}
        </Context.Provider>
    )
}

export {
    Provider,
    Context
}
