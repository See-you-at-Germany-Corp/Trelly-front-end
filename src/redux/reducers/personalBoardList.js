/// get board list data from backend.
/// set it to initial state.
 
/// mockup initState.
const initState = [
    {
        id: 0,
        name: '//sampleboard//',
        background: '#cccccc',
        starred: false,
        starred_id: 0,
        href: '/0/sampleboard'
    },
    {
        id: 1,
        name: 'Trelly',
        background: 'indianred',
        starred: true,
        starred_id: 3,
        href: '/1/Trelly'
    },
    {
        id: 2,
        name: 'KMITL',
        background: 'dodgerblue',
        starred: true,
        starred_id: 2,
        href: '/2/KMITL'
    },
    {
        id: 3,
        name: 'ICUTMYHAIRBECAUSEYOUDONTCAREMYHEART',
        background: 'palevioletred',
        starred: true,
        starred_id: 1,
        href: '/3/ICUTMYHAIRBECAUSEYOUDONTCAREMYHEART'
    },
    {
        id: 4,
        name: 'Meo Germany',
        background: 'forestgreen',
        starred: true,
        starred_id: 0,
        href: '/4/Meo-Germany'
    }
]

export default (state = initState, action)=> {
    switch (action.type) {
        case 'ADD_BOARD': 
            const newState = [...state];
 
            let maxId = 0;
            /// search max id.
            newState.map(state => {
                if (state.id > maxId)
                    maxId = state.id;
                return ({});
            })

            /// wait auto gen id, href from backend.
            /// now use mockup gen.
            
            /// auto gen id.
            action.boardData.id = maxId + 1; 

            /// auto decrease space in name.about
            action.boardData.name = spaceDecrement(action.boardData.name);
 
            /// auto gen href.
            action.boardData.href = `/${action.boardData.id}/${spaceToDash(action.boardData.name)}`
            
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
                newState3[changeIndex].name = spaceDecrement(action.name); 

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

        case 'SET_STAR_ID':
            const newState6 = [...state];
            const index = state.findIndex(data => data.id === action.boardId)

            if (index >= 0) { 
                newState6[index].starred_id = action.starId;

                /// post to backend.
            }

            return newState6;

        case 'OVERWRITE':
            return action.newState
  
        default:
            return state;
    }
}

const spaceToDash = (strWithSpace) => { 
    let strWithDash = strWithSpace.replace(/ /g, '-');
 
    return (
        strWithDash
    ); 
}

const spaceDecrement = (strWithSpace) => {
    const strArray = strWithSpace.split(' ');
    let strWithDecrease = '';

    strArray.forEach((element) => {
        strWithDecrease = (strWithDecrease !== '' && element !== '') ? strWithDecrease + ' ' : strWithDecrease;
        strWithDecrease = (element !== ' ' && element !== '') ? strWithDecrease + element : strWithDecrease;
    });

    return (
        strWithDecrease
    );
}