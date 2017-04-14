import * as THREE from 'three'

class Sun {
  constructor(option) {
    this.sunb = new THREE.SphereGeometry(12, 30, 30)
    this.suns = new THREE.CylinderGeometry(0.01, 6, 12, 18, 3,true)
    this.material1 = new THREE.MeshBasicMaterial({
      color: option.color1,
      // emissive: 0xff0000,
      shading:THREE.FlatShading,
      // specular: 0xff0000,
      // shininess: 1000
    })
    this.material2 = new THREE.MeshBasicMaterial({
      color: option.color2
    })
    this.screen = new THREE.Object3D()
    this.mesh = new THREE.Object3D()
    this.mesh.position.x = 400
    this.mesh.position.y = 60
    this.mesh.position.z = -150
    //this.mesh.rotation.x = - Math.PI * 45 / 360
    //this.mesh.rotation.y = Math.PI * 20 / 360
    this.sunshine()
    this.sunbody()
    this.screen.add(this.mesh)
    this.arc = 0
  }
  sunbody(){
    let sbm = new THREE.Mesh(this.sunb, this.material1)
    sbm.position.x = 0
    sbm.position.y = 0

    //sbm.castShadow = true
    sbm.receiveShadow = true
    this.mesh.add(sbm)
  }
  sunshine(){
    let nBlocs = 16
    for (let i=0; i<nBlocs; i++ ){
      let ssm = new THREE.Mesh(this.suns, this.material2)
      ssm.position.x = 0 + Math.sin(Math.PI*i/8)*16
      ssm.position.y = 0 + Math.cos(Math.PI*i/8)*16
      ssm.rotation.z = -Math.PI*i/8
      //ssm.castShadow = true
      ssm.receiveShadow = true
      this.mesh.add(ssm)
    }
  }
  update() {
    this.mesh.position.x -= .8*Math.sin(Math.PI * this.arc++/3600)
    //console.log(this.arc)
    this.mesh.position.y += .35*Math.cos(Math.PI * this.arc++/3600)
    //console.log(this.mesh.position.x,this.mesh.position.y)
    this.mesh.rotation.z = (this.mesh.rotation.z + 0.01) % (Math.PI * 2);
  }

  getMesh() {
  	return this.mesh
  }
}

export default Sun