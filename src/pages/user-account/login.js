import React from 'react'

import { Link } from 'react-router-dom'
import { useWindowSize } from '../../function/useWindowSize'
import { TextField, FormControl, Divider } from '@material-ui/core'
import { BackgroundDecorate, StyledList, FormSection, FormButton, HeaderLogo, FormLayout, Footer, LinkCover } from './styled'
import { connect } from 'react-redux'

function Login(props) {
    const windowSize = useWindowSize()

    const [loginState, setLoginState] = React.useState({
        username: '',
        password: '',
    })

    const form = {
        username: ['text', 'Username', 'Enter Username'],
        password: ['password', 'Password', 'Enter Password'],
    }

    const handleChange = (prop) => (e) => {
        setLoginState({ ...loginState, [prop]: e.target.value })
    }

    const login = () => {
        // Login then redirect to Home

        // props.dispatch({type: 'LOG_IN'})
        // console.log(loginState.username, loginState.password);
    }

    const smallClient = windowSize.height < 350

    return (
        <div style={{ overflow: 'visible', height: '100vh' }}>
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
                        {
                            Object.keys(form).map((item, i) => {
                                return (
                                    <TextField variant='outlined'
                                        key={`form${i}`}
                                        type={form[item][0]}
                                        label={form[item][1]}
                                        placeholder={form[item][2]}
                                        size='small'
                                        value={loginState[item]}
                                        onChange={handleChange(item)} />
                                )
                            })
                        }
                    </FormControl>

                    <FormButton onClick={login} text='Log In' />

                    <Divider />

                    <StyledList>
                        <li style={{ marginRight: 7 }}>
                            <Link to='/forgot' style={{ color: '#3a86ff' }}>Can't log in?</Link>
                        </li>
                        ᛫
                        <li style={{ marginLeft: 7 }}>
                            <Link to='/signup' style={{ color: '#3a86ff' }}>Sign up for an account</Link>
                        </li>
                    </StyledList>
                </FormLayout>

                <StyledList style={{ fontSize: 12 }}>
                    <li style={{ marginRight: 7 }}>
                        <LinkCover>
                            <a href='/login' style={{ fontSize: 'inherit' }}>Privacy Policy</a>
                        </LinkCover>
                    </li>
                        ᛫
                    <li style={{ marginLeft: 7 }}>
                        <LinkCover>
                            <a href='/login' style={{ fontSize: 'inherit' }}>Terms of Service</a>
                        </LinkCover>
                    </li>
                </StyledList>
            </FormSection >

            {
                !smallClient &&
                <BackgroundDecorate left={require('../../asset/collab.png')} right={require('../../asset/hero.svg')} />
            }

            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn
})

const LoginWithConnect = connect(mapStateToProps)(Login)

export default LoginWithConnect;