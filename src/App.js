import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddTutorial from "./components/add-tutorial.component"
import {MockEditTutorialContainer} from "./components/edit-tutorial.component"
//import Tutorial from "./components/tutorial.component";
import { TutorialsList, Searchbar, TutorialsListContainer} from "./components/tutorials-list.component";
import { Tutorial, TutorialContainer } from './components/tutorial.component';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
/*
function App() {

  const currentTutorial = {
    id: 12345,
    title: "Temporary Tutorials",
    description: "This is a temporary tutorial with test data.. actual data should be obtained from server",
    published: false
  };

  const handleInputChange = () => {
    alert("inside Apps handleInputChange")
  }

  const deleteTutorial = () => {
    alert("Inside App delete tutorial")
  }


  return (
    <div className="App">
      <Tutorial 
            currentTutorial={currentTutorial}
            handleInputChange = {handleInputChange} 
            deleteTutorial = {deleteTutorial}/>
    </div>
  );
}
*/

class App extends React.Component {
  render() {

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tutorials" className="navbar-brand">
              List of Tutorials
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">
                  Tutorials
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/tutorials"]} component={TutorialsListContainer} />
              <Route exact path="/add" component={AddTutorial} />
              <Route path="/tutorials/:id" component={MockEditTutorialContainer} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

/*
class App extends React.Component {
  render() {
    return(
    <TutorialsListContainer />
    )
  }
}
*/
export default App;