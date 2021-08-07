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

const Title = styled.h1.attrs({
    className: "title",
})``

const SubmitBtn = styled.button.attrs({
    className: "btn btn-primary",
})``;

const mapStateToProps = state => {          
    return {
        qid: state.loginUser.qid,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

class EditQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qid: this.props.qid,
            space: '',
            title: '',
            content: '',
            answer: [],
            up: [],
            time: '',
            creatorid: this.props.creatorid,
            creatorName: this.props.creatorName,
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

    handleChange = (event) => {
        this.setState({ title: event.target.value })
    }

    handelContent = (event) => {
        this.setState({ content: event.target.value })
    }

    checkValid = () => {
        if (this.state.title === "" || this.state.space === "" || this.state.content === "") {
            return false
        }
        return true
    }

    onSubmiteQuestion = async () => {
        var valid = this.checkValid();

        if (valid) {
            const { qid, space, title, content, answer, up, time, creatorid, creatorName } = this.state
            const payload = { qid, space, title, content, answer, up, time, creatorid, creatorName }
            await api.updateQuestion(this.props.qid, payload).then(res => {
                console.log(res.data)
                if (res.data.success) {
                    window.alert(`Question updated successfully`)
                    window.location.replace("/");
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    getQuestion = async () => {
        var qid = this.props.qid;
        await api.getQuestion(qid).then(res => {
            if (res.data.success) {
                var data = res.data.data
                this.setState({
                    space: data.space,
                    title: data.title,
                    content: data.content,
                })
                if (data.up) {
                    this.setState({up: data.up})
                }
                if (data.answer) {
                    this.setState({ answer: data.answer })
                }
                this.setState({time: data.createdAt})
                var cbs = document.getElementsByClassName("form-check-input")
                for (var i = 0; i < cbs.length; i++) {
                    if (this.state.space === cbs[i].value) {
                        cbs[i].checked = true
                    } else {
                        cbs[i].checked = false
                    }
                }
            }
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getQuestion()
    }

    render() {
        return (
            <Container>
                <Link to='/'>
                    <Button>back</Button>
                </Link>

                <Card>
                    <Title>Ask your question</Title>
                    <label htmlFor="title">Title</label>
                    <input 
                        id="title"
                        className="form-control" type="text" 
                        value={this.state.title} 
                        onChange={(event) => this.handleChange(event)} />
                    <br />

                    <label>Space</label>
                    <div>               
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="Algorithm" value="Algorithm" onChange={(event) => this.onChangeCheck(event)} />
                            <label className="form-check-label" htmlFor="Algorithm">Algorithm</label>
                        </div>     
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="Machine Learning" value="Machine Learning" onChange={(event) => this.onChangeCheck(event)} />
                            <label className="form-check-label" htmlFor="Machine Learning">Machine Learning</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="System" value="System" onChange={(event) => this.onChangeCheck(event)} />
                            <label className="form-check-label" htmlFor="System">System</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="Javascript" value="Javascript" onChange={(event) => this.onChangeCheck(event)} />
                            <label className="form-check-label" htmlFor="Javascript">Javascript</label>
                        </div>
                    </div>
                    <br />
                    
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea className="form-control" id="content" rows="3" value={this.state.content} onChange={(event) => this.handelContent(event)} ></textarea>
                    </div>
                    <br />

                    <SubmitBtn onClick={() => this.onSubmiteQuestion()}>
                        Submit
                    </SubmitBtn>

                </Card>

            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion)