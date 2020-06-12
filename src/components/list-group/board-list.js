import React, { useContext } from 'react'
import styled from 'styled-components'

// import Draggable from 'react-draggable'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { BoardContext } from '../../context/board-context/board-context'
import Card from './board-card'

export default function List(props) {
    const { boardState } = useContext(BoardContext)

    const list = boardState.list[props.listId]

    return (
        <Draggable draggableId={props.listId} index={props.index}>
            {(provided, snapshot) => (
                <StyledList
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <TextName {...provided.dragHandleProps}>
                        {/* <input value={list.id}/> */}
                        {props.listId}
                    </TextName>

                    <Droppable droppableId={props.listId} type='card'>
                        {(provided, snapshot) => (
                            <CardList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {list.cardIds.map((cardId, index) => <Card cardId={cardId} cardIndex={index} key={cardId} />)}
                                {provided.placeholder}
                            </CardList>
                        )}
                    </Droppable>
                </StyledList>
            )}
        </Draggable>
    )
}

const StyledList = styled.div`
    min-width: 250px;
    max-width: 280px;
    max-height: 95%;

    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 5px;
    margin-right: 10px;
    background-color: beige;
`

const TextName = styled.div`
    width: 200px;
    height: 30px;
    font-size: 20px;
`

const CardList = styled.div`
    width: calc(100% - 20px);
    padding: 10px;
    background-color: ${props => props.isDraggingOver ? 'green' : 'transparent'}
`
