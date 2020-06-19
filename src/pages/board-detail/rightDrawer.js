import React from 'react';
import styled from 'styled-components';

const RightDrawer = (props) => { 
    return (
        <DrawerBox open={props.open}>
            <i className="fas fa-times" onMouseDown={() => props.setDrawer()}></i>
            <div className='menu-bar-name-box'><p>Menu</p></div>
        </DrawerBox>
    );
}

const DrawerBox = styled.div`
    height: 94.5vh;
    width: 300px;
    /* background-color: lightpink; */
    background-color: #EFEFEF;
    visibility: ${props => props.open ? 'visible' : 'hidden'};
    z-index: 100;

    transform: ${props => props.open ? 'translateX(0)' : 'translateX(328px)'};
    -webkit-transition: all 0.25s ease;
    -moz-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    -ms-transition: all 0.25s ease;
    transition: all 0.25s ease; 

    position: absolute;
    padding: 14px;
    margin-top: 5.5vh;
    right: 0;
    top: 0;
    justify-self: flex-end;

    .fa-times {
        font-size: 18px;
        color: gray;
        position: absolute;
        right: 15px;
        top: 15px;
    }

    .fa-times:hover { 
        color: dimgray; 
        cursor: pointer;
    }

    .menu-bar-name-box {
        border-bottom: 1px solid lightgray;
        padding-bottom: 14px;
    }

    .menu-bar-name-box > p {
        text-align: center;
        font-weight: 500;
        color: #243867;
        padding: 0;
        margin: 0;
    }
`;

export default RightDrawer;