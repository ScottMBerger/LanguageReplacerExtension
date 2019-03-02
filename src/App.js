import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import TabBar from './components/TabBar.js'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <TabBar></TabBar>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
