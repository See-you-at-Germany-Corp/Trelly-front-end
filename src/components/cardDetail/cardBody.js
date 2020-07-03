import React from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';

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

    function getMemberData (memberId) {
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
                            actStat.activities.map(act => (
                                <div className='act-detail-item'>
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
                                                {` 
                                                    ${act.test1[1]}
                                                    ${act.test1[2] === cardData.id ? 'this card ' : `${cardDetail.name} `}
                                                    ${act.test1[3]}
                                                `}
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

export default CardBody;