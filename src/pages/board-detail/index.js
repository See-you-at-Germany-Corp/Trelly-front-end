import React, { useContext } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import './style.css';

import BoardMenuBar from './boardMenuBar.js';
import ListGroup from '../../components/list-group/index'
 
import { BoardContext } from '../../context/board-context/board-context'
import { changeCurrentBoard } from '../../redux/actions/currentBoard';

import { URL, useAuthen } from '../../api/index.js';
import { getMyBoardDetail } from '../../api/board.js';
import { addRecentlyBoard } from '../../redux/actions/recentlyBoard';

const BoardDetail = (props) => {

    /// mockup board detail.  
    const { boardId } = useParams();
    const { boardState, boardDispatch } = useContext(BoardContext)
     
    const authenHeader = useAuthen();

    React.useMemo(() => {
        /// send api to get current board data.
        /// then overwrite current board data.
        if (authenHeader) {
            axios.get(`${URL}${getMyBoardDetail(boardId)}`, authenHeader)
                .then(res => {
                    boardDispatch(changeCurrentBoard(res.data)); 
                    /// if can't find in recently board data -> add to recently board.
                    if (props.recentlyBoardList.findIndex(recent => recent.id === res.data.id) === -1) {
                        props.dispatch(addRecentlyBoard({
                            name: res.data.name,
                            color_code: res.data.color_code
                        }));
                    }
                })
        }
        // eslint-disable-next-line
    }, [authenHeader,boardId]);

    document.body.style.backgroundColor = boardState.color_code;

    return (
        <div className='board-detail' style={{ background: `${boardState.color_code}` }}>
            <BoardMenuBar {...props} /> 
            <ListGroup />
        </div>
    );
}

const mapStateToProps = state => ({
    recentlyBoardList: state.recentlyBoardList
})

const BoardDetailWithConnect = connect(mapStateToProps)(BoardDetail);

export default BoardDetailWithConnect;