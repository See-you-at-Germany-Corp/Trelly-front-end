import testPic from '../../asset/butler.png';

export const mockupData = {
    id: 1,
    name: 'Trelly',
    color_code: 'indianred',
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
    lists: [
        {
            id: 1,
            name: "To do 1",
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
            name: "To do 2",
            order_number: 2,
            cards: [],
        }
    ],
    activities: [
        {
            account_id: 1,
            action: 'create this board',
            created: '2020-06-12T11:26:02.678534Z'
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
        },
        {
            id: 28,
            name: "see9",
            color_id: 9
        },
        {
            id: 29,
            name: "see99",
            color_id: 9
        },
        {
            id: 30,
            name: "see999",
            color_id: 9
        },
        {
            id: 31,
            name: "see9999999999999999999999999999",
            color_id: 9
        }
    ],
};