import * as THREE from 'three'
import Materials from '../Materials'

export default class ShadowFloor {
    constructor() {

        this.materials = new Materials()
        this.instance

        this.create()

    }

    create() {
        this.instance = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            this.materials.floorShadow
        )
        this.instance.receiveShadow = true;

        this.setPosition()
    }

    setPosition() {
        this.instance.position.y = 0.081 //0.081
        this.instance.rotation.x = - Math.PI / 2
    }
}



