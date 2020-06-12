import React, { useContext, useState } from 'react'
import styled from 'styled-components'

// import Draggable from 'react-draggable'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { BoardContext } from '../../context/board-context/board-context'
import Card from './board-card'

export default function List(props) {
    const { boardState } = useContext(BoardContext)

    const list = boardState.list[props.listId]
    const [name, rename] = useState(list.title)
    const [nameSwitch, setNameSwitch] = useState(true)

<<<<<<< HEAD
=======
    const handleChangeName = e => {
        rename(e.target.value)
        boardDispatch({
            type: 'CHANGE_LIST_NAME',
            id: e.target.id,
            name: e.target.value,
        })
    }

    const toggleInput = () => {
        setNameSwitch(!nameSwitch)
        console.log(nameSwitch);
    }

>>>>>>> 9156606ae93e0ab64dd09bb80356062a3751aa4b
    return (
        <Draggable draggableId={props.listId} index={props.index}>
            {(provided, snapshot) => (
                <StyledList
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <TextName {...provided.dragHandleProps} onClick={toggleInput}>
                        <input id={`${list.id}`} value={name} onChange={handleChangeName}/>
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

    input {
        width: 100%;
        height: 100%;
        font-size: inherit;

        border: 0;
        background-color: red;

        :focus {
            outline-color: #2F3F8F;
            /* border-color: rgb(150,220,255); */
            background-color: white;
        }
    }
`

const CardList = styled.div`
    width: calc(100% - 20px);
    padding: 10px;
    background-color: ${props => props.isDraggingOver ? 'green' : 'transparent'}
`
