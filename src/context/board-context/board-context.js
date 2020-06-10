import React, { useReducer, createContext } from 'react'
import { mockupData } from './mockup-board'
import move from '../../function/moveObject'

const BoardContext = createContext({})

const boardReducer = (state, action) => {
    switch (action.type) {
        case 'MOVE_CARDS_IN_LIST':
            const newCardIds = move(action.obj, action.source, action.dest)
            const newState = { ...state }

            newState.list[action.listId].cardIds = newCardIds

            return newState
        default:
            return state;
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