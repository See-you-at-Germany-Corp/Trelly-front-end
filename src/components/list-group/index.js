import React, { useContext } from 'react'
import styled from 'styled-components';

import List from './board-list'
import { BoardContext } from '../../context/board-context/board-context'
import { DragDropContext } from 'react-beautiful-dnd';

export default function ListGroup(props) {
    const { boardState, boardDispatch } = useContext(BoardContext)

    const onDragEnd = result => {
        console.log(result);

        if (!result.destination) return

        boardDispatch({
            type: 'MOVE_CARDS_IN_LIST',
            obj: boardState.list[result.source.droppableId].cardIds,
            source: result.source.index,
            dest: result.destination.index,
            listId: result.source.droppableId
        })
    }

    return (
        <BoardBody>
            <DragDropContext onDragEnd={onDragEnd}>
                <StyledListContainer>
                    {
                        boardState.listOrder.map((listId, index) => (<List listId={listId} key={`list${index}`} />))
                    }
                </StyledListContainer>
            </DragDropContext>
        </BoardBody>
    )
}

const StyledListContainer = styled.div`
    height: calc(90vh - 40px);
    max-width: calc(100vw - 10px);

    padding: 10;
    margin: 10px 0px 10px 10px;
    
    display: flex;
    overflow-x: auto;

    background-color: grey;

    ::-webkit-scrollbar {
        background-color: red;
    }
`

const BoardBody = styled.div`
    overflow-x: hidden;
    background-color: paleturquoise;
`
