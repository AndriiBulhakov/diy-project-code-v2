import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import PARAMS from '../Utils/PARAMS.js'
import Materials from '../Materials.js'

export default class Fan {
  constructor(loadingManager) {

    this.gltfLoader = new GLTFLoader(loadingManager)

    this.materials = new Materials()

    this.enterFloor = new THREE.Group()

    this.instanse = new THREE.Group()

    this.lamp = new THREE.Group()
    this.blades = new THREE.Group()

    this.instanse.add(this.lamp, this.blades)

    this.set()
    this.setScale(3)
    this.setPosition()

  }

  set() {
    this.gltfLoader.load(
      'https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/3Dmodels/fan_v05.gltf', //'fan_v04.gltf'
      (gltf) => {

        const children = [...gltf.scene.children]
        for (const child of children) {

          if (child.name === 'lamp') {
            this.lamp.add(child)
            child.material = this.materials.walls
          }
          if (child.name === 'blades') {
            this.blades.add(child)
            child.material = this.materials.walls
          }

          // SHADOW
          for (const child of children) {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = false
            }

          }

        }
      })
  }

  setScale(value) {
    const scale = value
    this.instanse.scale.set(scale, scale, scale)
  }

  checkBeams() {
    if (PARAMS.beamsType === 'single') this.beamsOffset = PARAMS.beamsSizes.height
    if (PARAMS.beamsType === 'double') this.beamsOffset = 0
    this.instanse.position.y += this.beamsOffset
  }

  setPosition() {
    const offset = 0
    if (PARAMS.postsHeight === '8 ft') {
      this.instanse.position.y = PARAMS.postsSizes.height / 2 + PARAMS.raftersSizes.height - offset
    }
    if (PARAMS.postsHeight === '10 ft') {
      this.instanse.position.y = 4 * 10 / 8 + PARAMS.raftersSizes.height / 2 - offset
    }
    this.checkBeams()
  }

  update() {
    if (PARAMS.accesories.fan) {
      this.setScale(3)
    }
    if (!PARAMS.accesories.fan) {
      this.setScale(0)
    }
  }
}
