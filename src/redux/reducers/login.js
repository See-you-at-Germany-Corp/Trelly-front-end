import axios from 'axios';
import cookie from 'react-cookies'
import { URL } from '../../api/index.js';

const initState = { loggedIn: false }

export default (state = initState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            // save token in cookie or localhost
            let token = ''; 
            axios.post(`${URL}/login/token/`, action.payload)
                .then(res => {
                    token = res.data.access;
                    cookie.save('authen-token', token, { path: '/' });
                });

            return {loggedIn: true}
        case 'LOG_OUT':
            // del token in cookie or localhost
            cookie.remove('authen-token', { path: '/' })

            return {loggedIn: false}
        default:
            return state
    }
}