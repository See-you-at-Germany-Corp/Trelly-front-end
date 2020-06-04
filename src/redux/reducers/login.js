const initState = { logedIn: false }

export default (state = initState, action) => {
    // save token in cookie or localhost
    
    return { logedIn: !state.logedIn }
}