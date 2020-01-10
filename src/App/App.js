import React, {Component} from 'react';
import dummyStore from '../dummy-store';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import MainRoute from '../MainRoute/mainRoute';
import NavFolder from '../NavFolder/navFolder';
import NavNote from '../NavNote/navNote';
import NavBar from '../NavBar/navBar';

class App extends Component {
  state = {
        notes: [],
        folders: []
    };

  componentDidMount() {
          this.setState(dummyStore);
          // console.log(dummyStore);
        }

render(){
  const { notes, folders } =  this.state;
  return (
      <div className='Main'>
      <header className="App__header">
                <h1>
                    <Link to="/">Noteful</Link>{' '}
                </h1>
            </header>

          <Switch>
          <Route exact path='/' render={routeProps => (
                            <MainRoute
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                        />
          <Route exact path="/folder/:id" render={routeProps => (
                            <NavFolder
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                        />
          <Route exact path="/note/:id" render={routeProps => (
                            <NavNote
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                        />
          <Route render={() => <h2>Page Not Found</h2>} />
          </Switch>
      </div>
    );
  }

}
export default App;
