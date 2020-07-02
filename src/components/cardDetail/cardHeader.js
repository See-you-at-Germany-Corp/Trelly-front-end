import React from 'react';
import { Link } from 'react-router-dom';

import { CardHeaderDiv, DefaultText } from './styled.js';

const CardHeader = props => {

    const cardData = props.cardData;
    const listName = props.cardData.listName;

    return (
        <CardHeaderDiv>
            <Link to='#' onClick={props.onClose}>
                <i className="fas fa-times"></i>
            </Link>

            <div className='card-name'>
                <i className="fas fa-chalkboard"></i>
                <DefaultText fontSize={20}>{cardData.name}</DefaultText>
            </div>

            <div>
                <DefaultText fontSize={14}>in list </DefaultText>
                <Link to='#' style={{ fontSize: '14px' }}>{listName}</Link>
            </div>
        </CardHeaderDiv>
    );
}

export default CardHeader;