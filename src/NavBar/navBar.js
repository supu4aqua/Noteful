import React, {Component} from 'react';
import dummyStore from '../dummy-store';
import {Route, Link} from 'react-router-dom';
import './navBar.css';

class NavBar extends Component {

render(){
  const folder = this.props.folders.map(folder =>
      <nav key={folder.id} className='folder-link'>
          <Link to={`/folder/${folder.id}`} >{folder.name} </Link>
        </nav>
  )
  return(
    <div className="folders">
        <div className="folder-list">
            {folder}
        </div>
        <button>Add Folder</button>
    </div>
  );

  }
}

export default NavBar;
