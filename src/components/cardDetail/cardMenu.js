import React from 'react';

import { CardMenuDiv } from './styled.js';
import { DefaultText, MenuButton } from './styled.js';

const CardMenu = props => {
    return (
        <CardMenuDiv>
            <AddtoCardMenu />
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

    return (
        <div className='add-to-card-box'>
            <div classNma='add-to-card-name-box'>
                <DefaultText fontSize={13}>ADD TO CARD</DefaultText>
            </div>

            <div className='add-to-card-item-box'>
                {
                    addToCardMenuData.map(menu => (
                        <div className='add-to-card-item'>
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
            <div classNma='actions-name-box'>
                <DefaultText fontSize={13}>ACTIONS</DefaultText>
            </div>

            <div className='actions-item-box'>
                {
                    actionsMenuData.map(menu => (
                        <div className='actions-item'>
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