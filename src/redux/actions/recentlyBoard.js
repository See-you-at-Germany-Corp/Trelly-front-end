export const overWriteRecentlyBoard = (newState) => ({
    type: 'OVERWRITE_RECENTLY',
    newState
})

export const delRecentlyBoard = (boardId) => ({
    type: 'DEL_RECENTLY',
    boardId
})

export const addRecentlyBoard = (boardData) => ({
    type: 'ADD_RECENTLY',
    boardData
})

export const changeRecentlyName = (boardId, name) => ({
    type: 'CHANGE_RECENTLY_NAME',
    boardId,
    name
})

export const changePicturRecently = (boardId, color_code) => ({
    type: 'CHANGE_PICTURE_RECENTLY',
    boardId,
    color_code,
})