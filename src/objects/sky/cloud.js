import * as THREE from 'three'
const n = 5

class Cloud{ 
	constructor(option){
		//this.geometry = new THREE.BoxGeometry(option.width, option.height, option.depth)
		this.geometry = new THREE.BoxGeometry(5, 5, 5)
		this.material = new THREE.MeshPhongMaterial({
			color: 0xd8d0d1,
			opacity: .6
		})

		this.mesh = new THREE.Object3D()
		// this.mesh.position.x = -20
		// this.mesh.position.y = 300
		// this.mesh.position.z = -100
		this.generateCloud()
	}	

	generateCloud(){
		let nBoxes =n + Math.floor(Math.random()*(n-2))
		for(let i=0;i<nBoxes;i++){
			let m = new THREE.Mesh(this.geometry, this.material)
			m.position.x = i*5
			m.position.y = Math.random()*5
			m.position.z = Math.random()*5
			m.rotation.x = (Math.random()*Math.PI*2)/2
			m.rotation.z = Math.random()*Math.PI*2
			m.rotation.y = Math.random()*Math.PI*2

			let s = .6 + Math.random()*(n-2)
			m.scale.set(s,s,s)
			m.castShadow = true
			m.receiveShadow = true 

			this.mesh.add(m)
		}

	}

	getMesh(){
		return this.mesh
	}
}

export default Cloud