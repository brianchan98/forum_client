import React, { Component } from 'react';
import api from '../api';

import styled from 'styled-components';

import { connect } from 'react-redux';

const Card = styled.div.attrs({
    className: "card",
})``;

const Title = styled.div.attrs({
    className: "card-title",
})`
    display: flex;
`

const Time = styled.div.attrs({
    className: "text-muted",
})`
    margin-left: 30px;
`

const AnswerCon = styled.div.attrs({
    className: "card-body",
})``

const Options = styled.div.attrs({
    className: "options",
})`
    margin-left: 30px
`

const mapStateToProps = state => {          
    return {
            qid: state.loginUser.qid,
            id: state.loginUser.id,
            answer: state.loginUser.answers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

class UserAnswer extends Component {
    getAnswer = async () => {
        var aid = this.props.aid;
        await api.getAnswer(aid).then(res => {
            if (res.data.success) {
                var data = res.data.data
                var name = data.uname
                var time = data.createdAt
                var content = data.content
                var id = data.uid
                this.setState({
                    name, 
                    time,
                    content,
                    id
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    updateQuestion = async () => {
        var qid = this.props.qid
        var answer = this.props.answer
        for( var i = 0; i < answer.length; i++){ 
            if ( answer[i] === this.props.aid) { 
                answer.splice(i, 1); 
            }
        }
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

    deleteA = async () => {
        var aid = this.props.aid;
        await api.deleteAnswer(aid).then(res => {
            if (res.data.success) {
                this.updateQuestion()
                window.alert(`Delete successfully`)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getAnswer()
    }

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            time: '',
            content: '',
            id: '',
        }
    }

    render() {
        return (
            <Card>
                <Title>
                    {this.state.name}
                    <Time>answered on {this.state.time.substring(0,10)}</Time>
                    <Options>
                            {
                                (this.state.id === this.props.id)
                                    ? <p onClick={() => this.deleteA()}>Delete</p>
                                    : null
                            }
                        </Options>
                </Title>
                <AnswerCon>
                    {this.state.content}
                </AnswerCon>
            </Card>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAnswer)