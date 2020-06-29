import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './style.css';

import backgroundSelectorData from './backgroundSelectData.js';
import { setBackground, setName, createOff } from '../../redux/actions/createNewBoard';
import { addBoard } from '../../redux/actions/personalBoardList';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import { URL, useAuthen } from '../../api/index.js';
import { addMyBoard } from '../../api/board.js';

const BackgroundSelector = ({ color_code, createBackground, dispatch }) => {

    /// if background in bg selector === background in bg preview -> isSelected is true.
    const isSelected = color_code === createBackground;

    const bgStyle = {
        background: color_code,
        filter: isSelected ? 'brightness(85%)' : ''
    };

    return (
        <div onClick={() => dispatch(setBackground(color_code))} className='bg-selector' style={bgStyle}>

            {
                isSelected &&
                <i className="fas fa-check"></i>
            }

        </div>
    );
}

const CreateNewBoard = ({ createStatus, createBackground, currentName, dispatch }) => {
 
    const [addResponse, setAddRes] = React.useState('');
    const authenHeader = useAuthen();

    const createOnStyle = {
        display: createStatus === true ? 'block' : 'none'
    };

    const onInputChange = (e) => {
        dispatch(setName(e.target.value));
    }

    const setNewDataAndAddBoard = () => {
        const newBoard = {
            name: '',
            color_code: ''
        };

        newBoard.name = currentName;
        newBoard.color_code = createBackground;
 
        dispatch(addBoard(newBoard));
        dispatch(createOff());
        dispatch(setName(''));
 
        axios.post(`${URL}${addMyBoard}`, newBoard, authenHeader)
            .then(res => {
                setTimeout(() => { 
                    setAddRes(res.data); 
                }, 1000);
            }); 
    }

    /// create ref of createNewBoard parent.
    const createNewBoardRef = React.useRef();

    /// if click out of createNewBoard area -> close createNewBoard popup, reset name.
    window.onmousedown = function (event) {
        if (event.target === createNewBoardRef.current && createStatus === true) {
            dispatch(createOff());
            dispatch(setName(''));
        }
    }

    React.useEffect(() => { 
        setAddRes(''); 
    }, [addResponse]); 

    return (
        <>
            {
                addResponse !== '' ? 
                    <Redirect to={`/${addResponse.id}/${addResponse.name}/`} />
                :
                <div className='create-new-board-container' ref={createNewBoardRef} style={createOnStyle}>
                    <div className='create-new-board-box' style={createOnStyle}>

                        {/* background preview & detail input */}
                        <div className='new-board-detail-box' style={{ background: createBackground }}>
                            <i className="fas fa-times" onClick={() => dispatch(createOff())}></i>
                            <input value={currentName} onChange={(e) => onInputChange(e)} placeholder='Add board title' ></input>
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
                                            color_code={bg.color_code}
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
                            currentName.length === 0 ?
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
            }
        </>
    );
}

const mapStateToProps = (state) => ({
    createStatus: state.createNewBoard.is_on,
    createBackground: state.createNewBoard.color_code,
    currentName: state.createNewBoard.name,
})

const CreateNewBoardWithConnect = connect(mapStateToProps)(CreateNewBoard);

export default CreateNewBoardWithConnect;