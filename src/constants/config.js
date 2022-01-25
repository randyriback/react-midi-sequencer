const sequenceList = [
    {
        id: 0,
        title: 'Sequence 1',
        noteCount: 16,
        trackList: [
            {
                title: 'Kick',
                soundFile: 'kick',
                onNotes: [],
            },
            {
                title: 'Snare',
                soundFile: 'snare',
                onNotes: [],
            },
            {
                title: 'Open Hat',
                soundFile: 'hh_open',
                onNotes: [],
            },
            {
                title: 'Closed Hat',
                soundFile: 'hh_closed',
                onNotes: [],
            }
        ]
    },
    {
        id: 1,
        title: 'Sequence 2',
        noteCount: 16,
        trackList: [
            {
                title: 'Kick',
                soundFile: 'kick',
                onNotes: [],
            },
            {
                title: 'Snare',
                soundFile: 'snare',
                onNotes: [],
            },
            {
                title: 'Open Hat',
                soundFile: 'hh_open',
                onNotes: [],
            },
            {
                title: 'Closed Hat',
                soundFile: 'hh_closed',
                onNotes: [],
            }
        ]
    },
    {
        id: 2,
        title: 'Sequence 3',
        noteCount: 16,
        trackList: [
            {
                title: 'Kick',
                soundFile: 'kick',
                onNotes: [0, 4, 8, 12],
            },
            {
                title: 'Snare',
                soundFile: 'snare',
                onNotes: [4, 12],
            },
            {
                title: 'Open Hat',
                soundFile: 'hh_open',
                onNotes: [2, 6, 10, 14],
            },
            {
                title: 'Closed Hat',
                soundFile: 'hh_closed',
                onNotes: [0, 2, 4, 6, 8, 10, 12, 14],
            }
        ]
    },
    {
        id: 3,
        title: 'Sequence 4',
        noteCount: 16,
        trackList: [
            {
                title: 'Kick',
                soundFile: 'kick',
                onNotes: [0, 4, 8, 12],
            },
            {
                title: 'Snare',
                soundFile: 'snare',
                onNotes: [],
            },
            {
                title: 'Open Hat',
                soundFile: 'hh_open',
                onNotes: [],
            },
            {
                title: 'Closed Hat',
                soundFile: 'hh_closed',
                onNotes: [],
            }
        ]
    }
]

const soundFiles = {
    'kick': '/sounds/kick.wav',
    'snare': '/sounds/snare.wav',
    'hh_open': '/sounds/hh_open.wav',
    'hh_closed': '/sounds/hh_closed.wav'
}

export { sequenceList, soundFiles }
