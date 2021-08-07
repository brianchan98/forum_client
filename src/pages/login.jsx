import React, { Component } from 'react';
import api from '../api';

import styled from 'styled-components';

import { loginUser, setUserDetail } from '../actions';
import { connect } from 'react-redux';

const Title = styled.h1.attrs({
    className: 'h1',
})`
    margin-top: 15px;
`

const Wrapper = styled.div.attrs({
    className: 'form-group container',
})``

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
    max-width: 300px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 30px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 30px 5px;
`

const LoginButton = styled.a.attrs({
    className: `btn btn-primary`,
})`
    margin: 0px 5px;
`

const mapStateToProps = state => {
    return {
        loginStatus: state.loginUser.loginStatus,
        id: state.loginUser.id,
        name: state.loginUser.name
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLogin: () => dispatch(loginUser()),
        onSetUserDetail: (id, name) => dispatch(setUserDetail(id, name)),
    }
}

var emailValid = false;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChangeInputEmail = async event => {
        const email = event.target.value
        emailValid = event.target.validity.valid
        this.setState({ email })
    }

    handleChangeInputPassword = async event => {
        const password = event.target.value
        this.setState({ password })
    }

    checkValid = () => {
        if (!(this.state.email && this.state.password)) {
            window.alert(`Please fill in all the details`)
            return false
        }
        if (!emailValid) {
            window.alert(`Please input an email`)
            this.setState({ email: '' })
            return false
        }

        return true
    }

    handleLogin = async () => {
        var valid = this.checkValid();

        if (valid) {
            const { email, password } = this.state
            const payload = { email, password }
            
            await api.userLogin(payload.email, payload.password).then(res => {
                if (res.data.success) {
                    this.props.onUserLogin()
                    this.props.onSetUserDetail(res.data.data.uid, res.data.data.name)
                }
                window.alert(res.data.message)
                this.setState({
                    email: '',
                    password: '',
                })
            })
            if (this.props.loginStatus) {
                window.location.replace("/");
            }

            emailValid = false;
        }
        
    }

    render() {
        const { email, password } = this.state
        return (
            <Wrapper>
                
                <Title>Sign In</Title>

                <Label>Email: </Label>
                <InputText
                    type="email"
                    value={email}
                    pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                    onChange={this.handleChangeInputEmail}
                />

                <Label>Password: </Label>
                <InputText
                    type="password"
                    value={password}
                    onChange={this.handleChangeInputPassword}
                />

                <Button onClick={this.handleLogin}>Login</Button>
                <CancelButton href={'/'}>Cancel</CancelButton>

                <div>
                    <p className="text-left">Do not have an account?</p>
                    <LoginButton href={'/register'}>Register</LoginButton>
                </div>

            </Wrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)