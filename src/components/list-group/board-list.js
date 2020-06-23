import React from 'react'

import { Droppable, Draggable } from 'react-beautiful-dnd'
import { BoardContext } from '../../context/board-context/board-context'
import Card from './board-card'
import { TextareaAutosize, Button, Popover, Divider, } from '@material-ui/core'
import * as ListStyle from './list-styled'


export default function List(props) {
    const { boardState, boardDispatch } = React.useContext(BoardContext)
    const list = boardState.lists[props.index]

    // Edit listname & New Card
    const listNameRef = React.useRef(null)
    const [edittingListName, setEdittingListName] = React.useState(false)
    const [listName, renameList] = React.useState({
        oldListName: list.name,
        newListName: list.name,
    })

    const newCardRef = React.useRef(null)
    const [newCardName, setNewCardName] = React.useState('')
    const [edittingCardName, setEdittingCardName] = React.useState(false)

    const [selectFocus, setSelectFocus] = React.useState(null)

    // List popover & New card popover 
    const [anchorEl, setAnchorEl] = React.useState({
        listOpen: false,
        newCardOpen: false,
        element: null
    })

    React.useEffect(() => {
        if (selectFocus === 'list') {
            listNameRef.current.focus()
        }
        else if (selectFocus === 'card') {
            newCardRef.current.focus()
        }
        if (edittingCardName) {
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

    console.log('re-render', ListStyle);

    return (
        <Draggable draggableId={props.listId} index={props.index}>
            {(provided) => (
                <ListStyle.ListWrapper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <ListStyle.ListContent>
                        <ListStyle.HeaderField {...provided.dragHandleProps}>
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
                                    <ListStyle.PopOverList>
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
                                    </ListStyle.PopOverList>
                                </Popover>
                            </div>
                        </ListStyle.HeaderField>

                        <Droppable droppableId={props.listId} type='card'>
                            {(provided, snapshot) => (
                                <ListStyle.CardList
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
                                </ListStyle.CardList>
                            )}
                        </Droppable>
                        <ListStyle.AddCard>
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
                                            <ListStyle.PopOverList>
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
                                            </ListStyle.PopOverList>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </ListStyle.AddCard>
                    </ListStyle.ListContent>
                </ListStyle.ListWrapper>
            )}
        </Draggable>
    )
}
