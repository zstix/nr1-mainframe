import React from 'react';
import PropTypes from 'prop-types';
import { NrqlQuery, AutoSizer } from 'nr1';
import * as THREE from 'three';

import Screen from '../../components/Screen';

// NOTE: this would be an actual entity and it's relationships between
// NOTE: this should be rotating, but I ran out of time
class MainframeEntityVisualization extends React.Component {
  static propTypes = {
    accountId: PropTypes.string,
    entityGuid: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);

    const material = new THREE.MeshLambertMaterial({
      color: 'lightblue',
      wireframe: true
    });
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    this.cube = new THREE.Mesh(geometry, material);
  }

  addCube() {
    if (!this.ref || !this.ref.current) {
      return;
    }
    
    this.camera.position.set(0, 0, 2);
    this.renderer.setSize(400, 200);
    this.ref.current.appendChild(this.renderer.domElement);

    this.cube.rotation.x = 22.5;
    this.cube.rotation.y = 45;

    const light = new THREE.AmbientLight('white', 0.6);

    this.scene.add(this.cube);
    this.scene.add(light);

    this.renderer.render(this.scene, this.camera);
  }

  render() {
    this.scene.remove.apply(this.scene, this.scene.children);
    this.addCube();
    
    return (
      <AutoSizer>
	{({width, height}) => (
	  <Screen>
	    <div className="mainframe-entity" ref={this.ref}>
	      <span>account: {this.props.accountId}</span>
	      <span> / </span>
	      <span>entity: {this.props.entityGuid}</span>
	    </div>
	  </Screen>
	)}
      </AutoSizer>
    );
  }
}

export default MainframeEntityVisualization;
