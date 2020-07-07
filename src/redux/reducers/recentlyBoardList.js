export default (state = [], action) => {
    switch (action.type) { 
        case ('ADD_RECENTLY'):
            const newState2 = [...state];
            newState2.push(action.boardData);

            return newState2;

        case ('DEL_RECENTLY'): 
            const newState = [...state];
            const delIndex = newState.findIndex(data => data.id === action.boardId)

            if (delIndex >= 0) {
                newState.splice(delIndex, 1);
            } 

            return newState;

        case 'CHANGE_RECENTLY_NAME':
            const newState3 = [...state];
            const changeIndex = state.findIndex(data => data.id === action.boardId)

            if (changeIndex >= 0) {
                newState3[changeIndex].name = action.name; 
            }

            return newState3;

        case 'CHANGE_PICTURE_RECENTLY':
            const newState4 = [...state];
            const changePicIndex = state.findIndex(data => data.id === action.boardId)

            if (changePicIndex >= 0) {
                newState4[changePicIndex].color_code = action.color_code; 
            }

            return newState4;

        case ('OVERWRITE_RECENTLY'):
            return action.newState;

        default:
            return state;
    }
}