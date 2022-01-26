import React, { useContext, memo } from 'react'
import { Context } from '../hooks/useStore'
import Track from './Track'

const TrackList = ({ currentStepID }) => {
    const { sequence: { trackList, noteCount } } = useContext(Context)
    const content = trackList.map((track, trackID) => {
        const { onNotes } = track

        return (
            
            <Track
                key={trackID}
                trackID={+trackID}
                currentStepID={currentStepID}
                noteCount={noteCount}
                onNotes={onNotes}
            />
        )
    })

    return (
        <div className="track-list">
            {content}
        </div>
    )
}

export default memo(TrackList)

