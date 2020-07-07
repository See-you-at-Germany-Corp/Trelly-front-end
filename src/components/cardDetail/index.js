import React from 'react'; 
import axios from 'axios';

import CardHeader from './cardHeader.js';
import CardBody from './cardBody.js';
import CardMenu from './cardMenu.js';

import { CardPopUp, CardBigBox } from './styled.js';

import { URL, useAuthen } from '../../api';
import { getCardDetail, toggleMemberInCard, toggleLabelInCard } from '../../api/card.js';

const CardDetail = props => {

    const cardData = props.cardData;
    const [isLoad, setIsLoad] = React.useState(false);
    const [cardDetail, setCardDetail] = React.useState(null); 
    const authenHeader = useAuthen();
 
    /* ------------- member state ------------- */

    function memberHandler(user_id) {
        setCardDetail({ ...cardDetail });
        setIsLoad(false);

        let form = new FormData();
        form.append('user_id', user_id);
        axios.post(`${URL}${toggleMemberInCard(cardData.id)}`, form, authenHeader) 
    }

    function addMember(user_id) {  
        memberHandler(user_id);
    }
 
    function removeMember(user_id) {   
        memberHandler(user_id);
    }

    /* ------------- label state ------------- */

    function labelHandler(label_id) {
        setCardDetail({ ...cardDetail });
        setIsLoad(false);

        let form = new FormData();
        form.append('label', label_id);
        axios.post(`${URL}${toggleLabelInCard(cardData.id)}`, form, authenHeader)
    }

    function addLabel(label_id) {
        labelHandler(label_id);
    }

    function removeLabel(label_id) {
        labelHandler(label_id);
    }

    /// get card detail from backend.
    React.useEffect(() => { 
        if (cardData !== null) {  
            if (!isLoad) {
                axios.get(`${URL}${getCardDetail(cardData.id)}`, authenHeader)
                    .then(res => { 
                        setCardDetail(res.data);
                    })
                setIsLoad(true);
            }
        }
        // eslint-disable-next-line
    }, [authenHeader, cardData, isLoad]);

    /// get card detail from backend.
    React.useEffect(() => { 
        if (cardData !== null) {  
            setIsLoad(false);
        }
        // eslint-disable-next-line
    }, [cardData]);
 
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
                        <CardBody 
                            cardData={cardData} 
                            cardDetail={cardDetail} 
                            addMember={(account_id) => addMember(account_id)}
                            removeMember={(account_id) => removeMember(account_id)}
                            addLabel={(label_id) => addLabel(label_id)}
                            removeLabel={(label_id) => removeLabel(label_id)}
                        />

                        <CardMenu 
                            cardDetail={cardDetail} 
                            addMember={(account_id) => addMember(account_id)}
                            removeMember={(account_id) => removeMember(account_id)}
                            addLabel={(label_id) => addLabel(label_id)}
                            removeLabel={(label_id) => removeLabel(label_id)}
                        />
                    </div>
                </CardBigBox>

            </CardPopUp>
        </div>
    );
}

export default CardDetail;