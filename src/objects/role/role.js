import * as THREE from 'three'
// import { TweenMax } from 'gsap'

class Role {
  constructor(option) {
  	this.geometry = new THREE.BoxGeometry(20, 20, 30)
  	this.material = new THREE.MeshPhongMaterial({
  		color: option.color
  	})

  	this.mesh = new THREE.Mesh(this.geometry, this.material)
  	this.mesh.castShadow = true
  	this.mesh.receiveShadow = true

  	this.mesh.position.y = 80
  	this.mesh.position.z = -20
  }

  update() {
  	if(this.mesh.position.y === 80) {
  	  TweenMax.to(this.mesh.position, .5, { y: 150, ease:Power2.easeOut, repeat: 1, yoyo: true})
  	}	
  }

  getMesh() {
  	return this.mesh
  }
}

export default Role