import React, { useEffect } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { keyframes } from 'styled-components';

import backgroundData from '../../components/createNewBoard/backgroundSelectData.js';
import labelData from './labelData.js';

import { BoardContext } from '../../context/board-context/board-context';
import { changePicture } from '../../redux/actions/currentBoard.js';
import { changePicturePersonal } from '../../redux/actions/personalBoardList.js';
import { changePictureStarred } from '../../redux/actions/starredBoardList.js';

import CreateLabel from './createLabel.js';

const mainMenuData = [
    {
        id: 2,
        name: 'About This Board',
        icon: 'chalkboard'
    },
    {
        id: 3,
        name: 'Change Background',
        icon: 'image'
    },
    {
        id: 4,
        name: 'Search Cards',
        icon: 'search'
    },
    {
        id: 5,
        name: 'Stickers',
        icon: 'sticky-note'
    },
    {
        id: 6,
        name: 'More',
        icon: 'ellipsis-h'
    },
];

const moreMenuData = [
    {
        id: 6.1,
        name: 'Settings',
        icon: 'cog'
    },
    {
        id: 6.2,
        name: 'Labels',
        icon: 'tag'
    },
    {
        id: 6.3,
        name: 'Leave Board...',
        icon: 'sign-out-alt'
    },
];

function useMenu(name, id) {
    const [state, setState] = React.useState({
        id: id,
        name: name,
        open: false,
    });

    // useEffect(() => {

    // }, []);

    return [state, setState];
}

const RightDrawer = (props) => {

    const [id, setId] = React.useState(1);
    const [idHis] = React.useState([]);

    const idChangeHandler = (newId) => {
        /// push old id to store history.
        idHis.push(id);
        setId(newId);
    }

    const backHandler = () => {
        let temp = idHis.pop();
        if (temp > 0)
            setId(temp);
        else
            setId(1);
    }

    useEffect(() => {
        // console.log('id');
        // console.log(id);  
    });

    return (
        <DrawerBox open={props.open}>
            <i className="fas fa-times" onMouseDown={() => props.setDrawer(false)}></i>
            {
                <BackBox moveIn={idHis.length > 0}>
                    <i className="fas fa-chevron-left" onMouseDown={() => backHandler()}></i>
                </BackBox>
            }

            <MainBox id={id} setId={(id) => idChangeHandler(id)} /> {/* id=1 */}
            <AboutBox id={id} setId={(id) => idChangeHandler(id)} /> {/* id=2 */}
            <ChangeBackgroundBox id={id} setId={(id) => idChangeHandler(id)} /> {/* id=3 */}
            <ColorPickerBox id={id} setId={(id) => idChangeHandler(id)} dispatch={props.dispatch} /> {/* id=3.1 */}
            <MoreBox id={id} setId={(id) => idChangeHandler(id)} />
            <LabelsBox id={id} setId={(id) => idChangeHandler(id)} />

        </DrawerBox>
    );
}

const MainBox = (props) => {
    const [state, setState] = useMenu('Menu', 1);

    if (props.id === state.id && state.open === false) {
        setState({ ...state, open: true });
    }

    else if (props.id !== state.id && state.open === true) {
        setState({ ...state, open: false });
    }

    return (
        <>
            {
                state.open &&
                <div>
                    <div className='menu-bar-name-box'><p>{state.name}</p></div>

                    <div className='menu-box' style={{ marginTop: '15px', borderBottom: '1px solid lightgray', paddingBottom: '15px' }}>
                        {
                            mainMenuData.map((menu, index) =>
                                <MenuContent key={index} onClick={() => props.setId(menu.id)}>
                                    <i className={`fas fa-${menu.icon} menu-icon`}></i>
                                    <SmallDefaultText className='menu-name'>
                                        {menu.name}
                                    </SmallDefaultText>
                                </MenuContent>
                            )
                        }
                    </div>
                </div>
            }
        </>
    );
}

const AboutBox = (props) => {
    const [state, setState] = useMenu('About This Board', 2);

    if (props.id === state.id && state.open === false) {
        setState({ ...state, open: true });
    }

    else if (props.id !== state.id && state.open === true) {
        setState({ ...state, open: false });
    }

    const mockupFounder = {
        id: 2,
        full_name: 'PANSA BOONTHAVEEKHUNSAWATD',
        init: 'PB',
        username: 'pansaboonthaveekhunsawatd',
        bio: '',
        picture: ''
    }

    const mockupDes = 'Trelly copy from Trello.';

    const founderMember = mockupFounder;

    const [isEdit, setEdit] = React.useState(false);
    const [des, setDes] = React.useState(mockupDes);
    const [cpyDes, setCpy] = React.useState(mockupDes);

    const onInputChange = (e) => {
        setCpy(e.target.value);
    }

    const onSubmit = () => {
        setDes(cpyDes);
        setEdit(false);
    }

    return (
        <>
            {
                state.open &&
                <div open={state.open}>
                    <div className='menu-bar-name-box'><p>{state.name}</p></div>

                    <SlideDiv>
                        <div className='about-box' style={{ display: 'flex', flexFlow: 'column', margin: '15px 0 0 5px' }}>
                            <div className='made-by'>
                                <i className="fas fa-user" style={{ fontSize: '18px' }}></i>
                                <DefaultText style={{ margin: '0 0 0 15px' }}>Made by</DefaultText>
                            </div>

                            <div className='avatar-box' style={{ display: 'flex', flexFlow: 'row', marginTop: '15px' }}>

                                <Avatar
                                    className='avatar'
                                    src=''
                                    style={{ width: '50px', height: '50px', margin: '0 11px 0 0', fontSize: '16px' }}
                                    title={`${founderMember.full_name} (${founderMember.username})`}
                                >
                                    {founderMember.init}
                                </Avatar>

                                <div style={{ wordWrap: 'break-word', wordBreak: 'break-all', width: '210px' }}>
                                    <DefaultText wrap='true' maxWidth={100}>
                                        <DefaultLink to='#'>{founderMember.full_name}</DefaultLink>
                                    </DefaultText>

                                    <p style={{ margin: '0', padding: '0', color: 'gray', fontSize: '14px' }}>
                                        {`@${founderMember.username}`}
                                    </p>
                                </div>

                            </div>

                            <div className='description' style={{ display: 'flex', flexDirection: 'column', marginTop: '18px' }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <i className="fas fa-align-left" style={{ color: '#172b4d', marginRight: '16px', alignSelf: 'center' }}></i>
                                    <DefaultText>Description</DefaultText>
                                    {
                                        !isEdit &&
                                        <EditButton onMouseDown={() => setEdit(true)}>Edit</EditButton>
                                    }
                                </div>

                                {
                                    isEdit ?
                                        <div style={{ display: 'flex', flexDirection: 'column', wordBreak: 'break-all', maxWidth: '300px' }}>
                                            <textarea
                                                value={cpyDes}
                                                onChange={onInputChange}
                                                style={{
                                                    resize: 'none',
                                                    borderRadius: '3px',
                                                    minHeight: '108px',
                                                    border: 'none',
                                                    margin: '15px 0 10px 0',
                                                }}
                                            >
                                            </textarea>

                                            <div style={{ flexDirection: 'row' }}>
                                                <SubmitInviteBtn onMouseDown={onSubmit} style={{ marginRight: '12px' }}>Save</SubmitInviteBtn>
                                                <i className="fas fa-times" onMouseDown={() => setEdit(false)} style={{ position: 'inherit', alignSelf: 'center' }}></i>
                                            </div>
                                        </div>
                                        :
                                        <p style={{ fontSize: '14px', color: 'gray' }}>{des}</p>
                                }
                            </div>
                        </div>
                    </SlideDiv>
                </div>
            }
        </>
    );
}

const ChangeBackgroundBox = (props) => {
    const [state, setState] = useMenu('Change Background', 3);

    if (props.id === state.id && state.open === false) {
        setState({ ...state, open: true });
    }

    else if (props.id !== state.id && state.open === true) {
        setState({ ...state, open: false });
    }

    return (
        <>
            {
                state.open &&
                <div>
                    <div className='menu-bar-name-box'><p>{state.name}</p></div>

                    <SlideDiv>
                        <BackgroundBigBox>
                            <div className='color-box' onMouseDown={() => props.setId(3.1)}>
                                <div className='background-list'>
                                    {
                                        backgroundData.map((bg, index) => (
                                            <ColorItem key={index} background={bg.color_code}></ColorItem>
                                        ))
                                    }
                                </div>
                                <div className='list-name' style={{ textAlign: 'center' }}>
                                    <SmallDefaultText>Colors</SmallDefaultText>
                                </div>
                            </div>
                        </BackgroundBigBox>
                    </SlideDiv>

                </div>
            }
        </>
    );
}

const ColorPickerBox = (props) => {
    const [state, setState] = useMenu('Colors', 3.1);

    if (props.id === state.id && state.open === false) {
        setState({ ...state, open: true });
    }

    else if (props.id !== state.id && state.open === true) {
        setState({ ...state, open: false });
    }

    const { boardState, boardDispatch } = React.useContext(BoardContext);

    function changePictureHandler(color_code) {
        if (boardState.color_code !== color_code) {
            boardDispatch(changePicture(color_code));
            props.dispatch(changePicturePersonal(boardState.id, color_code));
            props.dispatch(changePictureStarred(boardState.id, color_code));
        }
    }

    return (
        <>
            {
                state.open &&
                <div>
                    <div className='menu-bar-name-box'><p>{state.name}</p></div>

                    <SlideDiv>
                        <ColorPickerBoxBigBox>
                            {
                                backgroundData.map((bg, index) => (
                                    <ColorPickerBoxItem
                                        key={index}
                                        background={bg.color_code}
                                        onMouseDown={() => changePictureHandler(bg.color_code)}
                                    >
                                    </ColorPickerBoxItem>
                                ))
                            }
                        </ColorPickerBoxBigBox>
                    </SlideDiv>

                </div>
            }
        </>
    );
}

const MoreBox = (props) => {
    const [state, setState] = useMenu('More', 6);

    if (props.id === state.id && state.open === false) {
        setState({ ...state, open: true });
    }

    else if (props.id !== state.id && state.open === true) {
        setState({ ...state, open: false });
    }

    return (
        <>
            {
                state.open &&
                <div>
                    <div className='menu-bar-name-box'><p>{state.name}</p></div>

                    <div className='menu-box' style={{ marginTop: '15px', borderBottom: '1px solid lightgray', paddingBottom: '15px' }}>
                        {
                            moreMenuData.map((menu, index) =>
                                <MenuContent key={index} onClick={() => props.setId(menu.id)}>
                                    <i className={`fas fa-${menu.icon} menu-icon`}></i>
                                    <SmallDefaultText className='menu-name'>
                                        {menu.name}
                                    </SmallDefaultText>
                                </MenuContent>
                            )
                        }
                    </div>
                </div>
            }
        </>
    );
}

const LabelsBox = (props) => {
    const [state, setState] = useMenu('Labels', 6.2);

    if (props.id === state.id && state.open === false) {
        setState({ ...state, open: true });
    }

    else if (props.id !== state.id && state.open === true) {
        setState({ ...state, open: false });
    }

    const { boardState } = React.useContext(BoardContext);

    const labelSorted = boardState.labels.sort(function (a, b) {
        return a.color_id - b.color_id;
    });

    const [searchText, setSeacrh] = React.useState('');

    function searchOnChange(e) {
        setSeacrh(e.target.value);
    }

    const usePopover = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return [anchorEl, setAnchorEl, handleClick, handleClose, open, id];
    }

    const [anchorEl, setAnchorEl, handleClick, handleClose, open, id] = usePopover();
    const [anchorE2, setAnchorE2, handleClick2, handleClose2, open2, id2] = usePopover(); 

    const [currentLabelData, setCurrent] = React.useState({
        color_id: null,
        name: null,
        label_id: null
    });

    return (
        <>
            {
                state.open &&
                <div>
                    <div className='menu-bar-name-box'><p>{state.name}</p></div>

                    <SlideDiv>
                        <LabelBigBox>
                        <input className='search-label' type='search' placeholder='Search labels...' onChange={(e) => searchOnChange(e)}></input>
                            <div className='label-name'>
                                <SmallDefaultText>LABELS</SmallDefaultText>
                            </div>

                            <div className='label-lists'>
                                {
                                    labelSorted
                                        .filter(bg =>
                                            searchText !== '' ?
                                                bg.name !== null && bg.name.toLowerCase().includes(searchText.toLowerCase()) : true
                                        )
                                        .map((bg, index) => (
                                            <div key={index} className='label-box'>
                                                <div 
                                                    className='label-item'
                                                    style={{ background: `${labelData[bg.color_id - 1].picture}` }}
                                                    onClick={(e) => {
                                                        handleClick2(e);
                                                        setCurrent({
                                                            color_id: bg.color_id,
                                                            name: bg.name,
                                                            label_id: bg.id
                                                        });
                                                    }}
                                                >
                                                    <p><b>{bg.name}</b></p>
                                                </div>
                                                <i className="far fa-edit"></i>
                                            </div>
                                        ))
                                }
                            </div> 

                            <div className='create-box'>
                                <button onClick={handleClick}>Create a new label</button>
                            </div>

                            {/* click create label */}
                            <CreateLabelPop
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <div className='create-label-box'>
                                    <div className='create-name'>
                                        <SmallDefaultText>Create Label</SmallDefaultText>
                                    </div>
                                    <CreateLabel mode={1} currentLabelData={null} handleClose={() => handleClose()} />
                                </div>
                            </CreateLabelPop>

                            {/* click at label */}
                            <CreateLabelPop
                                id={id2}
                                open={open2}
                                anchorEl={anchorE2}
                                onClose={handleClose2}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <div className='create-label-box'>
                                    <div className='create-name'>
                                        <SmallDefaultText>Change Label</SmallDefaultText>
                                    </div>
                                    <CreateLabel mode={2} currentLabelData={currentLabelData} handleClose={() => handleClose2()} />
                                </div>
                            </CreateLabelPop>

                        </LabelBigBox>
                    </SlideDiv>

                </div>
            }
        </>
    );
}

const DrawerBox = styled.div`
    height: 94.5vh;
    width: 340px;
    /* background-color: lightpink; */
    background-color: #EFEFEF;
    visibility: ${props => props.open ? 'visible' : 'hidden'};
    z-index: 100;

    transform: ${props => props.open ? 'translateX(0)' : 'translateX(338px)'};
    -webkit-transition: all 0.25s ease;
    -moz-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    -ms-transition: all 0.25s ease;
    transition: all 0.25s ease; 

    position: absolute;
    padding: 14px; 
    right: 0;
    top: 5.5vh;
    justify-self: flex-end;

    .fa-times {
        font-size: 18px;
        color: gray;
        position: absolute;
        right: 20px;
        top: 15px;
    }

    .fa-times:hover { 
        color: dimgray; 
        cursor: pointer;
    }

    .fa-chevron-left {
        font-size: 18px;
        color: gray;
        position: absolute;
        margin-left: 5px; 
    }

    .fa-chevron-left:hover {
        color: dimgray; 
        cursor: pointer;
    }

    .menu-bar-name-box {
        border-bottom: 1px solid lightgray;
        padding-bottom: 14px;
    }

    .menu-bar-name-box > p {
        text-align: center;
        font-weight: 500;
        color: #172b4d;
        padding: 0;
        margin: 0;
    }
`;

const MenuContent = styled.div`
    padding: 6px;
    border-radius: 3px;

    &:hover {
        cursor: pointer;
        background-color: rgb(222, 222, 222);
    }

    &:active {
        background-color: rgb(215, 215, 215);
    }

    .menu-icon {
        margin: 0 0 0 6px;
        width: 30px;
    }

    .menu-name {
        margin-left: 4px;
    }
`;

const slide = keyframes`
  from {
    transform: translateX(338px);
  }

  to {
    transform: translateX(0);
  }
`;

const SlideDiv = styled.div`  
    animation: ${slide} 0.15s linear;

    .search-label {
        margin-top: 15px; 
        padding: 4px;
        width: 97%;
        height: 40px;
        border-radius: 3px;
        border: 2px lightgray solid;
        outline: none;

        :focus { 
            border: 2px deepskyblue solid; 
        }
    }
`;

const DefaultText = styled.p`
    display: inline;
    color: #172b4d;
    padding: 0;
    margin: 0;
    max-width: ${props => `${props.maxWidth}px`};
    align-self: center;
    
    text-align: center;
    font-weight: 500;
`;

const SmallDefaultText = styled(DefaultText)`
    font-size: 14px;
`;

const DefaultLink = styled(Link)`
    color: #172b4d;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }

    &:active {
        color: #172b4d;
    }
`;

const EditButton = styled.button`
    color: #172b4d;
    font-size: 15px;
    font-weight: 10;
    padding: 8px 12px 4px 12px;
    border: none;
    background-color: rgb(230, 230, 230);
    margin-left: 8px; 

    &:hover {
        cursor: pointer;
        background-color: rgb(210, 210, 210);
    }

    &:active {
        outline: none;
        background-color: skyblue;
    }

    &:focus {
        outline: none;
    }
`;

const SubmitInviteBtn = styled.button`
    padding: 8px;
    font-size: 15px;
    color: white;
    background: ${props => props.off ? 'lightgray' : 'forestgreen'};
    border: none;
    width: 60px;

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

const moveIn = keyframes`
    from {
        transform: translateX(-40px);
    }

    to {
        transform: translateX(0);
    }
`;

const moveOut = keyframes`
    from {
        transform: translateX(0px);
    }

    to {
        transform: translateX(-40px);
    }
`;

const BackBox = styled.div` 
    animation: ${props => props.moveIn ? moveIn : moveOut} 0.15s linear; 
    opacity: ${props => props.moveIn ? '100' : '0'}; 
    visibility: ${props => props.moveIn ? 'visible' : 'hidden'}; 
    transition: all 0.2s;
`;

const BackgroundBigBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
    padding-top: 5px;

    &:hover {
        cursor: pointer;
    }

    .background-list {
        margin: 10px 0 0 12.5px; 
        display: flex;
        border-radius: 10px;
        width: 135px;
        overflow: auto;
    }

    .background-list:hover {
        filter: brightness(90%);
    }
`;

const ColorItem = styled.div`
    background: ${props => props.background};
    width: 15px;
    height: 100px;
`;

const ColorPickerBoxBigBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2px;
`;

const ColorPickerBoxItem = styled.div`
    background: ${props => props.background};
    width: 145px;
    height: 100px;
    border-radius: 10px;

    margin: 8px 0 0 8px; 

    overflow: auto;

    &:hover {
        cursor: pointer;
        filter: brightness(85%);
    }
`;

const LabelBigBox = styled.div` 
    overflow: auto;
    max-height: 85vh;

    ::-webkit-scrollbar {
        width: 10px;
        border-radius: 10px;
        background: rgba(9,30,66,.08);
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(9,30,66,.08);
    }

    .label-name {
        width: 100%;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .label-box {
        display: flex;
        flex-flow: row;
    }

    .label-box > i {
        align-self: center;
        font-size: 12px;
        border-radius: 3px;
        padding: 10px 8px 10px 10px; 
        margin-top: 2px;
        margin-left: 5px; 
    }

    .label-box > i:hover {
        cursor: pointer;
        background-color: rgb(210, 210, 210); 
    }

    .label-box > i:active { 
        background-color: rgb(190, 190, 190); 
    }

    .label-item {
        width: 90%;
        height: 33px;
        border-radius: 3px;
        margin-top: 3px;
        transition: width 0.25s;
    }
 
    .label-item > p { 
        color: white;
        margin: 4px 0 0 15px;
        padding: 0; 
    }

    .label-item:hover {
        cursor: pointer;
        width: 80%;
        filter: brightness(85%);
        transition: width 0.15s;
    }

    .create-box {
        margin-top: 10px;

        button { 
            width: 97%;
            padding: 6px;
            background-color: rgb(230, 230, 230);
            border: none;
            border-radius: 3px;
            outline: none;

            :hover {  
                cursor: pointer;
                background-color: rgb(220, 220, 220); 
            } 

            :active {
                background-color: rgba(100, 220, 220, 0.2); 
                color: deepskyblue;
            }
        } 
    } 
`;

const CreateLabelPop = styled(Popover)` 
    .create-label-box { 
        padding: 10px;
        width: 280px;
        height: 250px;  

        .create-name {
            text-align: center;
            margin-top: 2px;
            padding-bottom: 11px;
            border-bottom: 0.5px solid lightgray;
        }
    }
`;

const RightDrawerWithConnect = connect()(RightDrawer);

export default RightDrawerWithConnect;