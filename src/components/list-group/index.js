import React, { useContext, useState } from 'react'
import styled from 'styled-components';

import List from './board-list'
import { BoardContext } from '../../context/board-context/board-context'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function ListGroup(props) {
    const { boardState, boardDispatch } = useContext(BoardContext)
    const [state, setstate] = useState('blue')

    const onDragEnd = result => {
        if (!result.destination) return

        if (result.type === 'card') {
            if (result.destination.droppableId === result.source.droppableId) {
                boardDispatch({
                    type: 'MOVE_CARDS_IN_LIST',
                    obj: boardState.list[result.source.droppableId].cardIds,
                    sourceIndex: result.source.index,
                    destIndex: result.destination.index,
                    listId: result.source.droppableId
                })
                return
            }

            boardDispatch({
                type: 'MOVE_CARDS_OVER_LIST',
                source: result.source,
                dest: result.destination,
                item: result.draggableId
            })
        }
        else {
            boardDispatch({
                type: 'MOVE_LIST',
                sourceIndex: result.source.index,
                destIndex: result.destination.index,
            })
        }
    }

    return (
        <BoardBody>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="list-group"
                    direction="horizontal"
                    type="list"
                >
                    {provided => (
                        <StyledListContainer
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {
                                boardState.listOrder.map((listId, index) => (
                                    <List
                                        key={`${listId}`}
                                        listId={listId}
                                        index={index}
                                    />
                                ))
                            }
                            {provided.placeholder}
                        </StyledListContainer>
                    )}
                </Droppable>
            </DragDropContext>
        </BoardBody>
    )
}

const StyledListContainer = styled.div`
    height: calc(90vh - 40px);
    max-width: calc(100vw - 10px);

    padding-left: 10px;
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
