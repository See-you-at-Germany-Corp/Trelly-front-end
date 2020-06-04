const initState = {
    is_on: false
}

export default (state = initState, action)=> {
    switch (action.type) {
        case 'ON':
            return {
                is_on: true
            }

        case 'OFF':
            return {
                is_on: false
            } 
    
        default:
            return state;
    }
}