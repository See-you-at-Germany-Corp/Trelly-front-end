import React from 'react';
import styled from 'styled-components';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';

import { DefaultText } from './styled.js';

const AddMemberPopup = props => {

    const memberData = props.memberData;
    const [cardDetail, setCardDetail] = React.useState(null);

    /* ------------- popup state ------------- */

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = () => { 
        setAnchorEl(props.anchor); 
    };

    const handleClose = () => {
        props.onClose();
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    /* ------------- seacrh state ------------- */

    const [searchStat, setSearchStat] = React.useState({
        focus: false,
        value: ''
    });

    function onSearchChange(value) {
        setSearchStat({
            ...searchStat,
            value
        })
    }

    /* ------------- member state ------------- */

    function isHaveMember(memberId) { 
        if (cardDetail.members.findIndex(member => member.account_id === memberId) >= 0)
            return true;
        else    
            return false;
    }
  
    function addMember(account_id) {
        const newData = { ...cardDetail };   
        
        newData.members.push({ account_id });
        setCardDetail(newData); 
        props.addMember(account_id);
            
    }

    function removeMember(account_id) {
        const newData = { ...cardDetail };
        const index = newData.members.findIndex(member => member.account_id === account_id);

        if (index >= 0) { 
            newData.members.splice(index, 1); 
            setCardDetail(newData);
            props.removeMember(account_id);
        }
    }

    function memberOnClick(memberId) {
        if (!isHaveMember(memberId)) {
            addMember(memberId);
        }

        else {
            removeMember(memberId);
        }
    }

    React.useEffect(() => {
        if (props.isOpen) {
            handleClick();
        }

        if (props.cardDetail !== null) {
            setCardDetail(props.cardDetail);
        }
        // eslint-disable-next-line
    }, [props.isOpen, props.cardDetail]);
   
    return (
        <AddMemberPopupDiv
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
            <div className='member-popup-big-box'>
                <i className="fas fa-times" onMouseDown={handleClose}></i>

                <div className='name-box'> 
                    <DefaultText fontSize={14} fontWeight={400}>Members</DefaultText>
                </div>

                <div className='search-box'>
                    <textarea
                        placeholder='Search members'
                        value={searchStat.value}
                        onChange={(e) => onSearchChange(e.target.value)}
                    >
                    </textarea>
                </div>

                <div className='member-list-box'>
                    <div className='member-name-box'>
                        <DefaultText fontSize={14} fontWeight={600}>BOARD MEMBERS</DefaultText>
                    </div>
                    {
                        memberData.filter(member =>  
                            searchStat.value !== '' ?
                                member.full_name.toLowerCase().includes(searchStat.value.toLowerCase()) : true
                        )
                        .map((member, index) => (
                            <div key={index} className='member-item' onClick={() => memberOnClick(member.id)}>
                                <Avatar className='member-avatar' src={member.picture}>
                                    {member.init}
                                </Avatar>

                                <div 
                                    className='member-name' 
                                    style={cardDetail !== null && isHaveMember(member.id) ? { maxWidth: '210px' } : {}}
                                >
                                    {`${member.full_name} (${member.username})`}
                                </div>

                                {
                                    cardDetail !== null && isHaveMember(member.id) &&
                                    <i className="fas fa-check"></i>
                                }
                            </div>
                        ))
                    } 
                </div>
            </div>
        </AddMemberPopupDiv>
    );
}

const AddMemberPopupDiv = styled(Popover)` 
    .member-popup-big-box {
        min-height: 200px;
        width: 280px;

        display: flex;
        flex-flow: column wrap;

        padding: 12px;

        .fa-times {
            color: gray;

            top: 8px;
            right: 12px;

            position: absolute;

            :hover {
                cursor: pointer;
                filter: brightness(120%);
            }

            :active { 
                filter: brightness(80%);
            }
        }

        .name-box {
            border-bottom: 0.5px solid rgb(220, 220, 200);

            padding-bottom: 12px;

            text-align: center;
        }

        .search-box {
            textarea {
                width: calc(100% - 18px);
                height: 20px;

                margin-top: 12px; 
                padding: 6px 4px 4px 10px;

                border-radius: 3px;
                border: 2px lightgray solid;
                outline: none;

                resize: none;

                ::placeholder {
                    color: #172b4d;
                }

                :hover {
                    filter: brightness(90%);
                }

                :focus { 
                    border: 2px deepskyblue solid; 
                }

                :focus:hover { 
                    filter: brightness(100%);
                }
            }
        }

        .member-list-box {
            /* background: lightseagreen; */

            .member-name-box {
                margin-top: 8px;
                margin-bottom: 5px;
            }

            .member-item {
                /* background: lightcyan; */
                background: white;
                border-radius: 3px;

                display: flex;
                flex-flow: row;

                margin-bottom: 3px;

                user-select: none;

                :hover {
                    cursor: pointer;
                    filter: brightness(95%);
                }

                :active {
                    filter: brightness(90%);
                }

                .member-avatar {
                    background: lightgray;
                    width: 32px;
                    height: 32px;

                    color: #172b4d;
                    font-size: 16px;
                    font-weight: 550;

                    margin-top: 5px;

                    :hover {
                        cursor: pointer;
                        filter: brightness(95%);
                    }

                    :active {
                        filter: brightness(90%);
                    }
                }

                .member-name {
                    /* background: purple; */
                    min-width: 210px;
                    max-width: 250px;

                    margin-left: 5px;
                    
                    overflow: hidden;
                    align-self: center;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1; /* number of lines to show */
                    -webkit-box-orient: vertical;
                }

                i { 
                    color: gray;
                    font-size: 10px;
                    align-self: center;
                    padding: 14px;
                }
            }
        }
    }
`;

export default AddMemberPopup;