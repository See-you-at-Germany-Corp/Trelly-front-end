const initState = {
    name: '',
    is_on: false,
    picture: 'mediumorchid'
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
                picture: action.picture
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