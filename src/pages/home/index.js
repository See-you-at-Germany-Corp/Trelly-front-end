import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import './style.css';

import BoardList from './boardList.js';

import { overWritePersonal } from '../../redux/actions/personalBoardList.js';
import { overWriteStarBoard } from '../../redux/actions/starredBoardList.js';

import { URL, useAuthen } from '../../api/index.js';
import { getMyBoards } from '../../api/board.js';

import homeMenuBarData from './homeMenuBarData.js';
import { overWriteRecentlyBoard } from '../../redux/actions/recentlyBoard';

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

const Home = ({ personalBoardList, starredBoardList, recentlyBoardList, isLoading, dispatch }) => {
 
    document.body.style.backgroundColor = "white";
    const authenHeader = useAuthen();

    React.useEffect(() => {
        if (isLoading) {
            axios.get(`${URL}${getMyBoards}`, authenHeader)
                .then(res => {
                    const boardData = res.data;

                    const personalData = `${boardData.personal}` !== 'undefined' ? boardData.personal.sort(function (a, b) {
                        return a.id - b.id;
                    }) : [];

                    const starData = `${boardData.star}` !== 'undefined' ? boardData.star.sort(function (a, b) {
                        return a.starred_id - b.starred_id;
                    }) : [];

                    const recentData = `${boardData.recently}` !== 'undefined' ? boardData.recently.sort(function (a, b) {
                        return a.recently_id - b.recently_id;
                    }) : [];

                    dispatch(overWritePersonal(personalData));
                    dispatch(overWriteStarBoard(starData));
                    dispatch(overWriteRecentlyBoard(recentData));
                    dispatch({ type: 'SET_LOADING_HOME', isLoading: false });
                })
                .catch(res => console.log(res));
        }
        // eslint-disable-next-line
    }, [authenHeader]);

    return (
        <div className='homepage-main-container'>
            <HomeMenuBar />

            <div className='homepage-sub-container'>

                {
                    isLoading ?
                        <BoardListSkel />
                        :
                        <BoardLists
                            starredBoardList={starredBoardList}
                            personalBoardList={personalBoardList}
                            recentlyBoardList={recentlyBoardList}
                            dispatch={dispatch}
                        />
                }

            </div>
        </div>
    );
}

const BoardLists = (props) => {

    const starredBoardList = props.starredBoardList;
    const personalBoardList = props.personalBoardList;
    const recentlyBoardList = props.recentlyBoardList;
    const dispatch = props.dispatch;

    return (
        <>
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
                /// recently view board lists.
                recentlyBoardList.length > 0 &&
                <BoardList
                    listName='Recently Boards'
                    icon='clock'
                    boardListData={recentlyBoardList}
                    dispatch={dispatch}
                />
            }

            {
                /// personal board lists.
                personalBoardList.length >= 0 &&
                <BoardList
                    listName='Personal Boards'
                    icon='user'
                    boardListData={personalBoardList}
                    dispatch={dispatch}
                />
            }
        </>
    );
}

const BoardListSkel = () => {

    function createMockupData(min) {
        let data = [];

        let number = Math.floor(Math.random() * 10) + min;

        for (let i = 0; i < number; i++) {
            data.push({
                id: 0,
                name: '',
                color_code: 'lightgray',
            });
        }

        return data;
    }

    return (
        <>
            <BoardList
                listName='Starred Boards'
                icon='star'
                boardListData={createMockupData(1)}
            />
            <BoardList
                listName='Recently Boards'
                icon='clock'
                boardListData={createMockupData(1)}
            />
            <BoardList
                listName='Personal Boards'
                icon='user'
                boardListData={createMockupData(1)}
            />
        </>
    );
}

const mapStateToProps = (state) => ({
    personalBoardList: state.personalBoardList,
    starredBoardList: state.starredBoardList,
    createCurrent: state.createNewBoard.ref,
    recentlyBoardList: state.recentlyBoardList,
    isLoading: state.homeState.isLoading
})

const HomeWithConnect = connect(mapStateToProps)(Home);

export default HomeWithConnect;