//update
import '../styles/style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
const math = require('canvas-sketch-util/math');

import PARAMS from './Experience/Utils/PARAMS';
import Price from './Experience/Utils/Price';
import Manager from './Experience/Utils/Manager';

import Color from './Experience/Utils/Color';
import Textures from './Experience/Textures.js';
import Materials from './Experience/Materials.js';
import patioSizes from './Experience/Utils/PatioSizes.js';

import ClassSizes from './Experience/Utils/classSizes';

import House from './Experience/World/House.js'
import Fan from './Experience/World/Fan';
import Roof from './Experience/World/Patio/Roof.js'
import Rafters from './Experience/World/Patio/Rafters.js';
import Posts from './Experience/World/Patio/Posts';
import Beams from './Experience/World/Patio/Beams';
import AttachedBeam from './Experience/World/Patio/AttachedBeam';
import Lattice from './Experience/World/Patio/Lattice';
import PatioGroup from './Experience/World/Patio/PatioGroup';

import ShadowFloor from './Experience/World/ShadowFloor';
import Floor from './Experience/World/Floor';
import EnterFloor from './Experience/World/EnterFloor';
import PlaneDepth from './Experience/World/PlaneDepth';

import DirectionalLight from './Experience/World/DirectionalLight';
import AreaLight from './Experience/World/AreaLight';





const size10x10Wrapper = () => patioSizes.size10x10();
const size11x11Wrapper = () => patioSizes.size11x11();
const size12x12Wrapper = () => patioSizes.size12x12();
const size12x16Wrapper = () => patioSizes.size12x16();
const size12x20Wrapper = () => patioSizes.size12x20();
const size12x24Wrapper = () => patioSizes.size12x24();



function initModel() {

    /**
     * Hover
     */

    const mouse = { x: 99999, y: 9999 }

    window.addEventListener('mousemove', onMouseMove)

    function onMouseMove(event) {
        mouse.x = event.clientX / sizes.width * 2 - 1
        mouse.y = - (event.clientY / sizes.height * 2 - 1);

        rotationGroup.rotation.y = math.mapRange(mouse.x, 0, 1, -0.016, 0.016)
    }

    /**
     * DOC
     */


    const canvas = document.querySelector(".webgl");
    const widthOffset = 0.95
    const sizes = {
        width: window.innerWidth - 487,
        height: window.innerHeight - 9.920
    }
    // if window.innerWidth < 479 px update sizes width and height of the sizes object
    if (window.innerWidth < 479) {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight * 0.4
    }

    /**
     * GUI
     */

    const gui = new dat.GUI({ width: 550 }).open()

    const folderTypes = gui.addFolder('Patio types').close().show()
    const folderColor = gui.addFolder('Color').open().show()
    const folderColorRoof = folderColor.addFolder('ColorRoof').close().show()
    const folderColorLattice = folderColor.addFolder('ColorLattice').close().show()
    const folderColorPosts = folderColor.addFolder('ColorPosts').close().show()
    const folderColorRafters = folderColor.addFolder('ColorRafters').close().show()
    const folderColorBeams = folderColor.addFolder('ColorBeams').close().show()

    const folderAttachment = gui.addFolder('Attachment').close().show()
    const folderSizes = gui.addFolder('Sizes').close().show()
    const folderBeams = gui.addFolder('Beams').close().show()
    const folderPosts = gui.addFolder('Posts').close().show()
    const folderRafters = gui.addFolder('Rafters').close().show()
    const folderLattice = gui.addFolder('Lattice').close().show()
    const folderAccesories = gui.addFolder('Accesories').close().show()
    const folderGuides = gui.addFolder('Guides').close().hide()
    const folderPrice = gui.addFolder('Price').close().show()

    /**
     * Patio Price
     */

    const price = new Price(folderPrice)
    // price.update()

    /**
     * Loader
     */
    // const progressBar = document.getElementById('progress-bar')
    const progressBarContainer = document.querySelector(".progress-bar-container")

    const manager = new Manager(progressBarContainer)

    /**
     * Scene
     */

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xbec9cb)

    const axesHelper = new THREE.AxesHelper(50)
    // scene.add(axesHelper)

    const cubeTarger = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.25, 0.25),
        new THREE.MeshBasicMaterial()
    )

    // scene.add(cubeTarger)
    cubeTarger.position.set(5, 3, 0)


    /**
     * TEXTURES
     */

    const textures = new Textures()

    /**
     * Materials
     */

    const materials = new Materials(manager.loader)

    /**
     * Color
     */

    const color = new Color()

    // Functions for Material Color GUI

    /**
     * Color GUI
     */

    // Roof colors
    folderColorRoof.add(color.colorFunctions, 'adobe').name('adobe').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.roof, 'adobe')
            roof.updateToMaterial(materials.roof)
        }
    })
    folderColorRoof.add(color.colorFunctions, 'almond').name('almond').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.roof, 'almond')
            roof.updateToMaterial(materials.roof)
        }
    })
    folderColorRoof.add(color.colorFunctions, 'belge').name('belge').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.roof, 'belge')
            roof.updateToMaterial(materials.roof)
        }
    })
    folderColorRoof.add(color.colorFunctions, 'brown').name('brown').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.roof, 'brown')
            roof.updateToMaterial(materials.roof)
        }
    })
    folderColorRoof.add(color.colorFunctions, 'cameo').name('cameo').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.roof, 'cameo')
            roof.updateToMaterial(materials.roof)
        }
    })
    folderColorRoof.add(color.colorFunctions, 'champagne').name('champagne').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.roof, 'champagne')
            roof.updateToMaterial(materials.roof)
        }
    })
    folderColorRoof.add(color.colorFunctions, 'desert').name('desert').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.roof, 'desert')
            roof.updateToMaterial(materials.roof)
        }
    })
    folderColorRoof.add(color.colorFunctions, 'white').name('white').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.roof, 'white')
            roof.updateToMaterial(materials.roof)
        }
    })

    // Lattice colors
    folderColorLattice.add(color.colorFunctions, 'adobe').name('adobe').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.lattice, 'adobe')
            lattice.updateToMaterial(materials.lattice)
        }
    })
    folderColorLattice.add(color.colorFunctions, 'almond').name('almond').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.lattice, 'almond')
            lattice.updateToMaterial(materials.lattice)
        }
    })
    folderColorLattice.add(color.colorFunctions, 'belge').name('belge').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.lattice, 'belge')
            lattice.updateToMaterial(materials.lattice)
        }
    })
    folderColorLattice.add(color.colorFunctions, 'brown').name('brown').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.lattice, 'brown')
            lattice.updateToMaterial(materials.lattice)
        }
    })
    folderColorLattice.add(color.colorFunctions, 'cameo').name('cameo').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.lattice, 'cameo')
            lattice.updateToMaterial(materials.lattice)
        }
    })
    folderColorLattice.add(color.colorFunctions, 'champagne').name('champagne').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.lattice, 'champagne')
            lattice.updateToMaterial(materials.lattice)
        }
    })
    folderColorLattice.add(color.colorFunctions, 'desert').name('desert').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.lattice, 'desert')
            lattice.updateToMaterial(materials.lattice)
        }
    })
    folderColorLattice.add(color.colorFunctions, 'white').name('white').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.lattice, 'white')
            lattice.updateToMaterial(materials.lattice)
        }
    })

    // Posts colors
    folderColorPosts.add(color.colorFunctions, 'adobe').name('adobe').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.posts, 'adobe')
            posts.updateToMaterial(materials.posts)
        }
    })
    folderColorPosts.add(color.colorFunctions, 'almond').name('almond').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.posts, 'almond')
            posts.updateToMaterial(materials.posts)
        }
    })
    folderColorPosts.add(color.colorFunctions, 'belge').name('belge').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.posts, 'belge')
            posts.updateToMaterial(materials.posts)
        }
    })
    folderColorPosts.add(color.colorFunctions, 'brown').name('brown').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.posts, 'brown')
            posts.updateToMaterial(materials.posts)
        }
    })
    folderColorPosts.add(color.colorFunctions, 'cameo').name('cameo').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.posts, 'cameo')
            posts.updateToMaterial(materials.posts)
        }
    })
    folderColorPosts.add(color.colorFunctions, 'champagne').name('champagne').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.posts, 'champagne')
            posts.updateToMaterial(materials.posts)
        }
    })
    folderColorPosts.add(color.colorFunctions, 'desert').name('desert').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.posts, 'desert')
            posts.updateToMaterial(materials.posts)
        }
    })
    folderColorPosts.add(color.colorFunctions, 'white').name('white').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.posts, 'white')
            posts.updateToMaterial(materials.posts)
        }
    })

    // Rafters colors
    folderColorRafters.add(color.colorFunctions, 'adobe').name('adobe').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.rafters, 'adobe')
            rafters.updateToMaterial(materials.rafters)
        }
    })
    folderColorRafters.add(color.colorFunctions, 'almond').name('almond').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.rafters, 'almond')
            rafters.updateToMaterial(materials.rafters)
        }
    })
    folderColorRafters.add(color.colorFunctions, 'belge').name('belge').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.rafters, 'belge')
            rafters.updateToMaterial(materials.rafters)
        }
    })
    folderColorRafters.add(color.colorFunctions, 'brown').name('brown').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.rafters, 'brown')
            rafters.updateToMaterial(materials.rafters)
        }
    })
    folderColorRafters.add(color.colorFunctions, 'cameo').name('cameo').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.rafters, 'cameo')
            rafters.updateToMaterial(materials.rafters)
        }
    })
    folderColorRafters.add(color.colorFunctions, 'champagne').name('champagne').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.rafters, 'champagne')
            rafters.updateToMaterial(materials.rafters)
        }
    })
    folderColorRafters.add(color.colorFunctions, 'desert').name('desert').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.rafters, 'desert')
            rafters.updateToMaterial(materials.rafters)
        }
    })
    folderColorRafters.add(color.colorFunctions, 'white').name('white').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.rafters, 'white')
            rafters.updateToMaterial(materials.rafters)
        }
    })

    // Beams colors
    folderColorBeams.add(color.colorFunctions, 'adobe').name('adobe').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.beams, 'adobe')
            beams.updateToMaterial(materials.beams)
        }
    })
    folderColorBeams.add(color.colorFunctions, 'almond').name('almond').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.beams, 'almond')
            beams.updateToMaterial(materials.beams)
        }
    })
    folderColorBeams.add(color.colorFunctions, 'belge').name('belge').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.beams, 'belge')
            beams.updateToMaterial(materials.beams)
        }
    })
    folderColorBeams.add(color.colorFunctions, 'brown').name('brown').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.beams, 'brown')
            beams.updateToMaterial(materials.beams)
        }
    })
    folderColorBeams.add(color.colorFunctions, 'cameo').name('cameo').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.beams, 'cameo')
            beams.updateToMaterial(materials.beams)
        }
    })
    folderColorBeams.add(color.colorFunctions, 'champagne').name('champagne').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.beams, 'champagne')
            beams.updateToMaterial(materials.beams)
        }
    })
    folderColorBeams.add(color.colorFunctions, 'desert').name('desert').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.beams, 'desert')
            beams.updateToMaterial(materials.beams)
        }
    })
    folderColorBeams.add(color.colorFunctions, 'white').name('white').onChange(() => {
        if (!materials.parameters.combine) {
            color.changeMaterialColor(materials.beams, 'white')
            beams.updateToMaterial(materials.beams)
        }
    })


    // const ctrlColorRoof = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorRoof').onChange((value) =>
    // {
    //     color.changeMaterialColor(materials.roof, value)
    //     roof.updateToMaterial(materials.roof)
    // });

    // const ctrlColorLattice = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorLattice').onChange((value) =>
    // {
    //     color.changeMaterialColor(materials.lattice, value)
    //     lattice.updateToMaterial(materials.lattice)
    // });

    // const ctrlColorPosts = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorPosts').onChange((value) =>
    // {
    //     color.changeMaterialColor(materials.posts, value)
    //     posts.updateToMaterial(materials.posts)
    // });

    // const ctrlColorRafters = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorRafters').onChange((value) =>
    // {
    //     color.changeMaterialColor(materials.rafters, value)
    //     rafters.updateToMaterial(materials.rafters)
    // });

    // const ctrlColorBeams = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorBeams').onChange((value) =>
    // {
    //     color.changeMaterialColor(materials.beams, value)
    //     beams.updateToMaterial(materials.beams)
    // });

    // const ctrlCombineColor = folderColor.add(materials.parameters, 'combineValue', materials.colorArray).name('combineValue').show().onChange((value) =>
    // {
    //     if (materials.parameters.combine)
    //     {
    //         color.changeMaterialColor(materials.general, value)
    //         color.updateColors(materials, roof, rafters, beams, posts, lattice) // update to the new material color
    //     }

    // });

    folderColor.add(materials.parameters, 'combine').name('combine').onChange((value) => {
        materials.parameters.combine = value
        if (materials.parameters.combine) {
            // update GUI
            // ctrlCombineColor.show()
            // ctrlColorRoof.show()
            // ctrlColorLattice.show()
            // ctrlColorPosts.show()
            // ctrlColorRafters.show()
            // ctrlColorBeams.show()

            folderColorCombine.open()

            color.backUpColors(materials) // backup previous material color
            color.updateColors(materials, roof, rafters, beams, posts, lattice) // update to the new material color

        }
        if (!materials.parameters.combine) {
            // update GUI
            // ctrlCombineColor.show()
            // ctrlColorRoof.show()
            // ctrlColorLattice.show()
            // ctrlColorPosts.show()
            // ctrlColorRafters.show()
            // ctrlColorBeams.show()

            folderColorCombine.close()

            color.returnColors(materials) // return material color from backup
        }
    });

    const folderColorCombine = folderColor.addFolder('ColorCombine').close().show()

    // Combine colors
    folderColorCombine.add(color.colorFunctions, 'adobe').name('adobe').onChange(() => {
        if (materials.parameters.combine) {
            color.changeMaterialColor(materials.general, 'adobe')
            color.updateColors(materials, roof, rafters, beams, posts, lattice) // update to the new material color
        }
    })
    folderColorCombine.add(color.colorFunctions, 'almond').name('almond').onChange(() => {
        if (materials.parameters.combine) {
            color.changeMaterialColor(materials.general, 'almond')
            color.updateColors(materials, roof, rafters, beams, posts, lattice) // update to the new material color
        }
    })
    folderColorCombine.add(color.colorFunctions, 'belge').name('belge').onChange(() => {
        if (materials.parameters.combine) {
            color.changeMaterialColor(materials.general, 'belge')
            color.updateColors(materials, roof, rafters, beams, posts, lattice) // update to the new material color
        }
    })
    folderColorCombine.add(color.colorFunctions, 'brown').name('brown').onChange(() => {
        if (materials.parameters.combine) {
            color.changeMaterialColor(materials.general, 'brown')
            color.updateColors(materials, roof, rafters, beams, posts, lattice) // update to the new material color
        }
    })
    folderColorCombine.add(color.colorFunctions, 'cameo').name('cameo').onChange(() => {
        if (materials.parameters.combine) {
            color.changeMaterialColor(materials.general, 'cameo')
            color.updateColors(materials, roof, rafters, beams, posts, lattice) // update to the new material color
        }
    })
    folderColorCombine.add(color.colorFunctions, 'champagne').name('champagne').onChange(() => {
        if (materials.parameters.combine) {
            color.changeMaterialColor(materials.general, 'champagne')
            color.updateColors(materials, roof, rafters, beams, posts, lattice) // update to the new material color
        }
    })
    folderColorCombine.add(color.colorFunctions, 'desert').name('desert').onChange(() => {
        if (materials.parameters.combine) {
            color.changeMaterialColor(materials.general, 'desert')
            color.updateColors(materials, roof, rafters, beams, posts, lattice) // update to the new material color
        }
    })
    folderColorCombine.add(color.colorFunctions, 'white').name('white').onChange(() => {
        if (materials.parameters.combine) {
            color.changeMaterialColor(materials.general, 'white')
            color.updateColors(materials, roof, rafters, beams, posts, lattice) // update to the new material color
        }
    })





    /**
     * Groups
     */

    const rotationGroup = new THREE.Group()
    scene.add(rotationGroup)

    rotationGroup.position.set(5, 5, 0) //target coordinates

    // Group for controlling the scene 
    const sceneCtrl = new THREE.Group()
    if (PARAMS.attachment === 'free standing') sceneCtrl.position.set(9.858 - 5, 0 - 5, 7.986)
    if (PARAMS.attachment === 'attached') sceneCtrl.position.set(7.705 - 5, 0 - 5, 6.170)

    // gui.add(sceneCtrl.position, 'x', -50, 50, 0.001).name('sceneCtrl.position.x')
    // gui.add(sceneCtrl.position, 'z', -50, 50, 0.001).name('sceneCtrl.position.y')

    rotationGroup.add(sceneCtrl)

    // Group for controlling PatioGroup
    const patioCtrl = new THREE.Group()
    sceneCtrl.add(patioCtrl)
    patioCtrl.position.set(-1.3, 0, -4.06)
    patioCtrl.rotation.y = Math.PI / 2
    patioCtrl.scale.set(0.263, 0.263, 0.263)

    // Patio Group
    const patioGroup = new PatioGroup()
    patioCtrl.add(patioGroup.instance)
    patioGroup.update()

    /**
     *  3D Models
     */

    /**
     * House
     */

    const house = new House(manager.loader)
    sceneCtrl.add(house.instanse, house.enterFloor)
    const bigOffsetZ = - 0.3
    if (PARAMS.attachment === 'free standing') {
        house.setPosition()
        house.bigGroup.position.z = 0
        house.bigRoof.position.y = 0
        house.smallRoof.position.y = 0
        house.bigMask.scale.y = 0.356
        house.smallMask.scale.y = 0.75
        house.smallMask.position.y = 2.4
    }
    if (PARAMS.attachment === 'attached') {
        house.instanse.position.set(0, 0, 0)
        house.bigGroup.position.z = - 0.15 + bigOffsetZ
    }

    /**
     * Fan
     */

    const fan = new Fan(manager.loader)
    patioGroup.instance.add(fan.instanse)

    let fanStatus = true
    const ctrlFan = folderAccesories.add(PARAMS.accesories, 'fan', [true, false]).onChange((value) => {
        PARAMS.accesories.fan = value
        fan.update()
        // set price of accesories
        price.update()

    })

    /**
     * Depth
     */

    const planeDepth = new PlaneDepth(scene)


    /**
     * Enter Floor
     */
    const enterFloor = new EnterFloor()
    sceneCtrl.add(enterFloor.instance)
    if (PARAMS.attachment === 'free standing') {
        enterFloor.instance.position.set(house.instanse.position.x - 0.75, 0, house.instanse.position.z - 6.5)
    }
    if (PARAMS.attachment === 'attached') {
        enterFloor.instance.position.set(-0.75, 0, -6.5)
    }

    /**
     * Patio
     */

    /**
     * Roof
     */

    const roof = new Roof()
    patioGroup.instance.add(roof.group)

    /**
     * Rafters
     */

    const rafters = new Rafters()
    patioGroup.instance.add(rafters.group)

    // Rafters GUI
    folderRafters.add(PARAMS, 'rafterType', ['2x6', '3x8']).name('rafterType').onChange((value) => {

        rafters.setSize(value)

        roof.updateGeometry()
        lattice.setPosition()
        beams.update()
        beams.updateToMaterial(materials.beams)
        price.update()

        if (PARAMS.attachment === 'attached') {
            setAttachmentHeight()
        }

    })

    folderRafters.add(PARAMS, 'rafterMaxDistance', 0.4, 2, 0.1).name('rafterMaxDistance (ft)').onChange((value) => {
        PARAMS.rafterMaxDistance = value
        rafters.update()
        rafters.updateToMaterial(materials.rafters)
    })

    /**
     * Posts
     */

    const posts = new Posts()
    patioGroup.instance.add(posts.backGroup, posts.frontGroup)
    if (PARAMS.attachment === 'free standing') {
        //nothing
    }
    if (PARAMS.attachment === 'attached') {
        posts.delete()
        posts.createFront()
        posts.updateToMaterial(materials.posts)
    }

    // Posts GUI
    folderPosts.add(PARAMS, 'postsType', ['default', '8x8', '10x10', 'D=8', 'D=10']).onChange((value) => {
        posts.updateType(value)
        posts.updateToMaterial(materials.posts)
        beams.update()
        beams.updateToMaterial(materials.beams)
        price.update()
    })

    folderPosts.add(PARAMS, 'postsHeight', ['8 ft', '10 ft']).onChange((value) => {

        if (value === '8 ft') {
            patioGroup.instance.position.y = 8 / 2
            if (PARAMS.attachment === 'attached') setAttachmentHeight()
        }
        if (value === '10 ft') {
            patioGroup.instance.position.y = 10 / 2
            if (PARAMS.attachment === 'attached') setAttachmentHeight()
        }

    })

    /**
     * Beams
    **/

    const beams = new Beams()
    patioGroup.instance.add(beams.frontGroup, beams.backGroup, beams.attachedGroup)

    /**
     * Attached Beam
     */

    const attachedBeam = new AttachedBeam()
    // patioGroup.instance.add(attachedBeam.instance)


    // Beams GUI

    folderBeams.add(PARAMS, 'beamsType', ['single', 'double']).name('beamsType').onChange((value) => {
        console.log(posts.frontGroup.children[0].children[0].material.map.name);
        if (value === 'single') {
            ctrlBeamsSizes.hide().reset()
            PARAMS.beamsSizes.width = 0.66
            PARAMS.beamsSizes.depth = 0.25
        }
        if (value === 'double') {
            ctrlBeamsSizes.show()
        }

        PARAMS.beamsType === value

        if (PARAMS.attachment === 'attached') {
            setAttachmentHeight()
        }

        beams.update()
        beams.updateToMaterial(materials.beams)
        rafters.setPosition()
        roof.setPosition()
        lattice.setPosition()
        posts.update()
        posts.updateToMaterial(materials.posts)
        fan.setPosition()

        price.update()

        console.log(posts.frontGroup.children[0].children[0].material.map.name);



    })

    const ctrlBeamsSizes = folderBeams.add(PARAMS, 'beamsSizeType', ['6x2', '8x3']).name('beamsSizes').hide().onChange((value) => {
        if (value === '8x3') {
            PARAMS.beamsSizes.height = 0.66
            PARAMS.beamsSizes.depth = 0.25
        }
        if (value === '6x2') {
            PARAMS.beamsSizes.height = 0.5
            PARAMS.beamsSizes.depth = 0.1667
        }

        beams.update()
        beams.updateToMaterial(materials.beams)
        posts.updateToMaterial(materials.posts)

        price.update()
    })


    /**
     * Lattice
     */

    const lattice = new Lattice()
    patioGroup.instance.add(lattice.group)

    // Lattice GUI

    folderLattice.add(PARAMS, 'latticeType', ['2x2', '3x2']).name('latticeType').onChange((value) => {
        PARAMS.latticeType = value
        if (PARAMS.latticeType === '2x2') {
            PARAMS.latticeSizes.height = 0.1667
            PARAMS.latticeSizes.depth = 0.1667
        }
        if (PARAMS.latticeType === '3x2') {
            PARAMS.latticeSizes.height = 0.1667 // 2 inch
            PARAMS.latticeSizes.depth = 0.25 // 3 inch
        }

        lattice.update()
        lattice.updateToMaterial(materials.lattice)

        price.update()

    })

    folderLattice.add(PARAMS, 'latticeMaxDistance', 0, 2, 0.0001).name('latticeMaxDistance (ft)').onChange((value) => {

        PARAMS.latticeMaxDistance = value

        lattice.update()
        lattice.updateToMaterial(materials.lattice)
    })


    /**
     * Patio types
     */

    function patioTypesSetup() {

        if (PARAMS.patioType === 'solid') {
            if (!materials.parameters.combine) {
                // ctrlColorRoof.show()
            }
            // ctrlColorLattice.show()

            roof.setScale(1)
            lattice.setScale(0)
            posts.update()
            posts.updateToMaterial(materials.posts)
        }
        if (PARAMS.patioType === 'lattice') {
            // ctrlColorRoof.show()
            if (!materials.parameters.combine) {
                // ctrlColorLattice.show()
            }

            roof.setScale(0)
            lattice.setScale(1)
            posts.update()
            posts.updateToMaterial(materials.posts)
        }
        if (PARAMS.patioType === 'insulated') {
            if (!materials.parameters.combine) {
                // ctrlColorRoof.show()
            }
            // ctrlColorLattice.hide()

            roof.setScale(1)
            lattice.setScale(0)
            posts.update()
            posts.updateToMaterial(materials.posts)
        }
    }

    patioTypesSetup()

    folderTypes.add(PARAMS, 'patioType', ['solid', 'lattice', 'insulated']).name('patioTypes').onChange((value) => {

        PARAMS.patioType = value

        patioTypesSetup()

        price.update()


    })

    /**
     * Shadow floor
     */
    const shadowFloor = new ShadowFloor()
    sceneCtrl.add(shadowFloor.instance)

    /**
     * Floor
     */
    const floor = new Floor()
    sceneCtrl.add(floor.instance)

    /**
     * Camera
     */

    const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height)
    scene.add(camera)

    // camera.position.set(-5.639, 3.000, -9.184)
    camera.position.set(-12.382, 3.000, -12.513)
    camera.rotation.set(-3.14, -0.65, -3.14)


    // gui.add(camera.position, 'x', -50, 50, 0.001).name('camera.position.x')
    // gui.add(camera.position, 'z', -50, 50, 0.001).name('camera.position.y')





    /**
     * Controls
     */

    const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true
    controls.enabled = true
    const target = new THREE.Vector3(0, 0, 0)
    target.set(5, 3, 0)
    controls.target.copy(target)
    controls.update()
    controls.maxPolarAngle = Math.PI / 2
    controls.minDistance = 15
    controls.maxDistance = 21
    controls.minAzimuthAngle = - Math.PI * 0.88
    controls.maxAzimuthAngle = - Math.PI / 1.8

    controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: null //THREE.MOUSE.PAN
    }

    controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN
    }

    // gui.add(target, 'x', -50, 50, 0.001)
    // gui.add(target, 'z', -50, 50, 0.001)







    /**
     * Light
     */


    /**
     * Directional light
     */


    const directionalLight = new DirectionalLight()
    sceneCtrl.add(directionalLight.instance)

    /**
     * Area light
     */

    const areaLight = new AreaLight()

    sceneCtrl.add(areaLight.patioBottom, areaLight.patioTop, areaLight.frontWall, areaLight.enter, areaLight.sideWall)
    // Helpers
    // sceneCtrl.add(areaLight.patioBottomHelper, areaLight.patioTopHelper, areaLight.frontWallHelper, areaLight.enterHelper, areaLight.sideWallHelper)

    if (PARAMS.attachment === 'free standing') {
        areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z
        areaLight.enter.position.set(-10.08, 1.32, -8)
    }
    if (PARAMS.attachment === 'attached') {
        areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z
        areaLight.enter.position.set(-8.5, 1.32, -8)
    }




    /**
     * Renderer
     */

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })


    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMappingExposure = 1
    renderer.toneMapping = THREE.LinearToneMapping

    renderer.useLegacyLights = true


    let time = Date.now();

    function animate() {

        const currentTime = Date.now();
        const deltaTime = currentTime - time;
        time = currentTime;

        fan.blades.rotation.y += deltaTime * 0.003

        renderer.render(scene, camera);

        controls.update();

        requestAnimationFrame(animate);

        // console.log(camera.position);


    }

    animate();

    /**
     * Resizes
     */

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth - 487;
        sizes.height = window.innerHeight - 9.920;

        // screen width > 479 px update sizes width and height of the sizes object
        if (window.innerWidth < 479) {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight * 0.4;
        } else if (window.innerWidth < 992) {
            sizes.width = window.innerWidth - 388;
        }

        //Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update render
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    })

    /**
     * Patio attachment
     */

    const classSizes = new ClassSizes()

    // Functions for set a type of an attachment

    function setFreeStanding() {
        PARAMS.attachment = 'free standing'

        planeDepth.setOpacity(0.3)
        sceneCtrl.position.set(9.858 - 5, 0 - 5, 7.986)  //control position of the scene
        const setSize = classSizes.size10x10()
        updatePatioSize(setSize)
        patioGroup.update()
        beams.setScaleBackGroup(1)
        beams.setScaleAttachedGroup(0)
        fanStatus = PARAMS.accesories.fan
        PARAMS.accesories.fan = false
        ctrlFan.hide()
        fan.update()
        house.setPosition()
        house.bigGroup.position.z = 0
        house.bigRoof.position.y = 0
        house.smallRoof.position.y = 0
        house.bigMask.scale.y = 0.356
        house.smallMask.scale.y = 0.75
        house.smallMask.position.y = 2.4
        enterFloor.instance.position.set(house.instanse.position.x - 0.75, 0, house.instanse.position.z - 6.5)
        areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z
        areaLight.enter.position.set(-10.7, 1.32, -8)
    }

    function setAttached() {
        PARAMS.attachment = 'attached'

        planeDepth.setOpacity(0)
        sceneCtrl.position.set(7.705 - 5, 0 - 5, 6.170) //control position of the scene
        const setSize = classSizes.size12x16()
        updatePatioSize(setSize)
        patioGroup.update()
        beams.setScaleBackGroup(0)
        beams.setScaleAttachedGroup(1)
        PARAMS.accesories.fan = fanStatus
        PARAMS.accesories.fan = false
        ctrlFan.show()
        fan.update()
        house.instanse.position.set(0, 0, 0)
        house.bigGroup.position.z = - 0.15 + bigOffsetZ - 0.073
        enterFloor.instance.position.set(-0.75, 0, -6.5)
        areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z
        areaLight.enter.position.set(-8.5, 1.32, -8)
        posts.delete()
        posts.createFront()
        posts.updateToMaterial(materials.posts)
    }

    setAttached() // start from the attached patio

    // Functions for set a type of 'roof', 'fasciaEave', 'underEave', 'wall'

    function setAttachmentHeight() {

        if (PARAMS.attachment === 'attached') {
            let beamsOffset, postsOffset, raftersOffset
            if (PARAMS.beamsType === 'single') beamsOffset = PARAMS.beamsSizes.height / 4
            if (PARAMS.beamsType === 'double') beamsOffset = 0
            if (PARAMS.postsHeight === '8 ft') postsOffset = 0
            if (PARAMS.postsHeight === '10 ft') postsOffset = 0.250
            if (PARAMS.rafterType === '2x6') raftersOffset = 0
            if (PARAMS.rafterType === '3x8') raftersOffset = 0.05

            let y
            if (PARAMS.attachmentType === 'roof') {
                y = -0.55 + beamsOffset + postsOffset + raftersOffset
                house.bigRoof.position.y = y
                house.smallRoof.position.y = y
                patioGroup.instance.position.z = -5.315
            }
            if (PARAMS.attachmentType === 'fasciaEave') {
                y = -0.293 + beamsOffset + postsOffset + raftersOffset
                house.bigRoof.position.y = y
                house.smallRoof.position.y = y
                patioGroup.instance.position.z = -5.783
            }
            if (PARAMS.attachmentType === 'underEave') {
                y = -0.135 + beamsOffset + postsOffset + raftersOffset
                house.bigRoof.position.y = y
                house.smallRoof.position.y = y
                patioGroup.instance.position.z = -5.315
            }
            if (PARAMS.attachmentType === 'wall') {
                y = 0.00 + beamsOffset + postsOffset + raftersOffset
                house.bigRoof.position.y = y
                house.smallRoof.position.y = y
                patioGroup.instance.position.z = -4.379 + 0.88

            }

            house.bigMask.scale.y = math.mapRange(y, -0.3, 0.415, 0.01, 0.9)
            house.smallMask.scale.y = math.mapRange(y, -0.47, 0.415, 0.3, 1.128) //(y, -0.47, 0.415, 0.3, 1)
            house.smallMask.position.y = math.mapRange(y, -0.47, 0.415, 2.235, 2.4) //(y, -0.47, 0.415, 2.235, 2.4)
        }




    }
    setAttachmentHeight()

    // Attachments' buttons for UI

    const objectAttachmets = {}
    objectAttachmets.attached = () => {
        setAttached()

        if (classSizes.doCustom) {

            // UI

            freeStandingCtrlX.hide()
            freeStandingCtrlZ.hide()

            attachedCtrlX.show().setValue(12)
            attachedCtrlZ.hide().setValue(10)
        }

        areaLight.sideWall.position.z = -13.083
    }
    objectAttachmets.freeStanding = () => {
        setFreeStanding()

        if (classSizes.doCustom) {

            // UI

            freeStandingCtrlX.show().setValue(12)
            freeStandingCtrlZ.show().setValue(10)

            attachedCtrlX.hide()
            attachedCtrlZ.hide()
        }

        areaLight.sideWall.position.z = -10.7
    }
    objectAttachmets.roof = () => {
        setAttached()
        PARAMS.attachmentType = 'roof'
        setAttachmentHeight()

        if (classSizes.doCustom) {

            // UI

            freeStandingCtrlX.hide()
            freeStandingCtrlZ.hide()

            attachedCtrlX.show().setValue(12)
            attachedCtrlZ.hide().setValue(10)
        }

        areaLight.sideWall.position.z = -13.083
    }
    objectAttachmets.fasciaEave = () => {
        setAttached()
        PARAMS.attachmentType = 'fasciaEave'
        setAttachmentHeight()

        if (classSizes.doCustom) {

            // UI

            freeStandingCtrlX.hide()
            freeStandingCtrlZ.hide()

            attachedCtrlX.show().setValue(12)
            attachedCtrlZ.hide().setValue(10)
        }

        areaLight.sideWall.position.z = -13.083
    }
    objectAttachmets.underEave = () => {
        setAttached()
        PARAMS.attachmentType = 'underEave'
        setAttachmentHeight()

        if (classSizes.doCustom) {

            // UI

            freeStandingCtrlX.hide()
            freeStandingCtrlZ.hide()

            attachedCtrlX.show().setValue(12)
            attachedCtrlZ.hide().setValue(10)
        }

        areaLight.sideWall.position.z = -13.083
    }
    objectAttachmets.wall = () => {
        setAttached()
        PARAMS.attachmentType = 'wall'
        setAttachmentHeight()

        if (classSizes.doCustom) {

            // UI

            freeStandingCtrlX.hide()
            freeStandingCtrlZ.hide()

            attachedCtrlX.show().setValue(12)
            attachedCtrlZ.hide().setValue(10)
        }
        areaLight.sideWall.position.z = -13.083

    }

    // Attachments' DAT-GUI

    // folderAttachment.add(objectAttachmets, 'attached').name('attached').onChange(() =>
    // {

    // })


    folderAttachment.add(objectAttachmets, 'wall').name('wall')
    folderAttachment.add(objectAttachmets, 'underEave').name('underEave')
    folderAttachment.add(objectAttachmets, 'fasciaEave').name('fasciaEave')
    folderAttachment.add(objectAttachmets, 'roof').name('roof')
    folderAttachment.add(objectAttachmets, 'freeStanding').name('freeStanding').onChange(() => {

    })







    /**
     * Patio Sizes
     */


    function updatePatioSize(value) {

        PARAMS.roofDepth = value[0]
        PARAMS.roofWidth = value[1]

        patioGroup.update()

        roof.updateGeometry()

        rafters.update()
        rafters.updateToMaterial(materials.rafters)

        lattice.update()
        lattice.updateToMaterial(materials.lattice)

        posts.update()
        posts.updateToMaterial(materials.posts)

        beams.update()
        beams.updateToMaterial(materials.beams)

        price.update()

    }

    const button10x10 = folderSizes.add(classSizes, 'size10x10').name('10x10').show().onChange((value) => {
        if (PARAMS.attachment === 'free standing') {
            value = size10x10Wrapper()
            updatePatioSize(value)
            house.bigGroup.position.z = 0
            areaLight.sideWall.position.z = -12.56
            areaLight.enter.position.x = -10.7
        }


    })
    const button11x11 = folderSizes.add(classSizes, 'size11x11').name('11x11').show().onChange((value) => {
        if (PARAMS.attachment === 'free standing') {
            value = size11x11Wrapper()
            updatePatioSize(value)
            areaLight.enter.position.x = -10.7
            // house.bigGroup.postion.z = 1.18
        }

    })
    const button12x12 = folderSizes.add(classSizes, 'size12x12').name('12x12').show().onChange((value) => {
        if (PARAMS.attachment === 'free standing') {
            value = size12x12Wrapper()
            updatePatioSize(value)
            areaLight.enter.position.x = -10.7
            // house.bigGroup.position.z = 0.91
        }

    })

    const button12x16 = folderSizes.add(classSizes, 'size12x16').name('12x16').show().onChange((value) => {
        if (PARAMS.attachment === 'free standing') {
            value = size12x16Wrapper()
            updatePatioSize(value)
            areaLight.enter.position.x = -10.7
        }
        if (PARAMS.attachment === 'attached') {
            value = size12x16Wrapper()
            updatePatioSize(value)

            house.bigGroup.position.z = - 0.15 - 0.07 + bigOffsetZ // -0.15 - 0.5
            areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z
        }



    })
    const button12x20 = folderSizes.add(classSizes, 'size12x20').name('12x20').show().onChange((value) => {
        if (PARAMS.attachment === 'free standing') {
            value = size12x20Wrapper()
            updatePatioSize(value)
            areaLight.enter.position.x = -10.7
        }

        if (PARAMS.attachment === 'attached') {
            value = size12x20Wrapper()
            updatePatioSize(value)
            house.bigGroup.position.z = -1.2 - 0.07 + bigOffsetZ
            areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z
        }




    })
    const button12x24 = folderSizes.add(classSizes, 'size12x24').name('12x24').show().onChange((value) => {
        if (PARAMS.attachment === 'free standing') {
            value = size12x24Wrapper()
            updatePatioSize(value)
            areaLight.enter.position.x = -10.7
        }

        if (PARAMS.attachment === 'attached') {
            value = size12x24Wrapper()
            updatePatioSize(value)
            house.bigGroup.position.z = -2.25 - 0.07 + bigOffsetZ
            areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z
        }

    })
    folderSizes.add(classSizes, 'doCustom').name('do custom').onChange((value) => {
        if (value) {
            if (PARAMS.attachment === 'free standing') {
                freeStandingCtrlX.show().setValue(12)
                freeStandingCtrlZ.show().setValue(10)

                attachedCtrlX.hide()
                attachedCtrlZ.hide()
            }
            if (PARAMS.attachment === 'attached') {
                freeStandingCtrlX.hide()
                freeStandingCtrlZ.hide()

                attachedCtrlX.show().setValue(12)
                attachedCtrlZ.hide().setValue(10)
            }

        }
        if (!value) {
            freeStandingCtrlX.hide()
            freeStandingCtrlZ.hide()
            attachedCtrlX.hide()
            attachedCtrlZ.hide()
        }
    })
    const freeStandingCtrlX = folderSizes.add(PARAMS, 'roofWidth', 12, 24, 0.1).name('roofWidthFree').hide().onChange((value) => {
        const updateSize = [PARAMS.roofDepth, value]
        updatePatioSize(updateSize)
        // house.bigGroup.position.z = math.mapRange(value, 10, 24, 1.45, -2.25)
    })
    const freeStandingCtrlZ = folderSizes.add(PARAMS, 'roofDepth', 10, 24, 0.1).name('roofDepthFree').hide().onChange((value) => {
        const updateSize = [value, PARAMS.roofWidth]
        updatePatioSize(updateSize)
        console.log(areaLight.enter.position.x);
        areaLight.enter.position.x = math.mapRange(value, 10, 24, -10.7, -14)
    })

    const attachedCtrlX = folderSizes.add(PARAMS, 'roofWidth', 12, 24, 0.1).name('roofWidthAttached').hide().onChange((value) => {
        const updateSize = [PARAMS.roofDepth, value]
        updatePatioSize(updateSize)
        house.bigGroup.position.z = math.mapRange(value, 10, 24, 1.45, -2.238) - 0.39
        areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z
    })
    const attachedCtrlZ = folderSizes.add(PARAMS, 'roofDepth', 12, 12, 0.1).name('roofDepthAttached').hide().onChange((value) => {
        const updateSize = [value, PARAMS.roofWidth]
        updatePatioSize(updateSize)
    })

    if (PARAMS.attachment === 'free standing') {
        const value = classSizes.size10x10()
        updatePatioSize(value)
    }
    if (PARAMS.attachment === 'attached') {
        const value = classSizes.size12x16()
        updatePatioSize(value)
    }

    /*
        Controls
    */

    // ---- Find control elements ----
    const typeList = document.querySelector('#patio-type')
    const attachmentList = document.querySelector('#patio-attachment')
    const beamsList = document.querySelector('#patio-beams')
    const colorList = document.querySelector('#patio-color')
    const postsList = document.querySelector('#patio-posts')
    const sizeList = document.querySelector('#patio-size')
    const installationList = document.querySelector('#patio-installation')
    const priceInput = document.querySelector('.price-hidden-input');
    const priceOutput = document.querySelector('.product_total');
    // sizes
    const customSizeWrapper = document.querySelector('.custom-size-wrapper')
    const customSizeAttached = document.querySelector('.is--attached-custom-size')
    const customSizeFreeStanding = document.querySelector('.is--standing-custom-size')
    const freeStandingSizes = document.querySelector('.free-standing-sizes')
    const attachedSizes = document.querySelector('.attached-sizes')
    const freeStandingWidthInput = document.querySelector('#free-standing-width')
    const freeStandingDepthInput = document.querySelector('#free-standing-length')
    const attachedWidthInput = document.querySelector('#attached-width')
    // custom size button
    const customSizeButton = document.querySelector('#custom-size-btn')
    // select inputs
    const typeInput = document.querySelectorAll('[name="Type"]');
    const typeOutput = document.querySelectorAll('.type-output');
    const colorInput = document.querySelectorAll('[name="Color"]');
    const colorOutput = document.querySelectorAll('.color-output');
    const attachmentInput = document.querySelectorAll('[name="Attachment"]');
    const attachmentOutput = document.querySelectorAll('.attachment-output');
    const sizeInput = document.querySelectorAll('[name="Size"]');
    const sizeOutput = document.querySelectorAll('.size-output');
    const headerInput = document.querySelectorAll('[name="Header"]');
    const headerOutput = document.querySelectorAll('.header-output');
    const postsInput = document.querySelectorAll('[name="Posts"]');
    const postsOutput = document.querySelectorAll('.posts-output');
    const accessoriesInput = document.querySelectorAll('[name="Accessories"]');
    const accessoriesOutput = document.querySelectorAll('.accessories-output');
    const installationInput = document.querySelectorAll('[name="Installation"]');
    const installationOutput = document.querySelectorAll('.installation-output');
    // elements for showing and hiding
    const requestForm = document.querySelector('.request-form-wrapper');
    const checkoutForm = document.querySelector('.checkout-form-wrapper');
    const priceWrapper = document.querySelector('.price-wrapper');
    const checkoutButton = document.querySelector('.checkout-button');
    const requestInfo = document.querySelector('.request-info');
    // Types
    const typeSelectWrapper = document.querySelector('.type-selects-wrapper');
    const latticeSelect = document.querySelector('#tubes');
    const raftersSelect = document.querySelector('#rafters');
    // Accessories
    const accessoriesList = document.querySelector('#patio-accessories');
    const accessoriesElem = document.querySelector('[data-name="Fan beam"]');

    function checkoutState() {
        requestForm.classList.add('is--hidden');
        checkoutForm.classList.remove('is--hidden');
        priceWrapper.classList.remove('is--hidden');
        checkoutButton.classList.remove('is--hidden');
        requestInfo.classList.add('is--hidden');
    }

    function requestState() {
        requestForm.classList.remove('is--hidden');
        checkoutForm.classList.add('is--hidden');
        priceWrapper.classList.add('is--hidden');
        checkoutButton.classList.add('is--hidden');
        requestInfo.classList.remove('is--hidden');
    }

    // function for setting value and placeholder to the input and textContent to the output
    function setInputOutput(input, output, value) {
        input.forEach((item) => {
            item.value = value;
            item.placeholder = value;
        })
        output.forEach((item) => {
            item.textContent = value;
        })
    }

    // set default values to the inputs and outputs
    setInputOutput(typeInput, typeOutput, 'Lattice 2x2 2x6');
    setInputOutput(attachmentInput, attachmentOutput, 'To the wall');
    setInputOutput(colorInput, colorOutput, 'Adobe');
    setInputOutput(sizeInput, sizeOutput, '10x10');
    setInputOutput(headerInput, headerOutput, 'Single beam 3x8');
    setInputOutput(postsInput, postsOutput, 'Default');
    setInputOutput(accessoriesInput, accessoriesOutput, 'No Fan beam');
    setInputOutput(installationInput, installationOutput, 'Self Installation');

    // function for adding active class to the button
    function addActiveClass(button) {
        button.classList.add('active')
    }

    // function for removing active class from all buttons in list
    function removeActiveClass(list) {
        list.querySelectorAll('.button-item').forEach((button) => {
            button.classList.remove('active')
        })
    }

    // function for adding active class to the each first button by default
    function addActiveClassDefault(list) {
        list.querySelectorAll('.button-item')[0].classList.add('active');
    }

    // call addActiveClassDefault function for each list
    addActiveClassDefault(typeList)
    addActiveClassDefault(attachmentList)
    addActiveClassDefault(beamsList)
    addActiveClassDefault(postsList)
    addActiveClassDefault(sizeList)
    addActiveClassDefault(attachedSizes)
    addActiveClassDefault(freeStandingSizes)
    addActiveClassDefault(installationList)
    // addActiveClassDefault(accessoriesList)

    //  ---- Controls events ----
    // Type
    typeList.addEventListener('click', (event) => {
        if (event.target.classList.contains('trigger-button-item')) {
            let typeName = event.target.getAttribute('data-name')
            PARAMS.patioType = typeName.toLowerCase()
            patioTypesSetup()
            // update value and placeholder of input and textContent of output
            setInputOutput(typeInput, typeOutput, typeName)
            price.update()
            removeActiveClass(typeList)
            addActiveClass(event.target.parentElement)
            // if type is lattice, then show type select wrapper, else hide
            if (typeName === 'Lattice') {
                typeSelectWrapper.classList.remove('is--hidden')
            } else {
                typeSelectWrapper.classList.add('is--hidden')

            }
        }
    });

    let currentLattice = '2x2';
    let currentRafter = '2x6';

    // on change of rafters select, update folderRafters controllers and update price
    raftersSelect.addEventListener('change', (event) => {
        let raftersName = event.target.value
        folderRafters.controllers.forEach((controller) => {
            if (controller._name === 'rafterType') {
                controller.setValue(raftersName)
                currentRafter = raftersName
                typeInput.forEach((item) => {
                    item.value = `Lattice tubes:${currentLattice}; rafters:${currentRafter};`
                    item.placeholder = item.value

                })
                typeOutput.forEach((item) => {
                    item.textContent = `Lattice tubes:${currentLattice}; rafters:${currentRafter};`
                })
            }
        })
        price.update()
    })

    // on change of lattice select, update folderLattice controllers and update price
    latticeSelect.addEventListener('change', (event) => {
        let latticeName = event.target.value
        folderLattice.controllers.forEach((controller) => {
            if (controller._name === 'latticeType') {
                controller.setValue(latticeName)
                currentLattice = latticeName
                typeInput.forEach((item) => {
                    item.value = `Lattice tubes:${currentLattice}; rafters:${currentRafter};`
                    item.placeholder = item.value
                })
                typeOutput.forEach((item) => {
                    item.textContent = `Lattice tubes:${currentLattice}; rafters:${currentRafter};`
                })
            }
        })
        price.update()
    })



    // Color
    const colorLists = colorList.querySelectorAll('.button-grid')
    // Set active button by default for first element of each list
    colorLists.forEach((list) => {
        addActiveClassDefault(list)
        list.addEventListener('click', (event) => {
            if (event.target.classList.contains('trigger-button-item')) {
                removeActiveClass(list)
                addActiveClass(event.target.parentElement)
            }
        })
    });

    function replaceWords(str, replacementIndex, newWord) {
        const words = str.split(', ');
        const replacedWords = words.map((word, index) => {
            if (index === replacementIndex - 1) {
                const originalWord = word.split(': ')[0];
                return `${originalWord}: ${newWord}`;
            }
            return word;
        });
        return replacedWords.join(', ');
    }

    colorList.addEventListener('click', (event) => {
        if (event.target.classList.contains('trigger-button-item')) {
            let colorType = event.target.getAttribute('data-type')
            let colorAddType = event.target.getAttribute('data-typ')
            let colorName = event.target.getAttribute('data-name').toLowerCase()
            if (colorType === 'colorRoof' || colorAddType === 'colorLattice') {
                color.changeMaterialColor(materials.lattice, colorName)
                // get current value of color input and output
                let currentValue = colorInput[0].value

                // replace color name in current value and output
                replaceWords(currentValue, 3, colorName)
                setInputOutput(colorInput, colorOutput, replaceWords(currentValue, 1, colorName))

            } else if (colorType === 'colorBeams') {
                color.changeMaterialColor(materials.beams, colorName)
                // get current value of color input and output
                let currentValue = colorInput[0].value

                // replace color name in current value and output
                replaceWords(currentValue, 2, colorName)
                setInputOutput(colorInput, colorOutput, replaceWords(currentValue, 2, colorName))

            } else if (colorType === 'colorPosts') {
                color.changeMaterialColor(materials.posts, colorName)
                // get current value of color input and output
                let currentValue = colorInput[0].value

                // replace color name in current value and output
                replaceWords(currentValue, 3, colorName)
                setInputOutput(colorInput, colorOutput, replaceWords(currentValue, 3, colorName))

            } else if (colorType === 'colorRafters') {
                color.changeMaterialColor(materials.rafters, colorName)
                // get current value of color input and output
                let currentValue = colorInput[0].value

                // replace color name in current value and output
                replaceWords(currentValue, 4, colorName)
                setInputOutput(colorInput, colorOutput, replaceWords(currentValue, 4, colorName))

            } else if (colorType === 'combineValue') {
                color.changeMaterialColor(materials.general, colorName)
                color.updateColors(materials, roof, rafters, beams, posts, lattice)
                setInputOutput(colorInput, colorOutput, event.target.getAttribute('data-name'))
            }
        }
    })

    // color toggle
    const colorToggleWrapper = document.querySelector('.color-combine-wrapper');
    const colorTab = document.querySelector('.color-tab');
    const colorCombine = document.querySelector('.color-combine');
    const colorTabLinks = colorTab.querySelectorAll('.w-tab-link');
    const colorTabPanes = colorTab.querySelectorAll('.w-tab-pane');

    if (colorToggleWrapper) {
        colorToggleWrapper.addEventListener('click', () => {
            colorToggleWrapper.classList.toggle('is--active');
            colorTab.classList.toggle('is--hidden');
            colorCombine.classList.toggle('is--hidden');
            // if colorToggleWrapper is active, then activate first combine color
            if (colorToggleWrapper.classList.contains('is--active')) {

                // update value and placeholder of input and textContent of output
                setInputOutput(colorInput, colorOutput, 'Adobe')
                color.changeMaterialColor(materials.lattice, 'adobe')
                color.changeMaterialColor(materials.beams, 'adobe')
                color.changeMaterialColor(materials.posts, 'adobe')
                color.changeMaterialColor(materials.rafters, 'adobe')
                color.changeMaterialColor(materials.general, 'adobe')
                // remove active class from all buttons
                removeActiveClass(colorLists[colorLists.length - 1])
                // activate first button of last color list
                colorLists[colorLists.length - 1].querySelectorAll('.button-item')[0].classList.add('active')
            } else {
                // if colorToggleWrapper is not active, then change input and output values to default
                setInputOutput(colorInput, colorOutput, 'Roof: adobe, Beams: adobe, Posts: adobe, Rafters: adobe')
                color.changeMaterialColor(materials.lattice, 'adobe')
                color.changeMaterialColor(materials.beams, 'adobe')
                color.changeMaterialColor(materials.posts, 'adobe')
                color.changeMaterialColor(materials.rafters, 'adobe')
                color.changeMaterialColor(materials.general, 'adobe')
                // remove active class from all buttons
                removeActiveClass(colorLists[0])
                removeActiveClass(colorLists[1])
                removeActiveClass(colorLists[2])
                removeActiveClass(colorLists[3])
                // activate first button of each list besides last one
                addActiveClass(colorLists[0].querySelectorAll('.button-item')[0])
                addActiveClass(colorLists[1].querySelectorAll('.button-item')[0])
                addActiveClass(colorLists[2].querySelectorAll('.button-item')[0])
                addActiveClass(colorLists[3].querySelectorAll('.button-item')[0])
                // reactive all tabs of colors tabs
                colorTabLinks.forEach((link) => {
                    link.classList.remove('w--current')
                })
                colorTabPanes.forEach((pane) => {
                    pane.classList.remove('w--tab-active')
                })
                // activate first tab of colors tabs
                colorTabLinks[0].classList.add('w--current')
                colorTabPanes[0].classList.add('w--tab-active')

            }
        })
    }

    function defaultAttachment() {
        setAttached()
        PARAMS.attachmentType = 'wall'
        setAttachmentHeight()
    }

    // Attachment
    const attachmentImageInput = document.querySelector('.patio-image-input');
    const attachedImage = 'https://uploads-ssl.webflow.com/642e62f5ba9679c13f59f5e1/6526c54f932e6e80d8672878_attached-min.jpg';
    const freeStandingImage = 'https://uploads-ssl.webflow.com/642e62f5ba9679c13f59f5e1/6526c4df72011401910ad876_free-standing-min.jpg';
    attachmentList.addEventListener('click', (event) => {
        if (event.target.classList.contains('trigger-button-item')) {
            let attachmentName = event.target.getAttribute('data-name')
            removeActiveClass(attachmentList)
            addActiveClass(event.target.parentElement)
            if (attachmentName.toLowerCase() === 'free standing') {
                defaultAttachment()
                sizesDefaultValues()
                // set folderAttachement freeStanding
                setFreeStanding()

                freeStandingSize()
                // reset accesorries
                accessoriesElem.parentElement.classList.remove('active')
                // update value and placeholder of input and textContent of output
                setInputOutput(attachmentInput, attachmentOutput, attachmentName)
                // set imageInpout valeu free standing image
                attachmentImageInput.value = freeStandingImage;
                // rectivate all butons of sizes free standing list
                freeStandingSizes.querySelectorAll('.button-item').forEach((button) => {
                    button.classList.remove('active')
                })
                // reactivate custom size button
                customSizeButton.classList.remove('active')
                customSizeHide()
                // activate first button of sizes free standing list
                addActiveClass(freeStandingSizes.querySelectorAll('.button-item')[0])
            } else if (attachmentName.toLowerCase() === 'to the wall') {
                sizesDefaultValues()
                defaultAttachment()
                attachedSize()
                setAttached()
                PARAMS.attachmentType = 'wall'
                setAttachmentHeight()
                // update value and placeholder of input and textContent of output
                setInputOutput(attachmentInput, attachmentOutput, attachmentName)
                // set imageInpout valeu attached image
                attachmentImageInput.value = attachedImage;
                // reset accesorries
                accessoriesElem.parentElement.classList.remove('active')
                // rectivate all butons of sizes attached list
                attachedSizes.querySelectorAll('.button-item').forEach((button) => {
                    button.classList.remove('active')
                })
                // reactivate custom size button
                customSizeButton.classList.remove('active')
                customSizeHide()
                // activate first button of sizes attached list
                addActiveClass(attachedSizes.querySelectorAll('.button-item')[0])
            } else if (attachmentName.toLowerCase() === 'to facia/eave') {
                defaultAttachment()
                sizesDefaultValues()
                setAttached()
                PARAMS.attachmentType = 'fasciaEave'
                setAttachmentHeight()
                attachedSize()
                sizesDefaultValues()
                // update value and placeholder of input and textContent of output
                setInputOutput(attachmentInput, attachmentOutput, attachmentName)
                // set imageInpout valeu attached image
                attachmentImageInput.value = attachedImage;
                // reset accesorries
                accessoriesElem.parentElement.classList.remove('active')
                // rectivate all butons of sizes attached list
                attachedSizes.querySelectorAll('.button-item').forEach((button) => {
                    button.classList.remove('active')
                })
                // reactivate custom size button
                customSizeButton.classList.remove('active')
                customSizeHide()
                // activate first button of sizes attached list
                addActiveClass(attachedSizes.querySelectorAll('.button-item')[0])
            } else if (attachmentName.toLowerCase() === 'to under eave') {
                defaultAttachment()
                sizesDefaultValues()
                folderAttachment.controllers[0].setValue('attached')
                folderAttachment.controllers[1].setValue('underEave')
                attachedSize()
                setAttached()
                PARAMS.attachmentType = 'underEave'
                setAttachmentHeight()
                // update value and placeholder of input and textContent of output
                setInputOutput(attachmentInput, attachmentOutput, attachmentName)
                // set imageInpout valeu attached image
                attachmentImageInput.value = attachedImage;
                // reset accesorries
                accessoriesElem.parentElement.classList.remove('active')
                // rectivate all butons of sizes attached list
                attachedSizes.querySelectorAll('.button-item').forEach((button) => {
                    button.classList.remove('active')
                })
                // reactivate custom size button
                customSizeButton.classList.remove('active')
                customSizeHide()
                // activate first button of sizes attached list
                addActiveClass(attachedSizes.querySelectorAll('.button-item')[0])
            } else if (attachmentName.toLowerCase() === 'to the roof') {
                defaultAttachment()
                sizesDefaultValues()
                setAttached()
                PARAMS.attachmentType = 'roof'
                setAttachmentHeight()
                attachedSize()
                // update value and placeholder of input and textContent of output
                setInputOutput(attachmentInput, attachmentOutput, attachmentName)
                // set imageInpout valeu attached image
                attachmentImageInput.value = attachedImage;
                // reset accesorries
                accessoriesElem.parentElement.classList.remove('active')
                // rectivate all butons of sizes attached list
                attachedSizes.querySelectorAll('.button-item').forEach((button) => {
                    button.classList.remove('active')
                })
                // reactivate custom size button
                customSizeButton.classList.remove('active')
                customSizeHide()
                // activate first button of sizes attached list
                addActiveClass(attachedSizes.querySelectorAll('.button-item')[0])
            }
        }
    })

    // Beams/headers
    beamsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('trigger-button-item')) {
            let beamsName = event.target.getAttribute('data-type')
            let beamsTypeSize = event.target.getAttribute('data-size-type')
            removeActiveClass(beamsList)
            addActiveClass(event.target.parentElement)
            if (beamsName.toLowerCase() === 'single') {
                folderBeams.controllers[0].setValue('single')
                // update value and placeholder of input and textContent of output
                setInputOutput(headerInput, headerOutput, 'Single 3x8')
            } else if (beamsName.toLowerCase() === 'double' && beamsTypeSize.toLowerCase() === '8x3') {
                // update value and placeholder of input and textContent of output
                setInputOutput(headerInput, headerOutput, 'Double 8x3')
                folderBeams.controllers[0].setValue('double')
                folderBeams.controllers[1].setValue('8x3')
            } else if (beamsName.toLowerCase() === 'double' && beamsTypeSize.toLowerCase() === '6x2') {
                // update value and placeholder of input and textContent of output
                setInputOutput(headerInput, headerOutput, 'Double 6x2')
                folderBeams.controllers[0].setValue('double')
                folderBeams.controllers[1].setValue('6x2')
            }
            beams.update()
            beams.updateToMaterial(materials.beams)
            price.update()
        }
    })

    // Posts
    const postsSelectsWrapper = document.querySelector('.posts-selects-wrapper')
    const postsSelectsSquare = document.querySelector('.posts-selects.is--square')
    const postsSelectsRound = document.querySelector('.posts-selects.is--round')
    const postsSelectSquareWide = document.querySelector('.posts-select.is--square-wide')
    const postsSelectRoundWide = document.querySelector('.posts-select.is--round-wide')
    const postsSelectSquareTall = document.querySelector('.posts-select.is--square-tall')
    const postsSelectRoundTall = document.querySelector('.posts-select.is--round-tall')

    postsSelectsWrapper.classList.add('is--hidden')
    postsSelectsSquare.classList.add('is--hidden')
    postsSelectsRound.classList.add('is--hidden')

    postsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('trigger-button-item')) {
            let postsName = event.target.getAttribute('data-type')
            removeActiveClass(postsList)
            addActiveClass(event.target.parentElement)
            if (postsName.toLowerCase() === 'default') {
                postsSelectsWrapper.classList.add('is--hidden')
                folderPosts.controllers[0].setValue('default')
                folderPosts.controllers[1].setValue('8 ft')
                // update value and placeholder of input and textContent of output
                setInputOutput(postsInput, postsOutput, 'Default')
                // set default value to the selects
                postsSelectSquareWide.value = 'Wide 8'
                postsSelectSquareTall.value = 'Tall 8'
                postsSelectRoundWide.value = 'Wide 8'
                postsSelectRoundTall.value = 'Tall 8'
            } else if (postsName.toLowerCase() === 'square') {
                postsSelectsWrapper.classList.remove('is--hidden')
                postsSelectsSquare.classList.remove('is--hidden')
                postsSelectsRound.classList.add('is--hidden')
                folderPosts.controllers[0].setValue('8x8')
                folderPosts.controllers[1].setValue('8 ft')
                // update value and placeholder of input and textContent of output
                setInputOutput(postsInput, postsOutput, `Squere ${postsSelectSquareWide.value} ${postsSelectSquareTall.value}`)
                // set default value to the selects round
                postsSelectRoundWide.value = 'Wide 8'
                postsSelectRoundTall.value = 'Tall 8'
                postsSelectSquareWide.addEventListener('change', (event) => {
                    let postsWideSize = postsSelectSquareWide.value

                    if (postsWideSize.toLowerCase() === 'wide 8') {
                        folderPosts.controllers[0].setValue('8x8')
                        // update value and placeholder of input and textContent of output
                        setInputOutput(postsInput, postsOutput, `Squere ${postsSelectSquareWide.value} ${postsSelectSquareTall.value}`)
                    } else if (postsWideSize.toLowerCase() === 'wide 10') {
                        folderPosts.controllers[0].setValue('10x10')
                        // update value and placeholder of input and textContent of output
                        setInputOutput(postsInput, postsOutput, `Squere ${postsSelectSquareWide.value} ${postsSelectSquareTall.value}`)
                    }
                })
                postsSelectSquareTall.addEventListener('change', (event) => {
                    let postsTallSize = postsSelectSquareTall.value

                    if (postsTallSize.toLowerCase() === 'tall 8') {
                        folderPosts.controllers[1].setValue('8 ft')
                        setInputOutput(postsInput, postsOutput, `Squere ${postsSelectSquareWide.value} ${postsSelectSquareTall.value}`)
                    } else if (postsTallSize.toLowerCase() === 'tall 10') {
                        folderPosts.controllers[1].setValue('10 ft')
                        setInputOutput(postsInput, postsOutput, `Squere ${postsSelectSquareWide.value} ${postsSelectSquareTall.value}`)
                    }
                })
            } else if (postsName.toLowerCase() === 'round') {
                postsSelectsWrapper.classList.remove('is--hidden')
                postsSelectsRound.classList.remove('is--hidden')
                postsSelectsSquare.classList.add('is--hidden')
                folderPosts.controllers[0].setValue('D=8')
                folderPosts.controllers[1].setValue('8 ft')
                // update value and placeholder of input and textContent of output
                setInputOutput(postsInput, postsOutput, `Round ${postsSelectRoundWide.value} ${postsSelectRoundTall.value}`)
                // set default value to the selects square
                postsSelectSquareWide.value = 'Wide 8'
                postsSelectSquareTall.value = 'Tall 8'
                postsSelectRoundWide.addEventListener('change', (event) => {
                    let postsWideSize = postsSelectRoundWide.value
                    setInputOutput(postsInput, postsOutput, `Round ${postsSelectRoundWide.value} ${postsSelectRoundTall.value}`)
                    if (postsWideSize.toLowerCase() === 'wide 8') {
                        folderPosts.controllers[0].setValue('D=8')
                        setInputOutput(postsInput, postsOutput, `Round ${postsSelectRoundWide.value} ${postsSelectRoundTall.value}`)
                    } else if (postsWideSize.toLowerCase() === 'wide 10') {
                        folderPosts.controllers[0].setValue('D=10')
                        setInputOutput(postsInput, postsOutput, `Round ${postsSelectRoundWide.value} ${postsSelectRoundTall.value}`)
                    }
                })
                postsSelectRoundTall.addEventListener('change', (event) => {
                    let postsTallSize = postsSelectRoundTall.value
                    setInputOutput(postsInput, postsOutput, `Round ${postsSelectRoundWide.value} ${postsSelectRoundTall.value}`)
                    if (postsTallSize.toLowerCase() === 'tall 8') {
                        folderPosts.controllers[1].setValue('8 ft')
                        setInputOutput(postsInput, postsOutput, `Round ${postsSelectRoundWide.value} ${postsSelectRoundTall.value}`)
                    } else if (postsTallSize.toLowerCase() === 'tall 10') {
                        folderPosts.controllers[1].setValue('10 ft')
                        setInputOutput(postsInput, postsOutput, `Round ${postsSelectRoundWide.value} ${postsSelectRoundTall.value}`)
                    }
                })
            }
        }
    })

    // Size
    function connectInputWithController(input, controller, min, max) {
        input.addEventListener('input', (event) => {
            let value = parseFloat(event.target.value);
            if (event.target.value.length > 1) {

                if (value < min) {
                    value = min;
                } else if (value > max) {
                    value = max;
                    event.target.value = value.toFixed(1)
                }

                controller.setValue(value);
            }
            // if it's free standing inputs then update input and output of size
            if (input === freeStandingWidthInput || input === freeStandingDepthInput) {
                let width = parseFloat(freeStandingWidthInput.value)
                let depth = parseFloat(freeStandingDepthInput.value)
                let sizeName = `${width}x${depth}`
                // update value and placeholder of input and textContent of output
                setInputOutput(sizeInput, sizeOutput, sizeName)
            } else if (input === attachedWidthInput) {
                let width = parseFloat(attachedWidthInput.value)
                let sizeName = `${width}`
                // update value and placeholder of input and textContent of output
                setInputOutput(sizeInput, sizeOutput, sizeName)
            }
        });
    }

    connectInputWithController(freeStandingWidthInput, folderSizes.controllers[7], 12, 24)
    connectInputWithController(freeStandingDepthInput, folderSizes.controllers[8], 10, 24)
    connectInputWithController(attachedWidthInput, folderSizes.controllers[9], 12, 24)

    // set to freeWidthInput and freeDepthInput and attachedWidthInput default values
    function sizesDefaultValues() {
        freeStandingWidthInput.value = 12.0
        freeStandingDepthInput.value = 10.0
        attachedWidthInput.value = 12.0
    }

    customSizeHide()
    freeStandingSizesSettingsHide()
    sizesDefaultValues()

    function customSizeHide() {
        customSizeWrapper.classList.add('is--hidden')
    }

    function customSizeShow() {
        customSizeWrapper.classList.remove('is--hidden')
    }

    function attachedSize() {
        customSizeAttached.classList.remove('is--hidden')
        customSizeFreeStanding.classList.add('is--hidden')
        freeStandingSizesSettingsHide()
    }

    function freeStandingSize() {
        customSizeFreeStanding.classList.remove('is--hidden')
        customSizeAttached.classList.add('is--hidden')
        attachedSizesSettingsHide()
    }

    function attachedSizesSettingsHide() {
        attachedSizes.classList.add('is--hidden')
        freeStandingSizes.classList.remove('is--hidden')
    }

    function freeStandingSizesSettingsHide() {
        freeStandingSizes.classList.add('is--hidden')
        attachedSizes.classList.remove('is--hidden')
    }

    sizeList.addEventListener('click', (event) => {
        if (event.target.classList.contains('trigger-button-item')) {
            let sizeName = event.target.getAttribute('data-type');
            removeActiveClass(sizeList)
            addActiveClass(event.target.parentElement)
            // Loop through the controllers to find a match
            for (const controller of folderSizes.controllers) {
                const controllerProperty = controller.property.replace('size', '');

                if (controllerProperty === sizeName) {
                    // reset all inputs for sizes
                    sizesDefaultValues()
                    customSizeHide()
                    controller.setValue(true)
                    // update value and placeholder of input and textContent of output
                    setInputOutput(sizeInput, sizeOutput, sizeName)
                    // if local storage requestedZipCode is not false, then call checkoutState function, else call requestState function
                    if (localStorage.getItem('requestedZipCode') !== 'false') {
                        checkoutState();
                    }
                }
            }

            // Handle the 'custom' case
            if (sizeName === 'custom') {
                customSizeShow();
                // call func request state
                requestState()
                if (PARAMS.attachment === 'free standing') {
                    freeStandingSize();
                } else if (PARAMS.attachment === 'attached') {
                    attachedSize();
                }
            }
        }
    });


    folderPrice.onChange(event => {
        if (Number(event.controller.object.total) > 0) {
            priceInput.value = event.controller.object.total;
            priceOutput.innerHTML = `$${event.controller.object.total}`;
        }
    });

    // get localStorage 'default-standing' to set default standing, if it is not set, then set default
    let defaultStanding = localStorage.getItem('default-standing');
    let defaultAttachedSize = localStorage.getItem('data-attached');
    let defaultFreeStandingSize = localStorage.getItem('data-free-standing');
    if (defaultStanding !== null) {
        if (defaultStanding === 'free-standing') {
            setFreeStanding()
            freeStandingSize()
            // update value and placeholder of input and textContent of output
            setInputOutput(attachmentInput, attachmentOutput, 'Free standing')

            // rectivate all butons of sizes free standing list
            freeStandingSizes.querySelectorAll('.button-item').forEach((button) => {
                button.classList.remove('active')
            })
            // set imageInpout valeu free standing image
            attachmentImageInput.value = freeStandingImage
            // reactivate custom size button
            customSizeButton.classList.remove('active')
            customSizeHide()
            removeActiveClass(attachmentList);
            attachmentList.querySelector('[data-name="Free standing"]').parentElement.classList.add('active')
            // activate first button of sizes free standing list
            addActiveClass(freeStandingSizes.querySelectorAll('.button-item')[0])
            // Loop through the controllers to find a match
            setDefaultSize(defaultFreeStandingSize)
            // rectivate all butons of sizes free standing list using 
            removeActiveClass(sizeList)
            sizeList.querySelector(`[data-type="${defaultFreeStandingSize}"]`).parentElement.classList.add('active')

        } else if (defaultStanding === 'attached-standing') {
            setAttached()
            PARAMS.attachmentType = 'wall'
            setAttachmentHeight()
            attachedSize()
            // update value and placeholder of input and textContent of output
            setInputOutput(attachmentInput, attachmentOutput, 'To the wall')
            // rectivate all butons of sizes attached list
            attachedSizes.querySelectorAll('.button-item').forEach((button) => {
                button.classList.remove('active')
            })
            // set imageInpout valeu attached image
            attachmentImageInput.value = attachedImage
            // reactivate custom size button
            customSizeButton.classList.remove('active')
            customSizeHide()
            // activate first button of sizes attached list
            addActiveClass(attachedSizes.querySelectorAll('.button-item')[0])

            setDefaultSize(defaultAttachedSize)
            // rectivate all butons of sizes attached list using
            removeActiveClass(sizeList)
            sizeList.querySelector(`[data-type="${defaultAttachedSize}"]`).parentElement.classList.add('active')
        }
    }

    function setDefaultSize(value) {
        for (const controller of folderSizes.controllers) {
            const controllerProperty = controller.property.replace('size', '');

            if (controllerProperty === value) {
                // reset all inputs for sizes
                freeStandingWidthInput.value = 12.0
                freeStandingDepthInput.value = 10.0
                attachedWidthInput.value = 12.0
                customSizeHide();
                controller.setValue(true);
                // update value and placeholder of input and textContent of output
                setInputOutput(sizeInput, sizeOutput, value)
                // if local storage requestedZipCode is not false, then call checkoutState function, else call requestState function
                if (localStorage.getItem('requestedZipCode') !== 'false') {
                    checkoutState();
                }
            }
        }
    }

    // Installation
    const installationText = document.querySelector('#installation-text')

    installationList.addEventListener('click', (event) => {
        if (event.target.classList.contains('trigger-button-item')) {
            removeActiveClass(installationList)
            addActiveClass(event.target.parentElement)
            installationText.classList.add('is--hidden')
            // update value and placeholder of input and textContent of output
            setInputOutput(installationInput, installationOutput, 'Self Installation')

            if (event.target.parentElement === installationList.querySelectorAll('.button-item')[1]) {
                installationText.classList.remove('is--hidden')
                setInputOutput(installationInput, installationOutput, 'Installer')
            }
        }
    });

    // Accessories
    accessoriesList.addEventListener('click', (event) => {
        if (event.target.classList.contains('trigger-button-item')) {
            const parentElement = event.target.parentElement;
            parentElement.classList.toggle('active');

            const isActive = parentElement.classList.contains('active');
            folderAccesories.controllers[0].setValue(isActive);

            // update value and placeholder of input and textContent of output
            const outputText = isActive ? 'Fan beam' : 'No Fan beam';
            setInputOutput(accessoriesInput, accessoriesOutput, outputText);
        }
    });


    // set all inputs name and values from request form #wf-form-Request-Form to local storage on click on request trigger button
    const requestTriggerButton = document.querySelector('.submit-button');

    requestTriggerButton.addEventListener('click', () => {
        const requestForm = document.querySelector('#wf-form-Request-Form');
        const requestFormInputs = requestForm.querySelectorAll('input');
        requestFormInputs.forEach((input) => {
            localStorage.setItem(input.name, input.value)
        })
    });

    // Get image by class-name patio-image, get src and set it to the local storage
    const patioImage = document.querySelector('.patio-image');

    if (patioImage) {
        const patioImageSrc = patioImage.getAttribute('src');
        localStorage.setItem('Image', patioImageSrc)
    }

    price.update()


}

export default initModel
