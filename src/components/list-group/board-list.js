import React, { useContext, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
// import Draggable from 'react-draggable'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { BoardContext } from '../../context/board-context/board-context'
import Card from './board-card'
import { TextareaAutosize, Button, Popover, Divider, } from '@material-ui/core'


export default function List(props) {
    const { boardState, boardDispatch } = useContext(BoardContext)
    const list = boardState.lists[props.index]

    // Edit listname & New Card
    const listNameRef = useRef(null)
    const [edittingListName, setEdittingListName] = useState(false)
    const [listName, renameList] = useState({
        oldListName: list.name,
        newListName: list.name,
    })

    const newCardRef = useRef(null)
    const [newCardName, setNewCardName] = useState('')
    const [edittingCardName, setEdittingCardName] = useState(false)

    const [selectFocus, setSelectFocus] = useState(null)

    // List popover & New card popover 
    const [anchorEl, setAnchorEl] = useState({
        listOpen: false,
        newCardOpen: false,
        element: null
    })

    useEffect(() => {
        if (selectFocus === 'list') {
            listNameRef.current.focus()
        }
        else if (selectFocus === 'card') {
            newCardRef.current.focus()
        }
    });

    const handleChangeName = e => {
        renameList({
            oldListName: listName.oldListName,
            newListName: e.target.value,
        })
    }
    const handleNewCardName = e => {
        setNewCardName(e.target.value)
    }

    const listNameBlur = e => {
        setEdittingListName(!edittingListName)
        setSelectFocus('')

        if (!listName.newListName.length) {
            renameList({
                oldListName: listName.oldListName,
                newListName: listName.oldListName
            })
            return
        }

        renameList({
            oldListName: listName.newListName,
            newListName: listName.newListName
        })

        boardDispatch({
            type: 'CHANGE_LIST_NAME',
            index: props.index,
            name: e.target.value,
        })

        // send new name to server
    }

    const checkNewListName = e => {
        if (e.key !== 'Enter') return
        listNameRef.current.blur()
    }

    const newCardkeyCheck = e => {
        if (e.key === 'Enter') {
            createNewCard()
        }
        else if (e.key === 'Escape') {
            setNewCardName('')
            setEdittingCardName(!edittingCardName)
        }
    }

    const setAnchor = (e, type) => {
        setAnchorEl({
            listOpen: type === 'LIST',
            newCardOpen: type === 'NEW_CARD',
            element: e.currentTarget
        })
    }

    const closeAnchor = type => {
        setAnchorEl({
            listOpen: false,
            newCardOpen: false,
            element: null
        })
    }

    const createNewCard = () => {
        // do something
    }


    console.log('re-render');

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
                                className={`drag-target ${edittingListName ? 'hide' : ''}`}
                                onClick={() => {
                                    setEdittingListName(!edittingListName)
                                    setSelectFocus('list')
                                }}
                            />
                            <TextareaAutosize
                                rowsMax={5}
                                ref={listNameRef}
                                onBlur={listNameBlur}
                                value={listName.newListName}
                                onKeyPress={checkNewListName}
                                onChange={handleChangeName}
                            />
                            <div>
                                <Button onClick={e => setAnchor(e, 'LIST')} style={{ fontSize: 12 }}>
                                    <div className="fas fa-ellipsis-h" />
                                </Button>
                                <Popover
                                    open={anchorEl.listOpen}
                                    anchorEl={anchorEl.element}
                                    onClose={() => closeAnchor('LIST')}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <PopOverList>
                                        <div className='pop-over-header'>
                                            <div className='list-act'>List Actions</div>
                                            <div className='x-button' onClick={() => closeAnchor('LIST')}>X</div>
                                        </div>

                                        <Divider variant='middle' />

                                        <div className='pop-over-content'>
                                            <ul>
                                                <li>Add Card</li>
                                                <li>Copy List</li>
                                                <li>Move List</li>
                                                <li>Watch</li>
                                            </ul>

                                            <Divider variant='middle' />

                                            <ul>
                                                <li>Sort By</li>
                                            </ul>

                                            <Divider variant='middle' />

                                            <ul>
                                                <li>Move All Card in This List</li>
                                                <li>Archive All Card in This List</li>
                                            </ul>

                                            <Divider variant='middle' />

                                            <ul>
                                                <li>Archive This List</li>
                                            </ul>

                                        </div>
                                    </PopOverList>
                                </Popover>
                            </div>
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
                            <div
                                className={`add-composer ${!edittingCardName ? '' : 'hide'}`}
                                onClick={() => {
                                    setEdittingCardName(!edittingCardName)
                                    setSelectFocus('card')
                                }}>
                                <i className="fas fa-plus" ></i> Add another card
                            </div>

                            <div className={`new-card-wrapper ${edittingCardName ? '' : 'hide'}`}>
                                <TextareaAutosize
                                    rowsMax={7}
                                    ref={newCardRef}
                                    value={newCardName}
                                    onKeyDown={newCardkeyCheck}
                                    onChange={handleNewCardName}
                                    placeholder='Enter a title for this card.'
                                />
                                <div className='add-card-wrapper'>
                                    <Button
                                        className='add-button'
                                        onClick={() => {
                                            setEdittingCardName(!edittingCardName)
                                            createNewCard()
                                        }}>
                                        Add card</Button>
                                    <div
                                        className='x-button'
                                        onClick={() => {
                                            setEdittingCardName(!edittingCardName)
                                            setNewCardName('')
                                        }}>
                                        <i className="fas fa-times" />
                                    </div>
                                    <div style={{ display: 'inline' }}>
                                        <Button className='ellipsis-button' onClick={e => setAnchor(e, 'NEW_CARD')}>
                                            <div className="fas fa-ellipsis-h" />
                                        </Button>
                                        <Popover
                                            open={anchorEl.newCardOpen}
                                            anchorEl={anchorEl.element}
                                            onClose={() => closeAnchor('NEW_CARD')}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <PopOverList>
                                                <div className='pop-over-header'>
                                                    <div className='list-act'>Options</div>
                                                    <div className='x-button' onClick={() => closeAnchor('LIST')}>X</div>
                                                </div>

                                                <Divider variant='middle' />

                                                <div className='pop-over-content'>
                                                    <ul>
                                                        <li>Member</li>
                                                        <li>Label</li>
                                                        <li>Position</li>
                                                    </ul>
                                                </div>
                                            </PopOverList>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
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
        background-color: transparent;

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
        
        border: 0;
        resize: none;
        padding: 10px;
        font-size: 10px;
        background-color: white;
    }

    .MuiButton-root {
        min-width: 30px;
        text-transform: none;
    }

    .add-card-wrapper {
        height: 40px;
    }

    .add-button {
        min-width: 60px;
        min-height: 40px;
        overflow: hidden;
        display: inline-block;

        color: white;
        background-color: #61AA4F;

        :hover {
            background-color: #65BF4A;
        }
    }
    
    .x-button {
        min-width: 40px;
        min-height: 40px;

        color: #5e6c84;
        font-size: 15px;
        line-height: 40px;
        text-align: center;

        display: inline-block;

        :hover {
            color: #405070;
            cursor: pointer;
        }
    }

    .ellipsis-button {
        width: 50px;
        min-height: 30px;
        margin-top: 10px;

        float: right;
        color: #5e6c84;
        font-size: 15px;
        text-align: center;
    }

    .hide {
        display: none;
    }
`

const PopOverList = styled.div`
    width: 280px;
    font-size: 14px;

    padding-bottom: 10px;

    .pop-over-header {
        text-align: center;
        position: relative;

        color: #5e6c84;
    }

    .pop-over-header .list-act {
        line-height: 40px;
    }

    .pop-over-header .x-button {
        width: 40px;
        height: 40px;
        line-height: 40px;

        top: 0;
        right: 0;
        position: absolute;

        cursor: pointer;

        :hover {
            color: #1e2c44;
        }
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    
    li {
        cursor: pointer;
        line-height: 30px;
        padding-left: 10%;

        :hover {
            background-color: rgba(9,30,66,.08);
        }
    }
`