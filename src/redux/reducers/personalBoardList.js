/// get board list data from backend.
/// set it to initial state.
 
/// mockup initState.

export default (state = [], action)=> {
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
         
        case 'CHANGE_PICTURE_PERSONAL':
            const newState4 = [...state]; 
            const changePicIndex = state.findIndex(data => data.id === action.boardId) 

            if (changePicIndex >= 0) { 
                newState4[changePicIndex].color_code = action.color_code; 

                /// post to backend.
            }

            return newState4;

        case 'OVERWRITE_PERSONAL':
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