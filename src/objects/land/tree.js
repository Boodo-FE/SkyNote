import * as THREE from 'three'

class Tree{
	constructor(){
		var dae;
		console.log(5)
		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load('../../models/Tree.dae',function(collada){
	    	this.dae = collada.scene
	    	console.log(2)
			this.dae.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					console.log(1)
					child.geometry.computeFaceNormals();
					child.material.shading = THREE.FlatShading;
				}
			} );
		
		console.log(3)
		this.dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
		this.dae.updateMatrix();
		});
	}
  getMesh() {
  	console.log(4)

  	return this.dae
  }
}

export default Tree