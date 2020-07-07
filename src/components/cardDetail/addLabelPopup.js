import React from 'react';
import styled from 'styled-components';
import Popover from '@material-ui/core/Popover'; 

import { BoardContext } from '../../context/board-context/board-context.js';

import labelData from '../../pages/board-detail/labelData.js';

import { DefaultText } from './styled.js';

const AddLabelPopup = props => {

    const [cardDetail, setCardDetail] = React.useState(null);
    const { boardState } = React.useContext(BoardContext);

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

    /* ------------- search state ------------- */

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

    /* ------------- label state ------------- */

    function isHaveLabel(labelId) {
        return cardDetail.labels.findIndex(label => label.label_id === labelId) >= 0;
    }

    function findLabelName(labelId) {
        const index = boardState.labels.findIndex(label => label.id === labelId);

        if (index >= 0) 
            return boardState.labels[index].name;
    }

    function addLabel(label_id) {
        const newData = { ...cardDetail };
        newData.labels.push({ label_id });
        setCardDetail(newData); 
        props.addLabel(label_id);
    }

    function delLabel(labelId) {
        const newData = { ...cardDetail };
        const index = newData.labels.findIndex(label => label.label_id === labelId);

        if (index >= 0) {
            newData.labels.splice(index, 1);
            setCardDetail(newData); 
            props.removeLabel(labelId);
        }
    }

    function labelOnClick(labelId) { 
        if (!isHaveLabel(labelId))
            addLabel(labelId);
        else
            delLabel(labelId);

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
        <AddLabelPopupBox
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
            <div className='lebel-big-box'>
                <div className='label-name-box'>
                    <i className="fas fa-times" onMouseDown={handleClose}></i>
                    <DefaultText fontSize={13}>Labels</DefaultText>
                </div>
                
                <div className='label-search-box'>
                    <textarea
                        placeholder='Search members'
                        value={searchStat.value}
                        onChange={(e) => onSearchChange(e.target.value)}
                    >
                    </textarea>
                </div>

                <div className='label-list'>
                    <DefaultText fontSize={13}>LABELS</DefaultText>

                    {
                        boardState.labels
                        .sort(function(a, b) { return a.color_id - b.color_id })
                        .filter(label => 
                            searchStat.value !== '' ?
                                label.name !== null && 
                                    label.name.toLowerCase().includes(searchStat.value.toLowerCase())
                                : true
                                
                        )
                        .map((label, index) => ( 
                            <div 
                                key={index}
                                className='label-item' 
                                style={{ background: `${labelData[label.color_id - 1].picture}` }}
                                onMouseDown={() => labelOnClick(label.id)}
                            >
                                <div className='label-tag' style={{ background: `${labelData[label.color_id - 1].picture}` }}></div>
                                <p>{findLabelName(label.id)}</p>
                                
                                {
                                    cardDetail !== null && isHaveLabel(label.id) &&
                                    <i className="fas fa-check"></i>
                                }

                            </div> 
                        ))
                    }

                </div>
            </div>
        </AddLabelPopupBox>
    );
}

export default AddLabelPopup;

const AddLabelPopupBox = styled(Popover)`
    .lebel-big-box {
        min-width: 300px;
        max-width: 300px;
        min-height: 600px;

        padding: 12px;

        .label-name-box {
            border-bottom: 1px solid rgb(220, 220, 220);

            padding-bottom: 12px;

            text-align: center;

            i {
                color: gray;

                position: absolute;
                top: 16px;
                right: 20px;

                :hover {
                    cursor: pointer;
                    filter: brightness(120%);
                }

                :active { 
                    filter: brightness(80%);
                }
            }
        }

        .label-search-box {
            textarea {
                width: calc(100% - 18px);
                height: 22px;

                margin-top: 12px; 
                padding: 8px 4px 4px 10px;

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

        .label-list {   
            .label-item {
                width: 100%;
                height: 28px;

                border-radius: 3px;

                margin-top: 4px;
                padding-top: 8px;

                display: flex;
                flex-flow: row nowrap;

                overflow: hidden;

                :hover {
                    cursor: pointer;
                    width: 99%;
                    margin-left: 1%;
                }

                :hover .label-tag {
                    opacity: 100 !important; 
                }
 
                .label-tag {
                    width: 3%;
                    height: 36px;
                    filter: brightness(80%); 
                    opacity: 0;

                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;

                    position: absolute;
                    margin-top: -8px;
                    left: 7px;
                }

                p {
                    color: white; 
                    max-width: 240px;
                    max-height: 20px;

                    font-weight: 700;
  
                    margin: 0 0 0 10px;
                    padding: 0;
 
                    word-break: break-all;
                    word-wrap: break-word; 
                    overflow: hidden;
                    text-overflow: ellipsis; 
                    display: -webkit-box;
                    -webkit-line-clamp: 1; /* number of lines to show */
                    -webkit-box-orient: vertical;
                }
  
                i {
                    color: white;
                    font-size: 13px;

                    position: absolute;
                    right: 20px;
                    margin-top: 5px;
                    /* padding-top: -24px; */
                }
            }
        }
    }
`;