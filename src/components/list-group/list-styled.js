import styled from 'styled-components'

export const ListWrapper = styled.div`
    max-height: 95%;
    min-width: 250px;
    max-width: 280px;
    margin-right: 10px;
    border-radius: 10px;
    padding-bottom: 10px;
    background-color: transparent;
`

export const ListContent = styled.div`
    display: flex;
    max-height: 100%;
    position: relative;
    border-radius: 5px;
    flex-direction: column;
    background-color: #ebecf0
`

export const HeaderField = styled.div`
    min-height: 40px;
    padding: 10px 8px;
    font-size: 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .MuiButton-root {
        min-width: 30px;
        width: 40px;
        height: 40px;
    }

    textarea {
        width: 180px;
        resize: none;
        font-size: 18px;
        font-weight: 600;
        word-break: keep-all;
        border: 0;
        padding: 8px 8px;
        border-radius: 5px;
        background-color: transparent;

        :focus {
            outline-color: #2F3F8F;
            background-color: white;
        }
    }
    .drag-target {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .hide {
        display: none;
    }
`
export const CardList = styled.div`
    padding: 10px;
    overflow-y: auto;
    background-color: ${props => props.isDraggingOver ? 'green' : 'transparent'}
`

export const AddCard = styled.div`
    min-height: 40px;
    margin: 10px 8px;
    display: table;

    .add-composer {
        width: 100%;
        height: 40px;
        padding-left: 10px;
        border-radius: 3px;
        font-size: 15px;
        display: table-cell;
        vertical-align: middle;
        color: #5e6c84;
        cursor: pointer;

        :hover {
            background-color: rgba(9,30,66,.08);
        }
    }

    .new-card-wrapper {
        width: 100%;

        .text-box-wrapper{
            width: 236px;
            border-radius: 3px;
            background-color: white; 

            textarea {
                min-height: 20px;
                width: calc(100% - 20px);
                
                border: 0;
                resize: none;
                padding: 10px;
                font-size: 10px;
                background-color: white;

                :focus {
                    outline: none;
                }
            }

            .label-wrapper {
                width: 100%;
                min-height: 15px;

                display: flex;
                flex-wrap: wrap;

                padding-left: 5px;
                padding-right: 5px;
                margin-bottom: 5px;
                
                .card-label {
                    width: 65px;
                    height: 10px;

                    margin: 5px;
                    border-radius: 2px;
                }
            }

            .members-wrapper {
                width: calc(100% - 10px);
                height: 30px;
                padding-left: 5px;
                padding-right: 5px;
                margin-bottom: 10px;
                
                display: flex;
                overflow-x: auto;
                align-items: center;
                justify-content: flex-end;

                .member-avatar {
                    width: 26px;
                    height: 26px;
                    font-size: 10px;
                }
            }
        }
    }

    .MuiButton-root {
        min-width: 30px;
        text-transform: none;
    }

    .add-card-wrapper {
        height: 40px;
    }

    .add-button {
        min-width: 60px;
        min-height: 40px;
        overflow: hidden;
        display: inline-block;

        color: white;
        background-color: #61AA4F;

        :hover {
            background-color: #65BF4A;
        }
    }
    
    .x-button {
        min-width: 40px;
        min-height: 40px;

        color: #5e6c84;
        font-size: 15px;
        line-height: 40px;
        text-align: center;

        display: inline-block;

        :hover {
            color: #405070;
            cursor: pointer;
        }
    }

    .ellipsis-button {
        width: 50px;
        min-height: 30px;
        margin-top: 10px;

        float: right;
        color: #5e6c84;
        font-size: 15px;
        text-align: center;
    }

    .hide {
        display: none;
    }
`

export const PopOverList = styled.div`
    width: 280px;
    font-size: 14px;
    overflow: visible;

    .pop-over-header {
        text-align: center;
        position: relative;

        color: #5e6c84;

        .hide {
            display: none;
        }
    }

    .pop-over-header .list-act {
        min-height: 40px;
        line-height: 40px;
    }

    .pop-over-header .button {
        width: 40px;
        height: 40px;
        color: #5e6c84;
        line-height: 40px;

        top: 0;
        border: 0;
        outline: none;
        cursor: pointer;
        position: absolute;
        background-color: transparent;

        :hover {
            color: #1e2c44;
        }
    }

    .pop-over-header .close {
        right: 0;
    }

    .pop-over-header .back {
        left: 0;
    }

    .pop-over-content {
        position: relative;
        overflow: hidden;
        padding-bottom: 10px;

        .content-name {
            color: #5e6c84;
            margin-top: 5px;
            margin-left: 12px;
            line-height: 25px;
        }

        .green-button {
            min-width: 60px;
            min-height: 30px;
            line-height: 30px;
            overflow: hidden;

            color: white;
            margin-top: 10px;
            margin-left: 12px;
            padding-left: 20px;
            padding-right: 20px;
            background-color: #61AA4F;

            border: 0;
            outline: none;
            cursor: pointer;
            border-radius: 3px;

            :hover {
                background-color: #65BF4A;
            }
        }

        .select-wrapper {
            margin-top: 10px;
            position: relative;
            width: calc(100% - 20px);

            left: 50%;
            transform: translateX(-50%);
        }

        .search-field {
            width: 90%;
            margin-top: 10px;
            margin-left: 10px;
            padding-left: 5px;
            line-height: 30px;
        }

        .member-item-wrapper {
            width: 260px;
            height: 40px;
            color: #091e42;
            display: flex;
            padding-left: 5px;
            margin-left: auto;
            margin-right: auto;
            border-radius: 3px;
            text-decoration-line: none;

            .member-avatar {
                width: 30px;
                height: 30px;
                top: 50%;
                transform: translateY(-50%)
            }

            .member-name {
                min-width: 160px;
                line-height: 40px;
                padding-left: 10px;

                flex-grow: 1;
                display: block;
                
                overflow: hidden;
                white-space: nowrap;
                word-break: break-all;
                word-wrap: break-word; 
                text-overflow: ellipsis;
                /* background-color: greenyellow; */
            }

            .member-check {
                min-width: 40px;
                max-width: 40px;
                line-height: 40px;
                /* background-color: blue; */
            }

            :hover {
                background-color: rgba(9,30,66,.08);
            }
        }

        .label-group {
            max-height: 40vh;
            overflow-y: auto;
            overflow-x: hidden;

            ::-webkit-scrollbar {
                width: 8px;
                border-radius: 10px;
                background: rgba(9,30,66,.08);
            }

            ::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background: rgba(9,30,66,.08);
            }
        }

        .label-wrapper {
            width: 260px;
            height: 32px;
            padding-top: 5px;
            padding-bottom: 5px;
            margin-left: 10px;
            margin-right: 10px;

            display: flex;
            overflow: visible;
            justify-content: flex-end;

            :hover {
                .hover-label {
                    display: flex;
                }

                .main-label {
                    width: 215px;
                }
            }

            a {
                text-decoration-line: none;
            }

            .hover-label {
                width: 15px;
                z-index: 1;
                display: none;
                flex-shrink: 0;
                filter: brightness(80%);
                transform: translateX(5px);
                border-radius: 3px 0px 0px 3px;
            }

            .main-label {
                width: 220px;
                padding-left: 5px;
                color: white;
                font-weight: 600;
                line-height: 32px;

                display: flex;
                flex-shrink: 0;
                z-index: 2;
                border-radius: 3px;

                overflow: hidden;
                position: relative;
                white-space: nowrap;

                .label-check {
                    width: 24px;
                    right: 0;
                    position: absolute;
                }

                p {
                    width: 190px;
                    height: 100%;
                    margin: 0;
                    
                    overflow: hidden;
                    word-wrap: break-word; 
                    word-break: break-all;
                    text-overflow: ellipsis; 
                }
            }

            .edit-label {
                width: 30px;
                display: flex;
                flex-shrink: 0;
                margin-left: 5px;
                border-radius: 3px;

                i {
                    margin-top: auto;
                    margin-left: auto;
                    transform: translate(-35%,-65%);
                }

                :hover {
                    background-color: #ebecf0;
                }
            }
        }

        .create-label-button {
            
        }

        ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
        }
        
        li {
            cursor: pointer;
            line-height: 30px;
            padding-left: 10%;

            :hover {
                background-color: rgba(9,30,66,.08);
            }
        }

        textarea {
            width: calc(100% - 20px);
            height: 72px;
            padding: 8px 12px;

            display: block;
            margin-top: 5px;
            margin-left: auto;
            margin-right: auto;

            border: none;
            color: #172b4d;
            resize: vertical;
            box-sizing: border-box;
            background-color: #fafbfc;
            box-shadow: inset 0 0 0 2px #dfe1e6;

            :hover {
                background-color: #ebecf0;
            }

            :focus {
                outline-color: #346ed9;
            }
        }
    }
`