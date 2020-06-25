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
                        },
                        // {
                        //     account_id: 2
                        // },
                        // {
                        //     account_id: 2
                        // },
                        // {
                        //     account_id: 2
                        // }
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
    activities: [
        {
            account_id: 1,
            action: 'create this board',
            created: '2020-06-12T11:26:02.678534Z'
        }
    ]
};