import React from 'react';
import { connect } from 'react-redux';

import './style.css';

import BoardList from './boardList.js';

import { addBoard, delBoard, changeName } from '../../actions/boardList.js';

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
            <button onClick={() => dispatch(changeName(3, 'ILOVEU TO MUCH SO MUCH!'))}>Change name</button>
        </>
    );
}

const HomeMenuBar = () => {
    return (
        <div className='homepage-menu-bar'>
            
        </div>
    );
}

const Home = ({ boardData, dispatch})=> { 
    return ( 
        <>
            <div style={{ background: 'lightCoral', height: '40px', position: 'sticky' }}></div>
            <div className='homepage-main-container'>
                {/*<Navbar />*/}

                <HomeMenuBar />

                <div className='homepage-sub-container'>
                
                <BoardList listName='Personal Boards' boardData={boardData} />

                {/*<ReducersBoardListTest dispatch={dispatch} />*/}

                </div> 
            </div>
        </>
    );
}

const mapStateToProps =(state)=> ({
    boardData: state.boardData
})
 
const HomeWithConnect = connect(mapStateToProps)(Home);

export default HomeWithConnect;