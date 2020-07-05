import React from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar'; 

import AddMemberPopup from './addMemberPopup.js';
import AddLabelPopup from './addLabelPopup.js';

import labelData from '../../pages/board-detail/labelData.js';

import { CardBodyDiv } from './styled.js';
import { DefaultText, SaveButton, ShowButton } from './styled.js';

import { BoardContext } from '../../context/board-context/board-context.js';

import { URL, useAuthen } from '../../api';
import { updateCard } from '../../api/card.js';  

const CardBody = props => {

    const cardData = props.cardData;
    const cardDetail = props.cardDetail;
    const authenHeader = useAuthen();
    const { boardState } = React.useContext(BoardContext);

    /* -------------------- description --------------------- */

    const [desStat, setDesStat] = React.useState({
        open: false,
        value: ''
    });

    function onDesClick() {
        setDesStat({
            ...desStat,
            open: true
        });
    }

    function onDesClose() {
        setDesStat({
            ...desStat,
            open: false
        });
    }

    function onDesChange(e) {
        setDesStat({
            ...desStat,
            value: e.target.value
        });
    }

    function onDesSave() {
        const description = desStat.value;

        onDesClose();

        axios.patch(`${URL}${updateCard(cardData.id)}`, { description }, authenHeader)
            .then(res => {
                setDesStat({
                    open: false,
                    value: res.data.description
                });
            });
    }

    /* -------------------- activity --------------------- */

    const [actStat, setActStat] = React.useState({
        open: true,
        activities: []
    });

    function onActBtnClick(open) {
        setActStat({
            ...actStat,
            open
        })
    }

    function getMemberData(memberId) { 
        return boardState.members[
            boardState.members.findIndex(member => member.id === memberId)
        ];
    }
  
    /// set initial card detail.
    React.useEffect(() => {
        if (cardDetail !== null) {
            setDesStat({
                ...desStat,
                value: `${cardDetail.description === null ? '' : cardDetail.description}`
            });
            setActStat({
                ...actStat,
                activities: cardDetail.activities.length === 0 ? [] : cardDetail.activities
            })
        }
        // eslint-disable-next-line
    }, [cardDetail]);
    
    return (
        <CardBodyDiv desLen={desStat.value.length}>
            {
                (cardDetail !== null && cardDetail.members.length > 0) &&
                <MemberBox
                    cardDetail={cardDetail} 
                    getMemberData={(memberId) => getMemberData(memberId)}
                    addMember={(account_id) => props.addMember(account_id)}
                    removeMember={(account_id) => props.removeMember(account_id)}
                />
            }

            {
                (cardDetail !== null && cardDetail.labels.length > 0) &&
                <LabelBox
                    cardDetail={cardDetail}  
                    addLabel={(label_id) => props.addLabel(label_id)}
                    removeLabel={(label_id) => props.removeLabel(label_id)}
                />
            }

            <div className='des-big-box'>
                <div className='des-name-box'>
                    <i className="fas fa-align-left"></i>
                    <DefaultText fontSize={16}>Description</DefaultText>
                </div>

                <div className='des-area-box'>
                    <textarea
                        placeholder='Add a more detailed description...'
                        value={desStat.value}
                        onClick={() => onDesClick()}
                        onChange={onDesChange}
                        onBlur={() => {
                            onDesClose()
                            onDesSave()
                        }}
                    />
                    {
                        desStat.open &&
                        <SaveButton onMouseDown={onDesSave}>Save</SaveButton>
                    }
                </div>
            </div>
 
            <div className='act-big-box'>
                <div className='act-name-box'>
                    <i className="fas fa-chart-line"></i>
                    <DefaultText fontSize={16}>Activity</DefaultText>
                    <ShowButton
                        onClick={() => onActBtnClick(!actStat.open)}
                    >
                        {`${actStat.open ? 'Hide' : 'Show'} Details`}
                    </ShowButton>
                </div>

                {
                    actStat.open &&
                    <div className='act-detail-box'>
                        {
                            actStat.activities !== [] &&
                            actStat.activities.map((act, index) => (
                                <div key={index} className='act-detail-item'>
                                    <div className='act-avatar-box'>
                                        <Avatar src={getMemberData(act.test1[0]).picture}>
                                            { getMemberData(act.test1[0]).init}
                                        </Avatar>
                                    </div>

                                    <div className='act-des-box'>
                                        <div className='act-des'>
                                            <DefaultText fontSize={14} fontWeight={700}>
                                                {`${getMemberData(act.test1[0]).full_name}`}
                                            </DefaultText>
                                            <DefaultText fontSize={14} fontWeight={400}>
                                                {
                                                    act.type === 'card' ?
                                                        `
                                                            ${act.test1[1]}
                                                            ${act.test1[2] === cardData.id ? 'this card ' : `${cardDetail.name} `}
                                                            ${act.test1[3]}
                                                        `
                                                        : act.type === 'member' ?
                                                            `
                                                                ${act.test1[1]} 
                                                                ${getMemberData(act.test1[2]).full_name}

                                                            ` 
                                                            :
                                                            `
                                                                comment 
                                                                ${act.test1[1]} 
                                                                ${act.test1[2]}
                                                            `
                                                }
                                            </DefaultText>
                                        </div>

                                        <div className='act-date'>
                                            <DefaultText fontSize={12}>
                                                {`
                                                    ${act.created.split('T')[0]}
                                                     at 
                                                    ${act.created.split('T')[1].slice(0, 5)}
                                                `}
                                            </DefaultText>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </CardBodyDiv>
    );
}

const MemberBox = props => {

    const cardDetail = props.cardDetail;
    const { boardState } = React.useContext(BoardContext);

    const [memberPopup, setMemberPopup] = React.useState({
        open: false,
        anchor: null
    });

    function onMemberClick(e) { 
        setMemberPopup({
            ...memberPopup,
            open: true, 
            anchor: e.currentTarget
        });
    }

    function onMemberClose() {
        setMemberPopup({
            ...memberPopup,
            open: false,
            anchor: null
        });
    }
 
    return (
        <div className='member-big-box'>
            <div className='member-name-box'>
                <DefaultText fontSize={13}>MEMBERS</DefaultText>
            </div>

            <div className='member-avatar-list'>
                {
                    cardDetail.members.map((member, index) => (
                        <Avatar key={index} src={props.getMemberData(member.account_id).picture}>
                            {props.getMemberData(member.account_id).init}
                        </Avatar>
                    ))
                } 
                <div 
                    className='member-add-box'
                    onClick={onMemberClick}
                > 
                    <i className="fas fa-plus"></i>
                </div>
            </div>

            <AddMemberPopup 
                isOpen={memberPopup.open}
                anchor={memberPopup.anchor}
                onClose={() => onMemberClose()}
                memberData={boardState.members}
                cardDetail={cardDetail} 
                addMember={(account_id) => props.addMember(account_id)}
                removeMember={(account_id) => props.removeMember(account_id)}
            >
            </AddMemberPopup>
        </div>
    );
}

const LabelBox = props => {

    const cardDetail = props.cardDetail;
    const { boardState } = React.useContext(BoardContext);

    /* --------- popup state --------- */

    const [labelPopup, setLabelPopup] = React.useState({
        open: false,
        anchor: null
    });

    function onLabelClick(e) {
        setLabelPopup({
            ...labelPopup,
            open: true,
            anchor: e.currentTarget
        });
    }

    function onLabelClose() {
        setLabelPopup({
            ...labelPopup,
            open: false,
            anchor: null
        });
    }

    function findLabel(labelId) {
        const index = boardState.labels.findIndex(label => label.id === labelId); 
        
        if (index >= 0)
            return labelData[boardState.labels[index].color_id - 1]; 
    }

    function findLabelName(labelId) {
        const index = boardState.labels.findIndex(label => label.id === labelId); 

        if (index >= 0)
            return boardState.labels[index].name;
    }

    return (
        <div className='label-big-box'>
            <div className='label-name-box'>
                <DefaultText fontSize={13}>LABELS</DefaultText>
            </div>

            <div className='label-list'>
                {
                    cardDetail.labels !== [] &&
                    cardDetail.labels
                    .sort(function (a, b) { return findLabel(a.label_id).color_id - findLabel(b.label_id).color_id })
                    .map((label, index) => (
                        <div 
                            key={index} 
                            className='label-item' 
                            style={{ background: `${findLabel(label.label_id).picture}` }}
                            onMouseDown={onLabelClick}
                        >
                            <p>{findLabelName(label.label_id)}</p>
                        </div>
                    ))
                } 

                <div
                    className='label-add-box'
                    onClick={onLabelClick}
                >
                    <i className="fas fa-plus"></i>
                </div>
            </div>

            <AddLabelPopup
                isOpen={labelPopup.open}
                anchor={labelPopup.anchor}
                onClose={() => onLabelClose()}
                cardDetail={cardDetail}
                addLabel={(label_id) => props.addLabel(label_id)}
                removeLabel={(label_id) => props.removeLabel(label_id)}
            >
            </AddLabelPopup>
        </div>
    );
}

export default CardBody;