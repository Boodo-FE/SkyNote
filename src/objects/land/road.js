import * as THREE from 'three'

class Road {
  constructor(option) {
  	this.geometry = new THREE.CylinderGeometry(653,653,200,60,10)
  	this.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2))
  	this.material = new THREE.MeshPhongMaterial({
  	  color: option.color,
  	  shading:THREE.FlatShading
  	})
  	this.mesh = new THREE.Mesh(this.geometry, this.material)
  	this.mesh.receiveShadow = true
  	this.mesh.position.z = -20
  }

  getMesh() {
  	return this.mesh
  }
}

export default Road