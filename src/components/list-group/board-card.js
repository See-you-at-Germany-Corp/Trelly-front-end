
import React, { useContext } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';

import { Draggable } from 'react-beautiful-dnd'

import { BoardContext } from '../../context/board-context/board-context'
import { motion } from 'framer-motion'
import { Avatar } from '@material-ui/core' 
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

// import "antd/dist/antd.css";

function Card(props) {
    const { boardState } = useContext(BoardContext)

    const card = boardState.lists[props.listIndex].cards[props.index]
    
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

                            <div style={{ backgroundImage: "url(\"https://trello-backgrounds.s3.amazonaws.com/SharedBackground/320x480/6ade9ce5f322963707d748d1581a0650/photo-1590941624133-bf53cea5ff37.jpg\")", width: "100%", height: "300px", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: "white", backgroundSize: "contain" }} />


                            : null}

                        <StyledCard >
                            <div style={{ display: "flex" }}>
                                {card.labels.map((item) => (
                                    <ColorBar color={item.color_code}>{item.name}</ColorBar>
                                ))}
                            </div>

                            {/* <div style={{width: "100px",height:"100px",backgroundColor:"red"}}></div> */}
                            {/* <span style={{width:}}></span> */}
                            {card.name}
                            <div style={{ display: "flex", flexFlow: "row wrap" }}>

                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {card.is_watching ? <VisibilityOutlinedIcon style={{ width: "18px", height: "18px", margin: "4px" }} /> : null}
                                    {!card.is_description ? null : <DescriptionOutlinedIcon style={{ width: "18px", height: "18px", margin: "4px" }} />}
                                    {!card.checklist ? null : <PlaylistAddCheckIcon style={{ width: "18px", height: "18px", margin: "4px" }} />}
                                    {!card.chekclist ? null : card.checklist.length}

                                </div>
                                <div style={{ display: "flex", placeContent: "flex-end", marginLeft: "auto" }}>
                                    {card.members.filter((mb) => boardState.members.some(mem => mem.id === mb.account_id)).map(item => {
                                        let index = boardState.members.findIndex(board => board.id === item.account_id);
                                        let name = boardState.members[index].full_name;
                                        let member = boardState.members[index];
                                        let initials = name.match(/\b\w/g) || [];
                                        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
                                        return ( 
                                            <motion.div>
                                                <motion.div whileTap={{ scale: 0.8 }}>
                                                    <Avatar src={member.picture} sizes="small" style={{ fontSize: "12px", width: "24px", height: "24px", margin: "2px" }}>{initials}</Avatar>
                                                </motion.div>
                                            </motion.div>
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

const mapStateWithProps = state => ({
    dataProfile: state.dataProfile
})

const CardWithConnect = connect(mapStateWithProps)(Card);

export default CardWithConnect;

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

const ColorBar = styled(motion.div)`
    width: 40px;
    min-height: 8px;
    border-radius: 3px;
    margin-right: 4px;
    background-color: ${props => props.color};
    text-align:center;
    color:white;
    font-size: 12px;
`;