import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { BoardContext } from '../../context/board-context/board-context';

import labelData from './labelData.js';

import { URL, useAuthen } from '../../api/index.js';
import { addLabel, updateLabel, delLabel } from '../../api/label.js';
import { addLabelToBoard, updateLabelInBoard, delLabelInBoard } from '../../redux/actions/currentBoard';

const CreateLabel = ({ mode, currentLabelData, handleClose }) => {

    const [newLabelData, setLabel] = React.useState(currentLabelData === null ? {
        color_id: 0,
        name: '',
        label_id: 0
    } : {
            color_id: currentLabelData.color_id,
            name: currentLabelData.name,
            label_id: currentLabelData.label_id
        });

    function onInputChange(e) {
        setLabel({
            ...newLabelData,
            name: e.target.value
        });
    }

    function setColorCode(color_id) {
        if (newLabelData.color_id !== color_id) {
            setLabel({
                ...newLabelData,
                color_id
            });
        }
    }

    const { boardState, boardDispatch } = React.useContext(BoardContext);
    const authenHeader = useAuthen();

    function onSubmit() {
        let labelForm = new FormData();
        labelForm.append('color_code', newLabelData.color_id);
        labelForm.append('name', newLabelData.name);

        axios.post(`${URL}${addLabel(boardState.id)}`, labelForm, authenHeader)
            .then(res => {
                if (res.status === 201) {
                    boardDispatch(addLabelToBoard(res.data));
                }

                handleClose();
            })
    }

    /* -------- mode 2 --------- */

    function onSave() {
        let labelForm = new FormData();
        labelForm.append('label', newLabelData.label_id);
        labelForm.append('name', newLabelData.name);

        axios.patch(`${URL}${updateLabel(boardState.id)}`, labelForm, authenHeader)
            .then(res => {
                boardDispatch(updateLabelInBoard(newLabelData.label_id, newLabelData.name, newLabelData.color_id));
                handleClose();
            })
    }

    function onDel() {
        let labelForm = new FormData();
        labelForm.append('label', newLabelData.label_id);

        var myHeaders = new Headers();
        myHeaders.append('Authorization', authenHeader.headers.Authorization);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: labelForm,
            redirect: 'follow'
        };

        fetch(`${URL}${delLabel(boardState.id)}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                boardDispatch(delLabelInBoard(newLabelData.label_id));
                handleClose();
            })
    }

    return (
        <CreateLabelBox>
            <div className='name-box'>
                <SmallDefaultText>Name</SmallDefaultText>
                <input onChange={e => onInputChange(e)} value={newLabelData.name}></input>

                <div className='color-box'>
                    <SmallDefaultText>Select a color</SmallDefaultText>
                    {
                        labelData.map((label, index) => (
                            <Link
                                key={index}
                                to='#'
                                className='color-item' style={{ background: `${label.picture}` }}
                                onClick={() => setColorCode(label.color_id)}
                            >
                                {
                                    newLabelData.color_id === label.color_id &&
                                    <i className="fas fa-check"></i>
                                }
                            </Link>
                        ))
                    }
                </div>

                {
                    mode === 1 ?
                        <EditButton onClick={() => onSubmit()}>Create</EditButton>
                        :
                        <>
                            <EditButton onClick={() => onSave()}>Save</EditButton>
                            <DelButton onClick={() => onDel()}>Delete</DelButton>
                        </>
                }
            </div>
        </CreateLabelBox>
    );
}

const CreateLabelBox = styled.div`
    .name-box {
        margin-top: 8px;

        input { 
            margin-top: 3px;
            margin-bottom: 8px;
            padding: 4px;
            width: 95%;
            height: 22px;
            border-radius: 3px;
            border: 2px lightgray solid;
            outline: none;

            :focus { 
                border: 2px deepskyblue solid; 
            } 
        }

        .color-box {
            display: flex;
            flex-wrap: wrap;

            p {
                display: block;
                width: 100%;
                text-align: left;
                padding-bottom: 3px;
            }

            .color-item {
                width: 48px;
                height: 32px;
                border-radius: 3px;
                margin: 0 8px 8px 0;

                i {
                    color: white;
                    margin: 7px 0 0 16px;
                }
            }
        }
    }
`;

const DefaultText = styled.p`
    display: inline;
    color: #172b4d;
    padding: 0;
    margin: 0;
    max-width: ${props => `${props.maxWidth}px`};
    align-self: center;
    
    text-align: center;
    font-weight: 500;
`;

const SmallDefaultText = styled(DefaultText)`
    font-size: 14px;
`;

const EditButton = styled.button`
    color: white;
    font-size: 13px;
    font-weight: 10;
    margin-top: 4px;
    padding: 8px 12px 4px 12px;
    border: none;
    background-color: forestgreen; 
    filter: brightness(120%);

    &:hover {
        cursor: pointer;
        filter: brightness(130%);
    }

    &:active {
        outline: none;
        filter: brightness(90%);
    }

    &:focus {
        outline: none;
    }
`;

const DelButton = styled(EditButton)`
    background-color: #EB5A46; 
    position: absolute;
    right: 16px;
`;

export default CreateLabel;