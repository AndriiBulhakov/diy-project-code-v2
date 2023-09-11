// prettier-ignore
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

import House from './Experience/World/House.js'
import Roof from './Experience/World/Patio/Roof.js'
import Rafters from './Experience/World/Patio/Rafters.js';
import Posts from './Experience/World/Patio/Posts';
import Beams from './Experience/World/Patio/Beams';
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
     * DOC
     */

    const mouse = { x: 99999, y: 99999 }
    const canvas = document.querySelector(".webgl");
    const widthOffset = 0.95
    const sizes = {
        width: window.innerWidth * widthOffset,
        height: window.innerHeight
    }

    /**
     * GUI
     */

    const gui = new dat.GUI({ width: 550 }).open()

    const folderTypes = gui.addFolder('Patio types').close()
    const folderColor = gui.addFolder('Color').close()
    const folderAttachment = gui.addFolder('Attachment').close().show()
    const folderSizes = gui.addFolder('Sizes').close()
    const folderBeams = gui.addFolder('Beams').close()
    const folderPosts = gui.addFolder('Posts').close()
    const folderRafters = gui.addFolder('Rafters').close()
    const folderLattice = gui.addFolder('Lattice').close()
    const folderGuides = gui.addFolder('Guides').close()
    const folderPrice = gui.addFolder('Price').close()

    /**
     * Loader
     */
    const progressBar = document.getElementById('progress-bar')
    const progressBarContainer = document.querySelector(".progress-bar-container")

    const manager = new Manager(progressBarContainer, progressBar)

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

    scene.add(cubeTarger)
    cubeTarger.position.set(5, 5, 0)


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

    const ctrlColorRoof = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorRoof').onChange((value) => {
        color.changeMaterialColor(materials.roof, value)
        roof.updateToMaterial(materials.roof)
    });

    const ctrlColorLattice = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorLattice').onChange((value) => {
        color.changeMaterialColor(materials.lattice, value)
        lattice.updateToMaterial(materials.lattice)
    });

    const ctrlColorPosts = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorPosts').onChange((value) => {
        color.changeMaterialColor(materials.posts, value)
        posts.updateToMaterial(materials.posts)
    });

    const ctrlColorRafters = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorRafters').onChange((value) => {
        color.changeMaterialColor(materials.rafters, value)
        rafters.updateToMaterial(materials.rafters)
    });

    const ctrlColorBeams = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorBeams').onChange((value) => {
        color.changeMaterialColor(materials.beams, value)
        beams.updateToMaterial(materials.beams)
    });

    folderColor.add(materials.parameters, 'combine').name('combine').onChange((value) => {
        materials.parameters.combine = value
        if (materials.parameters.combine) {
            // update GUI
            ctrlCombineColor.show()
            ctrlColorRoof.hide()
            ctrlColorLattice.hide()
            ctrlColorPosts.hide()
            ctrlColorRafters.hide()
            ctrlColorBeams.hide()

            color.backUpColors(materials) // backup previous material color
            color.updateColors(materials, roof, rafters, beams, posts, lattice) // update to the new material color

        }
        if (!materials.parameters.combine) {
            // update GUI
            ctrlCombineColor.hide()
            ctrlColorRoof.show()
            ctrlColorLattice.show()
            ctrlColorPosts.show()
            ctrlColorRafters.show()
            ctrlColorBeams.show()

            color.returnColors(materials) // return material color from backup
        }
    });

    const ctrlCombineColor = folderColor.add(materials.parameters, 'combineValue', materials.colorArray).name('combineValue').hide().onChange((value) => {
        color.changeMaterialColor(materials.general, value)
        color.updateColors(materials, roof, rafters, beams, posts, lattice) // update to the new material color
    });


    /**
     * Groups
     */

    const rotationGroup = new THREE.Group()
    scene.add(rotationGroup)

    rotationGroup.position.set(5, 5, 0) //target coordinates

    // Group for controlling the scene 
    const sceneCtrl = new THREE.Group()

    //free standing
    sceneCtrl.position.set(9.858 - 5, 0 - 5, 7.986) // sceneCtrl.position(9.858, 0, 7.986) - rotationGroup.position(5, 5, 0)
    //attached
    // sceneCtrl.position.set(7.798, 0, 6.207) 

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

    /**
     *  3D Models
     */

    /**
     * House
     */

    const house = new House(manager.loader)
    sceneCtrl.add(house.instanse, house.enterFloor)

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
        price.update()

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
    patioGroup.instance.add(beams.frontGroup, beams.backGroup)

    // Beams GUI

    folderBeams.add(PARAMS, 'beamsType', ['single', 'double']).name('beamsType').onChange((value) => {
        if (value === 'single') {
            ctrlBeamsSizes.hide().reset()
            PARAMS.beamsSizes.width = 0.66
            PARAMS.beamsSizes.depth = 0.25
        }
        if (value === 'double') {
            ctrlBeamsSizes.show()
        }

        PARAMS.beamsType === value

        beams.update()
        beams.updateToMaterial(materials.beams)

        price.update()

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
                ctrlColorRoof.show()
            }
            ctrlColorLattice.hide()

            roof.setScale(1)
            lattice.setScale(0)
            beams.setScale(1)
            posts.update()
        }
        if (PARAMS.patioType === 'lattice') {
            ctrlColorRoof.hide()
            if (!materials.parameters.combine) {
                ctrlColorLattice.show()
            }

            roof.setScale(0)
            lattice.setScale(1)
            beams.setScale(1)
            posts.update()
        }
        if (PARAMS.patioType === 'insulated') {
            if (!materials.parameters.combine) {
                ctrlColorRoof.show()
            }
            ctrlColorLattice.hide()

            roof.setScale(1)
            lattice.setScale(0)
            beams.setScale(1)
            posts.update()
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
     * Enter Floor
     */
    const enterFloor = new EnterFloor()
    sceneCtrl.add(enterFloor.instance)


    /**
     * Camera
     */

    const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height)
    scene.add(camera)

    camera.position.set(-13.768, 2.4486, -17.997)
    camera.rotation.set(-3.14, -0.65, -3.14)

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
    controls.maxDistance = 33
    controls.minAzimuthAngle = - Math.PI * 0.88
    controls.maxAzimuthAngle = - Math.PI / 1.8


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

    function animate() {

        renderer.render(scene, camera);

        controls.update();

        requestAnimationFrame(animate);

    }

    animate();

    /**
     * Resizes
     */

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = innerWidth * widthOffset
        sizes.height = innerHeight

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

    folderAttachment.add(PARAMS, 'attachment', ['free standing', 'attached']).onChange((value) => {
        if (value === 'free standing') {

            button10x10.show()
            button11x11.show()
            button12x12.show()
            button12x16.hide()
            button12x20.hide()
            button12x24.hide()

            if (patioSizes.doCustom) {
                freeStandingCtrlX.show().setValue(10)
                freeStandingCtrlZ.show().setValue(10)
                attachedCtrlX.hide()
                attachedCtrlZ.hide()
            }
            if (!patioSizes.doCustom) {
                freeStandingCtrlX.hide()
                freeStandingCtrlZ.hide()
                attachedCtrlX.hide()
                attachedCtrlZ.hide()
            }
            attachmentType.hide()


            PARAMS.attachment === 'free standing'
            const setSize = patioSizes.size10x10()
            updatePatioSize(setSize)
            patioGroup.update()
            beams.setScaleBackGroup(1)
            house.bigGroup.position.z = 0
            house.instanse.position.x = 0
            house.instanse.position.y = 0
            areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z
            areaLight.enter.position.set(-10.08, 1.32, -8)

        }

        if (value === 'attached') {
            // GUI
            button10x10.hide()
            button11x11.hide()
            button12x12.hide()
            button12x16.show()
            button12x20.show()
            button12x24.show()
            if (patioSizes.doCustom) {
                freeStandingCtrlX.hide()
                freeStandingCtrlZ.hide()
                attachedCtrlX.show().setValue(12)
                attachedCtrlZ.hide().setValue(12)
            }
            if (!patioSizes.doCustom) {
                freeStandingCtrlX.hide()
                freeStandingCtrlZ.hide()
                attachedCtrlX.hide()
                attachedCtrlZ.hide()
            }
            attachmentType.show().setValue('roof')

            PARAMS.attachment === 'attached'
            const setSize = patioSizes.size12x16()
            updatePatioSize(setSize)
            patioGroup.update()
            beams.setScaleBackGroup(0)
            house.bigGroup.position.z = -0.15
            house.instanse.position.x = -0.249
            house.instanse.position.y = -0.29 //-0.236
            areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z
            areaLight.enter.position.set(-8.5, 1.32, -8)
            posts.delete()
            posts.createFront()
            posts.updateToMaterial(materials.posts)

        }
    })

    function setAttachmentHeight() {

        let beamsOffset, postsOffset
        if (PARAMS.beamsType === 'single') beamsOffset = PARAMS.beamsSizes.height / 4
        if (PARAMS.beamsType === 'double') beamsOffset = 0
        if (PARAMS.postsHeight === '8 ft') postsOffset = 0
        if (PARAMS.postsHeight === '10 ft') postsOffset = 0.250

        let y
        if (PARAMS.attachmentType === 'roof') {
            y = -0.55 + beamsOffset + postsOffset
            house.bigRoof.position.y = y
            house.smallRoof.position.y = y
            patioGroup.instance.position.z = -5.315
        }
        if (PARAMS.attachmentType === 'fasciaEave') {
            y = -0.293 + beamsOffset + postsOffset
            house.bigRoof.position.y = y
            house.smallRoof.position.y = y
            patioGroup.instance.position.z = -5.783
        }
        if (PARAMS.attachmentType === 'underEave') {
            y = -0.135 + beamsOffset + postsOffset
            house.bigRoof.position.y = y
            house.smallRoof.position.y = y
            patioGroup.instance.position.z = -5.315
        }
        if (PARAMS.attachmentType === 'wall') {
            y = 0.00 + beamsOffset + postsOffset
            house.bigRoof.position.y = y
            house.smallRoof.position.y = y
            patioGroup.instance.position.z = -4.379
        }

        house.bigMask.scale.y = math.mapRange(y, -0.3, 0.415, 0.01, 1)
        house.smallMask.scale.y = math.mapRange(y, -0.47, 0.415, 0.3, 1)
        house.smallMask.position.y = math.mapRange(y, -0.47, 0.415, 2.235, 2.4)
    }

    const attachmentType = folderAttachment.add(PARAMS, 'attachmentType', ['roof', 'fasciaEave', 'underEave', 'wall']).hide().onChange((value) => {
        if (value === 'roof') {
            house.instanse.position.x = -0.249
            house.instanse.position.y = -0.29 //-0.236
        }
        if (value === 'fasciaEave') {
            house.instanse.position.x = -0.171
            house.instanse.position.y = -0.09
        }
        if (value === 'underEave') {
            house.instanse.position.x = -0.132
            house.instanse.position.y = 0.168
        }
        if (value === 'wall') {
            house.instanse.position.x = -0.51
            house.instanse.position.y = 0.35
        }
    })

    /**
     * Patio Sizes
     */

    // const patioSizes = new PatioSizes()


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

    const button10x10 = folderSizes.add({ size10x10: size10x10Wrapper }, 'size10x10').name('10x10').show().onChange((value) => {
        value = size10x10Wrapper();
        updatePatioSize(value)
        house.bigGroup.position.z = 0
        areaLight.sideWall.position.z = -12.56

    })
    const button11x11 = folderSizes.add({ size11x11: size11x11Wrapper }, 'size11x11').name('11x11').show().onChange((value) => {
        value = size11x11Wrapper();
        updatePatioSize(value)
        // house.bigGroup.postion.z = 1.18
    })
    const button12x12 = folderSizes.add({ size12x12: size12x12Wrapper }, 'size12x12').name('12x12').show().onChange((value) => {
        value = size12x12Wrapper();
        updatePatioSize(value)
        // house.bigGroup.position.z = 0.91
    })
    const button12x16 = folderSizes.add({ size12x16: size12x16Wrapper }, 'size12x16').name('12x16').hide().onChange((value) => {
        value = size12x16Wrapper()
        updatePatioSize(value)

        house.bigGroup.position.z = -0.15
        areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z

    })
    const button12x20 = folderSizes.add({ size12x20: size12x20Wrapper }, 'size12x20').name('12x20').hide().onChange((value) => {
        value = size12x20Wrapper()
        updatePatioSize(value)
        house.bigGroup.position.z = -1.2
        areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z


    })
    const button12x24 = folderSizes.add({ size12x24: size12x24Wrapper }, 'size12x24').name('12x24').hide().onChange((value) => {
        value = size12x24Wrapper()
        updatePatioSize(value)
        house.bigGroup.position.z = -2.25
        areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z


    })
    folderSizes.add(patioSizes, 'doCustom').name('do custom').onChange((value) => {
        if (value) {
            if (PARAMS.attachment === 'free standing') {
                freeStandingCtrlX.show().setValue(10)
                freeStandingCtrlZ.show().setValue(10)

                attachedCtrlX.hide()
                attachedCtrlZ.hide()
            }
            if (PARAMS.attachment === 'attached') {
                freeStandingCtrlX.hide()
                freeStandingCtrlZ.hide()

                attachedCtrlX.show().setValue(12)
                attachedCtrlZ.hide()
            }

        }
        if (!value) {
            freeStandingCtrlX.hide()
            freeStandingCtrlZ.hide()
            attachedCtrlX.hide()
            attachedCtrlZ.hide()
        }
    })
    const freeStandingCtrlX = folderSizes.add(PARAMS, 'roofWidth', 10, 12, 0.1).name('roofWidth').hide().onChange((value) => {
        const updateSize = [PARAMS.roofDepth, value]
        updatePatioSize(updateSize)
        house.bigGroup.position.z = math.mapRange(value, 10, 24, 1.45, -2.25)
    })
    const freeStandingCtrlZ = folderSizes.add(PARAMS, 'roofDepth', 10, 12, 0.1).name('roofDepth').hide().onChange((value) => {
        const updateSize = [value, PARAMS.roofWidth]
        updatePatioSize(updateSize)
    })

    const attachedCtrlX = folderSizes.add(PARAMS, 'roofWidth', 12, 24, 0.1).name('roofWidth').hide().onChange((value) => {
        const updateSize = [PARAMS.roofDepth, value]
        updatePatioSize(updateSize)
        house.bigGroup.position.z = math.mapRange(value, 10, 24, 1.45, -2.25)
    })
    const attachedCtrlZ = folderSizes.add(PARAMS, 'roofDepth', 12, 12, 0.1).name('roofDepth').hide().onChange((value) => {
        const updateSize = [value, PARAMS.roofWidth]
        updatePatioSize(updateSize)
    })


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

    // function for settin value and placeholder to the input and textContent to the output
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
    setInputOutput(typeInput, typeOutput, 'Solid');
    setInputOutput(colorInput, colorOutput, 'Adobe');
    setInputOutput(attachmentInput, attachmentOutput, 'Free Standing');
    setInputOutput(sizeInput, sizeOutput, '10x10');
    setInputOutput(headerInput, headerOutput, 'Single beam 3x8');
    setInputOutput(postsInput, postsOutput, 'Default');
    setInputOutput(accessoriesInput, accessoriesOutput, 'None');
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
        }
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

    colorList.addEventListener('click', (event) => {
        if (event.target.classList.contains('trigger-button-item')) {
            let colorType = event.target.getAttribute('data-type')
            let colorAddType = event.target.getAttribute('data-typ')
            let colorName = event.target.getAttribute('data-name').toLowerCase()
            if (colorType === 'colorRoof' || colorAddType === 'colorLattice') {
                colorChanger(colorType, colorAddType, colorName)
            } else if (colorType === 'colorBeams') {
                colorChanger(colorType, colorAddType, colorName)
            } else if (colorType === 'colorPosts') {
                colorChanger(colorType, colorAddType, colorName)
            } else if (colorType === 'colorRafters') {
                colorChanger(colorType, colorAddType, colorName)
            } else if (colorType === 'combineValue') {
                colorChanger(colorType, colorAddType, colorName)
                // update value and placeholder of input and textContent of output
                setInputOutput(colorInput, colorOutput, colorName)
            }
        }
    })

    function colorChanger(colorType, colorAddType, colorName) {
        folderColor.controllers.forEach((controller) => {

            if (controller._name === colorType || controller._name === colorAddType) {
                controller.setValue(colorName)
            }
        })
    }

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
                folderColor.controllers[5].setValue('adobe')
                // remove active class from all buttons
                removeActiveClass(colorLists[colorLists.length - 1])
                // activate first button of last color list
                colorLists[colorLists.length - 1].querySelectorAll('.button-item')[0].classList.add('active')
            } else {
                // if colorToggleWrapper is not active, then activate first color of each list besides last one
                folderColor.controllers[0].setValue('adobe')
                folderColor.controllers[1].setValue('adobe')
                folderColor.controllers[2].setValue('adobe')
                folderColor.controllers[3].setValue('adobe')
                folderColor.controllers[4].setValue('adobe')
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

    // Attachment
    attachmentList.addEventListener('click', (event) => {
        if (event.target.classList.contains('trigger-button-item')) {
            let attachmentName = event.target.getAttribute('data-name')
            removeActiveClass(attachmentList)
            addActiveClass(event.target.parentElement)
            if (attachmentName.toLowerCase() === 'free standing') {
                folderAttachment.controllers[0].setValue('free standing')
                freeStandingSize()
                // update value and placeholder of input and textContent of output
                setInputOutput(attachmentInput, attachmentOutput, attachmentName)
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
                folderAttachment.controllers[0].setValue('attached')
                folderAttachment.controllers[1].setValue('wall')
                attachedSize()
                // update value and placeholder of input and textContent of output
                setInputOutput(attachmentInput, attachmentOutput, attachmentName)
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
                folderAttachment.controllers[0].setValue('attached')
                folderAttachment.controllers[1].setValue('fasciaEave')
                attachedSize()
                // update value and placeholder of input and textContent of output
                setInputOutput(attachmentInput, attachmentOutput, attachmentName)
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
                folderAttachment.controllers[0].setValue('attached')
                folderAttachment.controllers[1].setValue('underEave')
                attachedSize()
                // update value and placeholder of input and textContent of output
                setInputOutput(attachmentInput, attachmentOutput, attachmentName)
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
                folderAttachment.controllers[0].setValue('attached')
                folderAttachment.controllers[1].setValue('roof')
                attachedSize()
                // update value and placeholder of input and textContent of output
                setInputOutput(attachmentInput, attachmentOutput, attachmentName)
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
            } else if (postsName.toLowerCase() === 'square') {
                postsSelectsWrapper.classList.remove('is--hidden')
                postsSelectsSquare.classList.remove('is--hidden')
                postsSelectsRound.classList.add('is--hidden')
                folderPosts.controllers[0].setValue('8x8')
                folderPosts.controllers[1].setValue('8 ft')
                // update value and placeholder of input and textContent of output
                setInputOutput(postsInput, postsOutput, `Squere ${postsSelectSquareWide.value} ${postsSelectSquareTall.value}`)
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

            if (isNaN(value)) {
                value = min;
            }

            if (value < min) {
                value = min;
            } else if (value > max) {
                value = max;
            }

            event.target.value = value.toFixed(1);

            controller.setValue(value);
        });
    }

    connectInputWithController(freeStandingWidthInput, folderSizes.controllers[7], 10, 12)
    connectInputWithController(freeStandingDepthInput, folderSizes.controllers[8], 10, 12)
    connectInputWithController(attachedWidthInput, folderSizes.controllers[9], 12, 24)

    customSizeHide()
    attachedSizesSettingsHide()

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
                    freeStandingWidthInput.value = 10.0
                    freeStandingDepthInput.value = 10.0
                    attachedWidthInput.value = 12.0
                    customSizeHide();
                    controller.setValue(true);
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

    // Installation
    installationList.addEventListener('click', (event) => {
        if (event.target.classList.contains('button-item')) {
            removeActiveClass(installationList)
            addActiveClass(event.target)
        }
    });

    // summury


    // Monday

    document.getElementById('request-form').addEventListener('submit', function (event) {
        event.preventDefault();
        // Retrieve form data from input field
        const itemName = document.getElementById('Name').value;
        let query3 = `mutation{ create_item (board_id:1176396712, item_name:${itemName}){ id}}`;
        // Call a function to send API request with the form data
        createTableElement(query3);
    });

    function createTableElement(query) {
        fetch("https://api.monday.com/v2", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI0OTMwMjM5NiwidWlkIjo0MTg3NzcwNCwiaWFkIjoiMjAyMy0wNC0wNlQwNzoxMToxMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTY0MDcyNTksInJnbiI6ImV1YzEifQ.6RSZtUamQ50F4VGrpJk3DNYo5gLYlkN3F3DOMrrlm2w'
            },
            body: JSON.stringify({
                'query': query
            })
        })
            .then(res => res.json())
            .then(res => console.log(JSON.stringify(res, null, 2)));
    };


    /**
     * Patio Price
     */

    const price = new Price(folderPrice)
    price.update()
}

export default initModel
