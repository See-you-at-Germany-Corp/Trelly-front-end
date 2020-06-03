import React from 'react';
import { connect } from 'react-redux';

import './style.css';

import BoardList from './boardList.js';

import { addBoard, delBoard, changeName, starBoard, unStarBoard } from '../../redux/actions/personalBoardList.js';

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
    return (
        <div className='homepage-menu-bar'>
            
        </div>
    );
}

const Home = ({ personalBoardList, dispatch})=> {  
    console.log(personalBoardList);
    return ( 
        <>
            <div style={{ background: 'lightCoral', height: '40px', position: 'sticky' }}></div>
            <div className='homepage-main-container'>
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
                        <BoardList listName='Personal Boards' icon='user' boardListData={personalBoardList} dispatch={dispatch} />
                }

                {/* {<ReducersBoardListTest dispatch={dispatch} />} */}

                </div> 
            </div>
        </>
    );
}

const mapStateToProps =(state)=> ({
    personalBoardList: state.personalBoardList
})
 
const HomeWithConnect = connect(mapStateToProps)(Home);

export default HomeWithConnect;