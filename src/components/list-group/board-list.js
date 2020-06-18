import React, { useContext, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

// import Draggable from 'react-draggable'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { BoardContext } from '../../context/board-context/board-context'
import Card from './board-card'
import { TextareaAutosize, Button, } from '@material-ui/core'

export default function List(props) {
    const { boardState, boardDispatch } = useContext(BoardContext)

    const list = boardState.lists[props.index]

    const nameRef = useRef(null)
    const [name, rename] = useState({
        oldName: list.name,
        newName: list.name
    })
    const [edittingName, setEdittingName] = useState(false)

    const newCardRef = useRef(null)
    const [newCardName, setNewCardName] = useState('')
    const [edittingCardName, setEdittingCardName] = useState(false)


    useEffect(() => {
        if (edittingName) {
            nameRef.current.focus()
        }
        if (edittingCardName) {
            newCardRef.current.focus()
        }
    });

    const handleChangeName = e => {
        rename({
            oldName: name.oldName,
            newName: e.target.value
        })
    }

    const handleNewCardName = e => {
        setNewCardName(e.target.value)
    }

    const listNameBlur = e => {
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
        nameRef.current.blur()
    }

    const createNewCard = () => {

    }

    return (
        <Draggable draggableId={props.listId} index={props.index}>
            {(provided) => (
                <ListWrapper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <ListContent>
                        <HeaderField {...provided.dragHandleProps}>
                            <div
                                className={`drag-target ${edittingName ? 'hide' : ''}`}
                                onClick={() => (setEdittingName(!edittingName))}
                            />
                            <TextareaAutosize
                                rowsMax={5}
                                ref={nameRef}
                                onBlur={listNameBlur}
                                value={name.newName}
                                onKeyPress={enterNewName}
                                onChange={handleChangeName}
                            />
                            <Button>
                                <div className="fas fa-ellipsis-h" />
                            </Button>
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
                        <AddCard>
                            {
                                !edittingCardName ?
                                    <div
                                        className='add-composer'
                                        onClick={() => setEdittingCardName(!edittingCardName)}
                                    >
                                        <i className="fas fa-plus" ></i> Add another card
                                    </div>
                                    :
                                    <div className='new-card-wrapper'>
                                        <TextareaAutosize
                                            ref={newCardRef}
                                            value={newCardName}
                                            onChange={handleNewCardName}
                                        />
                                        <Button
                                            className='add-button'
                                            onClick={() => setEdittingCardName(!edittingCardName)}>
                                            Add card</Button>
                                        <Button
                                            className='x-button'
                                            onClick={() => setEdittingCardName(!edittingCardName)}>
                                            X</Button>
                                    </div>
                            }
                        </AddCard>
                    </ListContent>
                </ListWrapper>
            )}
        </Draggable>
    )
}

const ListWrapper = styled.div`
    max-height: 95%;
    min-width: 250px;
    max-width: 280px;

    margin-right: 10px;
    border-radius: 10px;
    padding-bottom: 10px;
    background-color: transparent;
`

const ListContent = styled.div`
    display: flex;
    max-height: 100%;
    position: relative;
    border-radius: 5px;
    flex-direction: column;
    background-color: #ebecf0;
`

const HeaderField = styled.div`
    min-height: 40px;

    padding: 10px 8px;
    font-size: 20px;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .MuiButton-root {
        min-width: 30px;
        width: 40px;
        height: 40px;
    }

    textarea {
        width: 180px;

        resize: none;
        font-size: 18px;
        font-weight: 600;
        word-break: keep-all;

        border: 0;
        padding: 8px 8px;
        border-radius: 5px;
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
    }

    .hide {
        display: none;
    }
`

const CardList = styled.div`
    padding: 10px;
    overflow-y: auto;
    background-color: ${props => props.isDraggingOver ? 'green' : 'transparent'}
`

const AddCard = styled.div`
    min-height: 40px;

    margin: 10px 8px;
    display: table;

    .add-composer {
        width: 100%;
        height: 40px;

        padding-left: 10px;
        border-radius: 3px;

        font-size: 15px;
        display: table-cell;
        vertical-align: middle;

        color: #5e6c84;
        cursor: pointer;

        :hover {
            background-color: rgba(9,30,66,.08);
        }
    }

    .new-card-wrapper {
        width: 100%;
    }

    .new-card-wrapper textarea {
        min-height: 20px;
        width: calc(100% - 20px);
        /* width: 100%; */
        
        resize: none;
        padding: 10px;
        border: 0;
        font-size: 16px;
        background-color: white;
    }

    .MuiButton-root {
        min-width: 30px;
        text-transform: none;
    }

    .add-button {
        min-width: 60px;
        color: white;
        background-color: #61AD4F;

        :hover {
            background-color: #65DD4F;
        }
    }

    .x-button {
        width: 40px;
    }
`