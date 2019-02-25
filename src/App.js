import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import CheckboxListSecondary from './ListView/list.js'
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
