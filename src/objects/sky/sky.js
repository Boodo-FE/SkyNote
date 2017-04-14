import * as THREE from 'three'
import Cloud from './cloud'

//球体、三棱锥、云彩
class Sky{

	constructor(){
		this.mesh = new THREE.Object3D()
		this.nClouds = 5;
		this.multiCloud();
		this.clock = 0;
	}

	multiCloud(){
		let step = Math.PI*2 / this.nClouds 
		for(let i=0;i<this.nClouds;i++){
			let clouds = new Cloud()

			let a = step * i+5
			let h = 100
			let l = 150

			clouds.mesh.position.x =  Math.random() * 100 * i 
			clouds.mesh.position.y =  200 + Math.random() * i * 50
			clouds.mesh.position.z = - l - Math.random() * l

			this.mesh.add(clouds.mesh)

		}
	}

	update(){
		let l = this.mesh.children.length;
		for(let i=0;i<l;i++){
			let m = this.mesh.children[i]
				m.position.x -= .8*Math.sin(Math.PI *(this.clock++)/3600)
   				m.position.y += .2*Math.cos(Math.PI *(this.clock++)/3600)
		}
	}

	getMesh(){
		return this.mesh
	}
}

export default Sky