import * as THREE from 'three'

/**
 * 人物腿，必须参数：
 * 颜色：color、
 * 大小：size、
 * 肚子大小：bellySize、
 * 位置：pt、
 * 左右：side(left,right)
 */
class Leg {
    constructor(option) {
        let tr = 0.2 * option.size;
        let height = 2 * option.size;
        let geometry = new THREE.ConeGeometry(tr, height, 60);
        let material = new THREE.MeshBasicMaterial({
            color: option.color,
            shading: THREE.FlatShading
        });
        this.mesh = new THREE.Mesh(geometry, material);
        let os = 0;
        if (option.side == 'left') {
            os = option.size;
        } else {
            os = -option.size;
        }
        this.mesh.position.set(0, option.bellySize / 2 + height / 2, os);
        // this.mesh.rotation.x = this.mesh.rotation.x + Math.PI;
    }

    getMesh() {
        return this.mesh
    }
}

export default Leg