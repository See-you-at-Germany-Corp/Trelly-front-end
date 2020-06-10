import personalToStarred from './personalToStarred.js';
import { starBoard } from '../redux/actions/personalBoardList.js';

const moveStarObject = (personal, source, destination, dispatch) => {
    console.log('personal, source, destination');
    console.log(personal, source, destination);
 
    const starredBoard = personalToStarred(personal);
    console.log('starredBoard');
    console.log(starredBoard);
    
    if (source < destination) {
        dispatch({
            type: 'SET_STAR_ID',
            boardId: starredBoard[source].id,
            starId: starredBoard[destination].starred_id + 2
        });

        const newPersonal = [...personal];
        // console.log('newPersonal[source].starred_id');
        // console.log(newPersonal[source].starred_id);

        for (let i = destination + 1; i < starredBoard.length ; i++) {
            console.log('run');
            dispatch({
                type: 'SET_STAR_ID',
                boardId: starredBoard[i].id,
                starId: starredBoard[i].starred_id + 2
            });
        }

        dispatch({ type: 'OVERWRITE', newState: newPersonal });
    }

    // console.log(dispatch({type: 'UNSTAR_BOARD', boardId: 2}));

    return ({})
}
 
export default moveStarObject;