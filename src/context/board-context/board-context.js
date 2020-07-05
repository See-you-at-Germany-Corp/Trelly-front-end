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

        case ('ADD_LABEL_TO_BOARD'):
            const newState3 = {...state};
            newState3.labels.push(action.labelData);

            return newState3;

        case ('UPDATE_LABEL_IN_BOARD'):
            const newState5 = {...state};
            const updateIndex = newState5.labels.findIndex(label => label.id === action.labelId);

            if (updateIndex >= 0) {
                newState5.labels[updateIndex].name = action.newName;
                newState5.labels[updateIndex].color_id = action.newColor_id;
            }
 
            return newState5;

        case ('DEL_LABEL_IN_BOARD'):
            const newState4 = {...state};
            const delIndex = newState4.labels.findIndex(label => label.id === action.labelId);

            if (delIndex >= 0) {
                newState4.labels.splice(delIndex, 1);
            } 

            return newState4;

        case ('CHANGE_CURRENT_BOARD'): 
            return action.newState;

        case ('CHANGE_CARD_NAME'):
            let newState6 = { ...state };
            let listIndex = newState6.lists.findIndex(list => list.id === action.listId);
            
            if (listIndex >= 0) {
                let cardIndex = newState6.lists[listIndex].cards.findIndex(card => card.id === action.cardId);
                if (cardIndex >= 0)
                    newState6.lists[listIndex].cards[cardIndex].name = action.newName;
            }
                 
            return newState6;
 
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