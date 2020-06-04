import React from 'react';
import { connect } from 'react-redux';

import './style.css';

const CreateNewBoard = ({createStatus, dispatch}) => {
 
    const createOnStyle = createStatus === true ? {
        display: 'block'
    } : {
        display: 'none'
    };

    return (
        <div className='create-new-board-box' id='create-new-board' style={createOnStyle}>
            <h1>Hello from CreateNewBoard.</h1>
        </div>
    );
}

const mapStateToProps = (state) => ({
    createStatus: state.createNewBoard.is_on
})

const CreateNewBoardWithConnect = connect(mapStateToProps)(CreateNewBoard);

export default CreateNewBoardWithConnect;