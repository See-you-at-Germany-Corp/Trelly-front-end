import React from 'react'

import { Link } from 'react-router-dom'
import { useWindowSize } from '../../function/useWindowSize'
import { TextField, FormControl, Divider } from '@material-ui/core'
import { BackgroundDecorate, StyledList, FormSection, FormButton, HeaderLogo, FormLayout, Footer } from './styled'
import { connect } from 'react-redux'

export default function Signup() {
    const windowSize = useWindowSize()

    const [signupState, setSignupState] = React.useState({
        email: '',
        fullname: '',
        password: '',
    })

    const handleChange = (prop) => (e) => {
        setSignupState({ ...signupState, [prop]: e.target.value })
    }

    const signup = () => {
        // Signup then Login -> redirect to home

        // props.dispatch({type: 'LOG_IN'})
        console.log(signupState);
    }

    const form = {
        email: ['email', 'Email', 'Enter Email Address'],
        fullname: ['text', 'Full name', 'Enter Full name'],
        password: ['password', 'Password', 'Enter Password']
    }

    const smallClient = windowSize.height < 350
    const linkColor = {color: '#3a86ff'}

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
                    <h1>Sign up for your account</h1>
                    <FormControl fullWidth>
                        {
                            Object.keys(form).map((item, i) => {
                                return (
                                    <TextField variant='outlined'
                                        type={form[item][0]}
                                        label={form[item][1]}
                                        placeholder={form[item][2]}
                                        size='small'
                                        value={signupState[item]}
                                        onChange={handleChange(item)} />
                                )
                            })
                        }
                    </FormControl>

                    <div style={{
                        display: 'inline',
                        fontSize: 12,
                        marginTop: 10,
                        marginBottom: 25,
                        color: 'rgb(94, 108, 132)',
                    }}>
                        By signing up, I accept the Atlassian&nbsp;
                        <Link to='/signup' style={linkColor}>Cloud Terms of Service</Link>
                        &nbsp;and acknowledge the&nbsp;
                        <Link to='/signup' style={linkColor}>Privacy Policy.</Link>
                    </div>

                    <FormButton onClick={signup} text='Sign up'/>

                    <Divider />

                    <Link to='/login' style={{
                        display: 'inline',
                        fontSize: 12,
                        marginTop: 10,
                        marginBottom: 25,
                        color: 'rgb(94, 108, 132)',
                        textAlign: 'center',
                        color: '#3a86ff'
                    }}>
                        Already have an Atlassian account? Log in
                    </Link>
                </FormLayout>
            </FormSection >

            {
                !smallClient &&
                <BackgroundDecorate left={require('../../asset/collab.png')} right={require('../../asset/hero.svg')} />
            }

            <Footer />
        </div>
    )
}