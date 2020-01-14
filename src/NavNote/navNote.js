import React, {Component} from 'react';
import dummyStore from '../dummy-store';
import {Route, Link} from 'react-router-dom';
import Context from '../Context';


//export default function NavNote(props) {
  //
  class NavNote extends Component {
    static contextType = Context;
    render(){
  const note = this.context.notes.find(note =>
    note.id === this.props.match.params.id
  )
//console.log(note, props);



  return(
      <div className="note-details">
      <button onClick= {() => this.props.history.goBack()}>Back</button>
        <h2>{note.name}</h2>
        <p>Modified on {note.modified}</p>
        <p className="content">{note.content}</p>


      </div>

  );
}
}

export default NavNote;

//export default NavNote;
