import styled from 'styled-components';
import Popup from 'reactjs-popup';

export const CardPopUp = styled(Popup)`
    &-content {
        top: calc(100vh - (100vh - 45px)) !important;
        min-height: 95vh !important;
        width: 760px !important;
        background: #EFEFEF !important;
        border-radius: 3px;
    }
`;

export const CardBigBox = styled.div`
    background: #EFEFEF;
    
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;

    .card-body-menu-box {
        display: flex;
        flex-wrap: wrap;
    }
`;

export const CardHeaderDiv = styled.div`
    /* background: salmon; */
    width: 95%;
    height: 70px;

    display: flex;
    flex-flow: column;
    flex-wrap: wrap;

    padding: 5px;

    .fa-times {
        color: gray;

        position: absolute;
        top: 18px;
        right: 20px;

        :hover {
            background: lightgray;
            padding: 12px 15px 12px 15px;
            border-radius: 50%;

            top: 6px;
            right: 5px;

            cursor: pointer;
        }

        :active {
            filter: brightness(95%);
        }
    }

    .card-name {
        margin-top: 8px;

        i {
            position: absolute;
            margin-top: 8px;
            margin-left: -30px;

            color: #172b4d;
        }
    }

    div {
        margin-left: 40px;
    }
`;

export const CardBodyDiv = styled.div`
    background: lightgreen;
    width: calc(75% - 25px);
    min-height: 300px;

    display: flex;
    flex-flow: column;
    flex-wrap: wrap;

    margin-top: 10px;
    margin-right: 15px;
    padding: 5px;

    .des-big-box {
        .fa-align-left {
            position: absolute;
            margin-top: 3px;
            margin-left: -25px;

            color: #172b4d;
        }

        div {
            margin-left: 40px;
        }

        textarea {
            background: rgb(220, 220, 220);
            border: none;
            border-radius: 3px;
            width: calc(100% - 20px);
            min-height: 35px; 

            margin-top: 20px;
            padding: 10px;

            resize: none;

            :hover {
                cursor: pointer;
                filter: brightness(95%);
            }

            :focus {
                background: white;
                min-height: 70px; 

                cursor: auto;
 
                border: 2px solid deepskyblue;
                outline: none;
            } 

            :focus:hover {
                filter: brightness(100%);
            }

            ::placeholder {
                color: #172b4d;
            }
        }
    }
`;

export const CardMenuDiv = styled.div`
    background: lightblue;
    width: 25%;
    min-height: 90vh;

    display: flex;
`;

export const DefaultText = styled.p`
    display: inline;
    color: #172b4d;
    padding: 0;
    margin: 0;
    max-width: ${props => `${props.maxWidth}px`};
    align-self: center;
    
    text-align: center;
    font-weight: 500;
    font-size: ${props => `${props.fontSize}` !== `undefined` ? `${props.fontSize}px` : '14px'};
`;

export const SaveButton = styled.button`
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