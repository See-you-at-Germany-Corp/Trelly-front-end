import React from 'react';
import axios from 'axios';

import { CardBodyDiv } from './styled.js';
import { DefaultText, SaveButton } from './styled.js';

import { URL, useAuthen } from '../../api';
import { updateCard } from '../../api/card.js';

const CardBody = props => {

    const cardData = props.cardData; 
    const cardDetail = props.cardDetail;
    const authenHeader = useAuthen(); 

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
        const name = cardDetail.name;
   
        onDesClose();

        axios.patch(`${URL}${updateCard(cardData.id)}`, { name, description }, authenHeader)
            .then(res => {
                setDesStat({
                    open: false,
                    value: res.data.description
                });  
            });
    }

    /// set initial card detail.
    React.useEffect(() => {
        if (cardDetail !== null) {
            setDesStat({
                ...desStat,
                value: cardDetail.description
            });
        }
        // eslint-disable-next-line
    }, [cardDetail]);
       
    return (
        <CardBodyDiv>
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
                        onBlur={onDesClose}
                    />
                    {
                        desStat.open &&
                            <SaveButton onMouseDown={onDesSave}>Save</SaveButton>
                    }
                </div>
            </div>
        </CardBodyDiv>
    );
}

export default CardBody;