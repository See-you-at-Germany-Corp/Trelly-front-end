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