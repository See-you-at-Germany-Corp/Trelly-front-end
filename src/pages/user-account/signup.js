import React from 'react'
import axios from 'axios';

import { Link } from 'react-router-dom'
import { useWindowSize } from '../../function/useWindowSize'
import { TextField, FormControl, Divider } from '@material-ui/core'
import { BackgroundDecorate, FormSection, FormButton, HeaderLogo, FormLayout, Footer, LinkCover } from './styled'

import { URL } from '../../api/';

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
        axios.post(`${URL}/profile/sign_up/`, signupState)
            .then(res => {
                console.log(res);
                console.log('created');
            })
    }

    const form = {
        email: ['email', 'Email', 'Enter Email Address'],
        fullname: ['text', 'Full name', 'Enter Full name'],
        password: ['password', 'Password', 'Enter Password']
    }

    const smallClient = windowSize.height < 350

    const termOfServices = <LinkCover><a href='/signup'>Cloud Terms of Service</a></LinkCover>
    const policies = <LinkCover><a href='/signup'>Privacy Policies</a></LinkCover>

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
                                        key={`form-signup${i}`}
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
                        fontSize: 11.4,
                        marginTop: 10,
                        marginBottom: 25,
                        color: 'rgb(94, 108, 132)',
                    }}>
                        By signing up, I accept the Atlassian&nbsp;
                        {termOfServices}
                        &nbsp;and acknowledge the&nbsp;
                        {policies}
                    </div>

                    <FormButton onClick={signup} text='Sign up' />

                    <Divider />

                    <LinkCover>
                        <Link to='/login' style={{ fontSize: 12 }}>
                            Already have an Atlassian account? Log in
                        </Link>
                    </LinkCover>
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