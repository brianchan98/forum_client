import React, { Component } from 'react';
import api from '../api';

import styled from 'styled-components';

const Title = styled.h1.attrs({
    className: 'h1',
})`
    margin-top: 15px;
`;

const Wrapper = styled.div.attrs({
    className: 'form-group container',
})``;

const Label = styled.label`
    margin: 5px;
`;

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
    max-width: 300px;
`;

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 30px 5px;
`;

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 30px 5px;
`;

const LoginButton = styled.a.attrs({
    className: `btn btn-primary`,
})`
    margin: 0px 5px;
`;

var emailValid = false;

class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            usersEmail: [],
            uid: '',
            name: '',
            email: '',
            password: '',
            cpwd: '',
        };
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
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

    handleChangeInputConfirmPassword = async event => {
        const cpwd = event.target.value
        this.setState({ cpwd })
    }

    checkValid = () => {
        if (!(this.state.name && this.state.email && this.state.password && this.state.cpwd)) {
            window.alert(`Please fill in all the details`)
            return false
        }
        if (!emailValid) {
            window.alert(`Please input an email`)
            this.setState({ email: '' })
            return false
        }
        if (this.state.password !== this.state.cpwd) {
            window.alert(`Please make sure the password and confirm password fields inputs are the same`)
            this.setState({
                password: '',
                cpwd: '',
            })
            return false
        }
        if (this.state.usersEmail.includes(this.state.email)) {
            window.alert(`This email has been registered. Please log in.`)
            return false
        }

        return true
    }

    handleRegister = async () => {
        var valid = this.checkValid();

        if (valid) {
            const { uid, name, email, password } = this.state
            const payload = { uid, name, email, password }
            await api.registerUser(payload).then(res => {
                if (res.data.success) {
                    window.alert(`User created successfully`)
                    window.location.replace("/login");
                } else {
                    window.alert(res.data.error)
                }
                this.setState({
                    uid: '',
                    name: '',
                    email: '',
                    password: '',
                    cpwd: '',
                })
            })
            emailValid = false
            this.getUserDetail()
        }
        
    }

    getUserDetail = async () => {
        var usersEmail = []
        var uid = '';
        await api.getAllUsers().then(res => {
            if (res.data.success) {
                res.data.data.map(data => {
                    usersEmail.push(data.email)
                })
                this.setState({ usersEmail })

                const num = res.data.data.length + 1
                uid = 'uid' + num
            }
        }).catch(err => {
            uid = 'uid1'
        })
        this.setState({ uid })
    }

    componentDidMount() {
        this.getUserDetail()
    }

    render() {
        const { name, email, password, cpwd } = this.state
        return (
            <Wrapper>
                
                <Title>Register</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    maxLength="20"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

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

                <Label>Confirm Password: </Label>
                <InputText
                    type="password"
                    value={cpwd}
                    onChange={this.handleChangeInputConfirmPassword}
                />

                <Button onClick={this.handleRegister}>Register</Button>
                <CancelButton href={'/'}>Cancel</CancelButton>

                <div>
                    <p className="text-left">Already have a user?</p>
                    <LoginButton href={'/login'}>Login</LoginButton>
                </div>

            </Wrapper>
        )
    }
}

export default Register