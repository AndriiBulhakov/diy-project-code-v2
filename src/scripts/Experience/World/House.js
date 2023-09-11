import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Manager from '../Utils/Manager'
import Materials from '../Materials.js'

export default class House {
    constructor() {
        this.manager = new Manager()

        this.gltfLoader = new GLTFLoader(this.manager.loading)

        this.materials = new Materials()

        this.enterFloor = new THREE.Group()

        this.instanse = new THREE.Group()
        this.bigGroup = new THREE.Group()
        this.smallGroup = new THREE.Group()
        this.instanse.add(this.bigGroup, this.smallGroup)

        this.setHouse()
        this.setBigGroupPosition()

    }

    setHouse() {
        this.gltfLoader.load(
            'https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/3Dmodels/house07.gltf',
            (gltf) => {

                const children = [...gltf.scene.children]
                for (const child of children) {

                    if (child.name === 'floorEnter') {
                        child.material = this.materials.wood
                        child.position.y = 0.005
                        // this.enterFloor.add(child)
                    }
                    // Big Group
                    if (child.name === 'roofBig01') {
                        this.bigGroup.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'roofBig02') {
                        this.bigGroup.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'roofBigCenter') {
                        this.bigGroup.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'wallWoodBig') {
                        this.bigGroup.add(child)
                        child.material = this.materials.wood
                    }
                    if (child.name === 'wallBig') {
                        this.bigGroup.add(child)
                        child.material = this.materials.walls
                    }
                    if (child.name === 'glassFramesBig') {
                        this.bigGroup.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'glassBig') {
                        this.bigGroup.add(child)
                        child.material = this.materials.glass
                    }
                    if (child.name === 'curtainsBig') {
                        this.bigGroup.add(child)
                        child.material = this.materials.walls
                    }
                    if (child.name === 'doorBig') {
                        this.bigGroup.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'groundFloorBig') {
                        this.bigGroup.add(child)
                        child.material = this.materials.walls
                    }
                    // Small Group
                    if (child.name === 'roofSmallCut') {
                        this.smallGroup.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'roofSmall01') {
                        this.smallGroup.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'roofSmall02') {
                        this.smallGroup.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'roofSmallCenter') {
                        this.smallGroup.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'wallWoodSmall') {
                        this.smallGroup.add(child)
                        child.material = this.materials.wood
                    }
                    if (child.name === 'wallSmall') {
                        this.smallGroup.add(child)
                        child.material = this.materials.walls
                    }
                    if (child.name === 'glassFramesSmall') {
                        this.smallGroup.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'glassSmall') {
                        this.smallGroup.add(child)
                        child.material = this.materials.glass
                    }
                    if (child.name === 'curtainsSmall') {
                        this.smallGroup.add(child)
                        child.material = this.materials.walls
                    }
                    if (child.name === 'funnelSmall') {
                        this.smallGroup.add(child)
                        child.material = this.materials.blackRoof
                    }
                }

                // SHADOW
                for (const child of children) {
                    if (child.isMesh) {
                        child.castShadow = true
                        child.receiveShadow = true
                    }
                }

                if (this.manager.loaded) {
                    this.manager.plane.material.opacity = 0
                }

            })
    }

    setBigGroupPosition() {
        this.bigGroup.position.z = 0
    }

}


/*

setHouse() {
    this.gltfLoader.load(
        '/diy_scene_v02/house03.gltf',
        (gltf) => {
            this.instanse.add(gltf.scene)
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    if (child.name === 'floor') {
                        child.material = this.materials.floorColor
                    }
                    if (child.name === 'glass') {
                        child.material = this.materials.glass
                    }
                    if (child.name === 'floorEnter') {
                        child.material = this.materials.wood
                        child.position.y = -0.5
                    }
                    if (child.name === 'wallWood') {
                        child.material = this.materials.wood
                    }
                    if (child.name === 'roof' || child.name === 'funnel' || child.name === 'glassFrames') {
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'wall' || child.name === 'curtains' || child.name === 'patioCurtain' || child.name === 'door' || child.name === 'groundFloor') {
                        child.material = this.materials.walls
                    }
                    child.receiveShadow = true
                    child.castShadow = true
                }
            })
        })
}


*/