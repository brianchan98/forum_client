import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { logoutUser, setSearch, sortByVote } from '../actions';
import { connect } from 'react-redux';

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``;

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``;

const ListRight = styled.div.attrs({
    className: 'navbar-nav',
})``;

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``;

const mapStateToProps = state => {          
    return {
        loginStatus: state.loginUser.loginStatus,
        search: state.loginUser.searchText,
        sortByVote: state.loginUser.sortByVote,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLogout: () => dispatch(logoutUser()),
        onSetSearch: (text) => dispatch(setSearch(text)),
        onSortByVote: (on) => dispatch(sortByVote(on)),
    }
}

class Links extends Component {
    componentDidMount() {
        this.props.onSetSearch('');
    }

    handleChange = (txt) => {
        this.props.onSetSearch(txt.target.value)
    }

    hot = () => {
        if (this.props.sortByVote) {
            this.props.onSortByVote(false)
        } else {
            this.props.onSortByVote(true)
        }
        window.location.replace("/");
    }

    returnHome = () => {
        window.location.replace("/");
    }

    render() {
        return (
            <React.Fragment>
                <div className="navbar-brand" onClick={() => this.returnHome()}>
                    Home
                </div>
                <Collapse>
                    <List>
                        <Item>
                            <div className="nav-link" onClick={() => this.hot()}>
                                Hot
                            </div>
                        </Item>
                        <Item>
                            <label>
                                <input type="text" value={this.props.search} onChange={(txt) => this.handleChange(txt)} />
                            </label>
                        </Item>
                    </List>
                    <ListRight>
                        {this.props.loginStatus 
                        ?
                            <Item>
                                <Link to="/" className="nav-link" onClick={this.props.onUserLogout}>
                                    Log out
                                </Link>
                            </Item>
                        : 
                            <>
                                <Item>
                                    <Link to="/login" className="nav-link">
                                        Log in   
                                    </Link>
                                </Item>
                                <Item>
                                    <Link to="/register" className="nav-link">
                                        Register
                                    </Link>
                                </Item>
                            </>
                        }
                    </ListRight>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Links)