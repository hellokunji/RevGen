import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import RequireAuth from './modules/common/auth/require_auth';
import PublicPage from './modules/common/auth/public_page';
import SignIn from './modules/signin/signin';
import Dashboard from './modules/dashboard/dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={RequireAuth(Dashboard)}/>
          <Route exact path='/dashboard' component={RequireAuth(Dashboard)}/>
          <Route exact path='/dashboard/:company' component={RequireAuth(Dashboard)}/>
          <Route exact path='/signin' component={PublicPage(SignIn)}/>
        </Switch>
      </Router>
    )
  }
}

export default connect(null, null)(App);
