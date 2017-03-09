import React, { Component } from 'react';
import Search from '../Search/Search'
import UserList from '../UserList/UserList'

class App extends Component {
    
    render() {
        return (
          <div className="App">
              <div className="App-header">
                  <Search />
              </div>
              <div className="container">
                  <UserList />
              </div>
          </div>
        );
  }
}

export default App;
