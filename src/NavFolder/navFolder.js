import React, {Component} from 'react';
import dummyStore from '../dummy-store';
import {Route, Link} from 'react-router-dom';
import './navFolder.css';
import NavBar from '../NavBar/navBar';

export default function NavFolder(props) {


  const notes = props.notes.filter(note => {
    return note.folderId === props.match.params.id
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
      <NavBar folders={props.folders}/>
      <ul>{notes}</ul></div>

  )

}

//
