
import React, { useContext } from 'react'
import styled from 'styled-components'

// import Draggable from 'react-draggable'
import { Draggable } from 'react-beautiful-dnd'
import { BoardContext } from '../../context/board-context/board-context'

export default function Card(props) {
    const { boardState } = useContext(BoardContext)

    const card = boardState.lists[props.listIndex].cards[props.index]

    return (
        <Draggable draggableId={props.cardId} index={props.index}>
            {provided => (
                <StyledCard
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {card.name}
                </StyledCard>
            )}
        </Draggable>
    )
}

const StyledCard = styled.div`
    min-height: 20px;

    padding: 15px;
    vertical-align: middle;
    margin-bottom: 10px;
    background-color: gainsboro;
`