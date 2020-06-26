import cookie from 'react-cookies';

export const URL = 'https://mighty-lowlands-07946.herokuapp.com';
 
export const authenHeader = { 
    headers: { 
        Authorization: `Bearer ${cookie.load('authen-token')}`
    } 
};  