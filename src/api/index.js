import cookie from 'react-cookies';

export const URL = 'https://warm-citadel-25178.herokuapp.com';
 
export const authenHeader = { 
    headers: { 
        Authorization: `Bearer ${cookie.load('authen-token')}`
    } 
};  