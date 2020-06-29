import React from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';  

import './style.css';

import BoardList from './boardList.js'; 

import { addBoard, delBoard, changeName, overWritePersonal } from '../../redux/actions/personalBoardList.js';
import { starBoard, unStarBoard, overWriteStarBoard } from '../../redux/actions/starredBoardList.js'; 

import { URL, useAuthen } from '../../api/index.js';
import { getMyBoards } from '../../api/board.js';

import homeMenuBarData from './homeMenuBarData.js';

// eslint-disable-next-line
const ReducersBoardListTest =({ sample, dispatch })=> {
    const test = {...sample};
 
    test.name = 'test';
    test.background = '#ffe66d'; 

    return (
        <>
            <button onClick={() => dispatch(addBoard(test))}>Add Board</button>
            <button onClick={() => dispatch(delBoard(1))}>Del Board</button>
            <button onClick={() => dispatch(changeName(1, 'LOVING U TOO MUCH SO MUCH!'))}>Change name</button>
            <button onClick={() => dispatch(starBoard(4))}>Star Board</button>
            <button onClick={() => dispatch(unStarBoard(4))}>Unstar Board</button>
        </>
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

const Home = ({ personalBoardList, starredBoardList, dispatch})=> {

    document.body.style.backgroundColor = "white";
    const authenHeader = useAuthen(); 

    React.useEffect(() => {  
        axios.get(`${URL}${getMyBoards}`, authenHeader)
            .then(res => { 
                const boardData = res.data;
                const personalData = `${boardData.personal}` !== 'undefined' ? boardData.personal.sort(function (a, b) {
                    return a.id - b.id;
                }) : [];

                const starData = `${boardData.star}` !== 'undefined' ? boardData.star.sort(function (a, b) {
                    return a.starred_id - b.starred_id;
                }) : [];

                dispatch(overWritePersonal(personalData));
                dispatch(overWriteStarBoard(starData));
            })
            .catch(res => console.log(res));
        // eslint-disable-next-line
    }, [authenHeader]);
    
    return (  
        <div className='homepage-main-container'> 
            <HomeMenuBar />

            <div className='homepage-sub-container'>

            { 
                /// starred board lists.
                starredBoardList.length > 0 &&
                    <BoardList 
                        listName='Starred Boards' 
                        icon='star' 
                        boardListData={starredBoardList} 
                        dispatch={dispatch} 
                    />
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
                    />
            }

            {/* {<ReducersBoardListTest dispatch={dispatch} sample={personalBoardList[0]} />} */}

            </div> 
        </div> 
    );
}

const mapStateToProps =(state)=> ({
    personalBoardList: state.personalBoardList,
    starredBoardList: state.starredBoardList,
    createCurrent: state.createNewBoard.ref
})

const HomeWithConnect = connect(mapStateToProps)(Home);

export default HomeWithConnect;