export const getMyBoards = '/board/my_board/';
export const addMyBoard = '/board/my_board/';
export const getMyBoardDetail = boardId => (`/board/my_board/${boardId}/`);

/// starred board
export const starToggle = boardId => (`/board/my_board/${boardId}/favorite/`)
export const starDrag = boardId => (`/board/my_board/${boardId}/drag_favorite/`)