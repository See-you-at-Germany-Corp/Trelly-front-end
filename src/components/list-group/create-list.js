import React, { useContext } from 'react'
import styled from 'styled-components'
import { BoardContext } from '../../context/board-context/board-context'

import Axios from 'axios'
import cookie from 'react-cookies'
import { URL } from '../../api/index'

const headers = {
    headers: {
        Authorization: `Bearer ${cookie.load('authen-token')}`
    }
}

const CreateList = (props) => {
    const { boardState, boardDispatch } = useContext(BoardContext)
    const [state, setState] = React.useState({
        name: '',
        editting: false,
    })

    const edit = () => {
        setState({
            name: '',
            editting: !state.editting
        })
    }

    const handleChange = e => {
        setState({
            ...state,
            name: e.target.value
        })
    }

    const addList = () => {
        if (state.name) {
            Axios.post(
                `${URL}/board/my_list/`,
                {
                    board: boardState.id,
                    name: state.name
                },
                headers
            )
                .then((response) => {
                    boardDispatch({
                        type: 'ADD_LIST',
                        newList: response.data,
                    })
                    edit()
                })
        }
    }

    return (
        <CreateNewList editting={state.editting}>
            {
                state.editting ?
                    <>
                        <textarea
                            className='text-input'
                            value={state.name}
                            onChange={handleChange} />
                        <div>
                            <button
                                className='bt add-bt'
                                onClick={addList}>
                                Add List
                            </button>
                            <button
                                className='bt x-bt'
                                onClick={edit}>
                                <i className="fas fa-times" />
                            </button>
                        </div>
                    </>
                    :
                    <div
                        onClick={edit}
                        className='text-show'>
                        <i className="fas fa-plus" /> Add another list
                    </div>
            }
        </CreateNewList>
    )
}

export default CreateList

const CreateNewList = styled.div`
    min-width: 250px;
    height: ${props => props.editting ? 95 : 40}px;
    
    display: flex;
    flex-direction: column;

    line-height: 40px;
    border-radius: 5px;
    
    color: white;
    cursor: ${props => props.editting ? 'context-menu' : 'pointer'};
    background-color: ${props => props.editting ? '#ebecf0' : 'hsla(0,0%,100%,.24)'} ;

    .text-show {
        padding-left: 10px;
    }

    .text-input {
        width: 210px;
        height: 30px;
        min-height: 30px;
        line-height: 30px;

        display: block;
        padding-left: 10px;
        padding-right: 10px;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 5px;

        outline: 0;
        resize: none;
        overflow: hidden;
        white-space: nowrap;
        word-wrap: break-word;
        box-shadow: inset 0 0 0 2px #0079bf;
    }

    .bt {
        cursor: pointer;

        height: 32px;
        text-align: center;
        display: inline-block;
    }

    .add-bt {
        min-width: 60px;
        margin-left: 10px;
        
        overflow: hidden;
        display: inline-block;

        color: white;
        background-color: #61AA4F;

        :hover {
            background-color: #65BF4A;
        }
    }

    .x-bt {
        min-width: 40px;

        color: #5e6c84;
        font-size: 15px;

        background-color: transparent;

        :hover {
            color: #405070;
        }
    }
`