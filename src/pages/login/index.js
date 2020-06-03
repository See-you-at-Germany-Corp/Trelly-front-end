import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { TextField, FormControl, Button, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useWindowSize } from '../../function/useWindowSize'

export default function Login() {
    const windowSize = useWindowSize()

    const [loginState, setLoginState] = React.useState({
        username: '',
        password: '',
        showLogo: true
    })

    const handleChange = (prop) => (e) => {
        setLoginState({ ...loginState, [prop]: e.target.value })
    }

    const login = () => {
        console.log(loginState.username, loginState.password);

    }

    const logo = <HeaderLogo src='https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg' />

    return (
        <>
            <LoginContainer>
                {
                    windowSize.height >= 450 && logo
                }
                <FormContainer>
                    {
                        windowSize.height < 450 && logo
                    }
                    <h1>Log in to Trelly</h1>
                    <FormControl fullWidth>
                        <TextField variant='outlined'
                            label='Username'
                            placeholder='Enter Username'
                            size='small'
                            value={loginState.username}
                            onChange={handleChange('username')} />
                        <TextField variant='outlined'
                            type='password'
                            label='Password'
                            placeholder='Enter Password'
                            size='small'
                            value={loginState.password}
                            onChange={handleChange('password')} />
                    </FormControl>
                    <Button variant="contained"
                        color='primary'
                        style={{ marginBottom: 20, textTransform: 'none' }}
                        onClick={login}>Log in</Button>
                    <Divider variant='middle' />
                    <StyledList>
                        <li style={{ marginRight: 7 }}>
                            <Link to='/forgot'>Can't log in?</Link>
                        </li>
                    ᛫
                    <li style={{ marginLeft: 7 }}>
                            <Link to='/signup'>Sign up for an account</Link>
                        </li>
                    </StyledList>
                </FormContainer>
            </LoginContainer >
        </>
    )
}

const LoginContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;

    background: #F9FAFC;
`

const HeaderLogo = styled.img`
    height: 43px;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
    vertical-align: middle;
`

const FormContainer = styled.div`
    width: 320px;
    
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;

    padding: 25px 40px;
    background-color: white;
    
    border-radius: 3px;
    box-shadow: rgba(0,0,0,0.12) 0px 0px 15px;

    h1 {
        color: #5E6C84;
        font-size: 16px;
        margin-top: 5px;
        line-height: 28px;
        text-align: center;
        margin-bottom: 25px;
        letter-spacing: -0.01em;
    }

    .MuiTextField-root{
        margin-bottom: 15px;
    }
`

const StyledList = styled.ul`
    margin-top: 0;
    list-style: none;
    padding-top: 15px;
    padding-left: 0px;
    text-align: center;

    li {
        display: inline-block;
    }

    li a {
        font-size: 14px;
        cursor: pointer;
        color: #0052CC;
        text-decoration: none;
    }

    li a:hover{
        text-decoration: underline;
    }
`

const BackgroundDec = styled.div`
    width: 100vw;
    height: 100vh;
`