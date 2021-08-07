import React, { Component } from 'react';
import api from '../api';

import { arrowUp, pencil } from '../svg';
import { Link } from 'react-router-dom';

import { UserAnswer } from '../components'
import "../style/mainPage.css";
import styled from 'styled-components';

import { setAnserPage, setAnswers } from '../actions';
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

const Space = styled.div.attrs({
    className: "card-title",
})``

const QuestionCon = styled.div.attrs({
    className: "card-body",
})`
    display: flex;
`

const CardLeft = styled.div.attrs({
    className: "card-left",
})``

const CardRight = styled.div.attrs({
    className: "card-right",
})``

const CardFooter = styled.div.attrs({
    className: "card-footer bg-white",
})`
    display: flex;
    align-items: stretch;
`

const Options = styled.div.attrs({
    className: "options",
})`
    display: flex;
    align-items: stretch;
`

const Title = styled.div.attrs({
    className: "card-title user",
})``

const mapStateToProps = state => {               
    return {
        loginStatus: state.loginUser.loginStatus,
        id: state.loginUser.id,
        name: state.loginUser.name,
        qid: state.loginUser.qid,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetAnswerPage: (id) => dispatch(setAnserPage(id)),
        onSetAnswers: (an) => dispatch(setAnswers(an))
    }
}

class Answer extends Component {
    answer = (qid) => {
        if (this.props.loginStatus) {
            this.props.onSetAnswerPage(qid)
            window.location.replace("/answer");
        }
    }

    editQ = (qid) => {
        this.props.onSetAnswerPage(qid)
        window.location.replace("/editQuestion");
    }

    upvote = async (qid, up) => {
        if (this.props.loginStatus) {
            var voted = false
            if (up.includes(this.props.id)) {
                voted = true
                for( var i = 0; i < up.length; i++){ 
                    if ( up[i] === this.props.id) { 
                        up.splice(i, 1); 
                    }
                }
            } else {
                up.push(this.props.id)
            }
            const payload = { up }
            await api.upvote(qid, payload).then(res => {
                console.log(res.data)
                if (res.data.success) {
                    if (voted) {
                        window.alert(`Cancel successfully`)
                    } else {
                        window.alert(`Upvote successfully`)
                    }
                    window.location.replace("/question");
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    answerQ = () => {
        return (
            <Card onClick={() => this.answer(this.props.qid)}>
                <Title>{this.props.name}</Title>
                <h4 className="text-muted">
                    Post your new answer.
                </h4>
            </Card>
        )
    }

    deleteQ = async () => {
        var qid = this.props.qid;
        await api.deleteQuestion(qid).then(res => {
            if (res.data.success) {
                window.alert(`Delete successfully`)
                window.location.replace("/");
            }
        }).catch(err => {
            console.log(err)
        })
    }

    getQuestion = async () => {
        var qid = this.props.qid;
        await api.getQuestion(qid).then(res => {
            if (res.data.success) {
                var data = res.data.data
                this.setState({data})
                if (data.up) {
                    this.setState({up: data.up})
                }
                if (data.answer) {
                    this.props.onSetAnswers(data.answer)
                    this.setState({ answer: data.answer })
                }
                this.setState({ creatorid: data.creatorid})
                this.setState({time: data.createdAt})
            }
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getQuestion()
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            time: '',
            up: [],
            answer: [],
            creatorid: ''
        }
    }

    render() {
        return (
            <Container>
                <Link to='/'>
                    <Button>back</Button>
                </Link>
                <Card>
                    <Space>
                        {this.state.data.space}
                    </Space>

                    <QuestionCon>
                        <CardLeft>
                            <h4 className="text-left name">{this.state.data.creatorName}</h4>
                            <p className="text-muted">{this.state.time.substring(0,10)}</p>
                        </CardLeft>
                        <CardRight>
                            <h6><strong>{this.state.data.title}</strong></h6>
                            <p>{this.state.data.content}</p>
                        </CardRight>
                    </QuestionCon>

                    <CardFooter>
                        <Options onClick={() =>  this.upvote(this.props.qid, this.state.up)}>
                            <img src={arrowUp} width="20px" height="20px" alt="upvote" />
                            <p className={(this.state.up.includes(this.props.id) ? "voted" : null)}>Upvote({this.state.up.length})</p>
                        </Options>
                        <Options onClick={() => this.answer(this.props.qid)}>
                            <img src={pencil} width="20px" height="20px" alt="edit" />
                            <p>Answer({this.state.answer.length})</p>
                        </Options>
                        <Options>
                            {
                                (this.state.creatorid === this.props.id)
                                    ? <p onClick={() => this.editQ(this.props.qid)}>Edit</p>
                                    : null
                            }
                        </Options>
                        <Options>
                            {
                                (this.state.creatorid === this.props.id)
                                    ? <p onClick={() => this.deleteQ()}>Delete</p>
                                    : null
                            }
                        </Options>
                    </CardFooter>
                </Card>
                {
                    this.state.answer.map((answer, index) => {
                        return (
                            <UserAnswer aid={answer} key={index} />
                        )
                    })
                }
                {
                    this.props.loginStatus
                        ? this.answerQ()
                        : null
                }
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer)