const moveStarObject = (starredBoard, source, destination, dispatch) => { 
   
    /// set source starred_id with destination starred_id.
    dispatch({
        type: 'SET_STAR_ID',
        boardId: starredBoard[source + 1].id,
        starId: starredBoard[destination + 1].starred_id
    });

    /// move left to right.
    if (source < destination) {  
        /// set starred_id of board from [source + 1] to [destination] with starred_id itself - 1.
        for (let i = source + 2; i < destination + 2 ; i++) { 
            dispatch({
                type: 'SET_STAR_ID',
                boardId: starredBoard[i].id,
                starId: starredBoard[i].starred_id - 1
            });
        } 
    }

    /// move right to left.
    if (source > destination) { 
        /// set starred_id of board from [destination] to [source - 1] with starred_id itself + 1.
        for (let i = destination + 1; i < source + 1; i++) {
            dispatch({
                type: 'SET_STAR_ID',
                boardId: starredBoard[i].id,
                starId: starredBoard[i].starred_id + 1
            });
        } 
    }
 
    /// overwrite starredBoardList.
    if (source !== destination) {
        const newStarred = [...starredBoard];
        newStarred.sort(function (a, b) {
            return a.starred_id - b.starred_id;
        });

        dispatch({ type: 'OVERWRITE_STAR_BOARD', newState: newStarred });
    }

    return ({})
}
 
export default moveStarObject;