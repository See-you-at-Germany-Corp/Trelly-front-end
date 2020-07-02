import styled from 'styled-components';
import Popup from 'reactjs-popup';

export const CardPopUp = styled(Popup)`
    &-content {
        top: calc(100vh - (100vh - 31px)) !important;
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