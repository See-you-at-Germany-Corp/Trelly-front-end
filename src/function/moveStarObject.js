import axios from 'axios';
import { URL, authenHeader } from '../api/index.js';
import { starDrag } from '../api/board.js';

const moveStarObject = (starredBoard, source, destination, dispatch) => { 
    
    const boardId = starredBoard[source].id;
    let bodyFormData = new FormData();
    bodyFormData.set('shift', destination - source);

    axios.post(`${URL}${starDrag(boardId)}`, bodyFormData, authenHeader)
        // .then(res => console.log(res.data)); 

    /// set source starred_id with destination starred_id.
    const newStarBoard = [...starredBoard]; 
    newStarBoard[source].starred_id = newStarBoard[destination].starred_id;  

    /// move left to right.
    if (source < destination) {  
        /// set starred_id of board from [source + 1] to [destination] with starred_id itself - 1.
        for (let i = source + 1; i <= destination ; i++) {  
            newStarBoard[i].starred_id -= 1; 
        } 
    }

    /// move right to left.
    if (source > destination) { 
        /// set starred_id of board from [destination] to [source - 1] with starred_id itself + 1.
        for (let i = destination; i < source; i++) {
            newStarBoard[i].starred_id += 1; 
        } 
    }
 
    /// overwrite starredBoardList.
    if (source !== destination) { 
        newStarBoard.sort(function (a, b) {
            return a.starred_id - b.starred_id;
        });

        dispatch({ type: 'OVERWRITE_STAR_BOARD', newState: newStarBoard });
    }

    return ({})
}
 
export default moveStarObject;