import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './boardListStyle.css';
import { starBoard, unStarBoard } from '../../redux/actions/personalBoardList';
import { createOn } from '../../redux/actions/createNewBoard';
// import moveObject from '../../function/moveObject.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import moveStarObject from '../../function/moveStarObject';

const BoardList = (props) => {

    const keyId = props.listName === 'Personal Boards' ? '1' : '2';

    const onDragEnd = (result) => {
        console.log('result');
        console.log(result);
        moveStarObject(props.personalBoardList, result.source.index, result.destination.index, props.dispatch);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={`list`} direction='horizontal'>
                {(provided, snapshot) => {
                    return (
                        <div
                            className={`${props.listName} board-list`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <div className={`${props.listName}-board-name board-name-group`}>
                                <i className={`board-icon fas fa-${props.icon}`}></i>
                                <p className={`${props.listName}-board board-name`}><b>{`${props.listName}`}</b></p>
                            </div>

                            {
                                props.boardListData
                                    .filter(board => board.id > 0)
                                    .map((board, index) => {

                                        const starredStyle = board.starred === true ? {
                                            transform: 'translateX(0px)',
                                            opacity: '100',
                                            color: 'khaki',
                                        } : {};

                                        return (
                                            <Draggable
                                                key={`${keyId}-${index}`}
                                                draggableId={`${index + 1}`}
                                                index={index}
                                                isDragDisabled={props.listName !== 'Starred Boards'}
                                            >
                                                {
                                                    (provided, snapshot) => {
                                                        return (
                                                            <React.Fragment>
                                                                <div
                                                                    className='board-list-item-box'
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <Link to={board.href} className='board-list-item' style={{ background: `${board.background}` }}>
                                                                        <p><b>{board.name}</b></p>
                                                                        <Link to=''>
                                                                            {
                                                                                board.starred === false ?
                                                                                    /// click to star board.
                                                                                    <i className='board-star fas fa-star' onClick={() => props.dispatch(starBoard(board.id))} style={starredStyle}></i>
                                                                                    :
                                                                                    /// click to unstar board.
                                                                                    <i className='board-star fas fa-star' onClick={() => props.dispatch(unStarBoard(board.id))} style={starredStyle}></i>
                                                                            }
                                                                        </Link>
                                                                    </Link>
                                                                </div>

                                                                {
                                                                    props.boardListData.length - 2 === index && props.listName === 'Personal Boards' &&
                                                                    <div className='board-list-item-box' key={`${keyId}-${index}`}>
                                                                        <div onClick={() => props.dispatch(createOn())} className='board-list-item create-new-board-button' style={{ background: 'rgb(241, 241, 241)', textAlign: 'center' }}>
                                                                            <p style={{ marginTop: '38px', color: 'slategray', marginLeft: '9px', fontSize: '14px' }}>Create new board</p>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </React.Fragment>
                                                        )
                                                    }
                                                }
                                            </Draggable>
                                        );
                                    })
                            }

                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        </DragDropContext>
    );
}

const mapStateToProps = (state) => ({
    personalBoardList: state.personalBoardList
})

const BoardListWithConnect = connect(mapStateToProps)(BoardList);

export default BoardListWithConnect;