import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import CheckboxListSecondary from './ListView/list.js'
class App extends Component {
  render() {
    return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
      <CheckboxListSecondary></CheckboxListSecondary>
        <div className="options">
          <ul>
            <li>
              Test 
              <Button variant="contained" color="primary">
                Hello World
              </Button>
            </li>
            <li>Test2</li>
          </ul>
        </div>
      </div>
    </React.Fragment>
    );
  }
}

export default App;
