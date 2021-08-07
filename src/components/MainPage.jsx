import React, { Component } from 'react';
import api from '../api';

import styled from 'styled-components';
import "../style/mainPage.css";

import { setAnserPage } from '../actions';
import { connect } from 'react-redux';

import { arrowUp, pencil } from '../svg';

const Container = styled.div.attrs({
    className: "main-con",
})``;

const AskCon = styled.div.attrs({
    className: "ask-con",
})``;

const Button = styled.button.attrs({
    className: `btn btn-default `,
})`
    margin: 10px 0px;
    border: solid 1px black;
`

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

const mapStateToProps = state => {               
    return {
        loginStatus: state.loginUser.loginStatus,
        id: state.loginUser.id,
        name: state.loginUser.name,
        search: state.loginUser.searchText,
        sortByVote: state.loginUser.sortByVote,
        filter: state.loginUser.filter,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetAnswerPage: (id) => dispatch(setAnserPage(id))
    }
}

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    longText = (content, event) => {
        event.target.parentElement.innerHTML = content
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
                    window.location.replace("/");
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    answer = (qid) => {
        if (this.props.loginStatus) {
            this.props.onSetAnswerPage(qid)
            window.location.replace("/answer");
        }
    }

    answerPage = (qid) => {
        this.props.onSetAnswerPage(qid)
        window.location.replace("/question");
    }

    onClickBtn = () => {
        window.location.replace("/ask");
    }
    
    logedin = (name) => {
        return (
            <>
                <AskCon>
                    <Button onClick={this.onClickBtn}>
                        Ask Question
                    </Button>
                </AskCon>
                <Card onClick={this.onClickBtn}>
                    <h6 className="card-title">{name}</h6>
                    <p className="card-text text-muted">What is your question?</p>
                </Card>
            </>
        )
    }

    getPosts = async () => {
        await api.getAllQuestions().then(res => {
            if (res.data.success) {
                var data = res.data.data.reverse()
                if (this.props.sortByVote) {
                    data.sort(function(a, b) {
                        return b.up.length-a.up.length
                    })
                }
                this.setState({ data })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getPosts();
    }

    render() {
        return (
            <Container>
                {
                    this.props.loginStatus
                        ? this.logedin(this.props.name)
                        : null
                }
                {
                    this.state.data.map((item, index) => {
                        if (item.space === this.props.filter || this.props.filter === '') {
                            if (item.title.includes(this.props.search)) {
                                return (
                                    <Card key={index}>
    
                                        <Space>
                                            {item.space}
                                        </Space>
    
                                        <QuestionCon>
                                            <CardLeft>
                                                <h4 className="text-left name">{item.creatorName}</h4>
                                                <p className="text-muted">{item.createdAt.substring(0,10)}</p>
                                            </CardLeft>
                                            <CardRight>
                                                <h3 onClick={() =>  this.answerPage(item.qid)}><strong>{item.title}</strong></h3>
                                                <p>
                                                    {item.content.substring(0,200)}
                                                    {
                                                        (item.content.length >= 200)
                                                            ? "..."
                                                            : null
                                                    }
                                                    {
                                                        (item.content.length >= 200)
                                                            ? <button className="btn btn-link" onClick={(event) => this.longText(item.content, event)}>Read more</button>
                                                            : null
                                                    }
                                                </p>
                                            </CardRight>
                                        </QuestionCon>
    
                                        <CardFooter>
                                            <Options onClick={() =>  this.upvote(item.qid, item.up)}>
                                                <img src={arrowUp} width="20px" height="20px" alt="upvote" />
                                                <p className={(item.up.includes(this.props.id) ? "voted" : null)}>Upvote({item.up.length})</p>
                                            </Options>
                                            <Options onClick={() => this.answer(item.qid)}>
                                                <img src={pencil} width="20px" height="20px" alt="edit" />
                                                <p>Answer({item.answer.length})</p>
                                            </Options>
                                        </CardFooter>
    
                                    </Card>
                                )
                            }
                        }
                    })
                }
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)