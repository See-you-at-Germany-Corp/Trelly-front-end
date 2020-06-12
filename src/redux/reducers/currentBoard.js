import testPic from '../../asset/butler.png';

const initState = {
    id: 1,
    name: 'Trelly',
    picture: 'indianred',
    members: [
        {
            id: 1,
            full_name: 'werawit',
            init: 'WS',
            username: 'werawit',
            bio: 'bio eiei',
            picture: testPic
        }, 
        {
            id: 2,
            full_name: 'PANSA BOONTHAVEEKHUNSAWATD',
            init: 'PB',
            username: 'pansaboonthaveekhunsawatd',
            bio: '',
            picture: ''
        },
        {
            id: 3,
            full_name: 'Mark Latthapol',
            init: 'ML',
            username: 'marklatthapol',
            bio: '',
            picture: ''
        }, 
    ],
    lists: {
            id: 1,
            name: "To do",
            order_number: 1,
            cards: [
                {
                    id: 1,
                    name: 'card1',
                    order_number: 1,
                    picture: null,
                    labels: [
                        {
                            id: 1,
                            name: null,
                            color_code: '#61BD4F',
                            order_number: 1
                        },
                        {
                            id: 7,
                            name: null,
                            color_code: '#00C2E0',
                            order_number: 7
                        }
                    ],
                    members: [
                        {
                            id: 1,
                            picture: null,
                            full_name: ' '
                        }
                    ],
                    is_description: false,
                    is_watching: true,
                    checklist: null
                }
            ]
        },
};

export default (state = initState, action) => {
    switch (action.type) { 
        case ('MEMBER_OVERWRITE'):
            const newState = {...state};

            newState.members = action.members;

            return newState;

        case ('CHANGE_CURRENT_BOARD'):
            return action.newState;

        default:
            return state;
    }
}