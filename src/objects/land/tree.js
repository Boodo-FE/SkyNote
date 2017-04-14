import * as THREE from 'three'

class Tree{
	Constructor(){
		var dae;
		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load('./models/Tree.dae',function(collada){
			this.dae = collada.scene
		})
		this.dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
		this.dae.updateMatrix();
		
	}
  getMesh() {
  	return this.dae
  }
}

export default Tree