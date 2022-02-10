import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import CreateArtikel from './Components/CreateArtikel';
import Home from './Components/Home';


const App = () => {

return(
  <div className="app">
    <BrowserRouter>
      <header>
        <main>
          <Switch>
          <Route exact path='./Components/Home' Components={Home} /><Home/>
          <Route exact path='./CreateArtikel' Components={CreateArtikel} /><CreateArtikel/>
          </Switch>
        </main>
      </header>
    </BrowserRouter>
    
  </div>
      );
};







export default App;