export const getMyBoards = '/board/my_board/';

/// starred board
export const starToggle = (boardId) => (`/board/my_board/${boardId}/favorite/`)
export const starDrag = (boardId) => (`/board/my_board/${boardId}/drag_favorite/`)