import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './style.css';

import BoardList from './boardList.js';
import CreateNewBoard from '../../components/createNewBoard';

import { addBoard, delBoard, changeName, starBoard, unStarBoard } from '../../redux/actions/personalBoardList.js';
import { createOff } from '../../redux/actions/createNewBoard';

import homeMenuBarData from './homeMenuBarData.js';

// eslint-disable-next-line
const ReducersBoardListTest =({ dispatch })=> {

    const test = {
        id: 4,
        name: 'Test',
        background: ''
    }

    return (
        <>
            <button onClick={() => dispatch(addBoard(test))}>Add Board</button>
            <button onClick={() => dispatch(delBoard(1))}>Del Board</button>
            <button onClick={() => dispatch(changeName(3, 'LOVING U TOO MUCH SO MUCH!'))}>Change name</button>
            <button onClick={() => dispatch(starBoard(4))}>Star Board</button>
            <button onClick={() => dispatch(unStarBoard(2))}>Unstar Board</button>
        </>
    );
}

const personalToStarred = (personalBoardList) => {  

    let starredBoardList = personalBoardList.filter(board => board.starred === true);
    starredBoardList.sort(function (a, b) {
        /// sort lowest to highest.
        return a.starred_id - b.starred_id;
    });

    return (
        /// return starredBoardList with sort lowest to highest starred_id.
        starredBoardList
    );
}

const HomeMenuBar = () => {
    const navLinkActiveStyle = {
        color: 'rgb(2, 106, 167)',
        background: 'rgba(170, 210, 230, 0.3)'
    };

    return (
        <div className='homepage-menu-bar'>
            <div className='menu-box'>
                {
                    homeMenuBarData.map((menu, index) => (
                        <NavLink key={index} to={menu.href} className='menu-item' activeStyle={navLinkActiveStyle}>
                            <i className={`fas fa-${menu.icon}`}></i>
                            <p><b>{menu.name}</b></p>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    );
}

const Home = ({ personalBoardList, createStatus, dispatch})=> {    

    const createOnStyle = createStatus === true ? {
        filter: 'brightness(60%)'
    } : {};

    var createNewBoardComp = document.getElementById('create-new-board');
  
    /// setTimeout for deley opening createNewBoard component.
    /// if don't setTimeout, createNewBoard will open then close suddenly.
    setTimeout(() => {
        window.onclick = function (event) { 
            if (event.target !== createNewBoardComp && createStatus === true) {
                dispatch(createOff());
            } 
        }
    }, 100);

    return ( 
        <>
            <div style={{ background: 'rgb(2, 106, 167)', height: '40px', position: 'sticky' }}></div>
            <CreateNewBoard />
            <div className='homepage-main-container' style={createOnStyle}>
                {/*<Navbar />*/}

                <HomeMenuBar />

                <div className='homepage-sub-container'>

                { 
                    /// starred board lists.
                    personalToStarred(personalBoardList).length > 0 &&
                        <BoardList listName='Starred Boards' icon='star' boardListData={personalToStarred(personalBoardList)} dispatch={dispatch} />
                }

                {
                    /// recently view board lists. (comingsoon)
                }

                {
                    /// personal board lists.
                    personalBoardList.length > 0 &&
                        <BoardList 
                            listName='Personal Boards' 
                            icon='user' 
                            boardListData={personalBoardList} 
                            dispatch={dispatch}
                            createStatus={createStatus}
                        />
                }

                {/* {<ReducersBoardListTest dispatch={dispatch} />} */}

                </div> 
            </div>
        </>
    );
}

const mapStateToProps =(state)=> ({
    personalBoardList: state.personalBoardList,
    createStatus: state.createNewBoard.is_on
})
 
const HomeWithConnect = connect(mapStateToProps)(Home);

export default HomeWithConnect;