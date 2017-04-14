import * as THREE from 'three'
import Leg from './leg'
import Head from './head'
import Arm from './arm'

/**
 * 任务头部，必须参数：颜色：color、大小：size、位置：pt
 */
class Boy {
    constructor(option) {
        let br = 1.5 * option.size;
        let tr = 0.5 * option.size;
        let height = 3 * option.size;

        this.mesh = new THREE.Mesh(
            new THREE.CylinderGeometry(br, tr, height, 32, 3),
            new THREE.MeshLambertMaterial({
                color: option.color,
                shading: THREE.FlatShading
            }));
        this.mesh.position.set(option.pt[0], option.pt[1], option.pt[2]);
        this.mesh.rotation.x = this.mesh.rotation.x + Math.PI;
        //添加脚
        this.mesh.add(new Leg({
            color: option.color,
            size: option.size,
            bellySize: height,
            pt: option.pt,
            side: 'left'
        }).getMesh());
        this.mesh.add(new Leg({
            color: option.color,
            size: option.size,
            bellySize: height,
            pt: option.pt,
            side: 'right'
        }).getMesh());
        //添加头
        this.mesh.add(new Head({
            color: option.color,
            size: option.size,
            bellySize: height
        }).getMesh());
        //添加胳膊
        this.mesh.add(new Arm({
            color: option.color,
            size: option.size,
            bellySize: height
        }).getMesh());

    }

    getMesh() {
        return this.mesh
    }
}

export default Boy