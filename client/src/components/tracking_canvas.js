import React, { PropTypes, Component } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

class TrackingCanvas extends Component {
  	static propTypes = {
    	changeNumber: PropTypes.func
  	}

	constructor(props, context) {
    	super(props, context);
    	this.grabNewCoords = this.grabNewCoords.bind(this);
    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    	this.cameraPosition = new THREE.Vector3(0, 0, 5);

    	this.state = {
      		cubeRotation: new THREE.Euler(),      
      		tag_id: "",
      		x_coord: 0,
      		y_coord: 0,
      		z_coord: 0,
    	};

    	this._onAnimate = () => {
      	// we will get this callback every frame

      	// pretend cubeRotation is immutable.
      	// this helps with updates and pure rendering.
      	// React will be sure that the rotation has now updated.
      	this.setState({
        	cubeRotation: new THREE.Euler(
          	this.state.cubeRotation.x + 0.001,
          	this.state.cubeRotation.y + 0.001,
          	0
        	),
      	});
    };
  }

  grabNewCoords(e) {
    e.preventDefault();
    this.props.changeNumber(e.target.value);
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    console.log(this.state.x_coord)
    return (
    	<React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}

      onAnimate={this._onAnimate}
    >

      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}

          position={this.cameraPosition}
        />
        <mesh
          rotation={this.state.cubeRotation}
          position={ new THREE.Vector3(this.state.x_coord, this.state.y_coord, this.state.z_coord) }
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
      </scene>
    </React3>);
  }
}


export default TrackingCanvas;