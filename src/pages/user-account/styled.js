import React from 'react'
import styled from 'styled-components'
import { Button, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export const BackgroundDecorate = (props) => {
    return (
        <BackgroundDec>
            <LeftDecImg src={require('../../asset/collab.png')} />
            <RightDecImg src={require('../../asset/hero.svg')} />
        </BackgroundDec>
    )
}

export const FormButton = (props) => {
    return <Button variant="contained"
        style={{ textTransform: 'none', fontWeight: 'bold', backgroundColor: '#5AAC44', color: 'white', marginBottom: 25 }}
        onClick={props.onClick}>{props.text}
    </Button>
}

export const HeaderLogo = () => {
    return <StyledLogo src='https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/76ceb1faa939ede03abacb6efacdde16/trello-logo-blue.svg' />
}

export const Footer = (props) => {
    const list = {
        Templates: '',
        Pricing: '',
        Apps: '',
        Jobs: '',
        Blog: '',
        Developers: '',
        About: '',
        Help: '',
        "Cookie Settings": ''
    }

    return (
        <StyledFooter>
            <div>
                <Divider />
                <img src='https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/16006ae28f149063408d601e8c80eddc/atlassian-logo-blue-small.svg' alt='' />
            </div>

            <StyledList style={{ maxWidth: '50%', marginBottom: 20 }}>
                {
                    Object.keys(list).map((item, i) => {
                        return (
                            <li style={{ marginRight: 12 }} key={`footer${i}`}>
                                <Link to={`/${list[item]}`} style={{ fontSize: 12, color: '#5E6C84' }}>{item}</Link>
                            </li>
                        )
                    })
                }
            </StyledList>
        </StyledFooter>
    )
}

/* -------------------------------------------------------------------------- */
/*                                   Styled                                   */
/* -------------------------------------------------------------------------- */

export const StyledList = styled.ul`
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
export const FormSection = styled.section`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    overflow: visible;
`

export const FormLayout = styled.div`
    width: 320px;

    display: flex;
    flex: 0 1 auto;
    flex-direction: column;

    padding: 25px 40px;
    background-color: white;

    border-radius: 3px;
    box-shadow: rgba(0,0,0,0.12) 0px 0px 15px;

    @media only screen and (max-height: 350px) {
        border-color: transparent;
        box-shadow: 0 0 0 transparent;
        border-radius: 0;
        padding-top: 10px;
    }

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

const StyledLogo = styled.img`
    height: 43px;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
    vertical-align: middle;
`

const BackgroundDec = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -900;
    background-color: #F9FAFC;
`

const LeftDecImg = styled.img`
    width: 400px;
    max-width: 25%;
    margin-left: 10px;
    position: absolute;
    margin-bottom: 5 px;
    left: 0;
    bottom: 0;
    z-index: -999;
`

const RightDecImg = styled.img`
    width: 400px;
    max-width: 25%;
    position: absolute;
    margin-right: 10px;
    margin-bottom: 10px;
    right: 0;
    bottom: 0;
    z-index: -999;
`

const StyledFooter = styled.footer`
    width: 100%;

    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;

    top: 100%;
    bottom: 0;
    position: sticky;

    div {
        width: 100%;
    }

    hr {
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
    }

    img {
        width: 150px;
        display: block;
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
    }
`