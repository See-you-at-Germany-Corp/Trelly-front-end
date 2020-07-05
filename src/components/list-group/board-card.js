
import React, { useContext } from 'react'
import styled from 'styled-components'

// import Draggable from 'react-draggable'
import { Draggable } from 'react-beautiful-dnd'

import { BoardContext } from '../../context/board-context/board-context'
import {motion} from 'framer-motion'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { Popover, Button } from 'antd';
import { MountNode } from 'semantic-ui-react'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import {usePalette} from 'react-palette';
import { URL, useAuthen } from '../../api/index.js';
import axios from 'axios'; 
import { getMyBoards } from '../../api/board.js';


import "antd/dist/antd.css";



export default function Card(props) {
    const { boardState,boardDispatch } = useContext(BoardContext)
    
    const card = boardState.lists[props.listIndex].cards[props.index]
    let myId = 1;  /// mockup myId
    const { data, loading, error } = usePalette("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/320x480/6ade9ce5f322963707d748d1581a0650/photo-1590941624133-bf53cea5ff37.jpg")
    console.log(data)
    return (
        <Draggable draggableId={props.cardId} index={props.index}>
            {provided => (
                <CardDiv
                    
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={props.cardClickHandler}
                >
                    <StyledCardOutside>
                    {card.picture ? 
                        
                        <div style={{backgroundImage:"url(\"https://trello-backgrounds.s3.amazonaws.com/SharedBackground/320x480/6ade9ce5f322963707d748d1581a0650/photo-1590941624133-bf53cea5ff37.jpg\")",width:"100%",height:"300px",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundColor:"white",backgroundSize:"contain"}}/>
                        
                        
                        : null}

                        <StyledCard >
                        <div style={{display:"flex"}}>
                            {card.labels.map((item)=>(
                                <ColorBar color={item.color_code}>{item.name}</ColorBar>
                            ))}
                        </div>
                        
                        {/* <div style={{width: "100px",height:"100px",backgroundColor:"red"}}></div> */}
                            {/* <span style={{width:}}></span> */}
                        {card.name}
                        <div style={{display:"flex",flexFlow:"row wrap"}}>
                            
                            <div style={{display:"flex",alignItems:"center"}}>
                                {card.is_watching ? <VisibilityOutlinedIcon style={{width:"18px",height:"18px",margin:"4px"}} />: null}
                                {!card.is_description ? null : <DescriptionOutlinedIcon style={{width:"18px",height:"18px",margin:"4px"}}/>}
                                {!card.checklist ? null : <PlaylistAddCheckIcon style={{width:"18px",height:"18px",margin:"4px"}}/>}
                                {!card.chekclist ? null : card.checklist.length}
                                
                            </div>
                            <div style={{display:"flex",placeContent:"flex-end",marginLeft:"auto"}}>
                            {card.members.filter((mb)=>boardState.members.some(mem=>mem.id == mb.account_id)).map(item=>{
                                let index = boardState.members.findIndex(board => board.id == item.account_id);
                                let name = boardState.members[index].full_name;
                                let member = boardState.members[index];
                                let initials = name.match(/\b\w/g) || [];
                                initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
                                return (
                                    <Popover 
                                        placement="bottomLeft"
                                        content={
                                            <AvatarDetailBox>
                                            <div className='avatar-description'>
                                                <Avatar className='avatar-pic' src={member.picture}>{initials}</Avatar>
                                                <div className='description'>
                                                    <Link to='#' className='full-name'>{member.full_name}</Link>
                                                    <p>{`@${member.username}`}</p>
                                                    <p>{member.bio}</p>
                                                    {
                                                        myId === member.id &&
                                                        <Link
                                                            to='/profile'
                                                            style={{ fontSize: '14px', textDecorationLine: 'underline', color: 'gray' }}
                                                        >
                                                            Edit profile info
                                                        </Link>
                                                    }
                                                </div>
                                                <div className='menu' onClick={()=>{
                                                    boardDispatch({type:'REMOVE_CARD_MEMBER',cardId:props.index,index:props.listIndex,id:card.members.findIndex(mb=>mb.account_id==member.id)}) 
                                                    // axios.patch(`${URL}${getMyBoards}/${boardState.id}`,boardState.lists)
                                                    }}>
                                                    <p>Remove from Card</p>
                                                </div>
                                            </div>
                                            </AvatarDetailBox>
                                        }
                                        trigger="click">
                                        <motion.div>
                                            <motion.div whileTap={{scale:0.8}}>
                                                <Avatar src={member.picture} sizes="small" style={{fontSize:"12px",width:"24px",height:"24px",margin:"2px"}}>{initials}</Avatar>
                                            </motion.div>
                                        </motion.div>
                                    </Popover>
                                );
                            })}
                            </div>
                        </div>
                        </StyledCard>
                    </StyledCardOutside>
                </CardDiv>
            )}
        </Draggable>
    )
}
const StyledCardOutside = styled(motion.div)`
    border-radius: 3px;
    box-shadow: 0px 5px 8px -8px ;
    overflow:hidden;
`;

const StyledCard = styled(motion.div)`
    min-height: 20px;
    padding: 10px;
    vertical-align: middle;
    // margin-bottom: 10px;
    background-color: gainsboro;
    
`
const CardDiv = styled(motion.div)`
    padding-top: 4px;
    padding-bottom: 4px;
    display: block;
    
`;

const AvatarDetailBox = styled.div`
    width: 290px;
    min-height: 120px;
    // background-color: snow; 
    border-radius: 4px;
    // opacity: ${props => props.focus === true ? '100' : '0'};
    opacity:1;
    // visibility: ${props => props.focus === true ? 'visible' : 'hidden'};
    // visibility: hidden;
    // &:focus{
    //     visibility: visible;
    // }
    // box-shadow: 2px 4px 8px #888888;
    // top:3;
    // position: absolute;
    // margin-top: 34px;
    // padding-bottom: 10px; 
    // left: ${props => props.left !== 0 && `${props.left + 10}px`};
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
        margin:0 auto;
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
        width: 70%;
        min-height: 60px;
        /* background-color: lightcoral; */
        
        // margin-top: 8px;
          
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
        // margin-top: 8px;
        // margin-left: -2px;
        width: 100%;
    }

    .menu > p {
        margin: 0px 0px 0px 0px;
        width: 100%;
        padding: 8px 14px 8px 10px;  

        font-size: 14px;
    }

    .menu > p:hover {
        background-color: rgba(0, 0, 0, 0.05);
        cursor: pointer;
    }

`;


const ColorBar = styled(motion.div)`
    width: 40px;
    min-height: 8px;
    border-radius: 3px;
    margin-right: 4px;
    background-color: ${props=>props.color};
    text-align:center;
    color:white;
    font-size: 12px;
`;