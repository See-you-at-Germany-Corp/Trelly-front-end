export const getMyBoards = '/board/my_board/';
export const addMyBoard = '/board/my_board/';
export const updateMyBoard = boardId => (`/board/my_board/${boardId}/`);
export const getMyBoardDetail = boardId => (`/board/my_board/${boardId}/`);

/// starred board
export const starToggle = boardId => (`/board/my_board/${boardId}/favorite/`)
export const starDrag = boardId => (`/board/my_board/${boardId}/drag_favorite/`)

/// members
export const memberToggle = boardId => (`/board/my_board/${boardId}/add_member/`);