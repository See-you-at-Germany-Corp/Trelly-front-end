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

export const changePicturePersonal = (boardId, color_code) => ({
    type: 'CHANGE_PICTURE_PERSONAL',
    boardId,
    color_code,
})

export const overWritePersonal = (newState) => ({
    type: 'OVERWRITE_PERSONAL',
    newState,
})