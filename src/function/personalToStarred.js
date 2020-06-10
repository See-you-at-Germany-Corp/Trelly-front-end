const personalToStarred = (personalBoardList) => {

    let starredBoardList = personalBoardList.filter(board => board.starred === true);
    starredBoardList.sort(function (a, b) {
        /// sort lowest to highest.
        return a.starred_id - b.starred_id;
    });

    return (
        /// return starredBoardList with sort lowest to highest starred_id.
        starredBoardList
    );
}

export default personalToStarred;