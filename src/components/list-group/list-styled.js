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
    background-color: #ebecf0;
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
    }

    .new-card-wrapper textarea {
        min-height: 20px;
        width: calc(100% - 20px);
        
        border: 0;
        resize: none;
        padding: 10px;
        font-size: 10px;
        background-color: white;
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

    padding-bottom: 10px;

    .pop-over-header {
        text-align: center;
        position: relative;

        color: #5e6c84;
    }

    .pop-over-header .list-act {
        line-height: 40px;
    }

    .pop-over-header .x-button {
        width: 40px;
        height: 40px;
        line-height: 40px;

        top: 0;
        right: 0;
        position: absolute;

        cursor: pointer;

        :hover {
            color: #1e2c44;
        }
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    
    li {
        cursor: pointer;
        line-height: 30px;
        padding-left: 10%;

        :hover {
            background-color: rgba(9,30,66,.08);
        }
    }
`