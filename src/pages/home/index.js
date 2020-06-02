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


const Home = ({ boardData, dispatch})=> { 
    return (
        <div className='homepage-main-container'>
            {/*<Navbar />*/}
            <div style={{background: 'lightCoral', height: '40px'}}></div>
            <div className='homepage-sub-container'>
            {
                 boardData.map(board => (
                     <BoardList key={board.id} boardData={board} />
                 ))
            }

            {/*<ReducersBoardListTest dispatch={dispatch} />*/}

            </div> 
        </div>
    );
}

const mapStateToProps =(state)=> ({
    boardData: state.boardData
})
 
const HomeWithConnect = connect(mapStateToProps)(Home);

export default HomeWithConnect;