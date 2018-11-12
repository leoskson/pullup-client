import React from 'react';
import ReactDOM from 'react-dom';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';
import RootPage from './components/rootPage';
import ProfilePage from './components/profilePage';
import AboutPage from './components/aboutPage';
import SignupPage from './components/signupPage';
import LoginPage from './components/loginPage';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/about' component={AboutPage} />
          <Route path='/user/:id' component={ProfilePage} />
          <Route path='/login' component={LoginPage} /> 
          <Route path='/signup' component={SignupPage} /> 
          <Route path='/' component={RootPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
