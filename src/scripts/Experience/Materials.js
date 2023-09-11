import * as THREE from 'three';
import Textures from './Textures.js';

export default class Materials {
    constructor() {

        this.textures = new Textures()

        // Parameters for GUI 

        this.colorArray = ['adobe', 'almond', 'belge', 'brown', 'cameo', 'champagne', 'desert', 'white']
        this.colorBackup = {
            roofColor: this.colorArray[0],
            raftersColor: this.colorArray[0],
            beamsColor: this.colorArray[0],
            postsColor: this.colorArray[0],
            latticeColor: this.colorArray[0],
        }
        this.parameters = {
            colorName: this.colorArray[0],
            combine: false,
            combineValue: this.colorArray[0],
        }

        this.red = new THREE.MeshBasicMaterial({
            color: 'red',
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        })

        /**
         * Patio materials
         */

        this.roof = new THREE.MeshStandardMaterial({
            color: 'white',
            map: this.textures.adobeTextureColor,
            side: THREE.DoubleSide,
        })

        this.rafters = new THREE.MeshStandardMaterial({
            color: 'white',
            map: this.textures.adobeTextureColor,
            side: THREE.DoubleSide,
        })


        this.beams = new THREE.MeshStandardMaterial({
            color: 'white',
            map: this.textures.adobeTextureColor,
            side: THREE.DoubleSide,
        })


        this.posts = new THREE.MeshStandardMaterial({
            color: 'white',
            map: this.textures.adobeTextureColor,
            side: THREE.DoubleSide,
        })


        this.lattice = new THREE.MeshStandardMaterial({
            color: 'white',
            map: this.textures.adobeTextureColor,
            side: THREE.DoubleSide,
        })

        this.general = new THREE.MeshStandardMaterial({
            color: 'white',
            map: this.textures.adobeTextureColor,
            side: THREE.DoubleSide,
        })

        this.floorShadow = new THREE.ShadowMaterial({
            opacity: 1
        })

        this.floorColor = new THREE.MeshBasicMaterial({
            color: 0xbec9cb
        })

        /**
         * House Materials
         */

        // Wood
        this.wood = new THREE.MeshStandardMaterial()
        this.wood.map = this.textures.woodColor
        this.wood.aoMap = this.textures.woodAO
        this.wood.aoMapIntensity = 10
        this.wood.normalMap = this.textures.woodNormal
        this.wood.normalScale.set(1, 1)

        // Glass
        this.glass = new THREE.MeshStandardMaterial()
        this.glass.color = new THREE.Color('white')
        this.glass.metalness = 1
        this.glass.roughness = 0
        this.glass.envMap = this.textures.environmentMapTexture
        this.glass.envMapIntensity = 1
        this.glass.transparent = true //set the transparent property to true
        this.glass.opacity = 0.8 //and then set the opacity

        // Roof
        this.blackRoof = new THREE.MeshStandardMaterial()
        this.blackRoof.color = new THREE.Color(0x303030)
        this.blackRoof.metalness = 0
        this.blackRoof.roughness = 1

        // Walls 
        this.walls = new THREE.MeshStandardMaterial()
        this.walls.color = new THREE.Color('white')
        this.walls.map = this.textures.concreteAO
    }

    changeMaterialColor(material, value) {
        if (value === 'adobe') {
            material.map = textures.adobeTextureColor
        }

        if (value === 'almond') {
            material.map = textures.almondTextureColor
        }

        if (value === 'belge') {
            material.map = textures.belgeTextureColor
        }

        if (value === 'brown') {
            material.map = textures.brownTextureColor
        }

        if (value === 'cameo') {
            material.map = textures.cameoTextureColor
        }

        if (value === 'champagne') {
            material.map = textures.champagneTextureColor
        }

        if (value === 'desert') {
            material.map = textures.desertTextureColor
        }

        if (value === 'white') {
            material.map = textures.whiteTextureColor
        }

    }
}








