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

        case ('OVERWRITE_RECENTLY'):
            return action.newState;

        default:
            return state;
    }
}