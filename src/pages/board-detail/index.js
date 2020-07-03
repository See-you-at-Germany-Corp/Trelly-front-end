import React, { useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './style.css';

import BoardMenuBar from './boardMenuBar.js';
import ListGroup from '../../components/list-group/index'
import { BoardContext } from '../../context/board-context/board-context'
import { changeCurrentBoard } from '../../redux/actions/currentBoard';

import { URL, useAuthen } from '../../api/index.js';
import { getMyBoardDetail } from '../../api/board.js';

const BoardDetail = (props) => {

    /// mockup board detail.  
    const { boardId } = useParams();
    const { boardState, boardDispatch } = useContext(BoardContext)
    const authenHeader = useAuthen();
    const [isLoading, setLoading] = React.useState(true);

    // console.log('authenHeader')
    // console.log(authenHeader)

    React.useEffect(() => {
        /// send api to get current board data.
        /// then overwrite current board data.
        if (authenHeader) {
            axios.get(`${URL}${getMyBoardDetail(boardId)}`, authenHeader)
                .then(res => {
                    boardDispatch(changeCurrentBoard(res.data));
                    setLoading(false);
                })
        }
        // eslint-disable-next-line
    }, [authenHeader,boardId]);

    document.body.style.backgroundColor = boardState.color_code;

    return (
        <>
            {
                !isLoading &&
                    <div className='board-detail' style={{ background: `${boardState.color_code}` }}>
                        <BoardMenuBar {...props} />
                        <ListGroup />
                    </div>
            }
        </>
    );
}

export default BoardDetail;