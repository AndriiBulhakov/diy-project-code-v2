import * as THREE from 'three'
import Materials from '../Materials'
import PARAMS from './PARAMS'

export default class PlaneGrid {
    constructor() {

        this.materials = new Materials()

        this.instance = new THREE.Group()
        this.parameters = {
            status: false,
        }

        this.create()

    }

    create() {
        if (this.parameters.status) {

            const raws = PARAMS.roofWidth
            const colms = PARAMS.roofDepth
            const numCell = raws * colms
            const marginWidth = PARAMS.roofWidth / raws
            const marginDepth = PARAMS.roofDepth / colms
            const xoffset = - PARAMS.roofWidth / 2 + marginWidth / 2
            const zoffset = - PARAMS.roofDepth / 2 + marginDepth / 2

            const planeBlockGuideWidth = PARAMS.roofWidth / raws
            const planeBlockGuideDepth = PARAMS.roofDepth / colms


            for (let i = 0; i < numCell; i++) {
                const iRaw = i % raws // 0 1 2 3 ...
                const iColm = Math.floor(i / raws) // 0 0 0 0 ... 1 1 1 1 ... 

                const x = marginWidth * iRaw
                const z = marginDepth * iColm

                const planeBlockGuide = new THREE.Mesh(
                    new THREE.PlaneGeometry(planeBlockGuideWidth, planeBlockGuideDepth),
                    new THREE.MeshBasicMaterial({ color: 'red', wireframe: true, wireframeLinewidth: 2 })
                )
                this.instance.add(planeBlockGuide)
                planeBlockGuide.rotation.x = - Math.PI / 2
                planeBlockGuide.position.x = x + xoffset
                planeBlockGuide.position.z = z + zoffset
            }

            const planeGuide = new THREE.Mesh(
                new THREE.PlaneGeometry(PARAMS.roofWidth, PARAMS.roofDepth),
                new THREE.MeshBasicMaterial({ color: 'green', wireframe: true, wireframeLinewidth: 10 })
            )
            planeGuide.rotation.x = - Math.PI / 2
        }
    }

    delete() {
        while (this.instance.children[0]) {
            this.instance.remove(this.instance.children[0])
        }
    }
    update() {
        this.delete()
        this.create()
    }
}




