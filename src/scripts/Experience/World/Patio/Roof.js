import * as THREE from 'three'
import PARAMS from '../../Utils/PARAMS'
import Materials from '../../Materials.js'

export default class Roof {
    constructor() {

        this.materials = new Materials()

        this.group = new THREE.Group()

        this.offsetY
        this.visualOffset = 0.005
        this.scaleValue = []

        this.create()
        this.set()
        this.setPosition()
    }

    create() {

        this.instance = new THREE.Mesh(
            new THREE.BoxGeometry(PARAMS.roofWidth + this.visualOffset, PARAMS.raftersSizes.height + this.visualOffset, PARAMS.roofDepth + this.visualOffset), //(7.2, 0.2, 5.6)
            this.materials.roof
        )
        this.group.add(this.instance)
    }

    set() {
        this.instance.position.set(0, 0, 0)
        this.instance.castShadow = true
        this.instance.receiveShadow = true
    }

    setPosition() {
        if (PARAMS.postsHeight === '8 ft') {
            this.group.position.y = PARAMS.postsSizes.height / 2 + PARAMS.raftersSizes.height / 2
        }
        if (PARAMS.postsHeight === '10 ft') {
            this.group.position.y = 4 * 10 / 8 + PARAMS.raftersSizes.height / 2
        }
    }

    setScale(value) {
        this.group.scale.set(value, value, value)
    }

    updateGeometry() {
        this.instance.geometry = new THREE.BoxGeometry(PARAMS.roofWidth + this.visualOffset, PARAMS.raftersSizes.height + this.visualOffset, PARAMS.roofDepth + this.visualOffset)
        this.setPosition()
    }

    updateToMaterial(value) {
        this.instance.material = value
    }

}