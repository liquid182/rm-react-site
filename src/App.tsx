import * as React from 'react';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ryan McCullough</h1>
        </header>
        <div className="body-content">
            <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.  Updated!
            </p>
        </div>
      </div>
    );
  }
}

export default App;
