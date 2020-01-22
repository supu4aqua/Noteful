import React, { Component } from "react";
import "./navNote.css";
import Context from "../Context";

//Renders details of selected note
class NavNote extends Component {
  static contextType = Context;
  render() {
    const note = this.context.notes.find(
      note => note.id === this.props.match.params.id
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
      </div>
    );
  }
}

export default NavNote;
