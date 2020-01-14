import React, {Component} from 'react';
import dummyStore from '../dummy-store';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import MainRoute from '../MainRoute/mainRoute';
import NavFolder from '../NavFolder/navFolder';
import NavNote from '../NavNote/navNote';
import NavBar from '../NavBar/navBar';
import Context from '../Context';

class App extends Component {
  state = {
        notes: [],
        folders: []
    };

fetchData(stateData){
  const url =`http://localhost:9090/${stateData}`;
  fetch(url)
    .then(res => {
      if(!res.ok) {
        throw new Error('Something went wrong, please try again later');
      }
      return res.json();
    })
    .then(data => {
      this.setState({
        [stateData]: data
      });

    })
    .catch(err => {
      this.setState({
        error: err.message
      });
    });
}
  componentDidMount() {
    this.fetchData('notes');
    this.fetchData('folders');

        }
deleteNote = noteId => {
            const newNotes = this.state.notes.filter(note =>
              note.id !== noteId
            )
           this.setState({
             notes: newNotes
           })
         }


render(){
  const { notes, folders } =  this.state;
    const value = { notes, folders, deleteNote: this.deleteNote, }
  return (
      <div className='Main'>
      <header className="App__header">
                <h1>
                    <Link to="/">Noteful</Link>{' '}
                </h1>
            </header>
            <Context.Provider value={value}>
            <Switch>
              <Route exact path='/' component={MainRoute} /*render={routeProps => (
                              <MainRoute
                                  folders={folders}
                                  notes={notes}
                                  {...routeProps}
                                  />
                                )}*/
                                />
          <Route exact path="/folder/:id" component={NavFolder}/*render={routeProps => (
                            <NavFolder
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}*/
                        />
          <Route exact path="/note/:id" component={NavNote}/*render={routeProps => (
                            <NavNote
                                notes={notes}
                                {...routeProps}
                            />
                        )}*/
                        />
          <Route render={() => <h2>Page Not Found</h2>} />
          </Switch>
            </Context.Provider>
      </div>
    );
  }

}
export default App;
