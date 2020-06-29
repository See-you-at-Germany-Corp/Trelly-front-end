export const starBoard = (boardId, boardData) => ({
    type: 'STAR_BOARD',
    boardId,
    boardData
})

export const unStarBoard = (boardId) => ({
    type: 'UNSTAR_BOARD',
    boardId,
})

export const changeStarName = (boardId, name) => ({
    type: 'CHANGE_STAR_NAME',
    boardId,
    name
})

export const changePictureStarred = (boardId, color_code) => ({
    type: 'CHANGE_PICTURE_STARRED',
    boardId,
    color_code,
})

export const overWriteStarBoard = (newState) => ({
    type: 'OVERWRITE_STAR_BOARD',
    newState,
})