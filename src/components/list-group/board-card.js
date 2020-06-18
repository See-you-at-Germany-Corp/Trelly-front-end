
import React, { useContext } from 'react'
import styled from 'styled-components'

// import Draggable from 'react-draggable'
import { Draggable } from 'react-beautiful-dnd'
import { BoardContext } from '../../context/board-context/board-context'
import {motion} from 'framer-motion'

export default function Card(props) {
    const { boardState } = useContext(BoardContext)

    const card = boardState.lists[props.listIndex].cards[props.index]

    return (
        <Draggable draggableId={props.cardId} index={props.index}>
            {provided => (
                <CardDiv
                    
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <StyledCard whileTap={{scale:0.9}}>
                    {card.name}
                    </StyledCard>
                </CardDiv>
            )}
        </Draggable>
    )
}

const StyledCard = styled(motion.div)`
    min-height: 20px;
    padding: 15px;
    vertical-align: middle;
    // margin-bottom: 10px;
    background-color: gainsboro;
    border-radius: 3px;
    box-shadow: 0px 5px 8px -8px ;
`
const CardDiv = styled(motion.div)`
    padding-top: 4px;
    padding-bottom: 4px;
    display: block;
    
`;