import React from 'react'
import defaultLabel from '../../pages/board-detail/labelData'
import { Divider, FormControl, Select, MenuItem, InputLabel, Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'

const PopoverContents = (props) => {
    const [copyListName, setCopyListName] = React.useState(props.lists[props.listOrder - 1].name)
    const [listPosition, setListPosition] = React.useState(props.listOrder)
    const [newCardOption, setNewCardOption] = React.useState({
        destListOrder: props.listOrder,
        destPosition: props.lists[props.listOrder - 1].cards.length + 1
    })
    const [cardMembers, setCardMembers] = React.useState({
        search: '',
        members: []
    })
    const [label, setLabel] = React.useState({
        search: '',
        labels: [],
    })

    const addLabelToNewCard = (e, index, id) => {
        e.preventDefault()
        let newLabels = label.labels
        let newLabelIndex = label.labels.indexOf(id)

        if (newLabelIndex === -1) {
            newLabels.push(props.listLabels[index].id)
            props.newCard.addLabel(index)
        }
        else {
            newLabels = newLabels.slice(0, newLabelIndex).concat(newLabels.slice(newLabelIndex + 1))
            props.newCard.delLabel(newLabelIndex)
        }
        setLabel({
            ...label,
            labels: newLabels
        })
    }

    switch (props.type) {
        // List Actions
        case 'LIST_MAIN':
            return (
                <>
                    <ul>
                        <li onClick={() => {
                            props.closeAnchor()
                            props.newCard.setNewCardEdit()
                        }}>
                            Add Card
                        </li>
                        <li onClick={() => props.setContent('COPY_LIST', 'Copy List')}>Copy List</li>  {/* Create new list */}
                        <li onClick={() => props.setContent('MOVE_LIST', 'Move List')}>Move List</li>  {/* Set Position of list (only in this board)*/}
                    </ul>

                    <Divider variant='middle' />

                    <ul>
                        <li onClick={() => props.deleteList()}>Archive This List</li>
                    </ul>
                </>
            )
        case 'COPY_LIST':
            return (
                <>
                    <div className='content-name'>Name</div>
                    <textarea
                        value={copyListName}
                        onChange={e => setCopyListName(e.target.value)} />
                    <button className='green-button'>Create List</button>
                </>
            )
        case 'MOVE_LIST':
            return (
                <>
                    <FormControl variant="filled" className='select-wrapper' size='small'>
                        <InputLabel>Position</InputLabel>
                        <Select
                            label='Position'
                            value={listPosition}
                            onChange={e => setListPosition(e.target.value)}>
                            {
                                props.lists.map((item) => <MenuItem key={'move-list-option-' + item.order_number} value={item.order_number} >{item.order_number}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <button className='green-button'>Move</button>
                </>
            )
        case 'ARCHIVE_LIST':
            return

        // New Card Options
        case 'NEW_CARD_MAIN':
            return (
                <>
                    <ul>
                        <li onClick={() => props.setContent('MEMBER', 'Members')}>Members</li>
                        <li onClick={() => props.setContent('LABEL', 'Labels')}>Labels</li>
                        <li onClick={() => props.setContent('POSITION', 'Select Position')}>Position</li>
                    </ul>
                </>
            )
        case 'MEMBER':
            return (
                <>
                    <input
                        type='text'
                        className='search-field'
                        value={cardMembers.search}
                        placeholder='Search Members'
                        onChange={e => setCardMembers({ ...cardMembers, search: e.target.value })} />
                    <div className='content-name'>BOARD MEMBERS</div>
                    {
                        props.members.filter((item) =>
                            item.full_name.toLocaleLowerCase().includes(cardMembers.search.toLocaleLowerCase()) === true
                        ).map((item) => (
                            <a
                                href='#'
                                className='member-item-wrapper'
                                key={item.full_name}
                                onClick={e => props.newCard.setNewCardMembers(e, item)}
                            >
                                <Avatar className='member-avatar'>{item.picture === '' ? item.init : ''}</Avatar>
                                <div className='member-name' style={{ maxWidth: cardMembers.members.indexOf(item.id) !== -1 ? 180 : 220 }}>{item.full_name}</div>
                                {cardMembers.members.indexOf(item.id) !== -1 && <div className='member-check'></div>}
                            </a>
                        ))
                    }
                </>
            )
        case 'LABEL':
            return (
                <>
                    <input
                        type='text'
                        className='search-field'
                        value={label.search}
                        placeholder='Search Label'
                        onChange={e => setLabel({ ...label, search: e.target.value })} />
                    <div className='content-name'>LABELS</div>
                    <div className='label-group' >
                        {
                            props.listLabels.map((item, i) => {
                                return (
                                    <div className='label-wrapper' key={`label-${item.id}`}>
                                        <div
                                            className='hover-label'
                                            style={{ backgroundColor: defaultLabel[item.color_id - 1].picture }} />
                                        <Link
                                            href='#'
                                            className='main-label'
                                            style={{ backgroundColor: defaultLabel[item.color_id - 1].picture }}
                                            onClick={e => addLabelToNewCard(e, i, item.id)}>
                                            <p>{item.name}</p>
                                            {label.labels.indexOf(item.id) !== -1 && <div className='label-check'><i className="fas fa-check" /></div>}
                                        </Link>
                                        <Link
                                            href='#'
                                            className='edit-label'><i className="far fa-edit" />
                                        </Link>
                                    </div>)
                            })
                        }
                    </div>
                    <button className='create-label-button'>Create New Label</button>
                </>
            )
        case 'POSITION':
            return (
                <>
                    <div className='select-wrapper'>
                        <FormControl variant="filled" style={{ minWidth: 165, marginRight: 8 }} size='small'>
                            <InputLabel>List</InputLabel>
                            <Select
                                label='List'
                                value={newCardOption.destListOrder}
                                onChange={e => {
                                    setNewCardOption({
                                        destListOrder: e.target.value,
                                        destPosition: props.lists[e.target.value - 1].cards.length + 1
                                    })
                                    props.newCard.setNewCardPosition(e.target.value, props.lists[e.target.value - 1].cards.length + 1)
                                }}>
                                {
                                    props.lists.map((item, i) => <MenuItem key={'new-card-list-' + i} value={item.order_number} >{item.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>

                        <FormControl variant="filled" style={{ minWidth: 87 }} size='small'>
                            <InputLabel>Position</InputLabel>
                            <Select
                                label='Position'
                                value={newCardOption.destPosition}
                                onChange={e => {
                                    setNewCardOption({ ...newCardOption, destPosition: e.target.value })
                                    props.newCard.setNewCardPosition(newCardOption.destListOrder, e.target.value)
                                }}>
                                {
                                    props.lists[newCardOption.destListOrder - 1].cards.map((item, i) => <MenuItem key={'new-card-position-' + i + 1} value={i + 1} >{i + 1}</MenuItem>)
                                }
                                <MenuItem value={props.lists[newCardOption.destListOrder - 1].cards.length + 1}>{props.lists[newCardOption.destListOrder - 1].cards.length + 1}</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </>
            )

        default:
            return <></>
    }
}

export default PopoverContents