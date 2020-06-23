import React, { useReducer, createContext } from 'react'
import { mockupData } from './mockup-board'
import { moveItem, insertItem, deleteItem, findItem } from '../../function/moveCard'

const BoardContext = createContext({})

const boardReducer = (state, action) => {
    switch (action.type) {
        case 'MOVE_CARDS_IN_LIST': {
            const listIndex = findItem(state.lists, action.listId, 'list-')
            const newCardIds = moveItem(state.lists[listIndex].cards, action.sourceIndex, action.destIndex)
            state.lists[listIndex].cards = newCardIds
            return state
        }
        case 'MOVE_CARDS_OVER_LIST': {
            const destIndex = findItem(state.lists, action.dest.droppableId, 'list-')
            const sourceIndex = findItem(state.lists, action.source.droppableId, 'list-')
            const cardIndex = findItem(state.lists[sourceIndex].cards, action.item, 'card-')
            insertItem(state.lists[destIndex].cards, action.dest.index, state.lists[sourceIndex].cards[cardIndex])
            deleteItem(state.lists[sourceIndex].cards, action.source.index)
            return state
        }
        case 'MOVE_LIST': {
            const newListOrder = moveItem(state.lists, action.sourceIndex, action.destIndex)
            state.lists = newListOrder
            return state
        }
        case 'CHANGE_LIST_NAME': {
            state.lists[action.index].name = action.name
            return state
        }
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