import React, { Component } from 'react';
import styled from 'styled-components';

import "../style/contentPage.css";

import { SideBar, MainPage } from '../components'

const Container = styled.div.attrs({
    className: "container content-page",
})``;

class Content extends Component {
    render() {
        return (
            <Container>
                <SideBar />
                <MainPage />
            </Container>
        )
    }
}

export default Content