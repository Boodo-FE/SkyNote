import * as THREE from 'three'
import Leg from './leg'
import Head from './head'
import Arm from './arm'
import { TweenMax } from 'gsap'

/**
 * 任务头部，必须参数：颜色：color、大小：size、位置：pt
 */
class Boy {
    constructor(option) {
        let br = 3 * option.size;
        let tr = 3 * option.size;
        let height = 3 * option.size;
        this.pt = option.pt;

        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(br, tr, height),
            new THREE.MeshLambertMaterial({
                color: option.color,
                shading: THREE.FlatShading
            }));
        this.mesh.position.set(option.pt[0], option.pt[1], option.pt[2]);
        this.mesh.rotation.x = this.mesh.rotation.x + Math.PI;
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        this.legLef = new Leg({
            color: 0x59332e,
            size: option.size,
            bellySize: height,
            pt: option.pt,
            side: 'left'
        })
        this.legLef.change()
        this.mesh.add(this.legLef.getMesh());
        this.legRig = new Leg({
            color: 0x59332e,
            size: option.size,
            bellySize: height,
            pt: option.pt,
            side: 'right'
        })
        this.legRig.change()
        this.mesh.add(this.legRig.getMesh());
        //添加头
        this.mesh.add(new Head({
            color: 0xf25346,
            size: option.size,
            bellySize: height
        }).getMesh());
        //添加胳膊
        this.mesh.add(new Arm({
            color: 0x23190f,
            size: option.size,
            bellySize: height
        }).getMesh());

    }

    update(height) {
        if (this.mesh.position.y === this.pt[1]) {
            TweenMax.to(this.mesh.position, 0.5, {
                y: height,
                easy: Power2.easeOut,
                repeat: 1,
                yoyo: true
            });
        }
    }

    getMesh() {
        return this.mesh
    }
}

export default Boy