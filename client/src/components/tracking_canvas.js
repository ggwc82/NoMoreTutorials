import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

class TrackingCanvas extends Component {

	constructor(props) {
    	super(props);
    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    	this.cameraPosition = new THREE.Vector3(5, 3, 10);

    	this.state = {
       		cubeRotation: new THREE.Euler(),      
       		tag_id: "",
        	location: {
            x_coord: 0,
        		y_coord: 0,
        		z_coord: 0,
    	      }
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
          tag_id: this.props.tag_id,
          location: {
            x_coord: this.props.location.x_coord,
            y_coord: this.props.location.y_coord,
            z_coord: this.props.location.z_coord
          }
      	});
    };
  }

  // grabNewCoords(e) {
  //   e.preventDefault();
  //   this.props.changeNumber(e.target.value);
  // }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
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
          position={ new THREE.Vector3(this.state.location.x_coord, this.state.location.y_coord, this.state.location.z_coord) }
        >
          <sphereGeometry
            radius={1}
            // widthSegments={5}
            // heightSegments={5}
            // phiStart={2}
            // phiLength={2}
            // thetaStart={2}
            // thetaLength={4}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
        <gridHelper size={10} scale={new THREE.Vector3(1, 1, 1)} position={0,2,0} rotation={Math.PI/2} colorGrid={new THREE.Color( 'skyblue' )}>
        </gridHelper>
        <gridHelper size={10} scale={new THREE.Vector3(1, 1, 1)} position={0,2,0} rotation={new THREE.Euler(0, 1.57, 1.57)}>
        </gridHelper>
        <gridHelper size={10} scale={new THREE.Vector3(1, 1, 1)} rotation={new THREE.Euler(1.57, 0, 1.57)}>
        </gridHelper>
      </scene>
    </React3>);
  }
}


export default TrackingCanvas;