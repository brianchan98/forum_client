import React, { Component } from 'react';
import styled from 'styled-components';

import { setFilter } from '../actions';
import { connect } from 'react-redux';

import "../style/sideBar.css";

const Container = styled.div.attrs({
    className: "con",
})``;

const Item = styled.li.attrs({
    className: "item",
})``;

const mapStateToProps = state => {               
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilterSet: (filter) => dispatch(setFilter(filter))
    }
}

class SideBar extends Component {
    componentDidMount() {
        this.props.onFilterSet('')
    }

    onBtnClick = (event) => {
        var filter = event.target.innerHTML
        this.props.onFilterSet(filter)
    }

    render() {
        return (
            <Container>
                <ul>
                    <Item>
                        <div onClick={(event) => this.onBtnClick(event)}>
                            Algorithm
                        </div>
                    </Item>
                    <Item>
                        <div onClick={(event) => this.onBtnClick(event)}>
                            Machine Learning
                        </div>
                    </Item>
                    <Item>
                        <div onClick={(event) => this.onBtnClick(event)}>
                            System
                        </div>
                    </Item>
                    <Item>
                        <div onClick={(event) => this.onBtnClick(event)}>
                            Javascript
                        </div>
                    </Item>
                </ul>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)