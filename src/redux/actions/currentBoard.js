export const renameBoard = (name) => ({
    type: 'BOARD_RENAME',
    name
})

export const memberOverWrite = (members) => ({
    type: 'MEMBER_OVERWRITE',
    members
})

export const addMember = (member) => ({
    type: 'ADD_MEMBER',
    member
})

export const removeMember = (id) => ({
    type: 'REMOVE_MEMBER',
    id
})

export const changeCurrentBoard = (newState) => ({
    type: 'CHANGE_CURRENT_BOARD',
    newState
})

export const changePicture = (picture) => ({
    type: 'CHANGE_PICTURE',
    picture
})