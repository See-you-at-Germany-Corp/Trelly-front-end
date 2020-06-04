import React, {useState, useRef} from 'react';
import { Frame, Page, motion } from "framer-motion";

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Button from '@material-ui/core/Button';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import { Divider, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AppsIcon from '@material-ui/icons/Apps';
import AddIcon from '@material-ui/icons/Add';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';

const buttonStyle={
    backgroundColor:"hsla(0,0%,100%,.3)",
    color:"white",
    border:"none",
    // alignSelf:"flex-start",
    padding:"4px",
    outline:0,
    display:"flex",
    justifyContent:"center",
    alignItems: "center",
    marginRight:"4px"
}

const navbarstyle={
    
    width:"100%",
    height:"40px",
    position:"fixed",
    top:"0",
}

const variants={
    open:{
        width:"200px",
        transition:{
            duration: 0.1
        },
        outline:"none"
    },
    closed:{
        width:"100px",
        transition:{
            duration: 0.1
        }
    },
    close:{
        width:"130px",
        transition:{
            duration: 0.1
        }
    }
}




const Navbar =()=>{
    const [isSearch,setSearch] = useState(false);
    const [isShowBoard,setShowBoard] = useState(false);
    const [isShowMenu,setShowMenu] = useState(false);
    const [isShowCreate,setShowCreate] = useState(false);
    const [isShowInfo,setShowInfo] = useState(false);
    const [isShowNoti,setShowNoti] = useState(false);
    const [isShowAvatar,setShowAvatar] = useState(false);
    const inputRef = useRef();
    const setFocus=()=>{
        this.inputRef.current.focus();
    }
    return (
        <div className="navbar-container" style={navbarstyle}>
            <div className="navbar-inside" style={{backgroundColor:"#0079bf",height:"100%",display:"flex"}}>
                <div className="left-side" style={{height:"100%",width:"70%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <div className="home-icon" style={{
                        display:"flex",
                        flexDirection:"row",
                        // flexWrap:"wrap",
                        marginRight:"4px",
                        height:"80%",
                        paddingLeft:"4px",
                        paddingRight:"4px"}}>
                            <div className="SomeThingButton" style={{
                            display:"flex",
                            backgroundColor:"transparent",
                            borderRadius:"3px",
                            flexDirection:"column",
                            width:"38px",
                            // alignItems: "flex-start",
                            height:"100%",
                            }}>
                            <motion.button onClick={()=>setShowMenu(!isShowMenu)} onBlur={()=>setShowMenu(!isShowMenu)}
                                style={buttonStyle}
                                whileHover={{
                                    backgroundColor:"rgba(255, 255, 255, 0.1)",
                                    
                                }}
                            >
                                <AppsIcon />
                               
                                
                            </motion.button>
                            <DropDown visible={isShowMenu} children={<h1>SomeThing</h1>} />
                        </div>
                        <div className="HomeButton" style={{
                            display:"flex",
                            backgroundColor:"transparent",
                            borderRadius:"3px",
                            flexDirection:"column",
                            width:"38px",
                            // alignItems: "flex-start",
                            height:"100%"
                            }}>
                            <motion.button 
                                style={buttonStyle}
                                whileHover={{
                                    backgroundColor:"rgba(255, 255, 255, 0.1)",
                                    
                                }}
                            >
                                <HomeOutlinedIcon />
                               
                                
                            </motion.button>
                        </div>
                        <div className="BoardList" style={{
                            display:"flex",
                            backgroundColor:"transparent",
                            borderRadius:"3px",
                            flexDirection:"column",
                            width:"100px",
                            // alignItems: "flex-start",
                            height:"100%"
                            }}>
                            <motion.button onClick={()=>setShowBoard(!isShowBoard)} onBlur={()=>setShowBoard(!isShowBoard)}
                                style={buttonStyle}
                                whileHover={{
                                    backgroundColor:"rgba(255, 255, 255, 0.1)",
                                    
                                }}
                            >
                                <DashboardOutlinedIcon />
                                Boards
                                
                            </motion.button>
                            <DropDown visible={isShowBoard} children={<h1>Board</h1>}/>
                        </div>
                            
                        <motion.div className="search" 
                            // variants={variants}
                            // animate={isSearch ? 'open': 'close'}
                            style={{
                            display:"flex",
                            backgroundColor:"transparent",
                            borderRadius:"3px",
                            flexDirection:"column",
                            // alignItems: "flex-start",
                            height:"100%"
                            // width: isSearch ? "200px" : "130px",
                            }}>
                            
                            <motion.div style={{display:"flex",flexDirection:"row",height:"32px",alignSelf:"flex-start",boxSizing:"border-box",padding:"8px",borderRadius:"3px"}}
                                animate={isSearch? {backgroundColor:"white"} : {backgroundColor:"rgba(255, 255, 255, 0.3)"}  }
                            >
                                <motion.input
                                    animate={isSearch ? "open":"closed"}
                                    variants={variants}
                                    onFocus={()=>setSearch(!isSearch)}
                                    onBlur={()=>setSearch(!isSearch)}
                                    ref={inputRef}
                                    style={{
                                        backgroundColor:"transparent",
                                        border:"none",
                                        alignSelf:"flex-start",
                                        height:"100%",
                                        padding:"0px",
                                        width:"130px"
                                        // height:"32px"
                                    }}
                                    >
                                </motion.input>
                                <div onClick={()=>inputRef.current.focus()}>
                                    {console.log(isSearch)}
                                    {
                                        isSearch ?
                                        <CloseIcon style={{height:"100%",color: "black" }}/>:
                                        <SearchIcon style={{height:"100%",color: "white" }}/>
                                        
                                    }
                                    
                                </div>
                            </motion.div>
                            <DropDown visible={isSearch} children={<h1>Search</h1>}/>
                        </motion.div>
                    </div>

                </div>

                <div className="right-side" style={{height:"100%",width:"30%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <div className="home-icon" style={{
                        display:"flex",
                        flexDirection:"row",
                        // flexWrap:"wrap",,
                        height:"80%",
                        paddingLeft:"4px",
                        justifyContent:"flex-end",}}>
                            <div className="CreateButton" style={{
                            display:"flex",
                            backgroundColor:"transparent",
                            borderRadius:"3px",
                            flexDirection:"column",
                            
                            alignItems: "flex-end",
                            width:"38px",
                            // alignItems: "flex-start",
                            height:"100%"
                            }}>
                            <motion.button onClick={()=>setShowCreate(!isShowCreate)} onBlur={()=>setShowCreate(!isShowCreate)}
                                style={buttonStyle}
                                whileHover={{
                                    backgroundColor:"rgba(255, 255, 255, 0.1)",
                                    
                                }}
                            >
                                <AddIcon />
                               
                                
                            </motion.button>
                            <DropDown visible={isShowCreate} children={<h1>Create</h1>}/>
                        </div>
                        <div className="InfoButton" style={{
                            display:"flex",
                            backgroundColor:"transparent",
                            borderRadius:"3px",
                            flexDirection:"column",
                            width:"38px",
                            // alignItems: "flex-start",
                            
                            alignItems: "flex-end",
                            height:"100%"
                            }}>
                            <motion.button onClick={()=>setShowInfo(!isShowInfo)} onBlur={()=>setShowInfo(!isShowInfo)}
                                style={buttonStyle}
                                whileHover={{
                                    backgroundColor:"rgba(255, 255, 255, 0.1)",
                                    
                                }}
                            >
                                <InfoOutlinedIcon />
                               
                                
                            </motion.button>
                            <DropDown visible={isShowInfo} children={<h1>Info</h1>}/>
                        </div>
                        <div className="Notilist" style={{
                            display:"flex",
                            backgroundColor:"transparent",
                            borderRadius:"3px",
                            flexDirection:"column",
                            width:"38px",
                            // justifySelf: "flex-end",
                            alignItems: "flex-end",
                            height:"100%"
                            }}>
                            <motion.button onClick={()=>setShowNoti(!isShowNoti)} onBlur={()=>setShowNoti(!isShowNoti)}
                                style={buttonStyle}
                                whileHover={{
                                    backgroundColor:"rgba(255, 255, 255, 0.1)",
                                    
                                }}
                            >
                                <NotificationsNoneRoundedIcon />
                                
                            </motion.button>
                            <DropDown  visible={isShowNoti} children={<h1>Notification</h1>}/>
                        </div>
                        <div className="Avatarlist" style={{
                            display:"flex",
                            backgroundColor:"transparent",
                            borderRadius:"3px",
                            flexDirection:"column",
                            alignItems: "flex-end",
                            width:"38px",
                            height:"100%"
                            }}>
                            <motion.button style={{outline:"none",border:"none",backgroundColor:"transparent",margin:"auto",padding:"0px"}}
                                onClick={()=>setShowAvatar(!isShowAvatar)} onBlur={()=>setShowAvatar(!isShowAvatar)}
                            >
                                <Avatar style={{width:"32px",height:"32px",margin:"auto"}} />
                            </motion.button>
                            <DropDown  visible={isShowAvatar} children={<h1>Notification</h1>}/>
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Navbar;

const DropDownVariants = {
    open:{
        // height:"100%",
        scale:1,
        opacity:1,
        transition:{
            duration: 0.1,
            type: "tween",

        }
    },
    closed:{
        // height:"0px",
        scale:0.9,
        opacity:0,
        transition:{
            duration: 0.1,
            velocity: 2 
        }
    }
}

const SearchDropDown =({visible})=>{
    const visibled = visible ? 'visible': 'hidden';
    const vis = visible;
    return (
        <div>
            <motion.div 
                style={{
                    zIndex:"1000",
                    backgroundColor:"white",
                    width:"240px",
                    overflow:"hidden",
                    border:"1px solid rgba(0, 0, 0, 0.12)",
                    boxShadow: "0px 0px 15px -10px rgba(1,1,1,0.75)",
                    marginTop:"5px",
                    borderRadius:"5px"
                }}
                animate={vis? 'open' : 'closed'}
                variants={DropDownVariants}
            >
                <h1>hello</h1>
            </motion.div>

            {/* <Card elevation={3} style={{width:"240px",height:"200px", color:"white",marginTop:"5px"}}/> */}
        </div>
    );
}

const DropDown =({visible,children})=>{
    const visibled = visible ? 'visible': 'hidden';
    const vis = visible;
    const child = children;
    return (
        <div>
            <motion.div 
                style={{
                    zIndex:"1000",
                    backgroundColor:"white",
                    width:"240px",
                    flexBasis:"100px",
                    overflow:"hidden",
                    border:"1px solid rgba(0, 0, 0, 0.12)",
                    boxShadow: "0px 0px 15px -10px rgba(1,1,1,0.75)",
                    marginTop:"5px",
                    borderRadius:"5px"
                }}
                animate={vis? 'open' : 'closed'}
                variants={DropDownVariants}
            >
                {children}
            </motion.div>

            {/* <Card elevation={3} style={{width:"240px",height:"200px", color:"white",marginTop:"5px"}}/> */}
        </div>
    );
}
