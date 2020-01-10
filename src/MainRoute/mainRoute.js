import React, {Component} from 'react';
import dummyStore from '../dummy-store';
import {Route, Link} from 'react-router-dom';
import './mainRoute.css';
import NavFolder from '../NavFolder/navFolder';
import NavNote from '../NavNote/navNote';
import NavBar from '../NavBar/navBar';

class MainRoute extends Component {

render() {

  const notes = this.props.notes.map( note =>
      <li key={note.id}>
          <Link to={`/note/${note.id}`}>{note.name} </Link>
          <p>Modified on - {note.modified}</p>
          <button>DeleteNote</button>
        </li>
  )

  return (
    <div className="mainPage">
  <NavBar folders={this.props.folders}/>
      <div className="notes">
        <div className="notes-list">
            <ul>{notes}</ul>
        </div>
        <button>Add note</button>
        </div>
    </div>
    );
  }

}

export default MainRoute;
