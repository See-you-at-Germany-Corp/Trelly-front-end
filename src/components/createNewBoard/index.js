import React from 'react';
import { connect } from 'react-redux'; 

import './style.css';

import backgroundSelectorData from './backgroundSelectData.js';
import { setBackground, setName, createOff } from '../../redux/actions/createNewBoard';
import { addBoard } from '../../redux/actions/personalBoardList';

const BackgroundSelector = ({ picture, createBackground, id, dispatch }) => {
 
    /// if background in bg selector === background in bg preview -> isSelected is true.
    const isSelected = picture === createBackground; 

    const bgStyle = {
        background: picture,
        filter: isSelected ? 'brightness(85%)' : ''
    }; 

    return ( 
        <div onClick={() => dispatch(setBackground(picture))} className='bg-selector' style={bgStyle}>

        {
            isSelected &&
            <i className="fas fa-check"></i>
        }

        </div> 
    );
}

const CreateNewBoard = ({createStatus, createBackground, sampleBoardData, currentName, dispatch}) => {
    
    const createOnStyle = {
        display: createStatus === true ? 'block' : 'none'
    };
    
    const onInputChange = (e) => {
        // dispatch(setName(e.target.value));
        setText(e.target.value);
    }  
    
    const dataForCreating = { ...sampleBoardData };
    
    const setNewDataAndAddBoard = () => {  
        dataForCreating.name = currentName;
        dataForCreating.picture = createBackground; 
        /// id, href gen with backend.
        
        dispatch(addBoard(dataForCreating));
        dispatch(createOff());
        dispatch(setName(''));
        setText('');
        
        /// redirect to new board.
        /// wait for pull data from backend.
        // setTimeout (() => {
        //     window.location = dataForCreating.href;
        // }, 2000)
            
    }
        
    /// create ref of createNewBoard parent.
    const createNewBoardRef = React.useRef();
    const [text,setText] = React.useState('');
    /// if click out of createNewBoard area -> close createNewBoard popup, reset name.
    window.onmousedown = function (event) {
        if (event.target === createNewBoardRef.current && createStatus === true) {
            dispatch(createOff());
            dispatch(setName(''));
            setText('');
        }
    } 

    return (
        <div className='create-new-board-container' ref={createNewBoardRef} style={createOnStyle}>
            <div className='create-new-board-box' style={createOnStyle}>

                {/* background preview & detail input */}
                <div className='new-board-detail-box' style={{ background: createBackground}}>
                    <i className="fas fa-times" onClick={() => dispatch(createOff())}></i>
                    <input defaultValue="" value={text} onChange={(e) => onInputChange(e)} onBlur={(e)=>dispatch(setName(e.target.value))} placeholder='Add board title'></input>
                </div>

                <div className='new-board-bg-list'>
                    {
                        backgroundSelectorData
                        /// strict max number to render.
                        .filter(bg => { 
                            return (
                                bg.id <= 9
                            );
                        })
                        .map(bg => (
                            <BackgroundSelector 
                                key={bg.id}
                                picture={bg.picture} 
                                createBackground={createBackground} 
                                dispatch={dispatch} 
                                id={bg.id}
                            />
                        ))
                    }
                </div>

                {
                    /// check name's length in newCreateBoard name input.
                    /// if 0 -> disabled.
                    text.length === 0 ?
                    <button className='create-button' disabled>
                        <p>Create Board</p>
                    </button>
                    :
                    <button className='create-button' onClick={() => setNewDataAndAddBoard()}>
                        <p>Create Board</p>
                    </button>
                }

            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    createStatus: state.createNewBoard.is_on,
    createBackground: state.createNewBoard.picture,
    currentName: state.createNewBoard.name,
    sampleBoardData: state.personalBoardList[0]
})

const CreateNewBoardWithConnect = connect(mapStateToProps)(CreateNewBoard);

export default CreateNewBoardWithConnect;