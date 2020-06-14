import React, { useContext } from 'react';
// import { useParams } from 'react-router-dom';

import './style.css';

import BoardMenuBar from './boardMenuBar.js';
import ListGroup from '../../components/list-group/index'
import { BoardProvider, BoardContext } from '../../context/board-context/board-context'
// import { changeCurrentBoard } from '../../redux/actions/currentBoard';

const BoardDetail = (props) => {
 
    /// mockup board detail.  
    // const { boardId } = useParams();
    const { boardState, /*boardDispatch*/ } = useContext(BoardContext)

    // React.useEffect(() => {
    //     /// send api to get current board data.
    //     /// then overwrite current board data.
    //     boardDispatch(changeCurrentBoard({}));
    //     // eslint-disable-next-line
    // }, []);

    return (
        <div className='board-detail' style={{ background: boardState.picture }}>
            <BoardMenuBar {...props} />
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