import React from 'react';

import AddMemberPopup from './addMemberPopup.js';
import { BoardContext } from '../../context/board-context/board-context.js';

import { CardMenuDiv } from './styled.js';
import { DefaultText, MenuButton } from './styled.js';

const CardMenu = props => { 
    return (
        <CardMenuDiv>
            <AddtoCardMenu {...props} />
            <ActionsMenu />
        </CardMenuDiv>
    );
}

const AddtoCardMenu = props => {

    const addToCardMenuData = [
        {
            id: 1,
            name: 'Members',
            icon: 'user'
        },
        {
            id: 2,
            name: 'Labels',
            icon: 'tag'
        },
        {
            id: 3,
            name: 'Checklist',
            icon: 'check-square'
        },
        {
            id: 4,
            name: 'Due Date',
            icon: 'clock'
        },
        {
            id: 5,
            name: 'Attachment',
            icon: 'paperclip'
        }
    ];

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

    function menuFxSwitch(e, menuId) {
        switch (menuId) {
            case 1:
                return onMemberClick(e, menuId)
            default:
                return () => {};
        }
    }

    return (
        <div className='add-to-card-box'>
            <div className='add-to-card-name-box'>
                <DefaultText fontSize={13}>ADD TO CARD</DefaultText>
            </div>

            <div className='add-to-card-item-box'>
                {
                    addToCardMenuData.map((menu, index) => (
                        <div 
                            key={index} 
                            className='add-to-card-item'
                            onMouseDown={(e) => menuFxSwitch(e, menu.id)}
                        >
                            <MenuButton>
                                <i className={`fas fa-${menu.icon}`}></i>
                                {menu.name}
                            </MenuButton>
                        </div>
                    ))
                }
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

const ActionsMenu = props => {

    const actionsMenuData= [
        {
            id: 1,
            name: 'Move',
            icon: 'arrow-right'
        },
        {
            id: 2,
            name: 'Copy',
            icon: 'copy'
        }
    ];

    return (
        <div className='actions-box'>
            <div className='actions-name-box'>
                <DefaultText fontSize={13}>ACTIONS</DefaultText>
            </div>

            <div className='actions-item-box'>
                {
                    actionsMenuData.map((menu, index) => (
                        <div key={index} className='actions-item'>
                            <MenuButton>
                                <i className={`fas fa-${menu.icon}`}></i>
                                {menu.name}
                            </MenuButton>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default CardMenu;