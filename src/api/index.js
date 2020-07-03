import React from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';

export const URL = 'https://boxing-donair-89223.herokuapp.com';

export function useAuthen () {
    const [token, setToken] = React.useState(null);

    React.useMemo(() => {
        setToken({
            headers: {
                Authorization: `Bearer ${cookie.load('authen-token')}`
            }
        });
    // eslint-disable-next-line
    }, []);

    return token;
}
 
const mapStateToProps = state => ({
    loggedIn: state.loggedIn.loggedIn
})

connect(mapStateToProps)(useAuthen);