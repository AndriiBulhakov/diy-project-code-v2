import * as THREE from 'three'
import Materials from '../../Materials'
import PARAMS from '../../Utils/PARAMS'

export default class AttachedBeam {
  constructor() {
    this.materials = new Materials()
    this.instance = new THREE.Group()
    this.asset

    this.create()
  }

  create() {
    this.asset = new THREE.Mesh(
      new THREE.BoxGeometry(PARAMS.roofWidth, PARAMS.raftersSizes.height, PARAMS.beamsSizes.depth),
      this.materials.red
    )
    this.instance.add(this.asset)
  }
}