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
        return;
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

  /*componentDidMount(){
  const folder = this.context.folders.find(
      folder => folder.id === this.props.match.params.id
    );
    console.log(folder);
   if (!folder) {
      return <p className="folderError">FOLDER NOT FOUND!!! </p>;
    }
}*/

  render() {
    console.log(this.props.match.params.id);
    const folder = this.context.folders.find(

      folder => folder.id === parseInt(this.props.match.params.id)
    );
    console.log(folder);
    if (!folder) {
      return <p className="folderError">FOLDER NOT FOUND!!! </p>;
    }

    const note = this.context.notes.find(
      note => note.folderid === parseInt(this.props.match.params.id)
    );
    if (!note) {
      return (
        <div className="mainPage">
          <NavBar />
          <div className="notes">
            <div className="folderError">
              <p>FOLDER EMPTY</p>
              <Link to="/add-note">
                <button title="Add Note" className="add-note"></button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    const notes = this.context.notes
      .filter(note => {
        return note.folderid === parseInt(this.props.match.params.id);
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
            <button
              title="Delete Note"
              className="delete-note"
              onClick={() => {
                this.deleteNoteRequest(note.id, this.context.deleteNote);
              }}
            ></button>
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
          <Link to="/add-note">
            <button title="Add Note" className="add-note"></button>
          </Link>
        </div>
      </div>
    );
  }
}

export default NavFolder;
