import * as THREE from 'three'

/**
 * 任务头部，必须参数：颜色：color、大小：size、肚子大小：bellySize
 */
class Head {
    constructor(option) {
        let r = option.size;
        var sphereMaterial = new THREE.MeshLambertMaterial({
            color: option.color,
            shading: THREE.FlatShading
        });
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(r, 50, 50),
            sphereMaterial
        );
        this.sphere.position.set(0, -option.bellySize / 2 - r * 0.6, 0);
        this.sphere.geometry.verticesNeedUpdate = true;
        this.sphere.geometry.normalsNeedUpdate = true;
    }

    getMesh() {
        return this.sphere
    }
}

export default Head