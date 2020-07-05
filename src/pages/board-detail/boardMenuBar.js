import React, { useContext } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Popup from "reactjs-popup";
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './boardMenuBarStyle.css';

import { starBoard, unStarBoard, changeStarName } from '../../redux/actions/starredBoardList.js';
import { URL, useAuthen } from '../../api/index.js';
import { updateMyBoard, starToggle, memberToggle } from '../../api/board.js';
import { changeName } from '../../redux/actions/personalBoardList';
import { memberOverWrite, renameBoard, removeMember, addMember } from '../../redux/actions/currentBoard.js';
import { BoardContext } from '../../context/board-context/board-context';

import RightDrawer from './rightDrawer.js';
import { changeRecentlyName } from '../../redux/actions/recentlyBoard';

const BoardMenuBar = (props) => {

    /// wait to use redux. 
    let myId = props.dataProfile.id;
    // let myId = 1;
    // let myId = 5;  /// mockup myId. 

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

    const authenHeader = useAuthen();

    function starApi(boardId) {
        axios.post(`${URL}${starToggle(boardId)}`, {}, authenHeader)
    }

    /* ------------------ avatar -------------------- */

    const [avatarState, setAvatar] = React.useState({ avatar: '', id: '', focus: false, member: '' });
    const avatarRef = React.useRef();
    const avatarBoxRef = React.useRef();

    const avatarMouseDown = (e, member) => {
        /// toggle popup.
        if (avatarState.avatar === e.target && avatarState.focus === true)
            setAvatar({ ...avatarState, focus: false });
        /// set avatar data.
        else
            setAvatar({ avatar: e.target, id: member.id, focus: true, member: member });
    }

    const removeBoardMember = (id) => {
        setAvatar({ avatar: [{ offsetLeft: '0' }], id: {}, focus: false, member: {} });
        /// wait to add confirm to remove.
        boardDispatch(removeMember(id));

        /// if leave board then force redirect to home.
        if (id === myId) {
            setTimeout(() => {
                window.location = '/';
            }, 500);
        }
    }

    /* ------------------ board name -------------------- */

    function useName() {
        const [focus, setFocus] = React.useState(false);

        const changeAllName = (name) => {
            if (name.length !== 0) {
                /// set current board name.
                boardDispatch(renameBoard(name));
                /// set personal board name.
                props.dispatch(changeName(boardState.id, name));
                /// set starred board name.
                props.dispatch(changeStarName(boardState.id, name));
                /// set recently board name.
                props.dispatch(changeRecentlyName(boardState.id, name));
                /// post to back-end.
                axios.patch(`${URL}${updateMyBoard(boardState.id)}`, {
                    name,
                    color_code: boardState.color_code
                }, authenHeader);
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

        React.useEffect(() => {
            setNameLength(nameDiv.current.offsetWidth); 
            nameInput.current.focus();
        });

        return [focus, setFocus, onInputChange, renameHandler, onDown, onBlurHandler];
    }

    // const [focus, setFocus] = React.useState(false);
    const [focus, setFocus, onInputChange, renameHandler, onDown, onBlurHandler] = useName(); 
    const [nameDisplay, setNameDisp] = React.useState(boardState.name);
    const [nameLength, setNameLength] = React.useState(0);
    const nameDiv = React.useRef();
    const nameInput = React.useRef();
 
    /* ------------------ invite -------------------- */

    const [inviteStat, setInvite] = React.useState(false);
    const [inviteValue, setInviteValue] = React.useState('');

    const onInviteChange = (e) => {
        setInviteValue(e.target.value);
    }

    const onSubmitInvite = () => { 
        var formData = new FormData();
        formData.append('email', inviteValue);
   
        /// post 'email' to backend.
        /// wait member data from backend.
        /// get response and member data.
        axios.post(`${URL}${memberToggle(boardState.id)}`, formData, authenHeader)
            .then(res => { 
                setInviteValue(''); 
                switch (res.status) {
                    case 200:
                        /// add member to board.
                        boardDispatch(addMember(res.data));
                        break;

                    default: 
                        /// remove member in board.
                        /// can't remove cause can't get any res from back end.
                        // boardDispatch(removeMember(res.data.id));
                        break;
                }  
            })
            .catch(res => {
                alert('ไม่พบข้อมูล !');
            })  
    }

    /* ------------------ drawer -------------------- */

    const [drawerStat, setDrawer] = React.useState(false);

    /* ------------------ working every render -------------------- */

    // eslint-disable-next-line
    React.useEffect(() => {
        setNameLength(nameDiv.current.offsetWidth);
        nameInput.current.focus();
        
        window.onmousedown = function (e) {
            if (avatarState.focus === true) {
                if (e.target !== avatarRef.current && avatarBoxRef.current.contains(e.target) === false) {
                    setAvatar({ ...avatarState, focus: false });
                }
            }
        }
    });

    /* ------------------ working once -------------------- */

    React.useEffect(() => {
        if (myId !== null && typeof myId !== undefined) {
            if (boardState.members.length > 0) {
                boardDispatch(memberOverWrite(memberSortByInit(boardState.members, myId)));  
            }
        }
        setNameDisp(boardState.name); 
        // eslint-disable-next-line
    }, [boardState.name, myId]);
    
    return (
        <div className='board-menu-bar'>

            <div className='board-menu-left'>
                <div className='board-name-box'>
                    <p
                        ref={nameDiv}
                        style={focus === false ? { opacity: '100' } : { opacity: '0' }}
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
                    <span 
                        title='Click to star or unstar this board. Starred boards show up at the top of your board list.'
                        onMouseDown={() => starApi(boardState.id)}
                    >                        
                        {
                            isStarredBoard === true ?
                                /// click to unstar board.
                                <i className='fas fa-star' onClick={() => props.dispatch(unStarBoard(boardState.id))} style={starredStyle}></i>
                                :
                                /// click to star board.
                                <i className='fas fa-star' onClick={() => props.dispatch(starBoard(boardState.id, boardState))} style={starredStyle}></i>
                        }
                    </span>
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
                <AvatarGroup className='board-avatar-box' max={999} ref={avatarBoxRef}>

                    {
                        typeof myId !== undefined && boardState.members.map((member, index) =>
                            <Avatar
                                className='avatar'
                                key={index}
                                src={member.picture}
                                id={member.id}
                                onMouseDown={(e) => avatarMouseDown(e, member)}
                            >
                                {member.init}
                            </Avatar>
                        )
                    }
                    <AvatarDetailBox
                        id='avatar-box'
                        left={avatarState.avatar.offsetLeft === 0 ? avatarState.avatar.offsetParent.offsetLeft : avatarState.avatar.offsetLeft}
                        focus={avatarState.focus}
                        ref={avatarRef}
                    >
                        <i className="fas fa-times" onMouseDown={() => setAvatar({ ...avatarState, focus: false })}></i>
                        <div className='avatar-description'>
                            <Avatar className='avatar-pic' src={avatarState.member.picture}>{avatarState.member.init}</Avatar>
                            <div className='description'>
                                <Link to='#' className='full-name'>{avatarState.member.full_name}</Link>
                                <p>{`@${avatarState.member.username}`}</p>
                                <p>{avatarState.member.bio}</p>
                                {
                                    myId === avatarState.member.id &&
                                    <Link
                                        to='/profile'
                                        style={{ fontSize: '14px', textDecorationLine: 'underline', color: 'gray' }}
                                    >
                                        Edit profile info
                                    </Link>
                                }
                            </div>
                            <div className='menu'>
                                <p>View Member’s Board Activity</p>
                                {
                                    myId === avatarState.member.id ?
                                        /// render for your id.
                                        <p onClick={() => removeBoardMember(myId)}>Leave Board...</p>
                                        :
                                        /// render for other.
                                        <p onClick={() => removeBoardMember(avatarState.member.id)}>Remove from Board…</p>
                                }
                            </div>
                        </div>
                    </AvatarDetailBox>

                </AvatarGroup>

                <div className='board-invite'>
                    <Popup
                        trigger={<P_BUTTON>Invite</P_BUTTON>}
                        position="bottom left"
                        contentStyle={inviteStyle}
                    >
                        <InviteDes>
                            <div className='invite-header'>Invite To Board</div>
                            <span className='split-line'></span>
                            <div className='invite-body'>
                                <input
                                    placeholder='Enter Username'
                                    value={inviteValue}
                                    onChange={(e) => onInviteChange(e)}
                                ></input>
                                <div className='link-box'>
                                    <i className="fas fa-link"></i>
                                    <p className='invite'>Invite with Link</p>
                                    <p className='link' onClick={() => setInvite(!inviteStat)}>{inviteStat ? 'Disable Link' : 'Create Link'}</p>
                                    <p className='des'>Anyone with link can join as board member</p>
                                    {
                                        inviteStat === true &&
                                        <div className='invite-link'>
                                            <input value='https://trelly.com/invite/b/eehan_niH'></input>
                                            <button>Copy</button>
                                        </div>
                                    }
                                </div>
                            </div>
                            <SubmitInviteBtn onMouseDown={() => onSubmitInvite()} disabled={inviteValue === ''} off={inviteValue === ''}>Send Invitation</SubmitInviteBtn>
                        </InviteDes>
                    </Popup>

                </div>

                <div className='board-show-menu' style={{ marginLeft: '8px' }}>
                    <P_BUTTON onClick={() => setDrawer(!drawerStat)} style={{ display: `${drawerStat ? 'none' : 'block'}` }}>
                        <i className="fas fa-ellipsis-h" style={{ alignSelf: 'center', margin: '4px 10px 0 0' }}></i>
                        Show Menu
                    </P_BUTTON>
                    <RightDrawer open={drawerStat} setDrawer={() => setDrawer(false)} />
                </div>

            </div>
  
        </div>
    );
}

const mapStateToProps = (state) => ({
    starredBoardList: state.starredBoardList,
    dataProfile: state.dataProfile
})

const BoardMenuBarWithConnect = connect(mapStateToProps)(BoardMenuBar);

export default BoardMenuBarWithConnect;

/* --------------- const --------------- */

const inviteStyle = {
    borderRadius: '3px',
    boxShadow: '2px 4px 8px #888888',
    height: '338px',
    width: '275px',
    padding: '10px'
}

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
    top: 48px;
    margin-left: 0px;
    padding: 4.5px 10px 0px 10px;  

    position: absolute; 
    z-index: 2;

    max-width: 97%; 
    width: ${props => `${props.length - 25}px`}; 
    min-width: 8px;

    font-size: 18px; 
    font-weight: 700;  
    color: midnightblue;

    border-radius: 3px; 

    &:focus {
        outline: none;
        border: 2px solid dodgerblue;
    }  
 
`;

const AvatarDetailBox = styled.div`
    width: 290px;
    min-height: 120px;
    background-color: snow; 
    border-radius: 4px;
    opacity: ${props => props.focus === true ? '100' : '0'};
    visibility: ${props => props.focus === true ? 'visible' : 'hidden'};
    box-shadow: 2px 4px 8px #888888;

    position: absolute;
    margin-top: 34px;
    padding-bottom: 10px; 
    left: ${props => props.left !== 0 && `${props.left + 10}px`};
    z-index: 2;

    & > i {
        position: absolute;
        right: 13px;
        top: 10px;
        color: rgb(155, 155, 155); 
    }

    & > i:hover {
        cursor: pointer;
        color: rgb(125, 125, 125); 
    }

    .avatar-description {
        width: 280px;
        min-height: 60px;
        /* background-color: lightblue; */
        display: flex;
        flex-wrap: wrap; 
    }

    .avatar-pic {
        width: 50px;
        height: 50px;
        margin: 8px 12px 0px 12px;

        color: midnightblue;
        background-color: gainsboro;
        font-size: 16px;
        font-weight: 700; 
    }

    .description {
        width: 170px;
        min-height: 60px;
        /* background-color: lightcoral; */
        
        margin-top: 8px;
          
        word-wrap: break-word; 
        user-select: text; 
    }

    .description > a {
        text-decoration: none;
        color: midnightblue;
    }

    .description > a:hover {
        text-decoration: underline;
    }

    .description > p {
        padding: 0;
        margin: 0;
        font-size: 14px; 
        font-weight: 400;
        color: gray;
    }

    .description .full-name {
        font-size: 16px; 
        font-weight: 500;
    }

    .menu {
        margin-top: 8px;
        margin-left: -2px;
    }

    .menu > p {
        margin: 0px 0px 0px 0px;
        width: 290px;
        padding: 8px 14px 8px 10px;  

        font-size: 14px;
    }

    .menu > p:hover {
        background-color: rgba(0, 0, 0, 0.05);
        cursor: pointer;
    }

`;

const InviteDes = styled.div`

    display: flex;
    flex-direction: column;
    /* background-color: lightpink; */
    height: 343px;
    width: 275px;

    .close {
        position: absolute; 
        right: 10px;
        color: lightgray;
    }

    .close:hover {
        cursor: pointer;
    }

    .invite-header {
        font-size: 14px;
        /* background-color: lightsalmon; */
        padding-bottom: 10px;
        text-align: center;
        color: gray;
    }

    .split-line {
        width: 275px;
        height: 1px;
        background-color: rgb(222, 222, 222);
        margin-bottom: 12px;
        /* margin-left: 5px; */
    }

    .invite-body {
        /* background-color: lightseagreen; */
        height: 100%;
    }

    .invite-body > input {
        box-sizing: border-box;
        border: 1px solid lightgray;
        border-radius: 3px;
        width: 275px; 
        padding: 10px 7px 10px 7px;
        margin-bottom: 10px; 
        /* margin-left: 5px; */
    }

    .invite-body > input::placeholder {
        color: lightgray;
    }

    .invite-body > input:focus {
        outline: none;
        border-color: deepskyblue;
    }

    .invite-body .link-box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-left: -5px;
    }

    .invite-body .link-box > i {
        font-size: 14px;
        align-self: center;
        padding: 7px;
        color: gray;
    }

    .invite-body .link-box .invite {
        display: inline;
        padding: 0;
        margin: 0; 
        align-self: center;
        font-size: 14px;
        font-weight: 700;
        color: midnightblue; 
    }

    .invite-body .link-box .link {
        display: inline;
        padding: 0;
        margin: 0; 
        margin-top: 4px;
        font-size: 14px; 
        position: absolute;
        right: 10px;
        text-decoration: underline;
        color: deepskyblue;
    }

    .invite-body .link-box .link:hover {
        cursor: pointer;
    }

    .invite-body .link-box .des {
        display: inline;
        padding: 0;
        margin: 0;
        align-self: center;
        font-size: 12px;
        color: gray;
        margin-left: 7px;
    }

    .invite-body .link-box .invite-link {
        margin: 10px; 
        width: 100%;
        display: flex;
        /* margin-left: 18px; */
    }

    .invite-body .link-box .invite-link > input {
        box-sizing: border-box;
        border: 1px solid lightgray;
        border-radius: 3px; 
        padding: 3px 7px 3px 7px;
        align-self: center;
        width: 220px;  
        height: 34px;
        margin-left: -5px;
    }

    .invite-body .link-box .invite-link > input:focus {
        outline: none;
        border-color: deepskyblue;
    }

    .invite-body .link-box .invite-link > button {
        margin: 7px; 
        background-color: forestgreen;
        padding: 8px 14px 9px 14px;
        border: none;
        color: white;
    }

    .invite-body .link-box .invite-link > button:hover { 
        filter: brightness(110%);
        cursor: pointer;
    }

    .invite-body .link-box .invite-link > button:focus { 
        outline: none;
    }

    .invite-body .link-box .invite-link > button:active { 
        filter: brightness(80%);
    }
`;

const SubmitInviteBtn = styled.button`
    padding: 8px;
    font-size: 15px;
    color: white;
    background: ${props => props.off ? 'lightgray' : 'forestgreen'};
    border: none;

    &:hover {
        filter: ${props => props.off ? '' : 'brightness(115%)'};
        cursor: pointer;
    }

    &:active {
        filter: brightness(90%); 
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

/* --------------- function --------------- */

const memberSortByInit = (members, myId) => {

    const newMembers = [ ...members ];
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