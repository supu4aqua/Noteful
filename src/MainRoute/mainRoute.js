import React, {Component} from 'react';
import dummyStore from '../dummy-store';
import {Route, Link} from 'react-router-dom';
import './mainRoute.css';
import NavFolder from '../NavFolder/navFolder';
import NavNote from '../NavNote/navNote';
import NavBar from '../NavBar/navBar';
import Context from '../Context';


class MainRoute extends Component {
static contextType = Context;

deleteNoteRequest(noteId, callback) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      callback(noteId)
    })
    .catch(error => {
      console.error(error)
    })
}

render() {
//console.log(this.context);
  const notes = this.context.notes.map( note =>
      <li key={note.id}>
          <Link to={`/note/${note.id}`}>{note.name} </Link>
          <p>Modified on - {note.modified}</p>
          <button onClick={() => {
                this.deleteNoteRequest(
                  note.id,
                  this.context.deleteNote,
               )
              }}>DeleteNote</button>
        </li>
  )

  return (
    <div className="mainPage">
  <NavBar folders={this.context.folders}/>
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
