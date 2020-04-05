import React, { Component } from "react";
import "./navNote.css";
import Context from "../Context";

//Renders details of selected note
class NavNote extends Component {
  static contextType = Context;

  deleteNoteRequest(noteId, callback) {
    fetch(`http://localhost:8000/api/notes/${noteId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error;
          });
        }
      //  console.log(res);
        return 'Note Deleted';
      })
      .then(data => {
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        callback(noteId);
      //  this.props.history.push("/");
      })

      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const note = this.context.notes.find(
      note => note.id === parseInt(this.props.match.params.id)
    );
    if (!note) {
      return <p className="noteError">NOTE NOT FOUND!!! </p>;
    }

    return (
      <div className="note-details">
        <button
          title="Go back"
          className="go-back"
          onClick={() => this.props.history.goBack()}
        ></button>
        <h2>{note.name}</h2>
        <p>Modified on {note.modified}</p>
        <p className="content">{note.content}</p>
        <button
          title="Delete Note"
          className="delete-note"
          onClick={() => {
            this.deleteNoteRequest(note.id, this.context.deleteNote);
          }}
        ></button>
      </div>
    );
  }
}

export default NavNote;
