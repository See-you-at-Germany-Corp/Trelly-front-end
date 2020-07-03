import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BoardContext } from '../../context/board-context/board-context.js';

import { CardHeaderDiv, DefaultText } from './styled.js';

import { URL, useAuthen } from '../../api';
import { updateCard } from '../../api/card.js';
import { changeCardName } from '../../redux/actions/currentBoard.js';

const CardHeader = props => {

    const cardData = props.cardData;
    const listName = props.cardData.listName;
    const listId = props.cardData.listId;
    const authenHeader = useAuthen();
    const { boardDispatch } = React.useContext(BoardContext);

    const [nameStat, setNameStat] = React.useState({
        display: cardData.name,
        value: cardData.name
    });

    function setValueAndPatch() {
        const name = nameStat.display;
        axios.patch(`${URL}${updateCard(cardData.id)}`, { name }, authenHeader)

        setNameStat({
            ...nameStat,
            value: name
        });

        boardDispatch(changeCardName(listId, cardData.id, name));
    }

    function checkDisplay() {
        if (nameStat.display !== '')
            setValueAndPatch();

        else {
            setNameStat({
                ...nameStat,
                display: nameStat.value
            })
        }
    }

    function onNameSubmit(e) {
        /// if key = enter.
        if (e.keyCode === 13) {
            checkDisplay();
            e.target.blur();
        }

        /// if key = escape.
        else if (e.keyCode === 27) {
            setNameStat({
                ...nameStat,
                display: nameStat.value
            })
            
            e.target.blur();
        }
    }

    function onNameChange(display) {
        setNameStat({
            ...nameStat,
            display
        })
    }

    function onBlurHandler(e) {
        checkDisplay();
    } 

    return (
        <CardHeaderDiv>
            <Link to='#' onClick={props.onClose}>
                <i className="fas fa-times"></i>
            </Link>

            <div className='card-name'>
                <i className="fas fa-chalkboard"></i>
                <textarea
                    value={nameStat.display}
                    maxLength={50}
                    onChange={(e) => onNameChange(e.target.value)}
                    onKeyDown={onNameSubmit}
                    onBlur={onBlurHandler}
                />
            </div>

            <div>
                <DefaultText fontSize={14}>in list </DefaultText>
                <Link to='#' style={{ fontSize: '14px' }}>{listName}</Link>
            </div>
        </CardHeaderDiv>
    );
}

export default CardHeader;