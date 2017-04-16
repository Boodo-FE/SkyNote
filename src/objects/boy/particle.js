import * as THREE from 'three'
import { TweenMax } from 'gsap'

class Particle {
  constructor() {
  	this.geometry = new THREE.TetrahedronGeometry(3,0)
	this.material = new THREE.MeshPhongMaterial({
	    color: 0xf7d9aa,
	    shininess:0,
	    specular:0xffffff,
	    shading:THREE.FlatShading
	})
	this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  explode(pos, color, scale) {
  	let that = this
  	let p = this.mesh.parent
    this.mesh.material.color = new THREE.Color( color)
    this.mesh.material.needsUpdate = true
    this.mesh.scale.set(scale, scale, scale)
    let targetX = pos.x + (-1 + Math.random()*2)*50
    let targetY = pos.y + (-1 + Math.random()*2)*50
    let speed = .6+Math.random()*.2
    TweenMax.to(this.mesh.rotation, speed, {x:Math.random()*12, y:Math.random()*12})
    TweenMax.to(this.mesh.scale, speed, {x:.1, y:.1, z:.1})
    TweenMax.to(this.mesh.position, speed, {x:targetX, y:targetY, delay:Math.random() *.1, ease:Power2.easeOut, onComplete:function(){
      if(p) p.remove(that.mesh)
      that.mesh.scale.set(1,1,1)
    }})
  }
}

class ParticleHolder {
  constructor() {
  	this.mesh = new THREE.Object3D()
  	this.particlesInUse = []
  	this.particlesPool = []
  	this.createParticles()
  }

  createParticles() {
  	for(let i = 0; i < 10; i++ ) {
  	  let particle = new Particle()
  	  this.particlesPool.push(particle)
  	}
  }

  spawnParticles(pos, density, color, scale) {
  	let nPArticles = density;
	for (let i=0; i<nPArticles; i++){
	  let particle;
	  if (this.particlesPool.length) {
	    particle = this.particlesPool.pop()
	  }else{
	    particle = new Particle()
	  }
	  this.mesh.add(particle.mesh)
	  particle.mesh.visible = true
	  particle.mesh.position.y = pos.y
	  particle.mesh.position.x = pos.x
	  particle.explode(pos, color, scale)
	}
  }
}

export { ParticleHolder as default, Particle}