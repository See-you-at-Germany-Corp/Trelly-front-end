import React from 'react';
import { connect } from 'react-redux';

import './style.css';

import BoardList from './boardList.js';

import { addBoard, delBoard, changeName } from '../../redux/actions/boardList.js';

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
        </>
    );
}

const HomeMenuBar = () => {
    return (
        <div className='homepage-menu-bar'>
            
        </div>
    );
}

const Home = ({ personalBoardList, starredBoardList, dispatch})=> { 
    return ( 
        <>
            <div style={{ background: 'lightCoral', height: '40px', position: 'sticky' }}></div>
            <div className='homepage-main-container'>
                {/*<Navbar />*/}

                <HomeMenuBar />

                <div className='homepage-sub-container'>
                
                {
                    starredBoardList.length > 0 &&
                    <BoardList listName='Starred Boards' icon='star' boardListData={starredBoardList} />
                }

                {
                    personalBoardList.length > 0 &&
                    <BoardList listName='Personal Boards' icon='user' boardListData={personalBoardList} />
                }

                {/* {<ReducersBoardListTest dispatch={dispatch} />} */}

                </div> 
            </div>
        </>
    );
}

const mapStateToProps =(state)=> ({
    personalBoardList: state.personalBoardList,
    starredBoardList: state.starredBoardList
})
 
const HomeWithConnect = connect(mapStateToProps)(Home);

export default HomeWithConnect;