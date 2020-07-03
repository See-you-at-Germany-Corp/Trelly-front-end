import React from 'react'

import Card from './board-card'
import * as ListStyle from './list-styled'
import PopoverContents from './popover-content'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import defaultLabel from '../../pages/board-detail/labelData'
import { BoardContext } from '../../context/board-context/board-context'
import { TextareaAutosize, Button, Popover, Divider, Avatar } from '@material-ui/core'

import Axios from 'axios'
import { URL } from '../../api/index'
import cookie from 'react-cookies'

const headers = {
    headers: {
        Authorization: `Bearer ${cookie.load('authen-token')}`
    }
}

const List = (props) => {
    const { boardState, boardDispatch } = React.useContext(BoardContext)
    const list = boardState.lists[props.index]

    // Edit listname & New Card state
    const [selectFocus, setSelectFocus] = React.useState(null)
    const listNameRef = React.useRef(null)
    const [listName, renameList] = React.useState({
        oldListName: list.name,
        newListName: list.name,
        editing: false
    })
    const newCardRef = React.useRef(null)
    const [newCardState, setNewCardState] = React.useState({
        name: '',
        labels: [],
        members: [],
        editing: false,
        position: null,
        listOrder: null,
    })

    // List popover & New card popover state
    const [anchorEl, setAnchorEl] = React.useState({
        name: '',
        type: null,
        open: false,
        content: 'LIST_MAIN',
        anchorElement: null,
    })

    React.useEffect(() => {
        if (selectFocus === 'list') {
            listNameRef.current.focus()
        }
        else if (selectFocus === 'card') {
            newCardRef.current.focus()
        }
    });

    /* --------------------------- List name fucntion --------------------------- */
    const handleChangeListName = e => {
        renameList({
            oldListName: listName.oldListName,
            newListName: e.target.value,
            editing: listName.editing
        })
    }
    const checkNewListName = e => {
        if (e.key !== 'Enter') return
        listNameRef.current.blur()
    }
    const listNameBlur = e => {
        setSelectFocus('')

        if (!listName.newListName.length || listName.oldListName === listName.newListName) {
            renameList({
                oldListName: listName.oldListName,
                newListName: listName.oldListName,
                editing: !listName.editing
            })
            return
        }

        renameList({
            oldListName: listName.newListName,
            newListName: listName.newListName,
            editing: !listName.editing
        })

        Axios.patch(
            `${URL}/board/my_list/${list.id}/`,
            { name: e.target.value },
            headers
        )
            .then((res) => {
                boardDispatch({
                    type: 'LIST_RENAME',
                    index: props.index,
                    name: res.data.name,
                })
            })
    }

    /* ---------------------------- New Card function --------------------------- */
    const handleNewCardName = e => {
        setNewCardState({
            ...newCardState,
            name: e.target.value,
            editing: newCardState.editing
        })
    }
    const newCardkeyCheck = e => {
        if (e.key === 'Enter') {
        }
        else if (e.key === 'Escape') {
            setNewCardState({
                ...newCardState,
                name: e.target.value,
                editing: !newCardState.editing
            })
        }
    }
    const setNewCardEdit = () => {
        setNewCardState({
            ...newCardState,
            name: newCardState.name,
            editing: true
        })
    }
    const setNewCardPosition = (listOrder, position) => {
        setNewCardState({
            ...newCardState,
            position: position,
            listOrder: listOrder
        })
    }

    const setNewCardMembers = (e, member) => {
        e.preventDefault()
        let newMembers = newCardState.members
        let index = newCardState.members.findIndex(item => item.id === member.id)

        if (index === -1)
            newMembers.push(member)
        else
            newMembers = newCardState.members.slice(0, index).concat(newCardState.members.slice(index + 1))

        setNewCardState({
            ...newCardState,
            members: newMembers
        })
    }

    const addLabel = index => {
        let newLabel = newCardState.labels
        newLabel.push(boardState.labels[index])

        setNewCardState({
            ...newCardState,
            labels: newLabel
        })
    }

    const delLabel = index => {
        let newLabel = newCardState.labels
        newLabel = newLabel.slice(0, index).concat(newLabel.slice(index + 1))
        setNewCardState({
            ...newCardState,
            labels: newLabel
        })
    }

    /* ----------------------------- Popver function ---------------------------- */
    const closeAnchor = () => {
        setAnchorEl({
            type: null,
            name: null,
            open: false,
            content: '',
            anchorElement: null,
        })
    }
    const setContent = (content, name) => {
        setAnchorEl({
            ...anchorEl,
            name: name,
            content: content,
        })
    }


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
                                className={`drag-target ${listName.editing ? 'hide' : ''}`}
                                onClick={() => {
                                    renameList({ ...listName, editing: listName.editing })
                                    setSelectFocus('list')
                                }}
                            />
                            <TextareaAutosize
                                rowsMax={5}
                                ref={listNameRef}
                                onBlur={listNameBlur}
                                value={listName.newListName}
                                onKeyPress={checkNewListName}
                                onChange={handleChangeListName}
                            />
                            <div>
                                <Button
                                    style={{ fontSize: 12 }}
                                    onClick={e => setAnchorEl({
                                        type: 'LIST',
                                        open: true,
                                        name: 'List Actions',
                                        content: 'LIST_MAIN',
                                        anchorElement: e.currentTarget,
                                    })} >
                                    <div className="fas fa-ellipsis-h" />
                                </Button>
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
                                        list.cards && list.cards.map((card, index) => {
                                            // console.log(card);
                                            
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
                                className={`add-composer ${!newCardState.editing ? '' : 'hide'}`}
                                onClick={() => {
                                    setNewCardState({ ...newCardState, editing: !newCardState.editing })
                                    setSelectFocus('card')
                                }}>
                                <i className="fas fa-plus" ></i> Add another card
                            </div>

                            <div className={`new-card-wrapper ${newCardState.editing ? '' : 'hide'}`}>
                                <div className='text-box-wrapper'>
                                    <div className='label-wrapper'>
                                        {newCardState.labels.map((item) => {
                                            return (
                                                <div
                                                    className='card-label'
                                                    key={`label${item.id}`}
                                                    style={{ backgroundColor: defaultLabel[item.color_id - 1].picture }} />
                                            )
                                        }
                                        )}
                                    </div>

                                    <TextareaAutosize
                                        rowsMax={7}
                                        ref={newCardRef}
                                        value={newCardState.name}
                                        onKeyDown={newCardkeyCheck}
                                        onChange={handleNewCardName}
                                        placeholder='Enter a title for this card.'
                                    />

                                    <div className='members-wrapper'>
                                        {newCardState.members.map((item) =>
                                            <Avatar className='member-avatar' key={'member-avt-' + item.id}>
                                                {item.picture === '' ? item.init : ''}
                                            </Avatar>
                                        )}
                                    </div>
                                </div>
                                <div className='add-card-wrapper'>
                                    <Button
                                        className='add-button'
                                        onClick={() => {
                                            setNewCardState({ ...newCardState, editing: !newCardState.editing })
                                        }}>
                                        Add card</Button>
                                    <div
                                        className='x-button'
                                        onClick={() => {
                                            setNewCardState({
                                                ...newCardState,
                                                name: '',
                                                editing: !newCardState.editing,
                                            })
                                        }}>
                                        <i className="fas fa-times" />
                                    </div>
                                    <div style={{ display: 'inline' }}>
                                        <Button
                                            className='ellipsis-button'
                                            onClick={e => setAnchorEl({
                                                type: 'NEW_CARD',
                                                open: true,
                                                name: 'Options',
                                                content: 'NEW_CARD_MAIN',
                                                anchorElement: e.currentTarget,
                                            })} >
                                            <div className="fas fa-ellipsis-h" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Popover
                                open={anchorEl.open}
                                anchorEl={anchorEl.anchorElement}
                                onClose={closeAnchor}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}>
                                <ListStyle.PopOverList>
                                    <div className='pop-over-header'>
                                        <button
                                            className={`button back ${anchorEl.content.match('MAIN') ? 'hide' : ''}`}
                                            onClick={() => setAnchorEl({
                                                ...anchorEl,
                                                name: anchorEl.type === 'LIST' ? 'List Actions' : 'Options',
                                                content: `${anchorEl.type}_MAIN`
                                            })}>
                                            <div className="fas fa-chevron-left" />
                                        </button>
                                        <div className='list-act'>
                                            {anchorEl.name}
                                        </div>
                                        <button className='button close' onClick={closeAnchor}><i className="fas fa-times" /></button>
                                    </div>

                                    <Divider variant='middle' />

                                    <div className='pop-over-content'>
                                        <PopoverContents
                                            type={anchorEl.content}
                                            closeAnchor={closeAnchor}
                                            setContent={setContent}
                                            listOrder={props.index + 1}
                                            newCard={{
                                                setNewCardEdit,
                                                setNewCardPosition,
                                                setNewCardMembers,
                                                addLabel,
                                                delLabel
                                            }}
                                            lists={boardState.lists}
                                            members={boardState.members}
                                            listLabels={boardState.labels} />
                                    </div>
                                </ListStyle.PopOverList>
                            </Popover>
                        </ListStyle.AddCard>
                    </ListStyle.ListContent>
                </ListStyle.ListWrapper>
            )}
        </Draggable>
    )
}

export default List