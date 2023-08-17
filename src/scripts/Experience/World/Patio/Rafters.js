import * as THREE from 'three'
import PARAMS from '../../Utils/PARAMS'
import Materials from '../../Materials.js'

export default class Rafters {
    constructor() {

        this.materials = new Materials()

        this.group = new THREE.Group()
        this.offsetY

        this.setAsset()
        this.create()
        this.setPosition()

    }

    setAsset() {
        this.asset = new THREE.Mesh(
            new THREE.BoxGeometry(PARAMS.raftersSizes.width, PARAMS.raftersSizes.height, PARAMS.roofDepth),
            this.materials.rafters
        )
        this.asset.receiveShadow = true
        this.asset.castShadow = true
    }

    create() {
        const totalWidth = PARAMS.roofWidth - 2;
        const blockWidth = PARAMS.raftersSizes.width
        const maxDistanceBetweenBlocks = PARAMS.rafterMaxDistance
        const totalBlock = maxDistanceBetweenBlocks
        const maxBlocks = Math.ceil(totalWidth / maxDistanceBetweenBlocks)
        const realDistance = totalWidth / maxBlocks
        const margin = totalWidth - maxBlocks * realDistance

        const startPosition = - totalWidth / 2

        for (let i = 0; i < maxBlocks + 1; i++) {
            this.asset.geometry = new THREE.BoxGeometry(PARAMS.raftersSizes.width, PARAMS.raftersSizes.height, PARAMS.roofDepth)
            this.instance = this.asset.clone()

            this.instance.position.x = startPosition + realDistance * i + margin / 2
            this.group.add(this.instance)
        }
    }

    setPosition() {
        if (PARAMS.postsHeight === '8 ft') {
            this.group.position.y = PARAMS.postsSizes.height / 2 + PARAMS.raftersSizes.height / 2
        }
        if (PARAMS.postsHeight === '10 ft') {
            this.group.position.y = 4 * 10 / 8 + PARAMS.raftersSizes.height / 2
        }
    }

    setSize(value) {
        PARAMS.rafterType = value
        if (PARAMS.rafterType === '2x6') {
            PARAMS.raftersSizes.width = 0.1667
            PARAMS.raftersSizes.height = 0.5
        }
        if (PARAMS.rafterType === '3x8') {
            PARAMS.raftersSizes.width = 0.25
            PARAMS.raftersSizes.height = 0.667
        }
        this.setPosition()
        this.group.children.forEach((child) => {
            child.geometry = new THREE.BoxGeometry(PARAMS.raftersSizes.width, PARAMS.raftersSizes.height, PARAMS.roofDepth)
        })

    }

    delete() {
        while (this.group.children[0]) {
            this.group.remove(this.group.children[0])
        }
        this.asset.geometry.dispose()
    }

    update() {
        this.delete()
        this.setAsset()
        this.create()
    }

    updateToMaterial(value) {
        this.group.children.forEach((child) => {
            child.material = value
        })
        this.asset.material = value
    }

}





