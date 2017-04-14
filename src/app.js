import * as THREE from 'three'
import Land from './objects/land/land'
import Role from './objects/role/role'
import Star from './objects/sky/star'
import Sun from './objects/sky/sun'
class App {
  constructor() {
    this.objects = []
    this.createScene()
    this.createLights()
  }
  
  createScene() {
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 900)
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000)
    this.camera.position.x = 0;
    this.camera.position.z = 200;
    this.camera.position.y = 100;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    this.world = document.querySelector('.world')
    this.world.appendChild(this.renderer.domElement)
    // document.body.appendChild(this.renderer.domElement)
    this.render()

    window.addEventListener('resize', this.handleWindowResize.bind(this), false)
  }
  
  createLights() {
    this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
    this.shadowLight = new THREE.DirectionalLight(0xffffff, .9)
  
    this.shadowLight.position.set(150, 300, 350)
    this.shadowLight.castShadow = true
    this.shadowLight.shadow.camera.left = -400
    this.shadowLight.shadow.camera.right = 400
    this.shadowLight.shadow.camera.top = 400
    this.shadowLight.shadow.camera.bottom = -400
    this.shadowLight.shadow.camera.near = 1
    this.shadowLight.shadow.camera.far = 1000
    this.shadowLight.shadow.mapSize.width = 2048
    this.shadowLight.shadow.mapSize.height = 2048

    this.scene.add(this.hemisphereLight)
    this.scene.add(this.shadowLight)
  }

  render() {
    requestAnimationFrame(() => {
      this.render()
    })
    
    this.objects.forEach((object) => {
      if(object instanceof Land) {
        document.addEventListener('keydown', (e) => {
          e.preventDefault()
          if(e.which === 39) {
            object.update()
          }
        })       
      }else if(object instanceof Sun){
        object.update()
      }else if(object instanceof Star){
        object.update()
      }
      
    })
    
    this.renderer.render(this.scene, this.camera)
  }
  
  add(mesh) {
    this.objects.push(mesh)
    this.scene.add(mesh.getMesh())
  }

  handleWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }
}

export default App

