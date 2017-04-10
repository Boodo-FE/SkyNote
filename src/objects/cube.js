import * as THREE from 'three'

class Cube {
  constructor(size) {
    this.geometry = new THREE.BoxGeometry(size.width, size.height, size.depth)
    this.material = new THREE.MeshBasicMaterial({
      color: size.color
    })
    
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }
  
  update() {
    this.mesh.rotation.x += 0.01
    this.mesh.rotation.y += 0.01
  }
  
  getMesh() {
    return this.mesh
  }
}

export default Cube