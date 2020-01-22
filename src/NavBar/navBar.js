import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navBar.css";
import Context from "../Context";

//Renders list of all the folders on the main page
class NavBar extends Component {
  static contextType = Context;

  render() {
    const folder = this.context.folders.map(folder => (
      <nav key={folder.id} className="folder-link">
        <Link
          to={`/folder/${folder.id}`}
          style={{ fontSize: "25px", textDecoration: "none" }}
        >
          {folder.name}{" "}
        </Link>
      </nav>
    ));
    return (
      <div className="folders">
        <div className="folder-list">{folder}</div>

        <Link to="/add-folder">
          <button title="Add Folder" className="add-folder"></button>
        </Link>
      </div>
    );
  }
}

export default NavBar;
