import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { TutorialVer1, TutorialVer2 } from "./tutorial.component";
import TutorialDataService from "../services/tutorial.service";
import MockTutorialDataService from "../services/mocktutorial.service";
import data from '../services/data';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTitle: '',
    }
  }

  onSearchButtonClick = (e) => {
    alert("searchButtonClick")
    debugger;
    const searchTitle = e.target.value;
    if (searchTitle !== '' && searchTitle.length > 0) {
      this.setState({ searchTitle: searchTitle })
      this.props.onSearchButtonClick(searchTitle);
    }
  }

  onChangeSearchTitle = (e) => {
    const searchText = e.target.value;
    this.setState({
      searchTitle: searchText
    });
  }

  render() {
    //initialize the state variables...
    return (
      <div>
        <div className="form-group">
          <label htmlFor="searchTitle">Search :</label>
          <input
            type="text"
            className="form-control"
            value={this.state.searchTitle}
            name="searchTitle"
            onChange={this.onChangeSearchTitle}
          />
        </div>
        <button onClick={this.onSearchButtonClick} className="btn btn-outline-secondary">
          Search
        </button>
      </div>
    )
  }
}

const SearchbarHooks = (props) => {
  const [searchTitle, setSearchTitle] = useState("")

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    props.onChangeSearchTitle(searchTitle);
  }

  const onSearchButtonClick = () => {
    debugger;
    if (searchTitle !== '' && searchTitle.length > 0) {
      props.onSearchButtonClick(searchTitle);
    }
  }

  return (
    <div>
      <div className="form-group">
        <label htmlFor="searchTitle">Search :</label>
        <input
          type="text"
          className="form-control"
          id="searchTitle"
          value={searchTitle}
          name="searchTitle"
          onChange={onChangeSearchTitle}
        />
      </div>
      <button onClick={onSearchButtonClick} className="btn btn-outline-secondary">
        Search
      </button>
    </div>
  )
}

const TutorialsList = (props) => {

  return (
    <div className="col-md-6">
      <h4>Tutorials List</h4>
      {props.tutorials && props.tutorials.length > 0 ? (
      <ul className="list-group">
          {props.tutorials.map((tutorial, index) => (
            <li
              className={
                "list-group-item " + (index === props.currentIndex ? "active" : "")
              }
              onClick={() => props.setActiveTutorial(tutorial, index)}
              key={index}
            >
              {tutorial.title}
            </li>
          ))}
      </ul>
      ) : (
        <h4>Search returned no results</h4>
      )}
      {props.tutorials && props.tutorials.length > 0 ? (
          <div>
            <button className="m-3 btn btn-sm btn-danger" onClick={props.removeAllTutorials}>
              Remove All
          </button>
          </div>
          ) : (
            <div> ..... </div>
          )}
     </div>
  )
}

//this component composes the  other components to simulate the other entities
const TutorialsListContainer = (props) => {

  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [isListed, setIsListed] = useState(true)

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = (searchText) => {
    setSearchTitle(searchText);
  };

  const onSearchButtonClick = () => {
    //setSearchTitle(searchText);
    findByTitle(searchTitle);
  }

  const retrieveTutorials = () => {
    MockTutorialDataService.getAll()
      .then(response => {
        //console.log(response);
        setTutorials(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    MockTutorialDataService.deleteAll()
      .then(response => {
        console.log(response);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    MockTutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setTutorials(response);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <SearchbarHooks 
          onChangeSearchTitle = {onChangeSearchTitle}
          onSearchButtonClick = {onSearchButtonClick} 
        />
      </div>

      <div className="col-md-6">
        <TutorialsList tutorials={tutorials}
          setActiveTutorial={setActiveTutorial} 
          removeAllTutorials = {removeAllTutorials} />
      </div>

      <div className="col-md-6">
        <TutorialVer2
          currentTutorial={currentTutorial}
          isListed = {isListed}
        />
      </div>

    </div>
  )
}

export { TutorialsList, Searchbar, TutorialsListContainer };