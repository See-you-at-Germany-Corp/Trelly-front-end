import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import './boardListStyle.css';

import { starBoard, unStarBoard, overWriteStarBoard } from '../../redux/actions/starredBoardList.js';
import { createOn } from '../../redux/actions/createNewBoard'; 
import moveObject from '../../function/moveObject.js';
import moveStarObject from '../../function/moveStarObject';

const SortableItem = SortableElement((props) => {
  
    const index = props.boardIndex;
    const board = props.board;
    const starredStyle = props.starredStyle; 
    const keyId = props.keyId;
    const boardHref = props.boardHref;
    const isStarredBoard = props.isStarredBoard;

    return (
        <React.Fragment>
            <div className='board-list-item-box'>
                <Link to={boardHref} className='board-list-item' style={{ background: `${board.picture}` }}>
                    <p><b>{board.name}</b></p>
                    <Link to='#' title='Click to star or unstar this board. Starred boards show up at the top of your board list.'>
                        {
                            isStarredBoard === true ?
                                /// click to unstar board.
                                <i className='board-star fas fa-star' onClick={() => props.dispatch(unStarBoard(board.id))} style={starredStyle}></i>
                                :
                                /// click to star board.
                                <i className='board-star fas fa-star' onClick={() => props.dispatch(starBoard(board.id, board))} style={starredStyle}></i>
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
});

const SortableList = SortableContainer((props) => {

    const keyId = props.keyId;
    const starredBoardList = props.starredBoardList;

    return (
        <div className={`${props.listName} board-list`}>
            <div className={`${props.listName}-board-name board-name-group`}>
                <i className={`board-icon fas fa-${props.icon}`}></i>
                <p className={`${props.listName}-board board-name`}><b>{`${props.listName}`}</b></p>
            </div>

            {
                props.boardListData
                    .filter(board => board.id > 0)
                    .map((board, index) => {

                        const boardHref = `/${board.id}/${board.name}`;
                        const boardIndex = starredBoardList.findIndex(data => data.id === board.id)
                        const isStarredBoard = `${starredBoardList[boardIndex]}` !== 'undefined' && starredBoardList[boardIndex].starred_id > 0;

                        const starredStyle = isStarredBoard === true ? {
                            transform: 'translateX(0px)',
                            opacity: '100',
                            color: 'khaki',
                        } : {};

                        return (
                            <SortableItem 
                                key={`item-${index}`} 
                                index={index}
                                sortIndex={index}
                                boardIndex={index}  
                                board={board}
                                starredStyle={starredStyle} 
                                keyId={keyId}
                                boardHref={boardHref}
                                isStarredBoard={isStarredBoard}
                                disabled={props.listName !== 'Starred Boards'}
                                {...props}
                            />
                        )
                        
                    })
            }

        </div> 
    );
});

const BoardList = (props) => {

    const keyId = props.listName === 'Personal Boards' ? '1' : '2'; 
    const starredBoardList = props.starredBoardList;

    const onSortEnd = ({ oldIndex, newIndex }) => {
        moveStarObject(starredBoardList, oldIndex, newIndex, props.dispatch);
    }

    return (
        <SortableList  
            starredBoardList={starredBoardList}
            keyId={keyId}
            axis={'xy'}  
            onSortEnd={onSortEnd}
            {...props} 
        />
    );
}

const mapStateToProps = (state) => ({
    personalBoardList: state.personalBoardList,
    starredBoardList: state.starredBoardList
})

const BoardListWithConnect = connect(mapStateToProps)(BoardList);

export default BoardListWithConnect;