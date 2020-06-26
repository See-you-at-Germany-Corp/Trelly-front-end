const initState = {
    name: '',
    is_on: false,
    color_code: 'mediumorchid'
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
                color_code: action.color_code
            }
  
        case 'SET_NAME': 
            return {
                ...state,
                name: action.name
            }
    
        default:
            return state;
    }
}