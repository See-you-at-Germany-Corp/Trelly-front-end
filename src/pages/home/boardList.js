import React from 'react';
import { Link } from 'react-router-dom';

import './boardListStyle.css';
import { starBoard, unStarBoard } from '../../redux/actions/personalBoardList';

const BoardList = (props) => {

    return (
        <div className={`${props.listName}-board-list board-list`}>
            <div className={`${props.listName}-board-name board-name-group`}>
                <i className={`board-icon fas fa-${props.icon}`}></i>
                <p className={`${props.listName}-board board-name`}>{`${props.listName}`}</p>
            </div>

            {
                props.boardListData.map((board, index) => {

                    const starredStyle = board.starred === true ? {
                        transform: 'translateX(0px)',
                        opacity: '100',
                        color: 'khaki'
                    } : {};

                    return (
                        <>
                            <Link to={board.href} className='board-list-item' style={{ background: `${board.background}` }}>
                                <p>{board.name}</p>

                                {
                                    board.starred === false ?
                                        /// click to star board.
                                        <i className='board-star fas fa-star' onClick={() => props.dispatch(starBoard(board.id))} style={starredStyle}></i>
                                        :
                                        /// click to unstar board.
                                        <i className='board-star fas fa-star' onClick={() => props.dispatch(unStarBoard(board.id))} style={starredStyle}></i>
                                }

                            </Link>

                            {
                                /// create new personal board card.
                                props.boardListData.length - 1 === index && props.listName === 'Personal Boards' &&
                                <Link to='' className='board-list-item' style={{ background: 'lightGray', textAlign: 'center' }}>
                                    <p style={{ marginTop: '32.5px', color: 'black' }}>Create new board</p> 
                                </Link>
                            }
                        </>
                    );
                })
            }

        </div>
    );
}

export default BoardList;