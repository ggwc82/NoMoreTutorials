import React, { Component } from 'react';
import './App.css';
import Tracker from './components/tracker';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag_id: "",
      x_coord: 0,
      y_coord: 0,
      z_coord: 0,
    };
  }

  grabNewCoords() {
    axios.get(`http://localhost:3001/live`).then( res => this.setState({
      tag_id: res.data.tag_id,
      x_coord: res.data.x_coord,
      y_coord: res.data.y_coord,
      z_coord: res.data.z_coord
      })
    );
  }

  render() {
    const grabNewCoords = () => this.grabNewCoords();
    return (
      <div className="App">
      <div className="App-header">
      <h2>RFID Tracker App</h2>
      </div>
      <p className="App-intro">
      In this MVP/spike, we will demonstrate the RFID tracking app in 3 dimensions.
      </p>
      <button onClick={grabNewCoords}>Grab new coordinates, Jim!</button>
      <ul>
        <li>tag_id: {this.state.tag_id}</li>
        <li>x_coord: {this.state.x_coord}</li>
        <li>y_coord: {this.state.y_coord}</li>
        <li>z_coord: {this.state.z_coord}</li>
      </ul>
      </div>
      );
  }
}

export default App;
