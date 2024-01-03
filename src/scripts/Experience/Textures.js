import * as THREE from 'three';

import Manager from './Utils/Manager';


export default class Textures
{
    constructor(loadingManager)
    {

        this.textureLoader = new THREE.TextureLoader(loadingManager);
        this.cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

        /**
         * Patio Textures
         */

        /*
        'https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/colors/adobe.png'
        */

        this.adobeTextureColor = this.textureLoader.load('https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/colors/adobe-test.png')
        this.adobeTextureColor.repeat.x = 2
        this.adobeTextureColor.repeat.y = 2
        this.adobeTextureColor.wrapS = THREE.RepeatWrapping
        this.adobeTextureColor.wrapT = THREE.RepeatWrapping
        this.adobeTextureColor.name = 'adobe'
        // this.adobeTextureColor.colorSpace = THREE.SRGBColorSpace

        this.almondTextureColor = this.textureLoader.load('https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/colors/almond.png')
        this.almondTextureColor.repeat.x = 2
        this.almondTextureColor.repeat.y = 2
        this.almondTextureColor.wrapS = THREE.RepeatWrapping
        this.almondTextureColor.wrapT = THREE.RepeatWrapping
        this.almondTextureColor.name = 'almond'

        this.belgeTextureColor = this.textureLoader.load('https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/colors/belge.png')
        this.belgeTextureColor.repeat.x = 2
        this.belgeTextureColor.repeat.y = 2
        this.belgeTextureColor.wrapS = THREE.RepeatWrapping
        this.belgeTextureColor.wrapT = THREE.RepeatWrapping
        this.belgeTextureColor.name = 'belge'

        this.brownTextureColor = this.textureLoader.load('https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/colors/brown.png')
        this.brownTextureColor.repeat.x = 2
        this.brownTextureColor.repeat.y = 2
        this.brownTextureColor.wrapS = THREE.RepeatWrapping
        this.brownTextureColor.wrapT = THREE.RepeatWrapping
        this.brownTextureColor.name = 'brown'

        this.cameoTextureColor = this.textureLoader.load('https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/colors/cameo.png')
        this.cameoTextureColor.repeat.x = 2
        this.cameoTextureColor.repeat.y = 2
        this.cameoTextureColor.wrapS = THREE.RepeatWrapping
        this.cameoTextureColor.wrapT = THREE.RepeatWrapping
        this.cameoTextureColor.name = 'cameo'

        this.champagneTextureColor = this.textureLoader.load('https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/colors/champagne.png')
        this.champagneTextureColor.repeat.x = 2
        this.champagneTextureColor.repeat.y = 2
        this.champagneTextureColor.wrapS = THREE.RepeatWrapping
        this.champagneTextureColor.wrapT = THREE.RepeatWrapping
        this.champagneTextureColor.name = 'champagne'

        this.desertTextureColor = this.textureLoader.load('https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/colors/desert.png')
        this.desertTextureColor.repeat.x = 2
        this.desertTextureColor.repeat.y = 2
        this.desertTextureColor.wrapS = THREE.RepeatWrapping
        this.desertTextureColor.wrapT = THREE.RepeatWrapping
        this.desertTextureColor.name = 'desert'

        this.whiteTextureColor = this.textureLoader.load('https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/colors/white.png')
        this.whiteTextureColor.repeat.x = 2
        this.whiteTextureColor.repeat.y = 2
        this.whiteTextureColor.wrapS = THREE.RepeatWrapping
        this.whiteTextureColor.wrapT = THREE.RepeatWrapping
        this.whiteTextureColor.name = 'white'

        /**
         * Environment
         */

        this.environmentMapTexture = this.cubeTextureLoader.load([
            'https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/Standard-Cube-Map/01/px.png',
            'https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/Standard-Cube-Map/01/nx.png',
            'https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/Standard-Cube-Map/01/py.png',
            'https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/Standard-Cube-Map/01/ny.png',
            'https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/Standard-Cube-Map/01/pz.png',
            'https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/Standard-Cube-Map/01/nz.png'
        ])
        this.environmentMapTexture.colorSpace = THREE.SRGBColorSpace

        /**
         * House textures
         */

        // Wood 
        this.woodColor = this.textureLoader.load('https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/woodPlank/ulyobjsn_2K_Albedo.jpg')
        this.woodColor.colorSpace = THREE.SRGBColorSpace
        this.woodColor.repeat.x = 6
        this.woodColor.repeat.y = 6
        this.woodColor.wrapS = THREE.RepeatWrapping
        this.woodColor.wrapT = THREE.RepeatWrapping
        this.woodColor.offset.x = 0.15
        this.woodAO = this.textureLoader.load('https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/woodPlank/ulyobjsn_2K_AO.jpg')
        this.woodAO.repeat.x = 6
        this.woodAO.repeat.y = 6
        this.woodAO.wrapS = THREE.RepeatWrapping
        this.woodAO.wrapT = THREE.RepeatWrapping
        this.woodAO.offset.x = 0.15
        this.woodNormal = this.textureLoader.load('https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/woodPlank/ulyobjsn_2K_Normal.jpg')
        this.woodNormal.repeat.x = 6
        this.woodNormal.repeat.y = 6
        this.woodNormal.wrapS = THREE.RepeatWrapping
        this.woodNormal.wrapT = THREE.RepeatWrapping
        this.woodNormal.offset.x = 0.15

        // Walls

        // Concrete
        this.concreteAO = this.textureLoader.load('https://raw.githubusercontent.com/AndriiBulhakov/diy-project-code-v2/main/src/static/textures/stone_terrazzo/vd5iffro_2K_AO.jpg')
        this.concreteAO.colorSpace = THREE.SRGBColorSpace
        this.concreteAO.repeat.x = 10
        this.concreteAO.repeat.y = 10
        this.concreteAO.wrapS = THREE.RepeatWrapping
        this.concreteAO.wrapT = THREE.RepeatWrapping
    }
}

