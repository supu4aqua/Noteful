import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navFolder.css";
import NavBar from "../NavBar/navBar";
import Context from "../Context";

//Renders notes that belongs to selected fodler
class NavFolder extends Component {
  static contextType = Context;

  //Delete note when button is clicked
  deleteNoteRequest(noteId, callback) {
    fetch(`http://localhost:9090/notes/${noteId}`, {
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
        return res.json();
      })
      .then(data => {
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        callback(noteId);
      })

      .catch(error => {
        console.error(error);
      });
  }

  render() {
  const folder = this.context.notes.find(
    note => note.folderId === this.props.match.params.id
  );
  if (!folder) {
    return <p className="folderError">FOLDER NOT FOUND!!! </p>;
  }

    const notes = this.context.notes
      .filter(note => {
        return note.folderId === this.props.match.params.id;
      })
      .map(note => {
        return (
          <li key={note.id}>
            <Link
              to={`/note/${note.id}`}
              style={{
                color: "00FFFF",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "20px"
              }}
            >
              {note.name}{" "}
            </Link>
            <p>Modified on - {note.modified}</p>
            <button title="Delete Note" className="delete-note" onClick={() => {
              this.deleteNoteRequest(note.id, this.context.deleteNote);
            }}></button>
          </li>
        );
      });



    return (
      <div className="mainPage">
        <NavBar />
        <div className="notes">
          <div className="notes-list">
            <ul>{notes}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default NavFolder;
