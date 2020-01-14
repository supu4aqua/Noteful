import React, {Component} from 'react';
import dummyStore from '../dummy-store';
import {Route, Link} from 'react-router-dom';
import './navBar.css';
import Context from '../Context';

class NavBar extends Component {
static contextType = Context;
render(){
  const folder = this.context.folders.map(folder =>
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
