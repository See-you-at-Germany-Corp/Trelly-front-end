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
            if (result.destination.droppableId === result.source.droppableId) {
                boardDispatch({
                    type: 'MOVE_CARDS_IN_LIST',
                    sourceIndex: result.source.index,
                    destIndex: result.destination.index,
                    listId: result.destination.droppableId
                })
                return
            }

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

            Axios.post(
                `${URL}/board/my_list/${result.draggableId.match(RegExp(/\d+/))[0]}/drag_list/`,
                form,
                headers
            )
        }
    }

    let sortedLists = boardState.lists
    useMemo(() => {
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
    height: calc(90vh - 40px);
    max-width: calc(100vw - 10px);

    padding-left: 10px;
    padding-right: 20px;
    margin: 10px 0px 10px 10px;
    
    display: flex;
    overflow-x: auto;

    background-color: grey;

    ::-webkit-scrollbar {
        background-color: red;
    }
`

const BoardBody = styled.div`
    overflow-x: hidden;
    background-color: transparent;
`


