import * as THREE from 'three'
import * as dat from 'lil-gui'
import PARAMS from '../Utils/PARAMS'
import Materials from '../Materials'

export default class EnterFloor {
    constructor() {

        // this.gui = new dat.GUI()
        this.materials = new Materials()

        this.center = new THREE.Vector3(-0.75, 0, -6.5)

        this.instance


        this.create()

    }

    create() {
        this.instance = new THREE.Mesh(
            new THREE.BoxGeometry(8.5, 0.2, 9), // (7, 0.2, 6)
            this.materials.wood //0xbec9cb
        )

        this.instance.castShadow = true
        this.instance.receiveShadow = true

        this.setPosition()
    }

    setPosition() {
        this.instance.position.x = this.center.x
        this.instance.position.y = this.center.y
        this.instance.position.z = this.center.z

    }

    updateGeometry() {

    }

    // updateGeometry() {
    //     this.instance.geometry = new THREE.BoxGeometry(PARAMS.roofWidth + this.visualOffset, PARAMS.raftersSizes.height + this.visualOffset, PARAMS.roofDepth + this.visualOffset)
    //     this.setPosition()
    // }
}




