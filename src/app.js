import * as THREE from 'three'

class App {
  constructor() {
    this.objects = []
    this.createScene()
  }
  
  createScene() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000)
    this.camera.position.z = 20

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
    
    this.render()
  }
  
  render() {
    requestAnimationFrame(() => {
      this.render()
    })
    
    this.objects.forEach((object) => {
      object.update()
    })
    
    this.renderer.render(this.scene, this.camera)
  }
  
  add(mesh) {
    this.objects.push(mesh)
    this.scene.add(mesh.getMesh())
  }
}

export default App

