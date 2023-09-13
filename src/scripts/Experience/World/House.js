import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Manager from '../Utils/Manager'
import Materials from '../Materials.js'

export default class House {
    constructor(loadingManager) {

        this.gltfLoader = new GLTFLoader(loadingManager)

        this.materials = new Materials()

        this.enterFloor = new THREE.Group()

        this.instanse = new THREE.Group()
        this.instanse.position.y = 0

        // masks
        this.bigMask = new THREE.Group()
        this.smallMask = new THREE.Group()

        // groups for parts (roof, body)
        this.bigRoof = new THREE.Group()
        this.bigBody = new THREE.Group()
        this.smallRoof = new THREE.Group()
        this.smallBody = new THREE.Group()

        // general groups 
        this.bigGroup = new THREE.Group()
        this.bigGroup.add(this.bigRoof, this.bigBody, this.bigMask)
        // this.bigGroup.add(this.bigMask)
        this.smallGroup = new THREE.Group()
        this.smallGroup.add(this.smallRoof, this.smallBody, this.smallMask)
        // this.smallGroup.add(this.smallMask)
        this.instanse.add(this.bigGroup, this.smallGroup)

        this.setHouse()
        this.setBigGroupPosition()
        this.setPosition()

    }
    /*
    'https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/3Dmodels/house_v03.gltf'
    */

    setHouse() {
        this.gltfLoader.load(
            'https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/3Dmodels/house_v06.gltf', //'3d_models/house_v04.gltf'
            (gltf) => {

                const children = [...gltf.scene.children]
                for (const child of children) {

                    // Masks
                    if (child.name === 'bodyBigMask') {
                        child.material = this.materials.walls
                        this.bigMask.add(child)

                        const offset = (9.858 - 5) / 2 //position of the sceneCtrl
                        this.bigMask.position.y = offset
                        child.position.y -= offset
                        this.bigMask.scale.y = 0.356 + 0.12

                        const height = child.geometry.boundingBox.max.y - child.geometry.boundingBox.min.y
                    }
                    if (child.name === 'bodySmallMask') {
                        child.material = this.materials.walls
                        this.smallMask.add(child)

                        const offset = (9.858 - 5) / 2 //position of the sceneCtrl
                        this.smallMask.position.y = offset
                        child.position.y -= offset
                        this.smallMask.scale.y = 0.55 + 0.25
                        // console.log(this.smallMask.position.y);
                        this.smallMask.position.y -= 0.08


                        const height = child.geometry.boundingBox.max.y - child.geometry.boundingBox.min.y
                    }

                    // Big Roof
                    if (child.name === 'roofBlack01Big') {
                        this.bigRoof.add(child)
                        child.material = this.materials.blackRoof
                    }
                    // if (child.name === 'roofBlack02Big') {
                    //     this.bigRoof.add(child)
                    //     child.material = this.materials.blackRoof
                    // }
                    if (child.name === 'roofBlackMainBig') {
                        this.bigRoof.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'wallWoodBigTopBig') {
                        this.bigRoof.add(child)
                        child.material = this.materials.wood
                    }
                    if (child.name === 'wallWoodBigConnectorBig') {
                        this.bigRoof.add(child)
                        child.material = this.materials.wood
                    }
                    if (child.name === 'roofBig') {
                        this.bigRoof.add(child)
                        child.material = this.materials.walls
                    }
                    if (child.name === 'wallWoodBigBottomBig') {
                        this.bigRoof.add(child)
                        child.material = this.materials.wood
                    }

                    // Big Body

                    if (child.name === 'enterDoorBig') {
                        this.bigBody.add(child)
                        child.material = this.materials.walls
                    }
                    if (child.name === 'bodyBig') {
                        this.bigBody.add(child)
                        child.material = this.materials.walls
                    }
                    if (child.name === 'glassFramesBig') {
                        this.bigBody.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'glassBig') {
                        this.bigBody.add(child)
                        child.material = this.materials.glass
                    }
                    if (child.name === 'curtainsBig') {
                        this.bigBody.add(child)
                        child.material = this.materials.walls
                    }
                    if (child.name === 'groundFloorEnterBig') {
                        child.position.y = 0.09
                        this.bigBody.add(child)
                        child.material = this.materials.walls
                    }
                    if (child.name === 'groundFloorBig') {
                        this.bigBody.add(child)
                        child.material = this.materials.walls
                    }

                    // Small Roof
                    if (child.name === 'roofCut01Small') {
                        this.smallRoof.add(child)
                        child.material = this.materials.blackRoof
                    }
                    // if (child.name === 'roofCut02Small') {
                    //     this.smallRoof.add(child)
                    //     child.material = this.materials.blackRoof
                    // }
                    if (child.name === 'roofBlack01Small') {
                        this.smallRoof.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'roofBlack02Small') {
                        this.smallRoof.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'wallWoodTopSmall') {
                        this.smallRoof.add(child)
                        child.material = this.materials.wood

                    }
                    if (child.name === 'roofSmall') {
                        this.smallRoof.add(child)
                        child.material = this.materials.walls
                    }
                    if (child.name === 'funnelSmall') {
                        this.smallRoof.add(child)
                        child.material = this.materials.blackRoof
                    }

                    // Small Body
                    if (child.name === 'wallWoodBottomSmall') {
                        this.smallBody.add(child)
                        child.material = this.materials.wood
                    }
                    if (child.name === 'bodySmall') {
                        this.smallBody.add(child)
                        child.material = this.materials.walls
                    }
                    if (child.name === 'glassFramesSmall') {
                        this.smallBody.add(child)
                        child.material = this.materials.blackRoof
                    }
                    if (child.name === 'glassSmall') {
                        this.smallBody.add(child)
                        child.material = this.materials.glass
                    }
                    if (child.name === 'curtainsSmall') {
                        this.smallBody.add(child)
                        child.material = this.materials.walls
                    }
                }

                // SHADOW
                for (const child of children) {
                    if (child.isMesh) {
                        child.castShadow = true
                        child.receiveShadow = true
                        if (child.name === 'roofBlack01Big') {
                            child.castShadow = false
                            child.receiveShadow = false
                        }
                        if (child.name === 'enterDoorBig') {
                            // child.castShadow = false
                            child.receiveShadow = false
                        }
                        if (child.name === 'bodyBig') {
                            // child.castShadow = false
                            child.receiveShadow = false
                        }
                        if (child.name === 'bodySmall') {
                            child.castShadow = false
                            // child.receiveShadow = false
                        }
                        if (child.name === 'roofSmall') {
                            child.castShadow = false
                            // child.receiveShadow = false
                        }
                        if (child.name === 'bodyBigMask') {
                            // child.castShadow = false
                            child.receiveShadow = false
                        }
                        if (child.name === 'bodySmallMask') {
                            child.castShadow = false
                            // child.receiveShadow = false
                        }
                    }
                }


            })
    }

    setBigGroupPosition() {
        this.bigGroup.position.z = 0
    }

    setPosition() {
        // this.instanse.position.set(4.802, 0, 2.368)
        this.instanse.position.set(3, 0, 1)
    }

}


