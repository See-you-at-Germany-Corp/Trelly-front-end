import React from 'react'

import { Link } from 'react-router-dom'
import { useWindowSize } from '../../function/useWindowSize'
import { TextField, FormControl, Divider } from '@material-ui/core'
import { BackgroundDecorate, StyledList, FormSection, FormButton, HeaderLogo, FormLayout, Footer, LinkCover } from './styled'

export default function Forgot() {
    const windowSize = useWindowSize()

    const [forgotState, setForgotState] = React.useState({
        email: '',
        valid: true,
        sended: false,
        formError: false,
    })

    const handleChange = (prop) => (e) => {
        setForgotState({ ...forgotState, [prop]: e.target.value })
    }

    const sendRecovery = () => {
        // Check email is valid -> set formError
        // check valid account -> set valid
        // set sended for change component -> set sended
        toggleSended()
    }

    const toggleSended = () => {
        setForgotState({ ...forgotState, sended: !forgotState.sended})
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
                    <h1>Can't log in?</h1>

                    {
                        forgotState.sended === false ?
                            [
                                <h2 key='forgot-h2'>We'll send a recovery link to</h2>,
                                <FormControl fullWidth key='forgot-form'>
                                    <TextField variant='outlined'
                                        type={'email'}
                                        label={'Email'}
                                        placeholder={'Enter Email'}
                                        size='small'
                                        value={forgotState.email}
                                        onChange={handleChange('email')}
                                        error={forgotState.formError}
                                        helperText={forgotState.valid === false ? 'There wasn\'t an account for that email' : ''}
                                    />
                                </FormControl>,
                                <FormButton onClick={sendRecovery} text='Send recovery link' key='forgot-button' />
                            ]
                            :
                            [
                                <h3 key='send-recovery'>We sent a recovery link to your email address:</h3>,
                                <h3 key='recovery-email' style={{ fontSize: 22, fontWeight: '1000' }}>{forgotState.email}</h3>
                            ]
                    }

                    <Divider />

                    {
                        forgotState.sended === false ?
                            <LinkCover style={{ marginTop: 20, marginBottom: 20 }}>
                                <Link to='/login' style={{ fontSize: 14, }}>Retun to log in</Link>
                            </LinkCover>
                            :
                            <StyledList style={{ fontSize: 12 }} key='forgot-list'>
                                <li style={{ marginRight: 7 }}>
                                    <Link to='/login' style={{ fontSize: 'inherit', color: '#3a86ff' }}>Retun to log in</Link>
                                </li>
                                    ᛫
                                <li style={{ marginLeft: 7 }}>
                                    <a style={{ fontSize: 'inherit', color: '#3a86ff' }} onClick={toggleSended}>Resend recovery link</a>
                                </li>
                            </StyledList>
                    }
                </FormLayout>

                {
                    !forgotState.sended &&
                    <StyledList style={{ fontSize: 12 }}>
                        <li style={{ marginRight: 7 }}>
                            <a style={{ fontSize: 'inherit', color: '#3a86ff' }}>Login help</a>
                        </li>
                        ᛫
                        <li style={{ marginLeft: 7 }}>
                            <a style={{ fontSize: 'inherit', color: '#3a86ff' }}>Contact support</a>
                        </li>
                    </StyledList>
                }
            </FormSection >

            {
                !smallClient &&
                <BackgroundDecorate left={require('../../asset/collab.png')} right={require('../../asset/hero.svg')} />
            }

            <Footer />
        </div>
    )
}