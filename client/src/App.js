import React, { Component } from 'react';
import './App.css';
import TrackingCanvas from './components/tracking_canvas';
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

    this.grabNewCoords = this.grabNewCoords.bind(this);
  }

  grabNewCoords() {
    axios.get(`http://localhost:3001/live`).then( res => this.setState({
      tag_id: res.data.tag_id,
      x_coord: res.data.x_coord,
      y_coord: res.data.y_coord,
      z_coord: res.data.z_coord
      }));

    // TrackingCanvas.setState({
    //     x_coord: this.state.x_coord,
    //     y_coord: this.state.y_coord,
    //     z_coord: this.state.z_coord
    //   })
    
  }

  startRequest() {
    this.timeout = setInterval( () => this.grabNewCoords(), 1000 )
  }

  stopRequest() {
    
      clearInterval(this.timeout);
    
  }

  render() {
    // const grabNewCoords = () => this.grabNewCoords();
    const startRequest = () => this.startRequest();
    const stopRequest = () => this.stopRequest();
    return (
      <div>
        <div className="App">
        <div className="App-header">
        <h2>RFID Tracker App</h2>
        </div>
        <p className="App-intro">
        In this MVP/spike, we will demonstrate the RFID tracking app in 3 dimensions.
        </p>
        <button onClick={startRequest}>Start Tracking</button>
        <button onClick={stopRequest}>Stop Tracking</button>
        <ul>
          <li>tag_id: {this.state.tag_id}</li>
          <li>x_coord: {this.state.x_coord}</li>
          <li>y_coord: {this.state.y_coord}</li>
          <li>z_coord: {this.state.z_coord}</li>
        </ul>
        </div>
        <TrackingCanvas />
      </div>
      );
  }
}

export default App;
