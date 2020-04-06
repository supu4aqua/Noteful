import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./mainRoute.css";
import NavBar from "../NavBar/navBar";
import Context from "../Context";
//import { API_URL } from "./src/config.js";
import config from '../config';
//Renders a lost of all the notes on the main page
class MainRoute extends Component {
  static contextType = Context;
  //When delete note button is clciked
  deleteNoteRequest(noteId, callback) {
    fetch(config.API_URL + `/api/notes/${noteId}`, {
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
        this.props.history.push("/");
      })

      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const notes = this.context.notes.map(note => (
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
    ));

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

export default MainRoute;
