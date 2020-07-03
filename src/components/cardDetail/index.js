import React from 'react'; 
import axios from 'axios';

import CardHeader from './cardHeader.js';
import CardBody from './cardBody.js';
import CardMenu from './cardMenu.js';

import { CardPopUp, CardBigBox } from './styled.js';

import { URL, useAuthen } from '../../api';
import { getCardDetail } from '../../api/card.js';

const CardDetail = props => {

    const cardData = props.cardData;
    const [cardDetail, setCardDetail] = React.useState(null);
    const authenHeader = useAuthen();
 
    /// get card detail from backend.
    React.useEffect(() => {
        if (cardData !== null) {
            axios.get(`${URL}${getCardDetail(cardData.id)}`, authenHeader)
                .then(res => {
                    setCardDetail(res.data);
                })
        }
        // eslint-disable-next-line
    }, [authenHeader, cardData]);

    return (
        <div>
            <CardPopUp 
                open={props.open}
                onClose={props.onClose}
                closeOnDocumentClick
            >

                <CardBigBox>
                    <CardHeader cardData={cardData} onClose={props.onClose} />

                    <div className='card-body-menu-box'>
                        <CardBody cardData={cardData} cardDetail={cardDetail} />
                        <CardMenu />
                    </div>
                </CardBigBox>

            </CardPopUp>
        </div>
    );
}

export default CardDetail;