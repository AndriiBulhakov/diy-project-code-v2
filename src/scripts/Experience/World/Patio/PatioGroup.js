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
            x = 15
            z = 9

            // this.instance.position.x = PARAMS.roofWidth / 2 + x
            this.instance.position.x = x
            this.instance.position.z = - (PARAMS.roofDepth / 2 + z)

        }
        if (PARAMS.attachment === 'attached') {
            x = 0
            if (PARAMS.attachmentType === 'roof') {
                z = -5.315
            }
            if (PARAMS.attachmentType === 'fasciaEave') {
                z = -5.783
            }
            if (PARAMS.attachmentType === 'underEave') {
                z = -5.315
            }
            if (PARAMS.attachmentType === 'wall') {
                z = -4.379 + 0.88
            }
            this.instance.position.x = PARAMS.roofWidth / 2 + x
            this.instance.position.z = z
        }


        if (PARAMS.postsHeight === '8 ft') {
            this.instance.position.y = 8 / 2
        }
        if (PARAMS.postsHeight === '10 ft') {
            this.instance.position.y = 10 / 2
        }

    }

    update() {
        this.setPosition()
    }
}