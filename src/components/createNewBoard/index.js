import React from 'react';
import { connect } from 'react-redux';

import './style.css';

import backgroundSelectorData from './backgroundSelectData.js';
import { setBackground, setCurrent } from '../../redux/actions/createNewBoard';

const BackgroundSelector = ({ background, createBackground, id, dispatch }) => {

    const isSelected = background === createBackground ? 'brightness(85%)' : '';

    const bgStyle = {
        background: background,
        filter: isSelected
    }; 

    return (
        <React.Fragment key={id}>

            <div onClick={() => dispatch(setBackground(background))} className='bg-selector' style={bgStyle}>

            {
                background === createBackground &&
                <i className="fas fa-check"></i>
            }

            </div>

        </React.Fragment>
    );
}

const CreateNewBoard = ({createStatus, createBackground, dispatch}) => {
 
    const createOnStyle = createStatus === true ? {
        display: 'block'
    } : {
        display: 'none'
    };

    const createNewBoardRef = React.createRef(); 
    dispatch(setCurrent(createNewBoardRef));

    return (
        <div className='create-new-board-container' ref={createNewBoardRef} style={createOnStyle}>
            <div className='create-new-board-box' style={createOnStyle}>

                <div className='new-board-detail-box' style={{ background: createBackground}}>
                    
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
                                background={bg.background} 
                                createBackground={createBackground} 
                                dispatch={dispatch} 
                                id={bg.id}
                            />
                        ))
                    }
                </div>

            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    createStatus: state.createNewBoard.is_on,
    createBackground: state.createNewBoard.background,
})

const CreateNewBoardWithConnect = connect(mapStateToProps)(CreateNewBoard);

export default CreateNewBoardWithConnect;