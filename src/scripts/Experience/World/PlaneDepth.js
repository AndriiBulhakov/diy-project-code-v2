import * as THREE from 'three'
import PARAMS from '../Utils/PARAMS'

import Materials from '../Materials'

export default class PlaneDepth {
    constructor(scene) {
        this.scene = scene
        this.materials = new Materials()
        this.instance

        this.create()
        this.setPosition()
        this.checkOpacity()
    }

    create() {
        this.instance = new THREE.Mesh(
            new THREE.PlaneGeometry(30, 30, 1, 1),
            this.materials.planeDepth
        )
        this.scene.add(this.instance)
    }

    setPosition() {
        this.instance.position.x = 7.611
        this.instance.position.y = 2
        this.instance.rotation.y = - Math.PI / 2
    }

    checkOpacity() {
        if (PARAMS.attachment === 'free standing') this.instance.material.opacity = 0.7
        if (PARAMS.attachment === 'attached') this.instance.material.opacity = 0
    }

    setOpacity(value) {
        this.instance.material.opacity = value
    }
}