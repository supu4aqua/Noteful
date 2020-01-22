import React, { Component } from "react";
//import dummyStore from '../dummy-store';
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import MainRoute from "../MainRoute/mainRoute";
import NavFolder from "../NavFolder/navFolder";
import NavNote from "../NavNote/navNote";
//import NavBar from '../NavBar/navBar';
import Context from "../Context";
import AddFolder from "../AddFolder/addFolder";
import AddNote from "../AddNote/addNote";
import ErrorBoundary from "../ErrorBoundary";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };
  //To fetch data from local host - {stateData} will either be 'notes' or 'folders'
  fetchData(stateData) {
    const url = `http://localhost:9090/${stateData}`;
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          [stateData]: data
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  componentDidMount() {
    this.fetchData("notes"); //Fetch all notes from localhost
    this.fetchData("folders"); //Fetch all folders from localhost
  }

  //function to add a folder to state - Called from addFolder.js
  addFolder = folder => {
    console.log(folder);
    this.setState({
      folders: [...this.state.folders, folder]
    });
  };

  //function to add a note to state - Called from addNote.js
  addNote = note => {
    console.log(note);
    this.setState({
      notes: [...this.state.notes, note]
    });
  };

  //fucntion to delete a note from state - Called from mainRoute.js and navFolder.js
  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({
      notes: newNotes
    });
  };

  render() {
    const { notes, folders } = this.state;
    //Set value for context
    const value = {
      notes,
      folders,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    };

    return (
      <div className="Main">
        <header className="App__header">
          <h1>
            <Link to="/" style={{ color: "#FF4500", textDecoration: "none" }}>
              Noteful
            </Link>{" "}
          </h1>
        </header>
        <Context.Provider value={value}>
          <Switch>
            <ErrorBoundary>
              <Route exact path="/" component={MainRoute} />

              <Route exact path="/folder/:id" component={NavFolder} />
              <Route exact path="/note/:id" component={NavNote} />
              <Route exact path="/add-folder" component={AddFolder} />
              <Route exact path="/add-note" component={AddNote} />
            </ErrorBoundary>
            <Route render={() => <h2>Page Not Found</h2>} />
          </Switch>
        </Context.Provider>
      </div>
    );
  }
}
export default App;
