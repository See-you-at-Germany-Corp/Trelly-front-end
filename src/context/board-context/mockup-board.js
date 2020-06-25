import testPic from '../../asset/butler.png';

export const mockupData = {
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
            picture: testPic
        },
    ],
    lists: [
        {
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
                            account_id: 1
                        },
                        {
                            account_id: 2
                        }
                    ],
                    is_description: false,
                    is_watching: true,
                    checklist: null
                }, {
                    id: 2,
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
                            account_id: 1
                        },
                        {
                            account_id: 2
                        }
                    ],
                    is_description: false,
                    is_watching: true,
                    checklist: null
                }
            ],
        }, {
            id: 2,
            name: "To do",
            order_number: 1,
            cards: [],
        }
    ],
    labels: [
        {
            id: 19,
            name: null,
            color_id: 1
        },
        {
            id: 20,
            name: null,
            color_id: 2
        },
        {
            id: 21,
            name: null,
            color_id: 3
        },
        {
            id: 22,
            name: null,
            color_id: 4
        },
        {
            id: 23,
            name: null,
            color_id: 5
        },
        {
            id: 24,
            name: null,
            color_id: 6
        },
        {
            id: 25,
            name: null,
            color_id: 7
        },
        {
            id: 26,
            name: null,
            color_id: 8
        },
        {
            id: 27,
            name: null,
            color_id: 9
        }
    ],
    activities: [
        {
            id: 3,
            created: '2020-06-24T09:09:45.928781Z',
            type: 'board',
            test1: [
                1,
                'create this board'
            ]
        },
        {
            id: 4,
            created: '2020-06-24T09:24:36.741975Z',
            type: 'card',
            test1: [
                2,
                'added ',
                1,
                'to To do'
            ]
        },
        {
            id: 5,
            created: '2020-06-24T10:14:14.407537Z',
            type: 'card',
            test1: [
                1,
                'added ',
                2,
                'to To do'
            ]
        }
    ]
};