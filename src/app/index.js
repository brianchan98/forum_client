import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar } from '../components';
import { Register, Login, Content, Answer, Ask, AnsQuestion, EditQuestion } from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import editQuestion from '../pages/editQuestion';

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Content} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/question" exact component={Answer} />
                <Route path="/ask" exact component={Ask} />
                <Route path="/answer" exact component={AnsQuestion} />
                <Route path="/editQuestion" exact component={editQuestion} />
                
            </Switch>
        </Router>
    )
}

export default App