export const memberOverWrite = (members) => ({
    type: 'MEMBER_OVERWRITE',
    members
})

export const changeCurrentBoard = (newState) => ({
    type: 'CHANGE_CURRENT_BOARD',
    newState
})