import * as THREE from 'three'

class Role {
  constructor(option) {
  	this.geometry = new THREE.BoxGeometry(20, 20, 30)
  	this.material = new THREE.MeshBasicMaterial({
  		color: option.color
  	})

  	this.mesh = new THREE.Mesh(this.geometry, this.material)
  	this.mesh.castShadow = true
  	this.mesh.receiveShadow = true

  	this.mesh.position.y = 80
  }

  update() {
  	
  }

  getMesh() {
  	return this.mesh
  }
}

export default Role