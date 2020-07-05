import cookie from 'react-cookies'

const initState = { 
    loggedIn: `${cookie.load('authen-token')}` !== 'undefined' ? true : false
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            // save token in cookie or localhost
            return {loggedIn: true}
        case 'LOG_OUT':
            // del token in cookie or localhost
            cookie.remove('authen-token', { path: '/' })
            return {loggedIn: false}
        default:
            return state
    }
}