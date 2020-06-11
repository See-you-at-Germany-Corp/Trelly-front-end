const moveStarObject = (starredBoard, source, destination, dispatch) => {
    // console.log('starredBoard, source, destination');
    // console.log(starredBoard, source, destination);
   
    if (source < destination) {
        dispatch({
            type: 'SET_STAR_ID',
            boardId: starredBoard[source + 1].id,
            starId: starredBoard[destination + 1].starred_id + 2
        });
  
        for (let i = destination + 2; i < starredBoard.length ; i++) {
            dispatch({
                type: 'SET_STAR_ID',
                boardId: starredBoard[i].id,
                starId: starredBoard[i].starred_id + 2
            });
        } 
    }

    if (source > destination) {
        starredBoard.forEach(board => {
            if (board.id > 0) {
                dispatch({
                    type: 'SET_STAR_ID',
                    boardId: board.id,
                    starId: board.starred_id + 2
                })
            }
        })
  
        dispatch({
            type: 'SET_STAR_ID',
            boardId: starredBoard[source + 1].id,
            starId: starredBoard[destination + 1].starred_id - 2
        });

        for (let i = 1; i < source; i++) {
            dispatch({
                type: 'SET_STAR_ID',
                boardId: starredBoard[i].id,
                starId: starredBoard[i].starred_id - 1
            });
        } 
    }
 
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