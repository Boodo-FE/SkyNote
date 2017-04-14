import * as THREE from 'three'

class Star {
  constructor(option) {
    this.mesh = new THREE.Object3D()
  	this.material = new THREE.MeshBasicMaterial({
  		color: option.color,
      shininess:1,
      specular:0xffffff,
    })
   
  	this.mesh.position.x = -230
    this.mesh.position.y = 20
    this.stars()
    this.moon()
    this.arc2 = 4000
  }
  moon(){
    //this.moonG = new THREE.CircleGeometry(3, 18, Math.PI / 3, Math.PI / 3 * 4)
    this.moonG = new THREE.SphereGeometry(12, 30, 30)
    let mm = new THREE.Mesh(this.moonG, this.material)
    mm.position.x = 0
    mm.position.y = 0
    //mm.castShadow = true
    mm.receiveShadow = true
    this.mesh.add(mm)
  }
  stars(){
    this.geometry = new THREE.CylinderGeometry(0.01, 1.6, 5, 18, 10)
    let nBlocs = 3+Math.floor(Math.random()*3);
    for(let j=0; j<nBlocs; j++ ){
      let m = new THREE.Object3D()
      for (let i=0; i<5; i++ ){
        let penta = new THREE.Mesh(this.geometry, this.material)
        penta.position.x = Math.sin(Math.PI*i/2.5)*2.5
        penta.position.y = Math.cos(Math.PI*i/2.5)*2.5
        penta.rotation.z = -Math.PI*2*i/5
        //penta.castShadow = true
        penta.receiveShadow = true
        m.add(penta)
      }
      m.position.x = Math.random()*50;
      m.position.y = Math.random()*50;
      m.position.z = Math.random()*10;
      m.rotation.z = 0.1*Math.random()*Math.PI;
      m.rotation.y = 0.1*Math.random()*Math.PI;
      this.mesh.add(m)
    }    
  }
  update() {
    this.mesh.position.x -= .4*Math.sin(Math.PI * this.arc2++/3600)

    this.mesh.position.y += .2*Math.cos(Math.PI * this.arc2++/3600)

    //this.mesh.rotation.z = (this.mesh.rotation.z + 0.01) % (Math.PI * 2);
  }

  getMesh() {
  	return this.mesh
  }
}

export default Star
