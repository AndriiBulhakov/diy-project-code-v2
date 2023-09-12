import * as THREE from 'three'
import PARAMS from '../../Utils/PARAMS'
import Materials from '../../Materials.js'

export default class Beams {
    constructor() {
        this.materials = new Materials()

        this.asset
        this.assetAttached

        this.frontGroup = new THREE.Group()
        this.backGroup = new THREE.Group()
        this.attachedGroup = new THREE.Group()
        this.attachedGroup.scale.set(0, 0, 0)

        this.offsetY, this.offsetZ

        this.beamsOffset

        this.create()


    }

    setPosition() {
        this.offsetY = PARAMS.postsSizes.height / 2 - PARAMS.beamsSizes.height / 2
        this.offsetZ = PARAMS.roofDepth / 2 - 1

        this.frontGroup.position.set(0, this.offsetY, - this.offsetZ)
        this.backGroup.position.set(0, this.offsetY, this.offsetZ)
        this.attachedGroup.position.set(0, this.offsetY, PARAMS.roofDepth / 2)
    }

    setScale(value) {
        this.frontGroup.scale.set(value, value, value)
        this.backGroup.scale.set(value, value, value)
    }

    setScaleBackGroup(value) {
        this.frontGroup.scale.set(value, value, value)

    }
    setScaleBackGroup(value) {
        this.backGroup.scale.set(value, value, value)
    }

    setAsset() {
        this.asset = new THREE.Mesh(
            new THREE.BoxGeometry(PARAMS.roofWidth, PARAMS.beamsSizes.height, PARAMS.beamsSizes.depth),
            this.materials.beams
        )
        this.asset.castShadow = true
        this.asset.receiveShadow = true
    }

    create() {
        this.setAsset()

        const doubleBeamsOffsetZ = (PARAMS.postsSizes.depthSide * 2 + PARAMS.postsSizes.depthCenter) / 2 + PARAMS.postsSizes.diametr / 2 + PARAMS.beamsSizes.depth / 2

        if (PARAMS.beamsType === 'single') {
            const beamBack01 = this.asset.clone()
            beamBack01.position.set(0, PARAMS.beamsSizes.height, 0)
            this.backGroup.add(beamBack01)

            const beamFront01 = this.asset.clone()
            beamFront01.position.set(0, PARAMS.beamsSizes.height, 0)
            this.frontGroup.add(beamFront01)
        }

        if (PARAMS.beamsType === 'double') {
            const beamBack01 = this.asset.clone()
            beamBack01.position.set(0, 0, - doubleBeamsOffsetZ)
            this.backGroup.add(beamBack01)
            const beamBack02 = this.asset.clone()
            beamBack02.position.set(0, 0, doubleBeamsOffsetZ)
            this.backGroup.add(beamBack02)

            const beamFront01 = this.asset.clone()
            beamFront01.position.set(0, 0, - doubleBeamsOffsetZ)
            this.frontGroup.add(beamFront01)
            const beamFront02 = this.asset.clone()
            beamFront02.position.set(0, 0, doubleBeamsOffsetZ)
            this.frontGroup.add(beamFront02)
        }

        // Attached beam
        const beamAttached = this.asset.clone()
        beamAttached.position.set(0, PARAMS.beamsSizes.height, -PARAMS.beamsSizes.depth / 2)
        this.attachedGroup.add(beamAttached)

        this.setPosition()

        let beamsOffset
        if (PARAMS.beamsType === 'single') beamsOffset = PARAMS.beamsSizes.height
        if (PARAMS.beamsType === 'double') beamsOffset = 0
        this.attachedGroup.position.y += beamsOffset

    }

    delete() {
        while (this.backGroup.children[0]) {
            this.backGroup.remove(this.backGroup.children[0])
        }

        while (this.frontGroup.children[0]) {
            this.frontGroup.remove(this.frontGroup.children[0])
        }

        while (this.attachedGroup.children[0]) {
            this.attachedGroup.remove(this.attachedGroup.children[0])
        }
    }

    update() {
        this.delete()
        this.create()
    }

    updateToMaterial(value) {
        this.backGroup.children.forEach((child) => {
            child.material = value
        })
        this.frontGroup.children.forEach((child) => {
            child.material = value
        })

        this.asset.material = value
    }

    // Attached


    setScaleAttachedGroup(value) {
        this.attachedGroup.scale.set(value, value, value)
    }

    checkBeams() {

    }





}


