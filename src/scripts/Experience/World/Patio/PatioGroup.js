import * as THREE from 'three'
import PARAMS from '../../Utils/PARAMS'

export default class PatioGroup {
    constructor() {

        this.instance = new THREE.Group()
        this.setPosition()
    }

    setPosition() {
        let x, z
        if (PARAMS.attachment === 'free standing') {
            x = 10
            z = 9

        }
        if (PARAMS.attachment === 'attached') {
            x = 0
            z = 0
        }
        this.instance.position.x = PARAMS.roofWidth / 2 + x
        this.instance.position.z = - (PARAMS.roofDepth / 2 + z)
        this.instance.position.y = 8 / 2

    }

    update() {
        this.setPosition()
    }
}