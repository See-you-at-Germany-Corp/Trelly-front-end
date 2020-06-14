import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import './boardMenuBarStyle.css';
import { starBoard, unStarBoard } from '../../redux/actions/starredBoardList.js';
import { memberOverWrite, /*changeCurrentBoard*/ } from '../../redux/actions/currentBoard.js';
import { BoardContext } from '../../context/board-context/board-context';

const BoardMenuBar = (props) => {

    // const [isOverWrite, setIsOverWrite] = React.useState(false);
    const [isReordered, setIsReordered] = React.useState(false);

    const starredBoardList = props.starredBoardList;

    /// send api to get real board detail from backend.
    /// overwrite data in currentBoard.
    // if (isOverWrite === false) {
    //     props.dispatch(changeCurrentBoard(/*data from backend.*/));
    // }

    const { boardState } = useContext(BoardContext)

    const boardIndex = starredBoardList.findIndex(data => data.id === boardState.id)
    const isStarredBoard = `${starredBoardList[boardIndex]}` !== 'undefined' && starredBoardList[boardIndex].starred_id > 0;

    const starredStyle = isStarredBoard === true ? {
        opacity: '100',
        color: 'khaki'
    } : {};

    /// wait to use redux.
    let myId = 2;  /// mockup myId.
    /// reorder members.
    if (isReordered === false) {
        props.dispatch(memberOverWrite(memberSortByInit(boardState.members, myId)));
        setIsReordered(true);
    } 

    return (
        <div className={`${boardState.name}-menu board-menu-bar`}>

            <div className='board-menu-left'>
                <div className='board-name-box'>
                    <p>{boardState.name}</p> 
                </div>

                <div className='board-star'>
                    <Link to='#' title='Click to star or unstar this board. Starred boards show up at the top of your board list.'>
                        {
                            isStarredBoard === true ?
                            /// click to unstar board.
                            <i className='fas fa-star' onClick={() => props.dispatch(unStarBoard(boardState.id))} style={starredStyle}></i>
                            :
                            /// click to star board.
                            <i className='fas fa-star' onClick={() => props.dispatch(starBoard(boardState.id, boardState))} style={starredStyle}></i>
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
                        Private
                    </P_BUTTON>
                </div>

                <SepLine />

                {/* wait to use avatar data from profile. */}
                <AvatarGroup className='board-avatar-box' max={5}>
                    {
                        boardState.members.map((member, index) => 
                            <Avatar key={index} src={member.picture}>{member.init}</Avatar> 
                        )
                    }
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
    starredBoardList: state.starredBoardList,
    currentBoard: state.currentBoard
})

const BoardMenuBarWithConnect = connect(mapStateToProps)(BoardMenuBar);

export default BoardMenuBarWithConnect;

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

/* --------------- function --------------- */

const memberSortByInit = ( members, myId ) => {

    const newMembers = [...members];
    const myIndex = members.findIndex(member => member.id === myId);
 
    const copyMyData = newMembers[myIndex];
    /// remove my data from members array.
    newMembers.splice(myIndex, 1);

    let sortedMembers = newMembers.sort(function (a, b) {
        /// sort lowest to highest. 
        return a.init[0].charCodeAt() - b.init[0].charCodeAt();
    }); 
 
    /// return merge myData in first index with sorted members array.
    return [copyMyData, ...sortedMembers]
}