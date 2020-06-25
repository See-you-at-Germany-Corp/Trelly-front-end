const initState = [
    {
        id: 0,
        name: '//sampleboard//',
        picture: '#cccccc',
        starred_id: 0
    },
    {
        id: 2,
        name: 'KMITL',
        picture: 'dodgerblue',
        starred_id: 1
    },
    {
        id: 3,
        name: 'ICUTMYHAIRBECAUSEYOUDONTCAREMYHEART',
        picture: 'palevioletred',
        starred_id: 2
    },
    {
        id: 1,
        name: 'Trelly',
        picture: 'indianred',
        starred_id: 3
    },
    {
        id: 4,
        name: 'Meo Germany',
        picture: 'forestgreen',
        starred_id: 4
    }
]

export default (state = initState, action) => {
    switch (action.type) {
        case 'STAR_BOARD':
            const newState = [...state];
            newState.push(action.boardData);
            const starIndex = newState.findIndex(data => data.id === action.boardId)

            newState[starIndex] = {...newState[starIndex], starred_id: 0};

            if (starIndex >= 0) { 
                let maxStarredId = 0;
                /// search max starred_id.
                newState.map(state => {
                    if (state.starred_id > maxStarredId)
                        maxStarredId = state.starred_id;
                    return ({});
                })

                newState[starIndex].starred_id = maxStarredId + 1;

                /// post to backend.
            }

            return newState;

        case 'UNSTAR_BOARD':
            const newState2 = [...state];
            const delIndex = newState2.findIndex(data => data.id === action.boardId)
            
            if (delIndex >= 0) {
                newState2.splice(delIndex, 1);

                /// post to backend.
            } 

            return newState2;

        case 'SET_STAR_ID':
            const newState3 = [...state];
            const index = state.findIndex(data => data.id === action.boardId)

            if (index >= 0) {
                newState3[index].starred_id = action.starId;

                /// post to backend.
            }

            return newState3;

        case 'CHANGE_STAR_NAME':
            const newState4 = [...state];
            const changeIndex = state.findIndex(data => data.id === action.boardId)

            if (changeIndex >= 0) {
                newState4[changeIndex].name = action.name;

                /// post to backend.
            }

            return newState4;

        case 'CHANGE_PICTURE_STARRED':
            const newState5 = [...state];
            const changePicIndex = state.findIndex(data => data.id === action.boardId)

            if (changePicIndex >= 0) {
                newState5[changePicIndex].picture = action.picture;

                /// post to backend.
            }

            return newState5;

        case 'OVERWRITE_STAR_BOARD':
            return action.newState;

        default:
            return state;
    }
}