import React from 'react'

import { TextField, FormControl, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useWindowSize } from '../../function/useWindowSize'
import { BackgroundDecorate, StyledList, FormSection, FormButton, HeaderLogo, FormLayout, Footer } from './styled'

export function Login() {
    const windowSize = useWindowSize()

    const [loginState, setLoginState] = React.useState({
        username: '',
        password: '',
    })

    const handleChange = (prop) => (e) => {
        setLoginState({ ...loginState, [prop]: e.target.value })
    }

    const login = () => {
        console.log(loginState.username, loginState.password);
    }

    const smallClient = windowSize.height < 350

    return (
        <div style={{overflow: 'visible', height: '100vh'}}>
            <FormSection>
                {
                    !smallClient && <HeaderLogo />
                }

                <FormLayout >
                    {
                        smallClient && <HeaderLogo />
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

                    <FormButton onClick={login} text='Log In' />

                    <Divider />

                    <StyledList>
                        <li style={{ marginRight: 7 }}>
                            <Link to='/forgot'>Can't log in?</Link>
                        </li>
                        ᛫
                        <li style={{ marginLeft: 7 }}>
                            <Link to='/signup'>Sign up for an account</Link>
                        </li>
                    </StyledList>
                </FormLayout>

                <StyledList style={{ fontSize: 12 }}>
                    <li style={{ marginRight: 7 }}>
                        <Link to='/forgot' style={{ fontSize: 'inherit' }}>Privacy Policy</Link>
                    </li>
                        ᛫
                    <li style={{ marginLeft: 7 }}>
                        <Link to='/signup' style={{ fontSize: 'inherit' }}>Terms of Service</Link>
                    </li>
                </StyledList>
            </FormSection >

            {
                !smallClient &&
                <BackgroundDecorate left={require('../../asset/collab.png')} right={require('../../asset/hero.svg')} />
            }

            <Footer sm={smallClient}/>
        </div>
    )
}




