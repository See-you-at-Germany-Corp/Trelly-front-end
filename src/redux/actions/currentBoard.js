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

export const changePicture = (color_code) => ({
    type: 'CHANGE_PICTURE',
    color_code
})

export const addLabelToBoard = (labelData) => ({
    type: 'ADD_LABEL_TO_BOARD',
    labelData
}) 

export const updateLabelInBoard = (labelId, newName, newColor_id) => ({
    type: 'UPDATE_LABEL_IN_BOARD',
    labelId,
    newName,
    newColor_id
}) 

export const delLabelInBoard = (labelId) => ({
    type: 'DEL_LABEL_IN_BOARD',
    labelId
}) 

export const changeCardName = (listId, cardId, newName) => ({
    type: 'CHANGE_CARD_NAME',
    listId,
    cardId,
    newName
}) 