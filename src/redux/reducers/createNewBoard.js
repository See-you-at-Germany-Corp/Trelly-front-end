const initState = {
    is_on: true,
    background: 'mediumorchid',
    ref: ''
}

export default (state = initState, action)=> {
    switch (action.type) {
        case 'ON':
            return {
                ...state,
                is_on: true
            }

        case 'OFF':
            return {
                ...state,
                is_on: false
            } 

        case 'SET_BACKGROUND':
            return {
                ...state,
                background: action.background
            }

        case 'SET_REF':
            return {
                ...state,
                ref: action.ref
            }
    
        default:
            return state;
    }
}