import * as THREE from 'three'
import { TweenMax } from 'gsap'

class Obstacle {
  constructor() {    
  	this.geometry = new THREE.BoxGeometry(20, 130, 100)
  	this.material = new THREE.MeshPhongMaterial({
  		color: 0x23190f
  	})

  	this.mesh = new THREE.Mesh(this.geometry, this.material)
    let x = .1 + Math.random()*.9
    let y = .5 + Math.random()*.9
    let z = .5 + Math.random()*.9

    this.mesh.scale.set(x, y, z)
  	this.mesh.castShadow = true
  	this.mesh.receiveShadow = true

    this.angle = 0
  }

  getMesh() {
    return this.mesh
  }
}


class ObstacleHolder {
  constructor() {
    this.mesh = new THREE.Object3D()
    this.obstaclesPool = []
    this.obstaclesInUse = []
    this.n = 20
    this.rotateAngle = 1
    this.createObstacle()
    this.spawnObstacle()
  }

  createObstacle() {
    for(let i = 0; i < this.n; i++) {
      let obstacle = new Obstacle()
      this.obstaclesPool.push(obstacle)
    }
  }

  spawnObstacle() {
    let obstacle
    for(let i = 0; i < this.n; i++) {
      if(this.obstaclesPool.length) {
        obstacle = this.obstaclesPool.pop()
      } else {
        obstacle = new Obstacle()
      }

      obstacle.angle = i*6
      obstacle.mesh.position.x = 653*Math.cos(obstacle.angle) 
      obstacle.mesh.position.y = 653*Math.sin(obstacle.angle)
      obstacle.mesh.position.z = -20
      obstacle.mesh.rotation.z = obstacle.angle +  Math.PI / 2

      this.mesh.add(obstacle.mesh)
      this.obstaclesInUse.push(obstacle)
    }
   }

  update(role) {
    let originPoint = role.mesh.position.clone()
    for(let i = 0; i < role.geometry.vertices.length; i++) {
      let localVertex = role.geometry.vertices[i].clone()
      let globalVertex = localVertex.applyMatrix4(role.mesh.matrix)
      let directionVector = globalVertex.sub(role.mesh.position)
      let ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      let collisionResults = ray.intersectObjects(this.obstaclesInUse);
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
         console.log('crash!')
      }
    }
  }

  getMesh() {
    return this.mesh
  }
}

export { ObstacleHolder as default, Obstacle }