
import React, { useContext } from 'react'
import styled from 'styled-components'

// import Draggable from 'react-draggable'
import { Draggable } from 'react-beautiful-dnd'
import { BoardContext } from '../../context/board-context/board-context'

export default function Card(props) {
    const { boardState, boardDispatch } = useContext(BoardContext)

    return (
        <Draggable draggableId={props.cardId} index={props.cardIndex}>
            {(provided, snapshot) => (
                <StyledCard
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {props.cardId}
                </StyledCard>
            )}
        </Draggable>
    )
}

const StyledCard = styled.div`
    min-height: 30px;
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 10px;
    background-color: gainsboro;
`