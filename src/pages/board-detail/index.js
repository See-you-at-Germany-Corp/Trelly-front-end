import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import './style.css';

import BoardMenuBar from './boardMenuBar.js';
import ListGroup from '../../components/list-group/index'
import { BoardProvider, BoardContext } from '../../context/board-context/board-context'

const BoardDetail = (props) => {

    const { boardId } = useParams();

    /// mockup board detail. 
    const { boardState } = useContext(BoardContext)

    return (
        <div className={`${boardState.name}-board board-detail`} style={{ background: boardState.picture }}>
            <BoardMenuBar boardId={boardId} {...props} />
            <ListGroup />
        </div>
    );
}

const BoardDetailProvider = () => {
    return (
        <BoardProvider>
            <BoardDetail />
        </BoardProvider>
    )
}

export default BoardDetailProvider;