import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar'; 
import { keyframes } from 'styled-components';

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
            <MainBox id={id} setId={(id) => idChangeHandler(id)} />
            <AboutBox id={id} setId={(id) => idChangeHandler(id)} />
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

                    <div className='menu-box'>
                        <MenuContent onClick={() => props.setId(2)}>
                            About This Board
                        </MenuContent>
                        <MenuContent>
                            Change Background
                        </MenuContent>
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

const DrawerBox = styled.div`
    height: 94.5vh;
    width: 310px;
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
    margin-top: 5.5vh;
    right: 0;
    top: 0;
    justify-self: flex-end;

    .fa-times {
        font-size: 18px;
        color: gray;
        position: absolute;
        right: 20px;
        top: 15px;
    }

    i:hover { 
        color: dimgray; 
        cursor: pointer;
    }

    .fa-chevron-left {
        font-size: 18px;
        color: gray;
        position: absolute;
        margin-left: 5px; 
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
    transition: opacity 0.2s;
`;
   
export default RightDrawer;