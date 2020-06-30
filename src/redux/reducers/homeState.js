export default (state = { isLoading: true }, action) => {
    switch (action.type) {
        case ('SET_LOADING_HOME'):
            return {
                ...state,
                isLoading: action.isLoading
            }

        default:
            return state;
    }
}