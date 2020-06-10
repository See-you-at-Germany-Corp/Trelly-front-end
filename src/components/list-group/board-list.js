import React, { useContext } from 'react'
import styled from 'styled-components'

// import Draggable from 'react-draggable'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { BoardContext } from '../../context/board-context/board-context'
import Card from './board-card'

export default function List(props) {
    const { boardState, boardDispatch } = useContext(BoardContext)

    const list = boardState.list[props.listId]

    return (
        <StyledList>
            <TextName disabled={true} value={list.id} />
            <Droppable droppableId={props.listId}>
                {(provided, snapshot) => (
                    <CardList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {list.cardIds.map((cardId, index) => <Card cardId={cardId} cardIndex={index} key={cardId} />)}
                        {provided.placeholder}
                    </CardList>
                )}
            </Droppable>
        </StyledList>
    )
}

const StyledList = styled.div`
    min-width: 250px;
    max-width: 280px;
    max-height: 95%;

    z-index: 1;

    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
    background-color: beige;
`

const TextName = styled.input`
    width: 200px;
    height: 30px;
    font-size: 20px;

    :disabled {
        border: 0;
        background-color: transparent;
    }
`

const CardList = styled.div`
    width: 100%;
`
