import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import './boardMenuBarStyle.css';
import { starBoard, unStarBoard, changeStarName } from '../../redux/actions/starredBoardList.js';
import { changeName } from '../../redux/actions/personalBoardList';
import { memberOverWrite, renameBoard } from '../../redux/actions/currentBoard.js';
import { BoardContext } from '../../context/board-context/board-context';

const BoardMenuBar = (props) => {
  
    const starredBoardList = props.starredBoardList;

    /// send api to get real board detail from backend.
    /// overwrite data in currentBoard. 

    const { boardState, boardDispatch } = useContext(BoardContext)

    const boardIndex = starredBoardList.findIndex(data => data.id === boardState.id)
    const isStarredBoard = `${starredBoardList[boardIndex]}` !== 'undefined' && starredBoardList[boardIndex].starred_id > 0;

    const starredStyle = isStarredBoard === true ? {
        opacity: '100',
        color: 'khaki'
    } : {};

    const [focus, setFocus] = React.useState(false);
    const [nameDisplay, setNameDisp] = React.useState(boardState.name);
    const [nameLength, setNameLength] = React.useState(0); 
    const nameDiv = React.useRef();
    const nameInput = React.useRef();
    
    const changeAllName = (name) => {
        if (name.length !== 0) {
            /// set current board name.
            boardDispatch(renameBoard(name));
            /// set personal board name.
            props.dispatch(changeName(boardState.id, name));
            /// set starred board name.
            props.dispatch(changeStarName(boardState.id, name)); 
        }
        else {
            setNameDisp(boardState.name);
        }
    }

    const onInputChange = (e) => {
        setNameDisp(e.target.value); 
    }

    const onBlurHandler = (e) => {
        if (focus === true) {
            changeAllName(e.target.value);
            setFocus(false);
        }
        
    }

    const renameHandler = (e) => { 
        if (e.key === 'Enter') { 
            changeAllName(e.target.value)
            setFocus(false); 
        }
    }

    const onDown = () => {
        setFocus(true);  
        const input = nameInput.current; 
        input.setSelectionRange(0, input.value.length)
    }
  
    // eslint-disable-next-line
    React.useEffect(() => { 
        setNameLength(nameDiv.current.offsetWidth);   
        nameInput.current.focus();
    });
  
    React.useEffect(() => {
        /// wait to use redux.
        let myId = 1;  /// mockup myId. 
        /// reorder members. 
        boardDispatch(memberOverWrite(memberSortByInit(boardState.members, myId)));  
        // eslint-disable-next-line
    }, []);

    return (
        <div className='board-menu-bar'>

            <div className='board-menu-left'>
                <div className='board-name-box'>
                    <p 
                        ref={nameDiv} 
                        style={focus === false ? {opacity: '100'} : {opacity: '0'}}
                        onMouseDown={() => onDown()}
                    >
                        {nameDisplay}
                    </p>
                    <NameEditInput 
                        focus={focus} 
                        onMouseDown={() => setFocus(true)}
                        onKeyDown={(e) => renameHandler(e)}
                        onChange={(e) => onInputChange(e)}
                        onBlur={(e) => onBlurHandler(e)}
                        length={nameLength}
                        value={nameDisplay} 
                        ref={nameInput}
                    />
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
    background-color: rgba(255, 255, 255, 0.3);
    color: white;

    border-radius: 3px;

    padding: 5px 12px 7px 12px; 
    margin: 0px 0px 8px 0px; 
    
    font-size: 14px;

    &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.4);
    }

    &:active {
        background-color: rgba(255, 255, 255, 0.5);
    }
`;

const NameEditInput = styled.input.attrs(props => ({ 
    type: "text", 
    spellCheck: false,
    value: props.value
}))`
    display: ${props => props.focus === false ? 'none' : 'block'};;
    margin-top: ${props => props.length !== 33 ? '-38.5px' : '-26px'};
    margin-left: 0px; 
    padding: 4.5px 10px 2px 10px;  

    position: absolute; 
    z-index: 2;

    max-width: 97%; 
    width: ${props => props.length !== 33 ? `${props.length - 24}px` : '10px'}; 

    font-size: 18px; 
    font-weight: 700;  
    color: 'rgb(2, 106, 167)';

    border-radius: 3px; 

    &:focus {
        outline: none;
        border: 2px solid dodgerblue;
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