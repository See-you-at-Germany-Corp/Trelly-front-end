import React, { useReducer, createContext } from 'react'
import { mockupData } from './mockup-board'
import { moveItem, insertItem, deleteItem, findItem } from '../../function/moveCard'

const BoardContext = createContext({})

const boardReducer = (state, action) => {

    switch (action.type) {
        // list
        case 'OVERRIDE_LISTS': {
            let newState = { ...state }
            newState.lists = action.newLists
            return newState
        }

        case 'MOVE_LIST': {
            let newState = { ...state }
            let newListOrder = moveItem(state.lists, action.sourceIndex, action.destIndex)
            newState.lists = newListOrder

            return newState
        }

        case 'LIST_RENAME': {
            state.lists[action.index].name = action.name
            return state
        }

        case 'ADD_LIST': {
            let newState = { ...state }
            delete action.newList.board
            newState.lists.push({ ...action.newList, cards: [] })
            return newState
        }

        case 'DEL_LIST': {
            let newState = { ...state }
            let newLists = state.lists.slice(0, action.index).concat(state.lists.slice(action.index + 1))
            newState.lists = newLists
            return newState
        }

        // card
        case 'ADD_CARD': {
            let newState = { ...state }
            let index = newState.lists.findIndex(item => item.id === parseInt(action.list))
            console.log(action.position);

            newState.lists[index].cards.splice(action.position - 1, 0,
                ({
                    id: action.id,
                    name: action.name,
                    labels: [],
                    members: [],
                    checklist: null,
                    order_number: action.order_number,
                    is_description: false,
                    is_watching: false,
                })
            )

            return newState
        }

        case 'MOVE_CARDS_IN_LIST': {
            let newState = { ...state }
            const listIndex = findItem(state.lists, action.listId, 'list-')
            const newCardIds = moveItem(state.lists[listIndex].cards, action.sourceIndex, action.destIndex)
            newState.lists[listIndex].cards = newCardIds

            return newState
        }

        case 'MOVE_CARDS_OVER_LIST': {
            const destIndex = findItem(state.lists, action.dest.droppableId, 'list-')
            const sourceIndex = findItem(state.lists, action.source.droppableId, 'list-')
            const cardIndex = findItem(state.lists[sourceIndex].cards, action.item, 'card-')
            insertItem(state.lists[destIndex].cards, action.dest.index, state.lists[sourceIndex].cards[cardIndex])
            deleteItem(state.lists[sourceIndex].cards, action.source.index)

            return state
        }

        /*--------------------BOAT--------------------*/

        case ('BOARD_RENAME'):
            state.name = action.name

            /// post to backend.

            return state;

        case ('MEMBER_OVERWRITE'):
            state.members = action.members

            /// post to backend.

            return state;

        case ('ADD_MEMBER'):
            const newState2 = { ...state };
            newState2.members.push(action.member);

            /// post to backend.

            return newState2;

        case ('REMOVE_MEMBER'):
            const newState = { ...state };
            const rmvIndex = state.members.findIndex(member => member.id === action.id);

            if (rmvIndex >= 0) {
                newState.members.splice(rmvIndex, 1);

                /// post to backend.
            }

            return newState;

        case ('CHANGE_PICTURE'):
            /// post to backend. 

            return {
                ...state,
                color_code: action.color_code
            };

        case ('CHANGE_CURRENT_BOARD'):
            return action.newState;

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