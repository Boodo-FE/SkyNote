import * as THREE from 'three'
import Road from './road'
import Tree from './tree'

class Land {
  constructor(option) {
  	this.geometry = new THREE.CylinderGeometry(650,650,800,360,10)
  	this.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2))
  	this.material = new THREE.MeshPhongMaterial({
  		color: option.color,
  		shading:THREE.FlatShading
  	})

  	this.mesh = new THREE.Mesh(this.geometry, this.material)
  	this.mesh.receiveShadow = true
  	this.mesh.position.y = -580

    let road = new Road({ color: 0xffffff }) 
    this.mesh.add(road.getMesh())

  }

  update() {
    this.mesh.rotation.z -= .005;
  }

  getMesh() {
  	return this.mesh
  }
}

export default Land