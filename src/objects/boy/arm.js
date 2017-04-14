import * as THREE from 'three'

/**
 * 任务头部，必须参数：颜色：color、大小：size、肚子大小：bellySize
 */
class Arm {
    constructor(option) {
        var armSize = [0.3 * option.size, 0.3 * option.size, 6 * option.size];
        this.mesh = new THREE.Mesh(new THREE.CylinderGeometry(armSize[0], armSize[1], armSize[2], 32, 3),
            new THREE.MeshLambertMaterial({
                color: option.color
            }));
        this.mesh.position.set(0, -option.bellySize / 5, 0);
        this.mesh.rotation.x = this.mesh.rotation.x + Math.PI / 2;
    }

    getMesh() {
        return this.mesh
    }
}

export default Arm