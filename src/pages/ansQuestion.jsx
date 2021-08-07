import React, { Component } from 'react';
import api from '../api';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { connect } from 'react-redux';

const Container = styled.div.attrs({
    className: "container",
})``;

const Button = styled.button.attrs({
    className: "btn btn-link",
})``;

const Card = styled.div.attrs({
    className: "card",
})``;

const SubmitBtn = styled.button.attrs({
    className: "btn btn-primary",
})``;

const CancelBtn = styled.button.attrs({
    className: "btn btn-danger",
})``;

const mapStateToProps = state => {          
    return {
        qid: state.loginUser.qid,
        id: state.loginUser.id,
        name: state.loginUser.name,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

class AnsQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qid: this.props.qid,
            content: '',
            time: '',
            uid: this.props.id,
            uname: this.props.name,
            answer: [],
        };
    }

    onChangeCheck = (ev) => {
        this.setState({ space: ev.target.value })

        var cbs = document.getElementsByClassName("form-check-input")
        for (var i = 0; i < cbs.length; i++) {
            if (ev.target.value === cbs[i].value) {
                cbs[i].checked = true
            } else {
                cbs[i].checked = false
            }
        }
    }

    handelContent = (event) => {
        this.setState({ content: event.target.value })
    }

    checkValid = () => {
        if (!this.state.content) {
            return false
        }
        return true
    }

    updateQuestion = async () => {
        var qid = this.props.qid
        var answer = this.state.answer
        answer.push(this.state.aid)

        const payload = { answer }
        await api.answered(qid, payload).then(res => {
            console.log(res.data)
            if (res.data.success) {
                window.location.replace("/question");
            }
        }).catch(err => {
            console.log(err)
        })
    }

    onSubmiteAnswer = async () => {
        var valid = this.checkValid();

        if (valid) {
            const { aid, qid, content, uid, uname, time } = this.state
            const payload = { aid, qid, content, uid, uname, time }
            
            await api.postAnswer(payload).then(res => {
                if (res.data.success) {
                    window.alert(`Answer created successfully`)
                    this.updateQuestion()
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    cancel = () => {
        window.location.replace("/");
    }

    getQuestion = async () => {
        var qid = this.props.qid;
        await api.getQuestion(qid).then(res => {
            if (res.data.success) {
                var data = res.data.data
                if (data.answer) {
                    this.setState({ answer: data.answer })
                }
            }
        }).catch(err => {
            console.log(err)
        })
    }

    getAnswer = async () => {
        var id = 'aid';
        await api.getAllAnswers().then(res => {
            if (res.data.success) {
                var num = res.data.data.length + 1
                id += num
            }
        }).catch(err => {
            console.log(err)
            id += 1
        })
        this.setState({ aid: id })
    }

    componentDidMount() {
        this.getQuestion()
        this.getAnswer()
    }

    render() {
        return (
            <Container>
                <Link to='/'>
                    <Button>back</Button>
                </Link>

                <Card>
                    <div className="form-group">
                        <label htmlFor="content">{this.props.name}</label>
                        <textarea className="form-control" id="content" rows="3" onChange={(event) => this.handelContent(event)} ></textarea>
                    </div>
                    <br />

                    <SubmitBtn onClick={() => this.onSubmiteAnswer()}>
                        Submit
                    </SubmitBtn>
                    <br />
                    <CancelBtn onClick={() => this.cancel()}>
                        Cancel
                    </CancelBtn>

                </Card>

            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnsQuestion)