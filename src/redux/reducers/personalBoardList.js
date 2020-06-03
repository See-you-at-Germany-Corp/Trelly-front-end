/// get board list data from backend.
/// set it to initial state.

/// mockup initState.
const initState = [
    {
        id: 0,
        name: 'Trelly',
        background: 'lightPink',
        starred: false
    },
    {
        id: 1,
        name: 'KMITL',
        background: 'lightBlue',
        starred: false
    },
    {
        id: 2,
        name: 'Pepsi',
        background: 'lightGreen',
        starred: true
    },
    {
        id: 3,
        name: 'Meo Germany',
        background: 'lightCoral',
        starred: false
    }
]

export default (state = initState, action)=> {
    switch (action.type) {
        case 'ADD_BOARD': 
            const newState = [...state];
            newState.push(action.boardData)

            /// post to backend.

            return newState;
    
        case 'DEL_BOARD':
            const newState2 = [...state];
            const delIndex = newState2.findIndex(data => data.id === action.boardId)
            
            if (delIndex > 0) {
                newState2.splice(delIndex, 1);

                /// post to backend.
            } 

            return newState2;

        case 'CHANGE_NAME':
            const newState3 = [...state];
            const changeIndex = state.findIndex(data => data.id === action.boardId) 
            
            if (changeIndex > 0)
            {
                newState3[changeIndex].name = action.name;

                /// post to backend.
            }

            return newState3;

        case 'STAR_BOARD':
            const newState4 = [...state];
            const starIndex = state.findIndex(data => data.id === action.boardId)

            if (starIndex > 0) {
                newState4[starIndex].starred = true;

                /// post to backend.
            }

            return newState4;

        case 'UNSTAR_BOARD':
            const newState5 = [...state];
            const unStarIndex = state.findIndex(data => data.id === action.boardId)

            if (unStarIndex > 0) {
                newState5[unStarIndex].starred = false;

                /// post to backend.
            }

            return newState5;

        default:
            return state;
    }
}