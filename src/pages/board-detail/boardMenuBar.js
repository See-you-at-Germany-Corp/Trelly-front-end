import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import './boardMenuBarStyle.css';
import { starBoard, unStarBoard } from '../../redux/actions/starredBoardList.js';

const BoardMenuBar = (props) => {

    const starredBoardList = props.starredBoardList;

    const boardData = props.boardData;

    const boardIndex = starredBoardList.findIndex(data => data.id === boardData.id)
    const isStarredBoard = `${starredBoardList[boardIndex]}` !== 'undefined' && starredBoardList[boardIndex].starred_id > 0;

    const starredStyle = isStarredBoard === true ? {
        opacity: '100',
        color: 'khaki'
    } : {};

    return (
        <div className={`${boardData.name}-menu board-menu-bar`}>

            <div className='board-menu-left'>
                <div className='board-name-box'>
                    <p>{boardData.name}</p> 
                </div>

                <div className='board-star'>
                    <Link to='#' title='Click to star or unstar this board. Starred boards show up at the top of your board list.'>
                        {
                            isStarredBoard === true ?
                            /// click to unstar board.
                            <i className='board-star fas fa-star' onClick={() => props.dispatch(unStarBoard(boardData.id))} style={starredStyle}></i>
                            :
                            /// click to star board.
                            <i className='board-star fas fa-star' onClick={() => props.dispatch(starBoard(boardData.id, boardData))} style={starredStyle}></i>
                        }
                    </Link>
                </div>

                <SepLine />

                <div className='board-status'>
                    <P_BUTTON>Personal</P_BUTTON>
                </div>

                <SepLine />

                <div className='board-privilege'>
                    <P_BUTTON>
                        <i
                            className={`fas fa-${privilegeIcon[`${boardData.privilege}`]}`}
                            style={{ color: 'white', marginRight: '10px', fontSize: '12px' }}>
                        </i>
                        {boardData.privilege}
                    </P_BUTTON>
                </div>

                <SepLine />

                {/* wait to use avatar data from profile. */}
                <AvatarGroup className='board-avatar-box' max={5}>
                    <Avatar>WS</Avatar>
                    <Avatar>PB</Avatar> 
                </AvatarGroup>

                <div className='board-invite'>
                    <P_BUTTON>Invite</P_BUTTON>
                </div>

            </div>

            <div className='board-menu-right'>
            </div>

        </div>
    );
}

const mapStateToProps = (state) => ({
    starredBoardList: state.starredBoardList
})

const BoardMenuBarWithConnect = connect(mapStateToProps)(BoardMenuBar);

export default BoardMenuBarWithConnect;

/* --------------- const --------------- */

const privilegeIcon = {
    Private: 'lock',
    Public: 'globe-asia'
}

/* --------------- JSX --------------- */

const SepLine = () => {
    return (
        <span className='sep-line'></span>
    );
}

/* --------------- styled --------------- */

const P_BUTTON = styled.p`
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border-radius: 3px;
    padding: 7px 12px 7px 12px; 
    margin: 8px 0px 0px 0px; 
    font-size: 14px;

    &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.25);
    }

    &:active {
        background-color: rgba(255, 255, 255, 0.35);
    }
`;