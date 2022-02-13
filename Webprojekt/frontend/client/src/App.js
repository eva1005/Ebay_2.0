import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateArtikel from './Components/CreateArtikel';
import Home from './Components/Home';
import Login from './Components/Login';
import SignIn from './Components/SignIn';
import NewArtikel from './Components/NewArtikel';

const App = () => {

  return (
    <div className="app">
      <Router>
        <header>
          <main>
            <Switch>
              <Route exact path='/home' component={Home} />
              <Route exact path='/createArtikel' component={CreateArtikel} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signIn' component={SignIn} />
              <Route exact path='/newArtikel' component={NewArtikel} />
            </Switch>
          </main>
        </header>
      </Router>

    </div>
  );
};

export default App;