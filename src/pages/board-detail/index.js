import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import './style.css';

import BoardMenuBar from './boardMenuBar.js';
import ListGroup from '../../components/list-group/index'
import { BoardProvider } from '../../context/board-context/board-context'

const BoardDetail = (props) => {

    const { boardId } = useParams();
    /// send api to get real board detail from backend.

    /// mockup board detail.
    let boardData = props.personalBoardList[boardId];
    boardData = {
        ...boardData,
        privilege: 'Private'
    };

    return 
        <div className={`${boardData.name}-board board-detail`} style={{ background: boardData.picture }}>
            <BoardMenuBar boardData={boardData} {...props} />
            
            {/* Board list */}
            <BoardProvider>
                <ListGroup />
            </BoardProvider>

        </div>
    );
}

const mapStateToProps = (state) => ({
    personalBoardList: state.personalBoardList
})

const BoardDetailWithConnect = connect(mapStateToProps)(BoardDetail);

export default BoardDetailWithConnect;