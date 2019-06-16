import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../src/_helpers';
import { alertActions } from '../src/_actions';
import { PrivateRoute } from '../src/_components';
import { HomePage } from '../src/HomePage';
import { LoginPage } from '../src/LoginPage';
import { RegisterPage } from '../src/RegisterPage';
import { DashBoardPage } from '../src/DashBoardPage';
import { MyProfilePage } from '../src/MyProfilePage/MyProfilePage';
import {ExploreFreelancersPage} from '../src/ExploreFreelancersPage';
import {browserHistory} from 'react-router';
import { FeedBackPage } from './FeedBackPage/FeedBackPage'

class App extends Component {
  constructor(props) {
    super(props);
    console.log('props::',props)
    const { dispatch } = this.props;
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
   
  }
  render() {
    const { alert } = this.props;
    return (
      <Router history={history}>
        <div>
          <div>
            <PrivateRoute exact path="/" component={RegisterPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/dashboard" component={DashBoardPage} />
            <Route path="/myprofile" component={MyProfilePage} />
            <Route path="/explore" component={ExploreFreelancersPage} />
            <Route path="/feedbackpage" component={FeedBackPage} />
            {/* <Route path="/sidebar" component={SideBarPage} /> */}
          </div>

        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
//export  { connectedApp as App }; 
export default connectedApp;
