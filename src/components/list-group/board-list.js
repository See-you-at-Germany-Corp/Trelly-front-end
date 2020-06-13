import React, { useContext, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

// import Draggable from 'react-draggable'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { BoardContext } from '../../context/board-context/board-context'
import Card from './board-card'
import { TextareaAutosize } from '@material-ui/core'

export default function List(props) {
    const { boardState, boardDispatch } = useContext(BoardContext)

    const list = boardState.lists[props.index]
    const [name, rename] = useState({
        oldName: list.name,
        newName: list.name
    })
    const [edittingName, setEdittingName] = useState(false)

    const inputRef = useRef(null)

    useEffect(() => {
        if (edittingName) {
            inputRef.current.focus()
        }
    });

    const handleChangeName = e => {
        rename({
            oldName: name.oldName,
            newName: e.target.value
        })
    }

    const inputBlur = e => {
        setEdittingName(!edittingName)

        if (!name.newName.length) {
            rename({
                oldName: name.oldName,
                newName: name.oldName
            })
            return
        }

        rename({
            oldName: name.newName,
            newName: name.newName
        })

        boardDispatch({
            type: 'CHANGE_LIST_NAME',
            index: props.index,
            name: e.target.value,
        })

        // send new name to server
    }

    const enterNewName = e => {
        if (e.key !== 'Enter') return
        inputRef.current.blur()
    }

    return (
        <Draggable draggableId={props.listId} index={props.index}>
            {(provided) => (
                <StyledList
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <HeaderField {...provided.dragHandleProps}>
                        <div
                            className={`drag-target ${edittingName && 'hide'}`}
                            onClick={() => (setEdittingName(!edittingName))}
                        />
                        <TextareaAutosize
                            ref={inputRef}
                            onBlur={inputBlur}
                            value={name.newName}
                            onKeyPress={enterNewName}
                            onChange={handleChangeName}
                            style={{ padding: '10px 5px 10px 5px' }}
                        />
                    </HeaderField>

                    <Droppable droppableId={props.listId} type='card'>
                        {(provided, snapshot) => (
                            <CardList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {
                                    list.cards.map((card, index) => {
                                        return (
                                            <Card
                                                index={index}
                                                key={`card-${card.id}`}
                                                cardId={`card-${card.id}`}
                                                listIndex={props.index}
                                            />
                                        )
                                    })
                                }
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

    padding-bottom: 10px;
    border-radius: 5px;
    margin-right: 10px;
    background-color: beige;
`

const HeaderField = styled.div`
    width: 100%;
    min-height: 40px;
    font-size: 20px;
    position: relative;

    textarea {
        width: 200px;
        resize: none;

        font-size: inherit;
        word-break: keep-all;

        border: 0;
        padding: 0;
        background-color: red;

        :focus {
            outline-color: #2F3F8F;
            background-color: white;
        }
    }

    .drag-target {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        /* background-color: blue; */
    }

    .hide {
        display: none;
    }
`

const CardList = styled.div`
    width: calc(100% - 20px);
    padding: 10px;
    background-color: ${props => props.isDraggingOver ? 'green' : 'transparent'}
`