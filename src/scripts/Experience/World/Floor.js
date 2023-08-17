import * as THREE from 'three'
import Materials from '../Materials'

export default class Floor {
    constructor() {

        this.materials = new Materials()
        this.instance

        this.create()

    }

    create() {
        this.instance = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50),
            this.materials.floorColor //0xbec9cb
        )

        this.setPosition()
    }

    setPosition() {
        this.instance.position.y = 0.08
        this.instance.rotation.x = - Math.PI / 2
    }
}




