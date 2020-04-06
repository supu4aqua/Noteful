import React, { Component } from "react";
import "./addFolder.css";
import Context from "../Context";
//import { API_URL } from "../src/config";
import config from '../config';
// Component to add a folder - Renders a form
class AddFolder extends Component {
  static contextType = Context;

  //When add folder button is clicked
  handleSubmit = e => {
    e.preventDefault();
    const { name } = e.target;
    const folder = {
      name: name.value
    };

    this.setState({ error: null });
  //  fetch(`http://localhost:8000/api/folders`, {
  fetch(config.API_URL + `/api/folders`, {
      method: "POST",
      body: JSON.stringify(folder),
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
        //Set data to state
        this.context.addFolder({ id: data.id, name: folder.name });
        name.value = "";
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    return (
      <div className="form-folder">
        <button
          title="Go back"
          className="go-back"
          onClick={() => this.props.history.goBack()}
        ></button>
        <form className="addform" onSubmit={this.handleSubmit}>
          <div>
            <h2>Create a folder</h2>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="new-folder"
              name="name"
              id="name"
              required
            />
          </div>
          <div>
            <button type="submit" className="addbutton">
              Add folder
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddFolder;
