/// get board list data from backend.
/// set it to initial state.

/// mockup initState.
const initState = [
    {
        id: 0,
        name: 'Trelly',
        background: 'salmon',
        starred: false,
        starred_id: 0,
        href: ''
    },
    {
        id: 1,
        name: 'KMITL',
        background: 'deepskyblue',
        starred: false,
        starred_id: 0,
        href: ''
    },
    {
        id: 2,
        name: 'Pepsi',
        background: 'plum',
        starred: true,
        starred_id: 0,
        href: ''
    },
    {
        id: 3,
        name: 'Meo Germany',
        background: 'limegreen',
        starred: false,
        starred_id: 0,
        href: ''
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
            
            if (delIndex >= 0) {
                newState2.splice(delIndex, 1);

                /// post to backend.
            } 

            return newState2;

        case 'CHANGE_NAME':
            const newState3 = [...state];
            const changeIndex = state.findIndex(data => data.id === action.boardId) 
            
            if (changeIndex >= 0)
            {
                newState3[changeIndex].name = action.name; 

                /// post to backend.
            }

            return newState3;

        case 'STAR_BOARD':
            const newState4 = [...state];
            const starIndex = state.findIndex(data => data.id === action.boardId) 

            if (starIndex >= 0) {
                newState4[starIndex].starred = true;

                let maxStarredId = 0;
                /// search max starred_id.
                newState4.map(state => { 
                    if (state.starred_id > maxStarredId)
                        maxStarredId =  state.starred_id;
                    return ({});
                })

                newState4[starIndex].starred_id = maxStarredId + 1; 

                /// post to backend.
            }

            return newState4;

        case 'UNSTAR_BOARD':
            const newState5 = [...state];
            const unStarIndex = state.findIndex(data => data.id === action.boardId)

            if (unStarIndex >= 0) {
                newState5[unStarIndex].starred = false;
                newState5[unStarIndex].starred_id = 0;

                /// post to backend.
            }

            return newState5;

        default:
            return state;
    }
}