import * as THREE from 'three'
import PARAMS from '../../Utils/PARAMS'
import Materials from '../../Materials.js'

import Rafters from './Rafters'

export default class Latiice {
    constructor() {

        this.materials = new Materials()


        this.group = new THREE.Group()

        this.asset

        this.create()

    }

    setPosition() {
        this.rafters = new Rafters()
        if (PARAMS.rafterType === '2x6')
            this.group.position.y = this.rafters.group.position.y + PARAMS.raftersSizes.height / 2 + PARAMS.latticeSizes.height / 2
        if (PARAMS.rafterType === '3x8')
            this.group.position.y = this.rafters.group.position.y + PARAMS.raftersSizes.height / 2 + PARAMS.latticeSizes.height / 2
    }

    setScale(value) {
        this.group.scale.set(value, value, value)
    }

    setAsset() {
        this.asset = new THREE.Mesh(
            new THREE.BoxGeometry(PARAMS.roofWidth, PARAMS.latticeSizes.height, PARAMS.latticeSizes.depth),
            this.materials.lattice
        )
        this.asset.castShadow = true
        this.asset.receiveShadow = true
    }

    create() {
        this.setAsset()
        this.setPosition()

        this.asset.geometry = new THREE.BoxGeometry(PARAMS.roofWidth, PARAMS.latticeSizes.height, PARAMS.latticeSizes.depth)

        const totalDepth = PARAMS.roofDepth - PARAMS.latticeSizes.depth * 2
        const maxDistanceBetweenBlocks = PARAMS.latticeMaxDistance + PARAMS.latticeSizes.depth
        const maxBlocks = Math.ceil(totalDepth / maxDistanceBetweenBlocks)
        const realDistance = totalDepth / maxBlocks + 0.0051

        for (let i = 0; i < maxBlocks + 1; i++) {
            const lattice = this.asset.clone()
            const startPosition = - totalDepth / 2 - PARAMS.latticeSizes.depth / 2
            lattice.position.z = startPosition + realDistance * i
            this.group.add(lattice)
        }
    }

    delete() {
        while (this.group.children[0]) {
            this.group.remove(this.group.children[0])
        }
    }

    update() {
        this.delete()
        this.create()
    }

    updateToMaterial(value) {
        this.group.children.forEach((child) => {
            child.material = value
        })
        this.asset.material = value
    }
}

