// prettier-ignore
import '../styles/style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
const math = require('canvas-sketch-util/math');

import PARAMS from './Experience/Utils/PARAMS';
import Price from './Experience/Utils/Price';
import Manager from './Experience/Utils/Manager';

import Textures from './Experience/Textures.js';
import Materials from './Experience/Materials.js';
import PatioSizes from './Experience/Utils/PatioSizes.js';

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

import DirectionalLight from './Experience/World/DirectionalLight';
import AreaLight from './Experience/World/AreaLight';

function initModel() {
    /**
     * DOC
     */

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
     * Scene
     */

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xbec9cb)

    const axesHelper = new THREE.AxesHelper(50)
    scene.add(axesHelper)

    /**
     * TEXTURES
     */

    const textures = new Textures()

    /**
     * Materials
     */

    const materials = new Materials()

    // Functions for Material Color GUI

    function changeMaterialColor(material, value) {
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

    function backUpColors() {
        // backup colors
        materials.colorBackup.roofColor = materials.roof.map
        materials.colorBackup.raftersColor = materials.rafters.map
        materials.colorBackup.beamsColor = materials.beams.map
        materials.colorBackup.postsColor = materials.posts.map
        materials.colorBackup.latticeColor = materials.lattice.map
    }

    function updateColors() {
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

    function returnColors() {
        // return colors from backup
        materials.roof.map = materials.colorBackup.roofColor;
        materials.rafters.map = materials.colorBackup.raftersColor;
        materials.beams.map = materials.colorBackup.beamsColor;
        materials.posts.map = materials.colorBackup.postsColor;
        materials.lattice.map = materials.colorBackup.latticeColor;
    }

    /**
     * Color GUI
     */

    const ctrlColorRoof = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorRoof').onChange((value) => {
        changeMaterialColor(materials.roof, value)
        roof.updateToMaterial(materials.roof)
    });

    const ctrlColorLattice = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorLattice').onChange((value) => {
        changeMaterialColor(materials.lattice, value)
        lattice.updateToMaterial(materials.lattice)
    });

    const ctrlColorPosts = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorPosts').onChange((value) => {
        changeMaterialColor(materials.posts, value)
        posts.updateToMaterial(materials.posts)
    });

    const ctrlColorRafters = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorRafters').onChange((value) => {
        changeMaterialColor(materials.rafters, value)
        rafters.updateToMaterial(materials.rafters)
    });

    const ctrlColorBeams = folderColor.add(materials.parameters, 'colorName', materials.colorArray).name('colorBeams').onChange((value) => {
        changeMaterialColor(materials.beams, value)
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

            backUpColors() // backup previous material color
            updateColors() // update to the new material color

        }
        if (!materials.parameters.combine) {
            // update GUI
            ctrlCombineColor.hide()
            ctrlColorRoof.show()
            ctrlColorLattice.show()
            ctrlColorPosts.show()
            ctrlColorRafters.show()
            ctrlColorBeams.show()

            returnColors() // return material color from backup
        }
    });

    const ctrlCombineColor = folderColor.add(materials.parameters, 'combineValue', materials.colorArray).name('combineValue').hide().onChange((value) => {
        changeMaterialColor(materials.general, value)
        updateColors() // update to the new material color
    });

    /**
     * Groups
     */

    // Group for controlling the scene 
    const sceneCtrl = new THREE.Group()
    scene.add(sceneCtrl)
    sceneCtrl.position.set(1, 0, -1)

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

    const house = new House()
    sceneCtrl.add(house.instanse, house.enterFloor)

    /**
     * Loaders
     */

    const manager = new Manager()

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
        }
        if (value === '10 ft') {
            patioGroup.instance.position.y = 10 / 2
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

    const patioSizes = new PatioSizes()


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

    const button10x10 = folderSizes.add(patioSizes, 'size10x10').name('10x10').show().onChange((value) => {
        value = patioSizes.size10x10()
        updatePatioSize(value)
        house.bigGroup.position.z = 0
        areaLight.sideWall.position.z = -12.56

    })
    const button11x11 = folderSizes.add(patioSizes, 'size11x11').name('11x11').show().onChange((value) => {
        value = patioSizes.size11x11()
        updatePatioSize(value)
        // house.bigGroup.postion.z = 1.18
    })
    const button12x12 = folderSizes.add(patioSizes, 'size12x12').name('12x12').show().onChange((value) => {
        value = patioSizes.size12x12()
        updatePatioSize(value)
        // house.bigGroup.position.z = 0.91
    })
    const button12x16 = folderSizes.add(patioSizes, 'size12x16').name('12x16').hide().onChange((value) => {
        value = patioSizes.size12x16()
        updatePatioSize(value)

        house.bigGroup.position.z = -0.15
        areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z

    })
    const button12x20 = folderSizes.add(patioSizes, 'size12x20').name('12x20').hide().onChange((value) => {
        value = patioSizes.size12x20()
        updatePatioSize(value)
        house.bigGroup.position.z = -1.2
        areaLight.sideWall.position.z = -12.56 + house.bigGroup.position.z


    })
    const button12x24 = folderSizes.add(patioSizes, 'size12x24').name('12x24').hide().onChange((value) => {
        value = patioSizes.size12x24()
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

    /**
     * Patio Price
     */

    const price = new Price(folderPrice)
    price.update()
}

export default initModel
