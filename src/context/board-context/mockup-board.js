export const mockupData = {
    "id": 1,
    "name": "board2",
    "picture": null,
    "starred_id": 0,
    "members": [
        {
            "id": 1,
            "username": "account1",
            "picture": null,
            "full_name": "acccount1first account1last",
            "init": "AA",
            "bio": null
        }
    ],
    "lists": [
        {
            "id": 1,
            "name": "To do",
            "order_number": 1,
            "cards": [
                {
                    "id": 1,
                    "name": "card in todo",
                    "order_number": 1,
                    "picture": null,
                    "labels": [
                        {
                            "id": 3,
                            "name": null,
                            "color_code": "#FF9F1A",
                            "order_number": 3
                        }
                    ],
                    "members": [
                        {
                            "account_id": 1
                        },
                        {
                            "account_id": 2
                        }
                    ],
                    "is_description": false,
                    "is_watching": true,
                    "checklist": null
                },{
                    "id": 2,
                    "name": "card in todo2",
                    "order_number": 2,
                    "picture": null,
                    "labels": [
                        {
                            "id": 3,
                            "name": null,
                            "color_code": "#FF9F1A",
                            "order_number": 3
                        }
                    ],
                    "members": [
                        {
                            "account_id": 1
                        },
                        {
                            "account_id": 2
                        }
                    ],
                    "is_description": false,
                    "is_watching": true,
                    "checklist": null
                }
            ]
        },
        {
            "id": 2,
            "name": "Doing",
            "order_number": 2,
            "cards": []
        },
        {
            "id": 3,
            "name": "Done",
            "order_number": 3,
            "cards": []
        }
    ],
    "activities": [
        {
            "account_id": 1,
            "action": "create this board",
            "created": "2020-06-12T11:26:02.678534Z"
        }
    ]
}