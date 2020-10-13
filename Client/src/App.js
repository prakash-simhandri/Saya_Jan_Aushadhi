import React from 'react';
import './App.css';
import Home from './components/Home';
import Description from './components/Description';
import JAabout from './components/JAabout';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Router>
        <Switch>
          <Route path="/" component={Home} />
          <Redirect to="/"></Redirect>
        </Switch>
      </Router>
      <Description/>
      <JAabout/>
      <Footer/>
    </div>
  );
}

export default App;
