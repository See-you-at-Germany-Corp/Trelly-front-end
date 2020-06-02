/// get board list data from backend.
/// set it to initial state.

/// mockup initState.
const initState = [
    {
        id: 0,
        name: 'Trelly',
        background: ''
    },
    {
        id: 1,
        name: 'KMITL',
        background: ''
    },
    {
        id: 2,
        name: 'Pepsi',
        background: ''
    },
    {
        id: 3,
        name: 'Meo Germany',
        background: ''
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

        default:
            return state;
    }
}