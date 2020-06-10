export const starBoard = (boardId, boardData) => ({
    type: 'STAR_BOARD',
    boardId,
    boardData
})

export const unStarBoard = (boardId) => ({
    type: 'UNSTAR_BOARD',
    boardId,
})