import * as THREE from 'three'

import Textures from '../Textures'


export default class Color {
    constructor() {
        this.textures = new Textures()
    }

    changeMaterialColor(material, value) {
        if (value === 'adobe') {
            material.map = this.textures.adobeTextureColor
        }

        if (value === 'almond') {
            material.map = this.textures.almondTextureColor
        }

        if (value === 'belge') {
            material.map = this.textures.belgeTextureColor
        }

        if (value === 'brown') {
            material.map = this.textures.brownTextureColor
        }

        if (value === 'cameo') {
            material.map = this.textures.cameoTextureColor
        }

        if (value === 'champagne') {
            material.map = this.textures.champagneTextureColor
        }

        if (value === 'desert') {
            material.map = this.textures.desertTextureColor
        }

        if (value === 'white') {
            material.map = this.textures.whiteTextureColor
        }

    }

    backUpColors(materials) {
        // backup colors
        materials.colorBackup.roofColor = materials.roof.map
        materials.colorBackup.raftersColor = materials.rafters.map
        materials.colorBackup.beamsColor = materials.beams.map
        materials.colorBackup.postsColor = materials.posts.map
        materials.colorBackup.latticeColor = materials.lattice.map
    }

    updateColors(materials, roof, rafters, beams, posts, lattice) {
        //update colors
        materials.roof.map = materials.general.map;
        materials.rafters.map = materials.general.map;
        materials.beams.map = materials.general.map;
        materials.posts.map = materials.general.map;
        materials.lattice.map = materials.general.map;

        roof.updateToMaterial(materials.roof)
        rafters.updateToMaterial(materials.rafters)
        beams.updateToMaterial(materials.beams)
        posts.updateToMaterial(materials.posts)
        lattice.updateToMaterial(materials.lattice)

    }

    returnColors(materials) {
        // return colors from backup
        materials.roof.map = materials.colorBackup.roofColor;
        materials.rafters.map = materials.colorBackup.raftersColor;
        materials.beams.map = materials.colorBackup.beamsColor;
        materials.posts.map = materials.colorBackup.postsColor;
        materials.lattice.map = materials.colorBackup.latticeColor;
    }


}