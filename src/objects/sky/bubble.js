import * as THREE from 'three'
import Sphere from './sphere'

class Bubbles{
	constructor(){
		this.mesh = new THREE.Object3D()
		this.nBubbles = 10;
		this.multiBubble();
	}

	multiBubble(){
		let step = Math.PI*2 / this.nBubbles
		for(let i=0;i<this.nBubbles;i++){
			let bubble = new Sphere()

			let a = step * i+5
			let h = Math.random()*600
			let l = 200

			bubble.mesh.position.x = Math.cos(a) * h + Math.random() * 100
			bubble.mesh.position.y = Math.sin(a) * h + Math.random() * 100
			bubble.mesh.position.z = - l - Math.random() * l

			this.mesh.add(bubble.mesh)

		}
	}

	update(){
		let l = this.mesh.children.length;
		for(let i=0;i<l;i++){
			let m = this.mesh.children[i]
			if(m.position.y <= 30){
				m.position.y += 0.3
			}else if(m.position.y>= 400){
				m.position.y = 60
			}else{
				m.position.y += 0.3
			}
		}
	}

	getMesh(){
		return this.mesh
	}
}
export default Bubbles