import React, { useContext, useMemo } from 'react'
import styled from 'styled-components';

import List from './board-list'
import CreateList from './create-list'
import { BoardContext } from '../../context/board-context/board-context'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Axios from 'axios'
import { URL } from '../../api/index'
import cookie from 'react-cookies'

const headers = {
    headers: {
        Authorization: `Bearer ${cookie.load('authen-token')}`
    }
}

export default function ListGroup(props) {
    const { boardState, boardDispatch } = useContext(BoardContext)

    const onDragEnd = result => {
        const form = new FormData()

        if (!result.destination) return

        if (result.type === 'card') {
            let shift
            const listShift = boardState.lists.findIndex(item => item.id === parseInt(result.destination.droppableId.match(/\d+/))) - boardState.lists.findIndex(item => item.id === parseInt(result.source.droppableId.match(/\d+/)))

            if (result.destination.droppableId === result.source.droppableId) {
                shift = result.destination.index - result.source.index
                form.append('card_shift', shift)
                form.append('list_shift', listShift)
                boardDispatch({
                    type: 'MOVE_CARDS_IN_LIST',
                    sourceIndex: result.source.index,
                    destIndex: result.destination.index,
                    listId: result.destination.droppableId
                })
                Axios.post(
                    `${URL}/board/my_card/${result.draggableId.match(/\d+/)[0]}/drag_card/`,
                    form,
                    headers
                )
                return
            }

            shift = result.destination.index + 1
            form.append('card_shift', shift)
            form.append('list_shift', listShift)
            Axios.post(
                `${URL}/board/my_card/${result.draggableId.match(/\d+/)[0]}/drag_card/`,
                form,
                headers
            )
            boardDispatch({
                type: 'MOVE_CARDS_OVER_LIST',
                source: result.source,
                dest: result.destination,
                item: result.draggableId
            })
        }
        else {
            form.append('shift', result.destination.index - result.source.index)

            boardDispatch({
                type: 'MOVE_LIST',
                sourceIndex: result.source.index,
                destIndex: result.destination.index,
            })
            boardDispatch({
                type: 'OVERRIDE_LISTS',
                newLists: boardState.lists.sort((a, b) => { return a.order_number - b.order_number })
            })

            Axios.post(
                `${URL}/board/my_list/${result.draggableId.match(RegExp(/\d+/))[0]}/drag_list/`,
                form,
                headers
            )
        }
    }

    let sortedLists = boardState.lists
    useMemo(() => {
        //eslint-disable-next-line
        sortedLists = boardState.lists.sort((a, b) => { return a.order_number - b.order_number })
    }, [sortedLists])

    return (
        <BoardBody>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="list-group"
                    direction="horizontal"
                    type="list"
                >
                    {provided => (
                        <>
                            <StyledListContainer
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {
                                    sortedLists && sortedLists.map((list, index) => {
                                        return (
                                            <List
                                                index={index}
                                                key={`list-${list.id}`}
                                                listId={`list-${list.id}`}
                                            />
                                        )
                                    })
                                }
                                <CreateList />
                                <div style={{ minWidth: 10, height: 10 }}></div>
                                {provided.placeholder}
                            </StyledListContainer>
                        </>
                    )}
                </Droppable>
            </DragDropContext>
        </BoardBody>
    )
}

const StyledListContainer = styled.div`
    max-height: calc(92vh - 40px);
    max-width: calc(100vw - 10px);

    padding-left: 10px;
    padding-right: 20px;
    margin: 10px 0px 10px 10px;
    
    display: flex;
    overflow-x: auto;

    /* background-color: red; */

    ::-webkit-scrollbar {
        width: 15px;
        border-radius: 10px;
        background: rgba(9,30,66,.08);
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(9,30,66,.08);
    }
`

const BoardBody = styled.div`
    overflow-x: hidden;
    background-color: transparent;
`


