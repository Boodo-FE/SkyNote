import * as THREE from 'three'

class Star {
  constructor(option) {
    this.mesh = new THREE.Object3D()
    this.material1 = new THREE.MeshBasicMaterial({
      color: option.color2,
      shininess:1,
      specular:0xffffff,
    })
    this.material2 = new THREE.MeshBasicMaterial({
      color: option.color1,
      shininess:1,
      specular:0xffffff,
    })
    this.trans = new THREE.MeshBasicMaterial({
      color: 0xe4e0ba,
      shininess:1,
      specular:0xffffff,
    })
   
  	this.mesh.position.x = -480
    this.mesh.position.y = -20
    this.mesh.position.z = -150
    this.stars()
    this.moon()
    this.arc2 = 4000
  }
  moon(){
    //this.moonG = new THREE.CircleGeometry(3, 18, Math.PI / 3, Math.PI / 3 * 4)
    this.moonG = new THREE.SphereGeometry(16, 30, 30)
    let mm = new THREE.Mesh(this.moonG, this.material2)
    let mm2 = new THREE.Mesh(this.moonG, this.trans)
    mm.position.x = 100
    mm.position.y = 30
    mm2.position.x = 104
    mm2.position.y = 34
    //mm.castShadow = true
    mm.receiveShadow = true
    this.mesh.add(mm)
    this.mesh.add(mm2)
  }
  stars(){
    this.geometry = new THREE.CylinderGeometry(0.01, 1.6, 5, 18, 10)
    let nBlocs = 8+Math.floor(Math.random()*3);
    for(let j=1; j<nBlocs; j++ ){
      let m = new THREE.Object3D()
      for (let i=0; i<5; i++ ){
        let penta = new THREE.Mesh(this.geometry, this.material1)
        penta.position.x = Math.sin(Math.PI*i/2.5)*2.5
        penta.position.y = Math.cos(Math.PI*i/2.5)*2.5
        penta.rotation.z = -Math.PI*2*i/5
        //penta.castShadow = true
        penta.receiveShadow = true
        m.add(penta)
      }
      m.position.x = j*50 - 200;
      m.position.y = Math.random()*30;
      m.position.z = Math.random()*60 - 30;
      m.rotation.z = Math.random()*Math.PI*2;
      m.rotation.y = Math.random()*Math.PI*2;
      var s = .4 + Math.random()*2;
      m.scale.set(s,s,s);
      this.mesh.add(m)
    }    
  }
  update() {
    this.mesh.position.x -= .8*Math.sin(Math.PI * this.arc2++/3600)

    this.mesh.position.y += .32*Math.cos(Math.PI * this.arc2++/3600)

    //this.mesh.rotation.z = (this.mesh.rotation.z + 0.01) % (Math.PI * 2);
  }

  getMesh() {
  	return this.mesh
  }
}

export default Star
