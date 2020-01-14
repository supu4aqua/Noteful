import React, {Component} from 'react';
import dummyStore from '../dummy-store';
import {Route, Link} from 'react-router-dom';
import './navFolder.css';
import NavBar from '../NavBar/navBar';
import Context from '../Context';

//export default function NavFolder(props) {
class NavFolder extends Component {
static contextType = Context;
render() {
  const notes = this.context.notes.filter(note => {
    return note.folderId === this.props.match.params.id
  }).map( note => {
    return (
          <li key={note.id}>
            <Link to={`/note/${note.id}`}>{note.name} </Link>
            <p>Modified on - {note.modified}</p>
            <button>DeleteNote</button>
          </li>
        );
  })

  return(
      <div>
      <NavBar folders={this.context.folders}/>
      <ul>{notes}</ul></div>

  )
}
}

export default NavFolder;
