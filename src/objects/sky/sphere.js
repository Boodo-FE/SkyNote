import * as THREE from 'three'

class Sphere{
	constructor(){
		this.mesh = new THREE.Object3D();

		this.geometry = new THREE.SphereGeometry(8,16,16)
		this.material = new THREE.MeshPhongMaterial({
			color: 0x156289,
			emissive: 0x072534,
			opacity: .1
			//wireframe: true 
			})
		let me = new THREE.Mesh( this.geometry, this.material)
		this.mesh.position.z = -100
		this.mesh.position.x = -300 // mesh最高点
		this.mesh.position.y = 73  // mesh最低点	
		
		this.mesh.add(me)

	}

	getMesh(){
		return this.mesh
	}
}

export default Sphere