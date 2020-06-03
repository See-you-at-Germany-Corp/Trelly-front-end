import React from 'react';

import './boardListStyle.css';
  
const BoardList =(props)=> { 
    return (
        <div className={`${props.listName}-board-list board-list`}>
            <div className={`${props.listName}-board-name board-name-group`}>
                <i className={`board-icon fas fa-${props.icon}`}></i>
                <p className={`${props.listName}-board board-name`}>{`${props.listName}`}</p>
            </div>
            {
                props.boardListData.map(board => 
                    <div className='board-list-item' style={{background: `${board.background}`}}>
                        {board.name}
                    </div>
                )
            }
        </div>
    );
}

export default BoardList;