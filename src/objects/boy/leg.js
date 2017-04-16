import * as THREE from 'three'
import { TweenMax } from 'gsap'

/**
 * 人物腿，必须参数：
 * 颜色：color、
 * 大小：size、
 * 肚子大小：bellySize、
 * 位置：pt、
 * 左右：side(left,right)
 * 速度：speed 默认0.1
 */
class Leg {
    constructor(option) {
        if (option.speed == undefined) this.speed = 0.01;
        else this.speed = option.speed

        let tr = 0.3 * option.size;
        let br = 0.3 * option.size;
        let height = 1.5 * option.size;
        // let geometry = new THREE.ConeGeometry(tr, height, 60);CylinderGeometry
        let geometry = new THREE.CylinderGeometry(tr, br, height, 60);
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
        this.mesh.position.set(0, option.bellySize / 2 + height / 3, os);
        // this.mesh.rotation.x = this.mesh.rotation.x + Math.PI;
    }

    getMesh() {
        return this.mesh
    }

    change() {
        // var z = this.mesh.rotation.z
        // if (z > Math.PI / 10) {
        //     this.speed = -this.speed;
        // } else if (z < -Math.PI / 10) {
        //     this.speed = -this.speed;
        // }
        // this.mesh.rotation.z = z + this.speed;
        // // var a = new THREE.Vector3(0, 1, 0);
        // // // 
        // // this.mesh.rotateOnAxis(a, this.speed);
        TweenMax.to(this.mesh.rotation, .1, {
            z: 15,
            ease: Linear.easeNone,
            repeat: -1
        });
    }
}

export default Leg