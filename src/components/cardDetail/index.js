import React from 'react'; 
import axios from 'axios';

import CardHeader from './cardHeader.js';
import CardBody from './cardBody.js';
import CardMenu from './cardMenu.js';

import { CardPopUp, CardBigBox } from './styled.js';

import { URL, useAuthen } from '../../api';
import { getCardDetail, toggleMemberInCard } from '../../api/card.js';

const CardDetail = props => {

    const cardData = props.cardData;
    const [isLoad, setIsLoad] = React.useState(false);
    const [cardDetail, setCardDetail] = React.useState(null); 
    const authenHeader = useAuthen();
 
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

    /// get card detail from backend.
    React.useEffect(() => {
        if (cardData !== null) {
            axios.get(`${URL}${getCardDetail(cardData.id)}`, authenHeader)
            .then(res => {
                if (cardDetail !== null) 
                    setCardDetail({
                        ...cardDetail,
                        activities: res.data.activities
                    });
                else 
                    setCardDetail(res.data);
            })
            setIsLoad(true);
        }
        // eslint-disable-next-line
    }, [authenHeader, cardData, isLoad]);

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
                        />

                        <CardMenu 
                            cardDetail={cardDetail} 
                            addMember={(account_id) => addMember(account_id)}
                            removeMember={(account_id) => removeMember(account_id)}
                        />
                    </div>
                </CardBigBox>

            </CardPopUp>
        </div>
    );
}

export default CardDetail;