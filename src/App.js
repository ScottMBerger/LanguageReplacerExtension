/*global chrome*/
import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import TabBar from './components/TabBar.js'

class App extends Component {
  state = {
    language: [],
    lessons: []
  };

  constructor() {
    super()
    chrome.storage.sync.get(null, (items) => {
      const lessons = []
      for (const lang of items.languages) {
        for (const lesson of lang.lessons) {
          lessons.push(items[lang.name + ' - ' + lesson])
        }
      }
      console.log('my compiled lessons', lessons)
      this.setState({
        lessons: lessons,
        language: items.language,
        languages: items.languages
      });

    });
  }

  updateState = (obj, noSync) => {
    console.log('settings state', obj)
    this.setState(obj, () => {
      if (!noSync) {
        chrome.storage.sync.set(obj)
      }
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
