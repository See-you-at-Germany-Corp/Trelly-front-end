import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import './style.css';

import BoardMenuBar from './boardMenuBar.js';
import ListGroup from '../../components/list-group/index'
import { BoardProvider } from '../../context/board-context/board-context'

const BoardDetail = (props) => {

    const { boardId } = useParams();
     
    /// mockup board detail. 
    let boardData = props.currentBoard; 
 
    return (
        <div className={`${boardData.name}-board board-detail`} style={{ background: boardData.picture }}>
            <BoardMenuBar boardId={boardId} {...props} />
            
            {/* Board list */}
            <BoardProvider>
                <ListGroup />
            </BoardProvider>

        </div>
    );
}

const mapStateToProps = (state) => ({
    personalBoardList: state.personalBoardList,
    currentBoard: state.currentBoard
})

const BoardDetailWithConnect = connect(mapStateToProps)(BoardDetail);

export default BoardDetailWithConnect;