/*global chrome*/
import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import TabBar from './components/TabBar.js'

class App extends Component {
  state = {
    lessons: []
  };

  constructor() {
    super()
    chrome.storage.sync.get('lessons', (items) => {
      this.setState({
        lessons: items.lessons
      });

    });
  }

  updateState = obj => {
    console.log('settings state')
    this.setState({
      obj
    }, () => {
      chrome.storage.sync.set(obj)
    });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <TabBar state={this.state} updateState={this.updateState}></TabBar>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
