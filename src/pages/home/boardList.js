import React from 'react';

import './boardListStyle.css';
 
const BoardDetail =()=> {
    return (
        <>
        </>
    );
}

const BoardList =(props)=> { 
    return (
        <div className={`${props.listName}-board-list board-list`}>
        {
            props.boardData.map(board => 
                <div className='board-list-item' style={{background: `${board.background}`}}>
                    {board.name}
                </div>
            )
        }
        </div>
    );
}

export default BoardList;