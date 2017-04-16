import * as THREE from 'three'
import config from './constant/index'
import Land from './objects/land/land'
import Sky from './objects/sky/sky'
import Bubbles from './objects/sky/bubble'
import Star from './objects/sky/star'
import Sun from './objects/sky/sun'
import Boy from './objects/boy/boy'
import Audio from './objects/audio/Audio'
import Obstacle from './objects/land/obstacle'
import Particle from './objects/boy/particle'


class App {
  constructor() {


    this.land = new Land({ color: config.blue})
    this.star = new Star({ color1: config.yellow, color2: config.pink})
    this.sun  = new Sun({ color1: config.red, color2: config.yellow })
    this.sky  = new Sky();
    this.bubble = new Bubbles()
    this.boy  = new Boy({ color: 0xf7d9aa,  size: 4, pt: [0, 85, -20] })
    this.audio = new Audio()
    this.obstacle = new Obstacle() 
    this.particle = new Particle()

    this.createScene()
    this.createLights()
    this.addMesh()   
    this.audio.start()

    this.startBtn = document.querySelector('.gamestart')
    this.startBtn.addEventListener('click', this.gameStart.bind(this), false) 

    this.gameover = document.querySelector('.gameover')
    this.overBtn = document.querySelector('.overBtn')
    this.overBtn.addEventListener('click', this.reset, false)

    this.goalBoard = document.querySelector('#distValue')

    this.goal = 0
  }

  addMesh() {
    this.add(this.land)
    this.add(this.star)
    this.add(this.sun)
    this.add(this.sky)
    this.add(this.bubble)
    this.add(this.boy)
  }
  
  createScene() {
    this.scene = new THREE.Scene()
    // this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 900)
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

    if(this.land.getStatus()) {
      this.status = this.land.getStatus()
    }
      
    if(this.status === 'playing') {
      let voice = this.audio.getVoiceSize()
      if(voice > 40) {
        this.land.update(this.boy)
        this.goal += 10
        this.goalBoard.innerHTML = this.goal
      }
      if(voice > 140) {
        // console.log(voice)
        this.boy.update(voice + 40)
      }

    } else if(this.status === 'gameover') {
      this.gameOver()
    } else if(this.status === 'gamestart') { }

    this.star.update()
    this.sun.update()    
    this.sky.update()
    this.bubble.update()

    this.renderer.render(this.scene, this.camera)
  }
  
  add(mesh) {
    this.scene.add(mesh.getMesh())
  }

  gameStart() {
    this.status = 'playing'
    this.hide(this.startBtn) 
    this.hide(this.gameover) 
  }

  gameOver() {
    this.show(this.gameover)
    this.show(this.overBtn)
    this.particle.spawnParticles(this.boy.mesh.position.clone(), 5, 0xf7d9aa, .8)
    this.scene.remove(this.boy.mesh)
    this.land.setStatus(' ')
    this.status = 'gamestart'
  }

  hide(el) {
    el.style.display = 'none'
  }

  show(el) {
    el.style.display = 'block'
  }

  reset() {
     window.location.reload()
  }

  handlePaticle() {
    
  }
  
  handleWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }
}

export default App

