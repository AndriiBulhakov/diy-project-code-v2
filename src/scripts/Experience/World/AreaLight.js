import * as THREE from 'three'

export default class AreaLight {
    constructor() {
        this.patioBottom = new THREE.RectAreaLight(0xffffff, 0, 1.86, 2.5)
        this.patioTop = new THREE.RectAreaLight(0xffffff, 0, 2.3, 4)
        this.frontWall = new THREE.RectAreaLight(0xffffff, 0.8, 11.7, 7.52)
        this.enter = new THREE.RectAreaLight(0xffffff, 3.2, 11, 4)
        this.sideWall = new THREE.RectAreaLight(0xffffff, 2.1, 6.3, 5.86)

        this.setCoordinates()

    }

    setCoordinates() {
        this.patioBottom.position.set(-2.0598, 1.92798, -6.0723)
        this.patioBottom.rotation.x = - Math.PI / 2
        this.patioTop.position.set(-2.0598, 1.92798, -6.0723)
        this.patioTop.rotation.x = Math.PI / 2
        this.frontWall.position.set(-5.08, 2.3, 2.37)
        this.frontWall.rotation.y = - Math.PI / 2
        this.enter.position.set(-10.08, 1.32, -8)
        this.enter.rotation.y = - Math.PI / 2
        this.sideWall.position.set(2.3, 2.3, -12.56)
        this.sideWall.rotation.y = Math.PI
    }
}