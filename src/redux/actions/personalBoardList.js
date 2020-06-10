export const addBoard =(boardData)=> ({
    type: 'ADD_BOARD',
    boardData
})

export const delBoard =(boardId)=> ({
    type: 'DEL_BOARD',
    boardId
})

export const changeName =(boardId, name)=> ({
    type: 'CHANGE_NAME',
    boardId,
    name
})

export const starBoard =(boardId)=> ({
    type: 'STAR_BOARD',
    boardId, 
})

export const unStarBoard =(boardId)=> ({
    type: 'UNSTAR_BOARD',
    boardId, 
})

export const overWrite =(newState)=> ({
    type: 'OVERWRITE',
    newState, 
})
