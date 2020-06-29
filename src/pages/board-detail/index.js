import React, { useContext } from 'react';
// import { useParams } from 'react-router-dom';

import './style.css';

import BoardMenuBar from './boardMenuBar.js';
import ListGroup from '../../components/list-group/index'
import { BoardContext } from '../../context/board-context/board-context'  
// import { changeCurrentBoard } from '../../redux/actions/currentBoard';

const BoardDetail = (props) => {
 
    /// mockup board detail.  
    // const { boardId } = useParams();
    const { boardState, /*boardDispatch*/ } = useContext(BoardContext)
    // console.log(boardState)
    // React.useEffect(() => {
    //     /// send api to get current board data.
    //     /// then overwrite current board data.
    //     boardDispatch(changeCurrentBoard({}));
    //     // eslint-disable-next-line
    // }, []);
  
    document.body.style.backgroundColor = boardState.color_code;
  
    return (
        <div className='board-detail' >
            <BoardMenuBar {...props} />
            <ListGroup />
        </div>
    );
}

export default BoardDetail;