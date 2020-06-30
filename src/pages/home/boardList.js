import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import './boardListStyle.css';

import { starBoard, unStarBoard } from '../../redux/actions/starredBoardList.js';
import { delRecentlyBoard, addRecentlyBoard } from '../../redux/actions/recentlyBoard.js';
import { createOn } from '../../redux/actions/createNewBoard';
import { URL, useAuthen } from '../../api/index.js';
import { starToggle } from '../../api/board.js';
import moveStarObject from '../../function/moveStarObject';

const SortableItem = SortableElement((props) => {

    const index = props.boardIndex;
    const board = props.board;
    const starredStyle = props.starredStyle;
    const keyId = props.keyId;
    const boardHref = props.boardHref;
    const isStarredBoard = props.isStarredBoard;

    const authenHeader = useAuthen();

    function starApi (boardId) { 
        axios.post(`${URL}${starToggle(boardId)}`, {}, authenHeader)  
    }

    function starHandler () { 
        props.dispatch(starBoard(board.id, board))
        props.dispatch(delRecentlyBoard(board.id));
    }

    function unStarHandler () { 
        props.dispatch(unStarBoard(board.id, board))
        props.dispatch(addRecentlyBoard(board));
    }

    return (
        <React.Fragment>
            <BoardContainer className='board-list-item-box' style={{ background: `${board.color_code === '' ? '#BBBBBB' : `${board.color_code}`}` }}>
                <BoardSmallBox to={boardHref} className='board-list-item'>
                    <p><b>{board.name}</b></p>
                    <Link 
                        to='#' 
                        title='Click to star or unstar this board. Starred boards show up at the top of your board list.'
                        onMouseDown={() => starApi(board.id)}
                    >
                        {
                            isStarredBoard === true ?
                                /// click to unstar board.
                                <i className='board-star fas fa-star' onClick={() => unStarHandler()} style={starredStyle}></i>
                                :
                                /// click to star board.
                                <i className='board-star fas fa-star' onClick={() => starHandler()} style={starredStyle}></i>
                        }
                    </Link>
                </BoardSmallBox>
            </BoardContainer>

            {
                props.boardListData.length - 1 === index && props.listName === 'Personal Boards' &&
                <BoardContainer className='board-list-item-box' key={`${keyId}-${index}`}>
                    <BoardSmallBox to='#' onClick={() => props.dispatch(createOn())} className='board-list-item create-new-board-button' style={{ background: 'rgb(241, 241, 241)', textAlign: 'center' }}>
                        <p style={{ marginTop: '38px', color: 'slategray', marginLeft: '9px', fontSize: '14px' }}>Create new board</p>
                    </BoardSmallBox>
                </BoardContainer>
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
    const authenHeader = useAuthen();

    const onSortEnd = ({ oldIndex, newIndex }) => {
        moveStarObject(starredBoardList, oldIndex, newIndex, props.dispatch, authenHeader);
    }

    return (
        <SortableList
            starredBoardList={starredBoardList}
            keyId={keyId}
            axis={'xy'}
            onSortEnd={onSortEnd}
            helperClass={'.help'}
            distance={10}
            {...props}
        />
    );
}

/* ------------------------- Styled --------------------------- */

const BoardContainer = styled.div` 
    width: 21%;
    display: flex;
    flex-wrap: wrap; 
    margin: 10px 0px 8px 18px;  
    border-radius: 3px;

    &:hover {
        filter: brightness(95%); 
        cursor: pointer;
    } 
`

const BoardSmallBox = styled(Link)` 
    height: 95px;  
    width: 100%;    
    text-decoration: none; 
    border-radius: 3px;  
    -webkit-user-drag: none;

    & > p {
        color: white;  
        padding: 0;
        margin: 5px 10px 0px 10px; 
        word-break: break-all; 
        min-height: 50%; 
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
        user-select: none;
    } 

    & > a {
        -webkit-user-drag: none;
    } 
`

/* ------------------------- Redux --------------------------- */

const mapStateToProps = (state) => ({
    personalBoardList: state.personalBoardList,
    starredBoardList: state.starredBoardList
})

const BoardListWithConnect = connect(mapStateToProps)(BoardList);

export default BoardListWithConnect;