import React, {Component} from 'react';
import dummyStore from '../dummy-store';
import {Route, Link} from 'react-router-dom';



export default function NavNote(props) {
  //
  const note = props.notes.find(note =>
    note.id === props.match.params.id
  )
//console.log(note, props);



  return(
      <div className="note-details">
      <button onClick= {() => props.history.goBack()}>Back</button>
        <h2>{note.name}</h2>
        <p>Modified on {note.modified}</p>
        <p className="content">{note.content}</p>


      </div>

  );
}

//export default NavNote;
