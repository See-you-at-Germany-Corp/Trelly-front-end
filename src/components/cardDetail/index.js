import React from 'react'; 

import CardHeader from './cardHeader.js';
import CardBody from './cardBody.js';
import CardMenu from './cardMenu.js';

import { CardPopUp, CardBigBox } from './styled.js';

const CardDetail = props => {
    return (
        <div>
            <CardPopUp 
                open={props.open}
                onClose={props.onClose}
                closeOnDocumentClick
            >

                <CardBigBox>
                    <CardHeader cardData={props.cardData} onClose={props.onClose} />

                    <div className='card-body-menu-box'>
                        <CardBody />
                        <CardMenu />
                    </div>

                </CardBigBox>

            </CardPopUp>
        </div>
    );
}

export default CardDetail;