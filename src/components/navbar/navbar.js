import React, { useState, useRef, useEffect, createContext, useReducer, useContext } from 'react';
import {motion } from "framer-motion";
import styled, { css } from 'styled-components';

import axios from 'axios';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import { Divider, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'; 
import AddIcon from '@material-ui/icons/Add';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import QueryBuilderRoundedIcon from '@material-ui/icons/QueryBuilderRounded';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {starBoard, unStarBoard} from '../../redux/actions/starredBoardList';
import { useLocation } from 'react-router-dom';
import { URL, useAuthen } from '../../api/index.js';
import moveStarObject from '../../function/moveStarObject';
import { starToggle } from '../../api/board.js';
// import { URL, useAuthen } from '../../api/index.js';

import { createOn } from '../../redux/actions/createNewBoard';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MyButton = styled(motion.button)`
    background-color: hsla(0,0%,100%,.3);
    color: ${props=>props.color? props.color: "white"};
    border: none;
    border-radius:3px;
    // alignSelf:"flex-start",
    padding: 4px;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height:${props=>props.height};
    margin-right: ${props=>props.nomargin ? '0px' : '2px'};
    margin-left: ${props=>props.nomargin ? '0px' : '2px'};
    &:hover{
        background-color: ${props=>props.hovercolor? props.hovercolor : "rgba(255, 255, 255, 0.1)"};
    }
`;

const DropDownStyle = styled(motion.div)`
    background-color: white;
    flex-basis: 100px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0px 0px 15px -10px rgba(1,1,1,0.75);
    margin-top: 10px;
    margin-right: 4px;
    border-radius: 5px;
    // position:absolute;
    // left:0;
`;

const Navbarstyle = styled.div`

    width: 100%;
    // height: 5.5vh;
    height: 40px;
    position: sticky;
    top: 0;
    z-index: 11;
    pointer-events:${props => props.disable ? 'none' : 'all'};
    filter:brightness(${props => props.disable ? '0.3' : '1'});
`;

const variants = {
    open: {
        width: "200px",
        transition: {
            duration: 0.2
        },
        outline: "none"
    },
    closed: {
        width: "100px",
        transition: {
            duration: 0.2
        }
    },
    close: {
        width: "130px",
        transition: {
            duration: 0.1
        }
    }
}

const Column = styled(motion.div)`
    display: flex;
    background-color:${props=>props.bg? 'white':'transparent'};
    flex-direction: column;
    box-sizing: border-box;
    transition-duration: 0.1s;
    border-radius: 3px;
    left:0;
    align-items: ${props => props.align};
    overflow:hidden;
    width:${props=>props.width};
    min-width:${props=>props.minWidth};
    max-width:${props=>props.maxWidth};
    margin: ${props => props.margin};
    padding: ${props => props.padding};
    // z-index:111111111;
    // position:${props=>props.position};
`;

const LinkBox = styled(motion.div)`
    background: ${props=>props.backgroundColor? props.backgroundColor : "white"};
    margin: ${props => props.margin ? props.margin : "0px"};
    padding: ${props => props.padding ? props.padding : "10px"};
    border-radius: 3px;
    overflow:hidden;
    font-size: 14px;
    ${props => props.nothover ? css`` :
        css`
        &:hover {
            background-color: rgba(206, 212, 206, 0.3);
        }
    `}
    
    // width:20px;
    // height:20px;
`;

const LinkStyle = styled(Link)`
    text-decoration:${props => props.underline ? 'underline' : 'none'};
    color: black;
`;

const Linkable = ({ link, children, padding, margin, underline, onClick,backgroundColor }) => {
    return (
        <LinkBox padding={padding} margin={margin} backgroundColor={backgroundColor}>
            <LinkStyle to={link} underline={underline} onClick={onClick}>
                {children}
            </LinkStyle>
        </LinkBox>
    );
}

const Row = styled(motion.div)`
    display: flex;
    flex-direction: row;
    justify-content:${props => props.justifyContent ? props.justifyContent : "center"};
    box-sizing: border-box;
    transition-duration: 0.1s;
    border-radius: 3px;
    position:relative;
    align-items: ${props => props.align};
    overflow:${props=>props.overflow ? props.overflow: "visible"};
    width:${props=>props.width? props.width: "100%"};
    min-height:${props => props.minHeight};
    max-height:${props=>props.maxHeight}
    margin: ${props => props.margin};
    padding: ${props => props.padding};
    /* z-index:11; */
    background-color:${props=>props.backgroundColor? props.backgroundColor : 'transparent'};
`;

const Title = styled.div`
    display: grid;
    grid-template-columns: 20px minmax(180px, auto) 20px;
    // justify-content: center;
    padding: 10px; 
    margin: 0 auto;
    // textAlign: center;
`;

const TitleCom = ({title}) => {
    // eslint-disable-next-line
    const [open, setOpen] = useContext(OpenContext);
    return (
        <Column>
            <Title>
                <div>
                </div>
                <div style={{ textAlign: "center" }}>
                    {title}
                </div>
                <div >
                    <CloseIcon onClick={()=>setOpen({type:''})}/>
                </div>

            </Title>
            <Divider light variant="middle" />
        </Column>
    )
}
const DropDownCard = ({ title, children}) => {
    return (
            <div>
                <Column>
                    <TitleCom title={title}  />
                </Column>
                {children}
            </div>
    );
}

const logoVariants = {
    init1:{
        height: ["8px","14px","8px"],
        transition:{
            duration:0.6
        }
    },
    init2:{
        height: ["14px","8px","14px"],
        transition:{
            duration:0.6
        }
    }
}

const LogoStyle = styled(motion.div)`
    height:${props=> props.size? props.size : "18px"};
    width:${props=> props.size? props.size : "18px"};
    // padding:2px;
    margin:${props=> props.margin? props.margin: "2px"};
    border-radius:2px;
    box-sizing:border-box;
    display:flex;
    overflow:hidden;
    // background-color:${props=>props.white ? "white": "rgba(255, 255, 255, 0.5)"};
    box-shadow:0px 0px 2px 0px rgb(0, 121, 191);
`;

const LogoLetter = styled(motion.div)`
    font-family: Pacifico;
    color: rgba(255, 255, 255, 0.5);
    // font-weight: bold;
    font-size: 20px;
`

const logoHover = {
    hover:{
        // backgroundColor:"rgba(255, 255, 255, 1)"
        boxShadow:"0px 0px 0px 2000px rgba(255,255,255,1)"
    },
    init1:{
        height: ["8px","14px","8px"],
        transition:{
            duration:0.6
        }
    },
    init2:{
        height: ["14px","8px","14px"],
        transition:{
            duration:0.6
        }
    }
}

const textHover={
    hover:{
        color:"rgba(255, 255, 255, 1)"
    }
}

const LogoContainer = styled(motion.div)`
        display:flex;
        align-items:center;
        height:100%;
        max-width:100px;
        justify-content:center;
        overflow:hidden;
        // box-shadow:0px 0px 0px 2000px; 
        // clip-path: circle(10px);
    `;

const LogoBut =()=>{
    
    return (
        <LogoContainer
            whileHover="hover"
        >
            <LogoTest />
            <LogoLetter variants={textHover} >
                Trelly
            </LogoLetter>
        </LogoContainer>
    );
}

const LogoTest =({statc})=>{
    return (
        <LogoStyle >
            <div style={{height:"100%",overflow:"hidden",padding: "2px 1px 2px 2px",}}>
                <motion.div style={{boxShadow:statc ?"0px 0px 0px 2000px rgba(255,255,255,0.9)": "0px 0px 0px 2000px rgba(255,255,255,0.4)"}} variants={logoHover}>
                    <motion.div style={{height:"8px",width:"6px",backgroundColor:"transparent",borderRadius:"1.5px"}}
                        // animate="init1"
                        animate={!statc ? "init1" : null}
                        variants={logoVariants}
                    >
                    </motion.div>
                </motion.div>
            </div>
            <div style={{padding:"2px 2px 2px 1px",height:"100%",overflow:"hidden"}}>
                <motion.div style={{boxShadow:statc ?"0px 0px 0px 2000px rgba(255,255,255,0.9)":"0px 0px 0px 2000px rgba(255,255,255,0.4)",boxSizing: "border-box"}} variants={logoHover} >
                    <motion.div style={{height:"14px",width:"6px",backgroundColor:"transparent",borderRadius:"1.5px"}}
                        // animate="init2"
                        animate={!statc ? "init2" : null}
                        variants={logoVariants}
                    >
                    </motion.div>
                </motion.div>
            </div>
        </LogoStyle>
    );
}

const Logodiv = styled(motion.div)`
    width:10px;
    background-color:rgb(0, 121, 191);
    border-radius:1.5px;
    ${props=>props.margin && css`
        margin-right: 2px;
    `}
    
`;
const NormalLeftLogo = styled(Logodiv)`
    height: 60%;
    width: 100%;
    box-sizing:border-box;
    // margin: 2px 0px 2px 2px;
    // background-color: rgba(255,255,255,1);
`;
const NormalRightLogo = styled(Logodiv)`
    height: 100%;
    width: 100%;
    // margin: 2px 2px 2px 0px;
`;

const LogoOnly =({variant,size})=>{
    
    if(variant==="transparent"){
        return (
            <LogoTest statc/>
        );
    }
    return (
        <div>
        <LogoStyle white size={size}>
            <div style={{padding:"2px 1px 2px 2px",width: "50%"}}>
                <NormalLeftLogo margin></NormalLeftLogo>
            </div>
            <div style={{padding:"2px 2px 2px 1px",width: "50%"}}>
                <NormalRightLogo></NormalRightLogo>
            </div>
        </LogoStyle>
        </div>
    );
}

const Navbars = ({personalBoardList,starredBoardList,on,profile}) => {
    const [isType, setType] = useState(false);
    const [search,setSearch] = useState('');
    const inputRef = useRef();
    let timeOut = 0;
    const [isOpen, setOpen] = useReducer(reducers,initState);
    const OnChange =(event)=>{
        let keyword = event.target.value;
        if(timeOut){
            clearTimeout(timeOut);
        }
         timeOut = setTimeout(()=>{
            setSearch(keyword);
        }, 300);
    }
    // eslint-disable-next-line
    const searchItem = personalBoardList.filter((data)=>{
        if(search === null || search === ''){
            return null;
        }
        else if(data.name.toLowerCase().includes(search.toLowerCase()) && data.id > 0){
            // console.log(data);
            return data;
        }
    })
    let location = useLocation();
    let transparent = false;
    // eslint-disable-next-line
    let boardIndex = 0;
    for(let i = 0; i < personalBoardList.length; i++){
        if(personalBoardList[i].href === location.pathname){
            boardIndex = i;
            break;
        }
    }
    // console.log(location.pathname === '/');
    if(location.pathname === '/'){
        transparent = false;
    }
    else{
        transparent = true;
    }
    let transparentBG = on.is_on ? "rgba(0,0,0,0.7)" :"rgba(0,0,0,0.15)" ;
    // console.log(location.pathname);
    return (
        <OpenContext.Provider value={[isOpen,setOpen]}>
        <Navbarstyle disable={on.is_on} >
            <div className="navbar-inside" style={{ backgroundColor: transparent ? transparentBG: "#0079bf" , height: "100%", display: "flex"}}>
                <Row justifyContent="flex-start" maxWidth="400px" minWidth="400px">
                <MyDropdown
                    isType={isType}
                    maxWidth="38px"
                    minWidth="38px"
                    children={
                        <Row align="flex-start" minHeight="32px">
                            <Link to="/">
                            <MyButton>
                                <HomeOutlinedIcon />
                            </MyButton>
                            </Link>
                        </Row>
                    }
                    board={<Board />}
                
                />
                <MyDropdown
                    isOpen={isOpen.board}
                    setOpen={setOpen}
                    isType={isType}
                    maxWidth="78.25px"
                    minWidth="78.25px"
                    children={
                        <Row align="flex-start" minHeight="32px">
                            <MyButton height="32px" onClick={() => {setOpen({type:'board'}); setType('board')}}>
                                <LogoOnly variant="transparent" size="16px"/>
                                <div style={{marginLeft:"4px"}}>Boards</div>
                            </MyButton>
                        </Row>
                    }
                    board={<Board />}
                
                />
                <MyDropdown 
                    isOpen={isOpen.search} 
                    setOpen={setOpen}
                    isType={isType}
                    mode="search"
                    margin="0px 2px 0px 3px"
                    children={
                        <Row
                            minHeight="32px"
                            maxHeight="32px"
                            animate={isOpen.search ? { backgroundColor: "rgba(255, 255, 255, 1)"} : { backgroundColor: "rgba(255, 255, 255, 0.3)"}}
                        >
                            <div onClick={() => { setOpen({type:'search'}); inputRef.current.focus(); setType('search'); }} style={{ height: "32px", padding: "8px", boxSizing: "border-box", display: "flex", justifyContent: "center" }} >
                                <motion.input
                                    animate={isOpen.search ? "open" : "closed"}
                                    variants={variants}
                                    onFocus={() => setOpen({type:'search'})}
                                    ref={inputRef}
                                    style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        alignSelf: "flex-start",
                                        // height:"100%",
                                        padding: "0px",
                                        width: "130px"
                                        // height:"32px"
                                    }}
                                    onChange={(event)=>OnChange(event)}
                                >
                                </motion.input>
                            </div>
                            <div >
                                {
                                    isOpen.search ?
                                        <CloseIcon style={{ height: "100%", color: "black" }} onClick={() => { setOpen({type:''}); inputRef.current.blur() }} /> :
                                        <SearchIcon style={{ height: "100%", color: "white" }} onClick={() => inputRef.current.focus()} />

                                }
                            </div>
                        </Row>
                    }
                    
                    board={<SearchDropDown searchItem={searchItem} search={search}/>}
                />
                </Row>
                
                {/* <RightDropdown /> */}
                <MyDropdown
                    isOpen={isOpen.create}
                    setOpen={setOpen}
                    isType={isType}
                    maxWidth="38px"
                    minWidth="38px"
                    mode="right"
                    children={
                        <Row align="flex-start" minHeight="32px">
                            <MyButton onClick={() => { setOpen({type:'create'}); setType('create') }}>
                                <AddIcon />
                            </MyButton>
                            
                        </Row>
                    }
                    board={<Create />}
                />
                <MyDropdown
                    isOpen={isOpen.info}
                    setOpen={setOpen}
                    isType={isType}
                    maxWidth="38px"
                    minWidth="38px"
                    mode="right"
                    children={
                        <Row align="flex-start" minHeight="32px">
                            <MyButton onClick={() => { setOpen({type:'info'}); setType('info') }}>
                                <InfoOutlinedIcon />
                            </MyButton>
                        </Row>
                    }
                    board={<Info />}
                />
                <MyDropdown
                    isOpen={isOpen.noti}
                    setOpen={setOpen}
                    isType={isType}
                    maxWidth="38px"
                    minWidth="38px"
                    mode="right"
                    children={
                        <Row align="flex-start" minHeight="32px">
                            
                            <MyButton onClick={() => { setOpen({type:'noti'}); setType('noti') }}>
                                <NotificationsNoneRoundedIcon />
                            </MyButton>
                        </Row>
                    }
                    board={<Notification />}
                />
                <MyDropdown
                    isOpen={isOpen.user}
                    setOpen={setOpen}
                    isType={isType}
                    maxWidth="38px"
                    minWidth="38px"
                    mode="right"
                    children={
                        <Row align="flex-start" minHeight="32px">
                            
                            <motion.button style={{ outline: "none", border: "none", backgroundColor: "transparent", margin: "auto", padding: "0px" }}
                                onClick={() => { setOpen({type:'user'}); setType('user') }}
                            >
                                <Avatar src={profile.picture} style={{ width: "32px", height: "32px", margin: "auto",fontSize:"16px" }}>{profile.initials}</Avatar>
                            </motion.button>
                        </Row>
                    }
                    board={<UserCard name={profile.fullName}/>}
                />
            </div>
            <div style={{maxWidth:"100px",top:"0",margin:"0px",position:"absolute",left:"50%",transform:"translateX(-50%)",alignItems:"center"}}>
                <div style={{maxWidth:"100px",minWidth:"100px"}}>
                    <LogoBut />
                </div>
            </div>
        </Navbarstyle>
        </OpenContext.Provider>
    )

}


const Info = () => {
    const linkList = [
        {
            key: 'Pricing',
            value: ""
        },
        {
            key: 'Apps',
            value: ""
        },
        {
            key: 'Blog',
            value: ""
        },
        {
            key: 'Privacy',
            value: ""
        },
        {
            key: 'More',
            value: ""
        },
    ]
    return (
        <DropDownCard title="information"
            children={
                <div>
                    <Linkable
                        link="#"
                        margin="10px 20px 0px 20px"
                        padding="0px"

                        children={
                            <Column >
                                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                    {/* eslint-disable-next-line */}
                                    <img src="https://a.trellocdn.com/prgb/dist/images/tips/info-image-03@2x.8397667fb178f90df99a.png" style={{ maxWidth: "100%" }} />
                                </div>
                                <div style={{ padding: '10px', textAlign: "center" }}>
                                    a board is made up of card blah blah blah
                                </div>
                            </Column >
                        }
                    />

                    <Linkable
                        link="#"
                        margin="0px 20px 0px 20px"
                        padding="10px"
                        children={
                            <Column>
                                <div style={{ padding: '0px', textAlign: "center" }}>
                                    more info
                            </div>
                            </Column >
                        }
                    />
                    <Divider light variant="middle" />
                    <Row>
                        {linkList.map((item) => {
                            return (
                                <Linkable
                                    underline={true}
                                    margin="0px 0px 20px 0px"
                                    children={
                                        item.key
                                    }
                                />
                            );
                        })}
                    </Row>
                </div>
            }
        />
    );
}

const Creates = ({dispatch}) => {
    // eslint-disable-next-line
    const [open,setOpen] = useContext(OpenContext);
    return (
        <DropDownCard
            title="create"
            children={
                <div>
                    <Linkable
                        margin="10px 0px 0px 0px"
                        onClick={() => {dispatch(createOn()); setOpen({type:''})}}
                        // onClick={setOpen(false)}
                        children={
                            <Column padding="4px 10px 10px 10px">
                                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                    <LogoOnly />
                                    {/* <Button></Button> */}
                                    <div style ={{marginLeft: "10px"}}>
                                    CreateBoard...
                                    </div>
                                </div>
                                <div>
                                    a board is made up of card blah blah blah
                                </div>
                            </Column>
                        }
                    />
                </div>
            }
        />
    );
}

const Notification = () => {
    return (
        <DropDownCard
            title="Notification"
            children={
                <div>
                    <Column padding="30px" align="center">
                        <img alt="araiwa" src="https://a.trellocdn.com/prgb/dist/images/taco-sleep.0582d9f3bdb5060e7285.svg" />
                        No unread notification
                    </Column>
                </div>
            }
        />
    );
}

const UserCards = ({dispatch,name}) => {
    const UserMenuLink =({children,onClick})=>{
        return (
            <Linkable margin="0px" onClick={onClick} padding="10px 10px 10px 20px" children={children} />
        );
    }
    return (
        <DropDownCard
            title={name}
            children={
                <div>
                    <Column padding="0px">
                        <UserMenuLink
                            children={
                                <div>
                                    Profile and visibility
                                </div>
                            }
                        />
                        <UserMenuLink
                            children={
                                <div>
                                    Activity
                                </div>
                            }
                        />
                        <UserMenuLink 
                            children={
                                <div>
                                    Cards
                                </div>
                            }
                        />
                        <UserMenuLink 
                            children={
                                <div>
                                    Settings
                                </div>
                            }
                        />
                        <Divider variant="middle" light />
                        <UserMenuLink 
                            children={
                                <div>
                                    Help
                                </div>
                            }
                        />
                        <UserMenuLink 
                            children={
                                <div>
                                    Shortcuts
                                </div>
                            }
                        />
                        <Divider variant="middle" light />
                        <UserMenuLink 
                            onClick={()=>dispatch({type:"LOG_OUT"})}
                            children={
                                <div>
                                    Log out
                                </div>
                            }
                        />
                    </Column>

                </div>

            }
        />
    );
}

const SearchDropDowns = ({searchItem,personalBoardList,starredBoardList,dispatch,search}) => {
    const [open,setOpen] = useState(false);
    const suggestionData = [
        {
            title:"@name",
            des:"Returns cards assigned to a member. If you start typing @, Trello will suggest members for you. member: also works. @me will include only your cards."
        },
        {
            title:"#label",
            des:"Returns labeled cards. label: also works."
        },
        {
            title:"board:id",
            des:"Returns cards within a specific board. If you start typing board:, Trello will suggest boards for you. You can search by board name, too, such as “board:Trello” to search only cards on boards with Trello in the board name."
        },
        {
            title:"created:day",
            des:"Returns cards due within 24 hours. due:week, due:month, and due:overdue also work as expected. You can search for a specific day range. For example, adding due:14 to search will include cards due in the next 14 days."
        },
        {
            title:"edited:day",
            des:"Returns cards edited in the last 24 hours. edited:week and edited:month also work as expected. You can search for a specific day range. For example, adding edited:21 to the search will include cards edited in the last 21 days."
        },
        {
            title:"description:, checklist:, comment:, and name:",
            des:"Returns cards matching the text of card descriptions, checklists, comments, or names. For example, comment:\"FIX IT\" will return cards with “FIX IT” in a comment."
        },
        {
            title:"is:open and is:archived",
            des:"Returns cards that are either open or archived. Trello returns both types by default."
        },
        {
            title:"is:starred",
            des:"Only include cards on starred boards."
        },
        {
            title:"sort:created",
            des:"Sorts cards by date created. sort:edited and sort:due also work as expected."
        }
    ]
    const SearchList =({title,des})=>{
        return (
            <FlyUpDiv>
            <Column minHeigh="100px">
                <dt style={{fontSize:"15px",marginTop:"15px",fontWeight:"bold",color:"#5e6c84"}}>{title}</dt>
                <div style={{fontSize:"13px",paddingLeft: "20px",marginTop:"15px",color:"#5e6c84"}}>
                    {des}
                </div>
            </Column>
            </FlyUpDiv>
        );
    };
    const searchSuggestion = (
        <div>
            <div style={{fontSize:"13px",color:"#5e6c84"}}>
                Search operators help you find specific cards and create highly tailored lists. Trello will suggest operators for you as you type, but here’s a full list to keep in mind. You can add “-” to any operator to do a negative search, such as -has:members to search for cards without any members assigned.
            </div>
            {suggestionData.map((data)=>(
                <SearchList title={data.title} des={data.des} />
            ))}
        </div>
    );
    
    return (
        <div>
            <Column padding="20px 20px 20px 20px" maxWidth="330px" minWidth="330px">
            { search.length > 0 ?  null :
                <div>
                    <div style={{color:"#5e6c84",background:"url(https://a.trellocdn.com/prgb/dist/images/empty-states/comb.65864547b3e6ae50d7ff.svg) no-repeat 0",paddingLeft:"50px"}}>
                        Refine your search with operators like @member, #label, is:archived, and has:attachments.
                        
                    </div>
                    <div style={{maxWidth: "100px",float:"right"}}>
                    <Linkable onClick={()=>setOpen(!open)} children={<Row>{open ? "Close" : "Learn More"}</Row>} backgroundColor="rgba(0,0,0,0.03)"/>
                    </div>
                </div>
            }
            {
                open? searchSuggestion : null
            }
            {
            searchItem.length > 0 ? 
            <HidableDiv open={true} initial="init" animate="open" variants={flyUpDiv} >
                Board
                {
                    searchItem.map((board,index)=>{
                        let star = starredBoardList.some(sboard=>sboard.id === board.id);
                        return (
                                <BoardPreview board={board} dispatch={dispatch} index={index} open={false} star={star}/>
                        );
                    })
                }
                </HidableDiv>:null
            }
            </Column>

        </div>

    );
}

const SearchStyle = styled(motion.input)`
    background-color: transparent;
    align-self: flex-start;
    height:20px;
    padding: 15px;
    box-sizing: border-box;
    // width: 130px;
    width: 98%;
    min-width: 300px;
    height: 30px;
    
    border: 2px solid rgba(201, 201, 201,0.3);
    outline: none;
    &:focus{
        outline: none;
        border: 2px solid rgb(0, 121, 191);
      }
`;

const Boards =({personalBoardList,starredBoardList,dispatch})=>{
    const [search,setSearch] = useState('');
    const [openStar,setOpenStar] = useState(false);
    const [openPers,setOpenPers] = useState(false);
    const OnChange =(event)=>{
        let keyword = event.target.value;
        setSearch(keyword);
    }
    // eslint-disable-next-line
    const searchItem = personalBoardList.filter((data)=>{
        if (search === 'is:starred'){
            // return starred list
        }
        if(search === null || search === ''){
            return null;
        }
        else if(data.name.toLowerCase().includes(search.toLowerCase()) && data.id > 0){
            // console.log(data);
            return data;
        }
    })
    return (
        <Column padding="10px">
            <SearchStyle placeholder="Enter a keyword" onChange={(event)=>OnChange(event)}>
            </SearchStyle>
            { search.length > 0 ?  null :
                <div>
                <ConnectedHidable type="starred" open={openStar} setOpen={setOpenStar}/>
                <ConnectedHidable type="personal" open={openPers} setOpen={setOpenPers}/>
                </div>
            }
            <HidableDiv open={true} initial="init" animate="open" variants={flyUpDiv} >
            {
                searchItem.length === 0 && search.length > 0 ?
                <Column minWidth="300px">
                    Not Found
                </Column>:
                searchItem.map((board,index)=>{
                    let star = starredBoardList.some(sboard=>sboard.id === board.id);
                    return (
                            <BoardPreview board={board} dispatch={dispatch} index={index} open={false} star={star}/>
                    );
                })
            }
            </HidableDiv>
        </Column>
    );
}

// const HidableTitle = styled.div`
//     display:flex;

// `;
const HidableButton =({children,onClick})=>{
    return (
        <MyButton onClick={onClick} color="black" hovercolor="rgba(158, 158, 158, 0.3)" nomargin>{children}</MyButton>
    );
}

const HidableDiv = styled(motion.div)`
    display:${props=>props.open ? "block" : "block"};
    max-width: 300px;
`;
const HidableCon = styled.div`
    width:100%;
    padding-left:4px;
`;
const Hidable =({personalBoardList,starredBoardList,type,dispatch,open,setOpen})=>{
    // eslint-disable-next-line
    const [test,setTest] = useState(starredBoardList)
    const authenHeader = useAuthen();
    const onDragEnd =(result)=> {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
        moveStarObject(starredBoardList, result.source.index, result.destination.index, dispatch, authenHeader);
        // const items = reorder(
        //   temp,
        //   result.source.index,
        //   result.destination.index
        // );
        // dispatch(overWriteStarBoard(items));
        
      }
    const item = {
        starred:{
            title:'Starred Board',
            icon:<StarBorderRoundedIcon style={{color:"rgb(0, 121, 191)"}}/>,
            child:
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            >
                            {
                                starredBoardList.filter(board => board.id > 0 ).map((board,index)=>
                                    <Draggable key={board.id} draggableId={String(board.id)} index={starredBoardList.findIndex(i => i.id === board.id)}>
                                    {(provided,snapshot)=>{
                                        let starred = starredBoardList.some(sboard=>sboard.id === board.id);
                                        return(
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                >
                                                
                                                    <BoardPreview board={board}
                                                    dispatch={dispatch} index={index} open={open} star={starred}
                                                    />
                                            </div>
                                            );
                                        }
                                    }
                                    
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        },
        recent:{
            title:'Recent Board',
            icon:<QueryBuilderRoundedIcon />,
            child:<div>Recent</div>
        },
        Personal:{
            title:'Personal Board',
            icon:<LogoOnly />,
            child:<div style={{display:"block"}}>{
                personalBoardList.filter(board => board.id > 0 ).map((board,index)=>{
                    let starred = starredBoardList.some(sboard=>sboard.id === board.id);
                    return(
                        <BoardPreview board={board} dispatch={dispatch} index={index} open={open} star={starred}/>
                    );
                }
                    
                )}
                </div>
        }
    }
    const getTy =(type)=>{
        switch(type){
            case 'starred':
                return item.starred;
            case 'recent':
                return item.recent;
            case 'personal':
                return item.Personal;
            default:
                return <div>Nothing</div>
        }
    }
    return (
            <Column minWidth="300px" >
            <div style={{zIndex:"1"}}>    
            <Row align="center" justifyContent="space-between" backgroundColor="white" >
                {getTy(type).icon}
                <HidableCon>
                    {getTy(type).title}
                </HidableCon>
                <HidableButton children={<AddIcon />} onClick={()=>{setOpen(!open); }}/>
            </Row>
            </div>
            <HidableDiv open={open} initial="init" animate={open?"open":"init"} variants={flyUpDiv} >
                {getTy(type).child}
            </HidableDiv>
            </Column>
        
    );
}

const flyUpDiv = {
    init:{
        height:"0px",
        opacity:0,
        transition:{
            duration:0.3,
            staggerChildren:0.01,
            staggerDirection: -1
        }
    },
    open:{
        height:"100%",
        opacity:1,
        transition:{
            duration:0.2,
            staggerChildren:0.01,
        }
    }
}
const BoardPreviewTitle = styled(motion.div)`
    display:flex;
    width: 100%;
    justify-content:space-between;
    align-items: center;
    padding-left:10px;
    padding-right: 10px;
`;

const BoardPreviewBg = styled(motion.div)`
    top:0px;
    position:absolute;
    // background-image: url(${require('./test.jpg')});
    background-position: center top;
    filter: blur(4px) opacity(50%);
    // -webkit-filter: blur(4px) greyscale(100%);
    background-size: cover;
    background-color: ${props=>props.backgroundColor};
    height:100%;
    width:80%;
`;
const Imgpreview = styled(motion.img)`
    width:20%;
    filter: opacity(90%);
    background-color:${props=>props.backgroundColor};
`;

const BoardPreviewBgHover = {
    init:{
        filter: "blur(4px) opacity(30%)"
    },
    hover:{
        filter: "blur(1px) opacity(50%)",
        transition:{
            duration: 0.3
        }
    }
}
const ImgPreviewHover = {
    
    init:{
        filter: "opacity(90%)"
    },
    hover:{
        filter: "opacity(100%)",
        transition:{
            duration: 0.3
        }
    }
}
    
const FlyUpDiv = styled(motion.div)`
    // transform: translateY(calc(-40*${props=>props.index}px));
    // box-shadow: 0px 0px 8px -5px rgba(1,1,1,0.75);
    // margin-left: 10px;
    // margin-right: 10px;
    padding: 5px 0px 5px 0px;
    min-width: 280px;
    max-width: 280px;
    margin:0 auto;
`;

const BoardPreview =({board,star,dispatch,index,open})=>{
    // eslint-disable-next-line
    const [openP,setOpenP] = useContext(OpenContext);
    const authenHeader = useAuthen();
    const StarButton =({board,dispatch,star})=>{
    function starApi (boardId) { 
        axios.post(`${URL}${starToggle(boardId)}`, {}, authenHeader)  
    }
        return (
            <motion.div 
            variants={
                {
                    init:{
                        y:star ? 0: 100,
                        transition:{
                            type:"spring",
                            stiffness: 500,
                            damping: 30 ,
                            duration: 0.3
                        }
                    },
                    hover:{
                        y:0,
                        transition:{
                            type:"spring",
                            stiffness: 500,
                            damping: 30 ,
                            duration: 0.3
                        }
                    }
                }
            }
            style={{position:"absolute",left:"250px",marginTop:"-33px" }}>
            <motion.div whileHover={{scale:1.3}} whileTap={{scale:0.8}} onClick={()=>{
                    starApi(board.id)
                        if(!star){
                            dispatch(starBoard(board.id,board))
                        }
                        else{
                            dispatch(unStarBoard(board.id))
                        }
                        
                    }
                }>
                <StarBorderRoundedIcon style={{color:star? "rgb(133,133,0)" : "rgb(0,1,61)"}} />
                </motion.div>
            </motion.div> 
        );
    }
    return (
            <FlyUpDiv index={index} 
                whileTap={{scale:0.95}}
                variants={
                    {
                        init:{
                            y:-55*(index+1),
                            transition:{
                                // delay:1,
                                duration:0.2,
                            }
                        },
                        open:{
                            y:0,
                            transition:{
                                // delay:1,
                                duration:0.2,
                            }
                        }
                    }
                } 
                >
                <motion.div 
                    whileHover="hover"
                    initial="init" 
                    style={{position:"relative",overflow:"hidden",border:"1px solid rgba(0, 0, 0, 0.7)",borderRadius:"5px" }}
                    whileTap={{boxShadow:"0px 0px 20px -10px"}}
                    >   
                    <Linkable
                        padding="0px"
                        onClick={()=>setOpenP({type:''})}
                        // const boardHref = `/${board.id}/${board.name}`;
                        link={`/${board.id}/${board.name}`}
                        children={
                            <Row maxHeight="40px" minHeight="40px" overflow="hidden" >
                                
                                <Imgpreview backgroundColor={board.color_code} variants={ImgPreviewHover}/>
                                {/* {console.log(board)} */}
                                {/* <img src={require("./test.jpg")}/> */}
                                <div style={{display:"block" ,width:"80%",alignSelf:"center"}}>
                                <BoardPreviewBg backgroundColor={board.color_code} variants={BoardPreviewBgHover}></BoardPreviewBg>
                                <BoardPreviewTitle>
                                    <Column minWidth="60%" maxWidth="60%">
                                        {board.name}
                                    </Column>
                                    
                                    <Row  width="40%">
                                        
                                    </Row>
                                    
                                </BoardPreviewTitle>
                                
                                </div>
                            </Row>
                        }/>
                    <StarButton board={board} dispatch={dispatch} star={star}/>
                </motion.div>
            
            </FlyUpDiv>
    );
} 

const DropDownVariants = {
    open: {
        scale: 1,
        opacity: 1,
        visibility: "visible",
        transition: {
            duration: 0.1,
            type: "tween",

        }
    },
    closed: {
        scale: 0.9,
        opacity: 0,
        visibility: "hidden",
        transition: {
            duration: 0.1,
            velocity: 2
        }
    }
}

const visibility = {
    open:{
        overflow:"visible",
        transition:{
            duration: 0.1,
            type:"tween"
        }
    },
    closed:{
        overflow:"hidden",
        transition:{
            delay:0.1,
            duration:0.1,
            velocity:"2"
        }
    }
}

const MyDropdown = ({margin,onChange,setOpen,board,isOpen,children,mode,isType,maxWidth,minWidth}) => {
    const ref = useRef();
    let align = 'flex-start';
    const handleClickOutside = e => {
        // console.log("clicking anywhere");
        if (ref.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setOpen({type:''});
    };
  
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line
    }, [isOpen]);
    if(mode === 'search'){
        maxWidth = isOpen ? '240px' : '140px';
        minWidth = '140px'
    }
    if(mode === 'right'){
        align = "flex-end"
    }
    return (
        <Column
            animate={isOpen ? 'open':'closed'}
            variants={visibility}
            ref={ref} 
            align={align}
            margin={margin}
            minWidth= {minWidth}
            maxWidth= {maxWidth}
            padding="4px 0px 4px 0px">
                    {children}
                    <div>
                <DropDownStyle
                    animate={isOpen ? 'open' : 'closed'}
                    variants={DropDownVariants}
                >
                    <div style={{maxHeight:"calc(100vh - 50px)",overflowY:"auto"}}>
                        {board}
                    </div>
                    {/* {getDropDown(isType)} */}
                    
                </DropDownStyle>
                </div>
        </Column>
    );
};

const initState = {
    board:false,
    search:false,
    create:false,
    info:false,
    noti:false,
    user:false,
}

const reducers =(state,action)=>{
    switch(action.type){
        case 'board':
            if(state.board){
                return {...initState,board:false};
            }
            return {...initState,board:true};
        case 'search':
            return {...initState,search:true};
        case 'create':
            if(state.create){
                return {...initState,create:false};
            }
            return {...initState,create:true};
        case 'info':
            if(state.info){
                return {...initState,info:false};
            }
            return {...initState,info:true};
        case 'noti':
            if(state.noti){
                return {...initState,noti:false};
            }
            return {...initState,noti:true};
        case 'user':
            if(state.user){
                return {...initState,user:false};
            }
            return {...initState,user:true};
        default:
            return {...initState};
    }
}
const OpenContext = createContext(initState);

const mapStateToProps =(state)=> ({
    personalBoardList: state.personalBoardList,
    createCurrent: state.createNewBoard.ref,
    starredBoardList: state.starredBoardList,
    on:state.createNewBoard,
    loggedIn:state.loggedIn,
    profile:state.dataProfile
})

const ConnectedHidable = connect(mapStateToProps)(Hidable);
const Create = connect(mapStateToProps)(Creates);
const Board = connect(mapStateToProps)(Boards);
const SearchDropDown = connect(mapStateToProps)(SearchDropDowns);
const Navbar = connect(mapStateToProps)(Navbars);
const UserCard = connect(mapStateToProps)(UserCards);
export default Navbar;