export const addBoard = (boardData) => ({
    type: 'ADD_BOARD',
    boardData
})

export const delBoard = (boardId) => ({
    type: 'DEL_BOARD',
    boardId
})

export const changeName = (boardId, name) => ({
    type: 'CHANGE_NAME',
    boardId,
    name
})

export const changePicturePersonal = (boardId, picture) => ({
    type: 'CHANGE_PICTURE_PERSONAL',
    boardId,
    picture,
})

export const overWritePersonal = (newState) => ({
    type: 'OVERWRITE_PERSONAL',
    newState,
})