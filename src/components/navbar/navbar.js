import React, { useState, useRef, useEffect, createContext, useReducer, useContext } from 'react';
import { Frame, Page, motion } from "framer-motion";
import styled, { css } from 'styled-components';


import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Button from '@material-ui/core/Button';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import { Divider, Avatar, Hidden, useIsFocusVisible } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AppsIcon from '@material-ui/icons/Apps';
import AddIcon from '@material-ui/icons/Add';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import PeopleOutlineRoundedIcon from '@material-ui/icons/PeopleOutlineRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import QueryBuilderRoundedIcon from '@material-ui/icons/QueryBuilderRounded';

const buttonStyle = {
    backgroundColor: "hsla(0,0%,100%,.3)",
    color: "white",
    border: "none",
    padding: "4px",
    outline: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "4px"
}

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
    margin-right: ${props=>props.nomargin ? '0px' : '4px'};
    &:hover{
        background-color: ${props=>props.hovercolor? props.hovercolor : "rgba(255, 255, 255, 0.1)"};
    }
`;

const DropDownStyle = styled(motion.div)`
    background-color: white;
    flex-basis: 100px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.12);
    boxShadow: 0px 0px 15px -10px rgba(1,1,1,0.75);
    margin-top: 10px;
    margin-right: 4px;
    border-radius: 5px;
`;

const navbarstyle = {

    width: "100%",
    // height: "5.5vh",
    height: "40px",
    position: "sticky",
    top: "0",
}

const variants = {
    open: {
        width: "200px",
        transition: {
            duration: 0.1
        },
        outline: "none"
    },
    closed: {
        width: "100px",
        transition: {
            duration: 0.1
        }
    },
    close: {
        width: "130px",
        transition: {
            duration: 0.1
        }
    }
}

const hoverVar = {
    hover: {
        backgroundColor: "rgba(206, 212, 206, 0.3)",
        transition: { duration: 0.1 },
    },
    exit: {
        backgroundColor: "white",
        transition: {
            duration: 0.1
        }
    }
}
const Column = styled(motion.div)`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    transition-duration: 0.1s;
    border-radius: 3px;
    align-items: ${props => props.align};
    overflow:hidden;
    width:${props=>props.width};
    min-width:${props=>props.minWidth};
    max-width:${props=>props.maxWidth};
    margin: ${props => props.margin};
    padding: ${props => props.padding};
    z-index:111111111;
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

const LinkStyle = styled.a`
    text-decoration:${props => props.underline ? 'underline' : 'none'};
    color: black;
`;

const Linkable = ({ link, children, padding, margin, underline, onClick,backgroundColor }) => {
    return (
        <LinkBox padding={padding} margin={margin} backgroundColor={backgroundColor}>
            <LinkStyle href={link} underline={underline} onClick={onClick}>
                {children}
            </LinkStyle>
        </LinkBox>
    );
}

const Row = styled(motion.div)`
    display: flex;
    flex-direction: row;
    justify-content:${props => props.justifyContent ? props.justifyContent : "center"};
    boxSizing: border-box;
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
    const [isOpen, setOpen] =useContext(OpenContext);
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

const InsideCard = styled(Column)`
    flex-direction: column;
    padding: 10px;
    &:hover {
        background-color: rgba(206, 212, 206, 0.3);
    }
`;

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
    padding:2px;
    margin:${props=> props.margin? props.margin: "2px"};
    border-radius:2px;
    box-sizing:border-box;
    display:flex;
    background-color:${props=>props.white ? "white": "rgba(255, 255, 255, 0.5)"};
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
        backgroundColor:"rgba(255, 255, 255, 1)"
    },
    
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
    `;
const LogoBut =()=>{
    const config={
        hover : logoHover,
        animation: logoVariants,
        animate: ["init1","init2"]

    }
    
    return (
        <LogoContainer
            whileHover="hover"
        >
            <LogoStyle variants={logoHover}>
                <motion.div style={{height:"8px",width:"10px",backgroundColor:"rgb(0, 121, 191)",borderRadius:"1.5px",marginRight:"2px"}}
                    animate="init1"
                    variants={logoVariants}
                >
                </motion.div>
                <motion.div style={{width:"10px",backgroundColor:"rgb(0, 121, 191)",borderRadius:"1.5px"}}
                    animate="init2"
                    variants={logoVariants}
                >
                </motion.div>
            </LogoStyle>

            <LogoLetter variants={textHover} >
                Trelly
            </LogoLetter>
        </LogoContainer>
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
    // background-color: rgba(255,255,255,1);
`;
const NormalRightLogo = styled(Logodiv)`
    height: 100%};
`;
const NormalStyle = styled(LogoStyle)`
    background-color:white
`
const LogoOnly =({config,size})=>{
    
    if(config != undefined){
        return (
            <LogoStyle variants={config.hover}>
                <Logodiv margin variants={config.animation} animate={config.animate[0]}></Logodiv>
                <Logodiv variants={config.animation} animate={config.animate[1]}></Logodiv>
            </LogoStyle>
        );
    }
    return (
        <LogoStyle white size={size}>
            <NormalLeftLogo margin></NormalLeftLogo>
            <NormalRightLogo></NormalRightLogo>
        </LogoStyle>
    );
}

const Navbar = () => {
    const [isType, setType] = useState(false);
    const inputRef = useRef();
    const [isOpen, setOpen] = useReducer(reducers,initState);
    return (
        <OpenContext.Provider value={[isOpen,setOpen]}>
        <div className="navbar-container" style={navbarstyle}>
            <div className="navbar-inside" style={{ backgroundColor: "#0079bf", height: "100%", display: "flex" }}>
                <Row justifyContent="flex-start" maxWidth="400px" minWidth="400px">
                <MyDropdown
                    isOpen={isOpen.left}
                    setOpen={setOpen}
                    isType={isType}
                    maxWidth="118px"
                    minWidth="118px"
                    children={
                        <Row align="flex-start" minHeight="32px">
                            <MyButton>
                                <HomeOutlinedIcon />
                            </MyButton>
                            <MyButton height="32px" nomargin onClick={() => {setOpen({type:'left'}); setType('board')}}>
                                <LogoOnly size="16px"/>
                                <div style={{marginLeft:"4px"}}>Boards</div>
                            </MyButton>
                        </Row>
                    }
                
                />
                <MyDropdown 
                    isOpen={isOpen.search} 
                    setOpen={setOpen}
                    isType={isType}
                    mode="search"
                    children={
                        <Row
                            minHeight="32px"
                            maxHeight="32px"
                            animate={isOpen.search ? { backgroundColor: "white" } : { backgroundColor: "rgba(255, 255, 255, 0.3)" }}
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
                />
                </Row>
                
                {/* <RightDropdown /> */}
                <MyDropdown
                    isOpen={isOpen.right}
                    setOpen={setOpen}
                    isType={isType}
                    maxWidth="148px"
                    minWidth="148px"
                    mode="right"
                    children={
                        <Row align="flex-start" minHeight="32px">
                            <MyButton onClick={() => { setOpen({type:'right'}); setType('create') }}>
                                <AddIcon />
                            </MyButton>
                            <MyButton onClick={() => { setOpen({type:'right'}); setType('info') }}>
                                <InfoOutlinedIcon />
                            </MyButton>
                            <MyButton onClick={() => { setOpen({type:'right'}); setType('noti') }}>
                                <NotificationsNoneRoundedIcon />
                            </MyButton>
                            <motion.button style={{ outline: "none", border: "none", backgroundColor: "transparent", margin: "auto", padding: "0px" }}
                                onClick={() => { setOpen({type:'right'}); setType('user') }}
                            >
                                <Avatar style={{ width: "32px", height: "32px", margin: "auto" }} />
                            </motion.button>
                        </Row>
                    }
                />
            </div>
            <div style={{maxWidth:"100px",top:"0",margin:"0px",position:"absolute",left:"50%",transform:"translateX(-50%)",alignItems:"center"}}>
                <div style={{maxWidth:"100px",minWidth:"100px"}}>
                    <LogoBut />
                </div>
            </div>
        </div>
        </OpenContext.Provider>
    )

}
export default Navbar;

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

const Create = () => {
    return (
        <DropDownCard
            title="create"
            children={
                <div>
                    <Linkable
                        margin="10px 0px 0px 0px"
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

const UserCard = () => {
    const UserMenuLink =({children})=>{
        return (
            <Linkable margin="0px" padding="10px 10px 10px 20px" children={children} />
        );
    }
    return (
        <DropDownCard
            title="Gintoki Sakata"
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

const SearchDropDown = () => {
    return (
        <DropDownCard
            title="Search"
            children={
                <div>
                    <Column padding="5px 20px 5px 20px">

                    </Column>

                </div>

            }
        />
    );
}

const SearchStyle = styled(motion.input)`
    background-color: transparent;
    align-self: flex-start;
    height:20px;
    padding: 0px;
    // width: 130px;
    width: 98%;
    height: 30px;
    border: 2px solid red;
    &:focus{
        border-color:blue;
      }
`;

const Board =()=>{
    return (
        <Column padding="10px">
            <SearchStyle>
            </SearchStyle>
            <Hidable type="starred"/>
            <Hidable type="recent"/>
            <Hidable type="personal"/>
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

const HidableDiv = styled.div`
    display:${props=>props.open ? "block" : "none"};
`;
const HidableCon = styled.div`
    width:100%;
    padding-left:4px;
`;
const Hidable =({type})=>{
    const [open,setOpen] = useState(false);
    
    const item = {
        starred:{
            title:'StarredBoard',
            icon:<StarBorderRoundedIcon/>,
            child:<div>{<BoardPreview />}</div>
        },
        recent:{
            title:'RecentBoard',
            icon:<QueryBuilderRoundedIcon />,
            child:<div>Recent</div>
        },
        Personal:{
            title:'PersonalBoard',
            icon:<LogoOnly />,
            child:<div>Story</div>
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
            <Column minWidth="300px">
            <Row align="center" justifyContent="space-between">
                {getTy(type).icon}
                <HidableCon>
                    StarredBoard
                </HidableCon>
                <HidableButton children={<AddIcon />} onClick={()=>setOpen(!open)}/>
            </Row>
            <HidableDiv open={open}>
                {getTy(type).child}
            </HidableDiv>
            </Column>
        
    );
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
    background-image: url(${require('./test.jpg')});
    background-position: center top;
    filter: blur(4px) opacity(50%);
    // -webkit-filter: blur(4px) greyscale(100%);
    background-size: cover;
    height:100%;
    width:80%;
`;
const Imgpreview = styled(motion.img)`
    width:20%;
    filter: opacity(90%);
`;

const BoardPreviewBgHover = {
    init:{
        filter: "blur(4px) opacity(30%)"
    },
    hover:{
        filter: "blur(1px) opacity(35%)",
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

const CloseButtonHover ={
    init:{
        y:100
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

const StarButtonHover = {
    init:{
        y:100
    },
    hover:{
        y:0,
        transition:{
            delay:0.05,
            type:"spring",
            stiffness: 500,
            damping: 30 ,
            duration: 0.3
        }
    }

}

const BoardPreview =()=>{
    return (
        <Linkable
            padding="0px"
            children={
                <Row maxHeight="40px" minHeight="40px" overflow="hidden" whileHover="hover" initial="init">
                    <Imgpreview src={require("./test.jpg")} variants={ImgPreviewHover}/>
                    {/* <img src={require("./test.jpg")}/> */}
                    <div style={{display:"block" ,width:"80%",alignSelf:"center"}}>
                    <BoardPreviewBg variants={BoardPreviewBgHover}></BoardPreviewBg>
                    <BoardPreviewTitle>
                        <Column minWidth="60%" maxWidth="60%">
                            Test
                        </Column>
                        
                        <Row  width="40%">
                            <motion.div variants={CloseButtonHover}>
                                <CloseIcon />
                            </motion.div>
                            <motion.div variants={StarButtonHover}>
                                <StarBorderRoundedIcon />
                            </motion.div>
                        </Row>
                        
                    </BoardPreviewTitle>
                    
                    </div>
                </Row>
            }
        />
        
    );
}


const Smth = () => {
    return (
        <DropDownCard
            title="I here ni kue a rai wa"
            children={
                <div>
                    <Linkable
                        margin="10px 20px 0px 20px"
                        // onClick={setOpen(false)}
                        children={
                            <Column padding="10px">
                            </Column>
                        }
                    />
                </div>
            }
        />
    );
}

const getDropDown = (type) => {
    switch (type) {
        case 'create':
            return <Create />
        case 'info':
            return <Info />
        case 'noti':
            return <Notification />
        case 'user':
            return <UserCard />
        case 'smth':
            return <Smth />
        case 'search':
            return <SearchDropDown />
        case 'board':
            return <Board />
    }
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

const MyDropdown = ({onChange,setOpen,isOpen,children,mode,isType,maxWidth,minWidth}) => {
    const ref = useRef();
    let align = 'flex-start';
    const handleClickOutside = e => {
        console.log("clicking anywhere");
        if (ref.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setOpen({type:''});
    };

    const handleChange = selectedValue => {
        onChange(selectedValue);
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
            minWidth= {minWidth}
            maxWidth= {maxWidth}
            padding="4px 0px 4px 0px">
                    {children}
                    <div>
                <DropDownStyle
                    animate={isOpen ? 'open' : 'closed'}
                    variants={DropDownVariants}
                >
                    {getDropDown(isType)}
                </DropDownStyle>
                </div>
        </Column>
    );
};

const initState = {
    left:false,
    search:false,
    right:false,
}

const reducers =(state,action)=>{
    switch(action.type){
        case 'left':
            return {
                left:true,
                search:false,
                right:false,
            };
        case 'search':
            return {
                left:false,
                search:true,
                right:false,
            };
        case 'right':
            return {
                left:false,
                search:false,
                right:true,
            };return state;
        default:
            return {
                left:false,
                search:false,
                right:false,
            };
    }
}
const OpenContext = createContext(initState);
