import React, { useReducer, createContext } from 'react'
import { mockupData } from './mockup-board'
import { moveItem, insertItem, deleteItem } from '../../function/moveCard'

const BoardContext = createContext({})

const boardReducer = (state, action) => {
    switch (action.type) {
        case 'MOVE_CARDS_IN_LIST':
            const newCardIds = moveItem(state.list[action.listId].cardIds, action.sourceIndex, action.destIndex)
            state.list[action.listId].cardIds = newCardIds
            return state
        case 'MOVE_CARDS_OVER_LIST':
            let source = action.source
            let dest = action.dest
            deleteItem(state.list[source.droppableId].cardIds, source.index)
            insertItem(state.list[dest.droppableId].cardIds, dest.index, action.item)
            return state
        case 'MOVE_LIST':
            const newListOrder = moveItem(state.listOrder, action.sourceIndex, action.destIndex)
            state.listOrder = newListOrder
            return state
        case 'CHANGE_LIST_NAME':
            state.list[action.id].title = action.name            
            return state
        default:
            return state
    }
}

// provider -> provide [boardState,boardDispatch]
const BoardProvider = ({ children }) => {
    const [boardState, boardDispatch] = useReducer(boardReducer, mockupData)

    return (
        <BoardContext.Provider value={{ boardState, boardDispatch }}>
            {children}
        </BoardContext.Provider>
    )
}

export { BoardProvider, BoardContext }