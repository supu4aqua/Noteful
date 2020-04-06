import React, { Component } from "react";
import "./addNote.css";
import Context from "../Context";
//import { API_URL } from "./src/config.js";
import config from '../config';
//Component to add a note - Renders a form
class AddNote extends Component {
  static contextType = Context;

  //When add note button is clicked
  handleSubmit = e => {
    e.preventDefault();

    const { name, content, folder } = e.target;
    const note = {
      name: name.value,
      folderid: folder.value,
      content: content.value,
    //  modified: new Date().toUTCString()
    };
console.log(note);
    this.setState({ error: null });
  //  fetch(`http://localhost:8000/api/notes`, {
  fetch(config.API_URL + `/api/notes`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "content-type": "application/json"
      }
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

      /*  this.context.addNote({
          id: data.id,
          name: note.name,
          content: note.content,
          folderId: note.folderId,
          modified: new Date().toUTCString()
        });*/
        this.context.addNote(data);
      /*  name.value = "";
        folder.value = "";
        content.value = "";*/
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  //Render all fodlers for select dropdown
  RenderFolderList() {
    const list = this.context.folders.map(folder => (
      <option key={folder.id} value={folder.id}>
        {folder.name}
      </option>
    ));
    return list;
  }

  render() {
    return (
      <div className="form-note">
        <button
          title="Go back"
          className="go-back"
          onClick={() => this.props.history.goBack()}
        ></button>
        <form className="addform" onSubmit={this.handleSubmit}>
          <h2>Create a note</h2>
          <div className="form-group">
            <label htmlFor="name">Name </label>
            <input
              type="text"
              className="new-note"
              name="name"
              id="name"
              required
            />
          </div>
          <div className="form-content">
            <label htmlFor="content">Content </label>
            <input
              type="text"
              className="new-content"
              name="content"
              id="content"
              required
            />
          </div>
          <div className="form-folders">
            <label htmlFor="folders">Folder </label>

            <select name="folder" required>
              {this.RenderFolderList()}
            </select>
          </div>
          <div>
            <button type="submit" className="addbutton">
              Add note
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNote;
