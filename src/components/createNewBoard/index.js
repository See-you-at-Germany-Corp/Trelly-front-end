import React from 'react';
import { connect } from 'react-redux';

import './style.css';

import backgroundSelectorData from './backgroundSelectData.js';
import { setBackground, setCurrent, setName } from '../../redux/actions/createNewBoard';

const BackgroundSelector = ({ background, createBackground, id, dispatch }) => {
 
    /// if background in bg selector === background in bg preview -> isSelected is true.
    const isSelected = background === createBackground;
    const selectedFilter = isSelected ? 'brightness(85%)' : '';

    const bgStyle = {
        background: background,
        filter: selectedFilter
    }; 

    return ( 
        <div onClick={() => dispatch(setBackground(background))} className='bg-selector' style={bgStyle}>

        {
            isSelected &&
            <i className="fas fa-check"></i>
        }

        </div> 
    );
}

const CreateNewBoard = ({createStatus, createBackground, sampleBoardData, currentName, dispatch}) => {
  
    const dataForCreating = {...sampleBoardData};

    const createOnStyle = createStatus === true ? {
        display: 'block'
    } : {
        display: 'none'
    };
    
    const createNewBoardRef = React.createRef(); 
    dispatch(setCurrent(createNewBoardRef));
    
    const onInputChange = (e) => {
        dispatch(setName(e.target.value));
    } 
 
    const buttonIsDisabled = currentName.length === 0;
 
    return (
        <div className='create-new-board-container' ref={createNewBoardRef} style={createOnStyle}>
            <div className='create-new-board-box' style={createOnStyle}>

                {/* background preview & detail input */}
                <div className='new-board-detail-box' style={{ background: createBackground}}>
                    <input value={currentName} onChange={(e) => onInputChange(e)}></input>
                </div>

                <div className='new-board-bg-list'>
                    {
                        backgroundSelectorData
                        .filter(bg => { 
                            return (
                                bg.id < 9
                            );
                        })
                        .map(bg => (
                            <BackgroundSelector 
                                key={bg.id}
                                background={bg.background} 
                                createBackground={createBackground} 
                                dispatch={dispatch} 
                                id={bg.id}
                            />
                        ))
                    }
                </div>

                {
                    buttonIsDisabled ?
                    <button className='create-button' disabled>
                        <p>Create Board</p>
                    </button>
                    :
                    <button className='create-button' onClick={() => console.log(55555555)}>
                        <p>Create Board</p>
                    </button>
                }

            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    createStatus: state.createNewBoard.is_on,
    createBackground: state.createNewBoard.background,
    currentName: state.createNewBoard.name,
    sampleBoardData: state.personalBoardList[0]
})

const CreateNewBoardWithConnect = connect(mapStateToProps)(CreateNewBoard);

export default CreateNewBoardWithConnect;