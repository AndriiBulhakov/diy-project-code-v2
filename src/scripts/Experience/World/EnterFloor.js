import * as THREE from 'three'
import * as dat from 'lil-gui'
import PARAMS from '../Utils/PARAMS'
import Materials from '../Materials'

import House from './House'

export default class EnterFloor {
    constructor() {

        // this.gui = new dat.GUI()
        this.materials = new Materials()

        this.house = new House()

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
        this.instance.position.set(this.house.instanse.position.x - 0.75, 0, this.house.instanse.position.z - 6.5)

    }

    updateGeometry() {

    }

    // updateGeometry() {
    //     this.instance.geometry = new THREE.BoxGeometry(PARAMS.roofWidth + this.visualOffset, PARAMS.raftersSizes.height + this.visualOffset, PARAMS.roofDepth + this.visualOffset)
    //     this.setPosition()
    // }
}




