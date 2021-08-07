import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../logo.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    returnHome = () => {
        window.location.replace("/");
    }

    render() {
        return (
            <Wrapper onClick={() => this.returnHome()}>
                <img src={logo} width="50" height="50" />
            </Wrapper>
        )
    }
}

export default Logo