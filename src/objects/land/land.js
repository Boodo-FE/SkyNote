import * as THREE from 'three'
import Road from './road'
import Obstacle from './obstacle'

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

    this.road = new Road({ color: 0xffffff })    
    this.mesh.add(this.road.getMesh())

    this.obstacle = new Obstacle() 
    this.mesh.add(this.obstacle.getMesh())
  }

  update(role) {
    this.mesh.rotation.z += .003
    this.obstacle.update(role)
  }

  getMesh() {
  	return this.mesh
  }

  getStatus() {
    return this.obstacle.getStatus()
  }

  setStatus(status) {
    this.obstacle.status = status
  }
}

export default Land