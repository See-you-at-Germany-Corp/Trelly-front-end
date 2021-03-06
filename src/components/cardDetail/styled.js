import styled from 'styled-components';
import Popup from 'reactjs-popup';

export const CardPopUp = styled(Popup)`
    &-overlay {
        overflow: auto !important; 
    }

    &-content {
        top: calc(100vh - (100vh - 45px)) !important;
        min-height: 95vh !important;
        width: 760px !important;
        background: #EFEFEF !important;
        border-radius: 3px;
        margin-bottom: calc(100vh - (100vh - 45px)) !important; 
    }
`;

export const CardBigBox = styled.div`
    background: #EFEFEF;
    
    display: flex;
    flex-flow: column wrap; 

    .card-body-menu-box {
        display: flex;
        flex-wrap: wrap;

        overflow: auto;
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

        textarea {
            background: #EFEFEF;
            color: #172b4d;
            width: 95%;
            height: 35px;
            border: 2px solid #EFEFEF;
            border-radius: 3px;
            box-sizing: border-box;
            overflow: hidden;

            margin-left: -4px;
            margin-top: -2px;

            font-size: 20px;

            resize: none;

            :focus {
                background: white;
                border: 2px solid deepskyblue;
                outline: none;
            }
        }

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
    /* background: lightgreen; */
    width: calc(75% - 25px);
    min-height: 300px;

    display: flex;
    flex-flow: column;
    flex-wrap: wrap;

    margin-top: 10px;
    margin-right: 15px;
    padding: 5px;

    .member-big-box {
        display: flex;
        flex-flow: column wrap;

        margin-bottom: 20px;

        .member-name-box, .member-avatar-list {
            margin-left: 40px;
        }

        .member-avatar-list {
            display: flex;
            flex-flow: row wrap;

            padding-top: 5px; 

            div {
                background: lightgray;
                width: 32px;
                height: 32px;

                color: #172b4d;
                font-size: 16px;
                font-weight: 550;

                margin-right: 4px;

                :hover {
                    cursor: pointer;
                    filter: brightness(95%);
                }

                :active {
                    filter: brightness(90%);
                }
            }

            .member-add-box { 
                border-radius: 50%;
                
                :active {
                    background-color: rgba(100, 220, 220, 0.2); 
                    color: deepskyblue;
                    filter: brightness(100%);
                }

                i {
                    margin-top: 25%;
                    margin-left: 9px;
                }
            }
        }
    }

    .label-big-box {
        display: flex;
        flex-flow: column wrap;

        margin-bottom: 20px;

        .label-name-box, .label-list {
            margin-left: 40px;
        }

        .label-list {
            display: flex;
            flex-flow: row wrap;

            padding-top: 5px; 
 
            .label-item {
                min-width: 40px;
                height: 34px;

                border-radius: 3px;

                margin-right: 4px; 
                margin-bottom: 4px;

                text-align: center;

                overflow: auto;
                user-select: none;

                :hover {
                    cursor: pointer;
                    filter: brightness(95%);
                }

                :active { 
                    filter: brightness(90%);
                }

                p {
                    color: white;

                    font-weight: 600; 

                    padding: 0 8px 0 8px;
                    margin: 5px 0 0 0;

                    word-break: break-all;
                    word-wrap: break-word; 
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1; /* number of lines to show */
                    -webkit-box-orient: vertical;
                }
            }

            .label-add-box { 
                background: lightgray;
                width: 40px;
                height: 34px;

                color: #172b4d;
                 
                border-radius: 3px;

                :hover {
                    cursor: pointer;
                    filter: brightness(95%);
                }

                :active {
                    background-color: rgba(100, 220, 220, 0.2); 
                    color: deepskyblue;
                    filter: brightness(100%);
                }

                i {
                    margin-top: 25%;
                    margin-left: 13px;
                }
            }
        }
    }

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
            background: ${props => props.desLen > 0 ? '#EFEFEF' : 'rgb(230, 230, 230)'};
            width: calc(100% - 20px);
            min-height: ${props => props.desLen > 0 ? `${props.desLen / 3.5}px` : '35px'}; 
            border: 2px solid #EFEFEF;
            border-radius: 3px;

            margin: 18px 0px 8px -4px; 
            padding: 10px;

            overflow: auto;
            resize: none;

            color: #172b4d;

            :hover {
                cursor: pointer;
                filter: ${props => props.desLen > 0 ? 'brightness(100%)' : 'brightness(95%)'};
            }

            :focus {
                background: white;
                border: 2px solid deepskyblue;
                min-height: ${props => props.desLen > 250 ? `${props.desLen / 3.5}px` : '70px'}; 

                cursor: auto;
 
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

    .act-big-box { 
        margin-top: 5px;

        i {
            position: absolute;
            margin-top: 3px;
            margin-left: -25px;

            color: #172b4d;
        } 

        .act-name-box, .act-detail-box {
            margin-left: 40px;
        }

        .act-detail-box {
            /* background: lightpink; */
            width: 100%;
            min-height: 50px;

            display: flex;
            flex-flow: column-reverse wrap; 

            margin-top: 15px;
            margin-left: 0px;

            .act-detail-item {
                /* background: lightyellow; */

                display: flex;
                flex-flow: row wrap; 

                margin-left: 10px;
                margin-bottom: 15px;

                .act-avatar-box {
                    margin-right: 8px;

                    div {
                        background: lightgray;
                        width: 32px;
                        height: 32px;

                        color: #172b4d;
                        font-size: 16px;
                        font-weight: 550;

                        margin-top: 5px;

                        :hover {
                            cursor: pointer;
                            filter: brightness(95%);
                        }

                        :active {
                            filter: brightness(90%);
                        }
                    }
                }

                .act-des-box {
                    display: flex;
                    flex-flow: column wrap; 
                }
            }
        }
    }
`;

export const CardMenuDiv = styled.div`
    /* background: lightblue; */
    width: 23%;
    min-height: 90vh;

    display: flex;
    flex-flow: column wrap;

    .add-to-card-box {  
        .add-to-card-item-box {
            margin-top: 8px;

            .add-to-card-item{
                i { 
                    margin-right: 10px;
                }
            }
        }
    }

    .actions-box {  
        margin-top: 20px;

        .actions-item-box {
            margin-top: 8px;

            .actions-item{
                i { 
                    margin-right: 10px;
                }
            }
        }
    }
`;

export const DefaultText = styled.p`
    display: inline;
    color: #172b4d;
    padding: 0;
    margin: 0;
    max-width: ${props => `${props.maxWidth}px`};
    align-self: center;
    
    text-align: center;
    font-weight: ${props => `${props.fontWeight}` !== `undefined` ? `${props.fontWeight}` : '500'};
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

export const ShowButton = styled(SaveButton)`
    background: rgb(230, 230, 230);
    color: #172b4d;
    filter: brightness(100%);

    position: absolute;
    margin-top: -5px;
    right: calc(25% + 25px);

    :hover { 
        filter: brightness(95%);
    }

    :active { 
        background-color: rgba(100, 220, 220, 0.2); 
        color: deepskyblue;
        filter: brightness(100%);
    }
`;

export const MenuButton = styled(ShowButton)`
    width: 100%;
    
    text-align: left;

    position: static; 
    margin-top: 0; 

    transition: background 0.2s, color 0.2s;
`;