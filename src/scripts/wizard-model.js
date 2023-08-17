// prettier-ignore
import * as dat from 'lil-gui'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

const math = require('canvas-sketch-util/math')

const woodColorTextureUrl = require('')

function initModel() {
  /**
   * DOC
   */
  const canvas = document.querySelector('.webgl')
  const widthOffset = 0.95
  const sizes = {
    width: window.innerWidth * widthOffset,
    height: window.innerHeight,
  }
  const mouse = { x: 99999, y: 99999 }

  /**
   * GUI
   */
  const gui = new dat.GUI()
  const folderCamera = gui.addFolder('camera')
  const folderDirectionalLight = gui.addFolder('directional light')
  const folderAreaLight01 = gui.addFolder('area light 01 patio down')
  const folderAreaLight02 = gui.addFolder('area light 02 patio up')
  const folderAreaLight03 = gui.addFolder('area light 03 wall front')
  const folderAreaLight04 = gui.addFolder('area light 04 enter')
  const folderAreaLight05 = gui.addFolder('area light 05 wall side')

  folderCamera.open()
  folderDirectionalLight.close()
  folderAreaLight01.close()
  folderAreaLight02.close()
  folderAreaLight03.close()
  folderAreaLight04.close()
  folderAreaLight05.close()

  /**
   * Parameters
   */
  const cameraPosition = {}
  const cameraRotation = {}

  /**
   * Loaders
   */
  const loadingManager = new THREE.LoadingManager()
  const textureLoader = new THREE.TextureLoader(loadingManager)
  const gltfLoader = new GLTFLoader(loadingManager)

  /**
   * Progress bar
   */
  const progressBar = document.getElementById('progress-bar')
  loadingManager.onProgress = function (url, loaded, total) {
    progressBar.value = (loaded / total) * 100
  }
  const progressBarContainer = document.querySelector('.progress-bar-container')
  loadingManager.onLoad = function () {
    progressBarContainer.style.display = 'none'
  }

  /**
   * TEXTURES
   */

  // Wood textures
  const woobColorTexture = textureLoader.load(
    'https://uploads-ssl.webflow.com/642e62f5ba9679c13f59f5e1/64c261eff4a865088f3b3a3d_ulyobjsn_2K_Albedo.jpg'
  )
  woobColorTexture.repeat.x = 6
  woobColorTexture.repeat.y = 6
  woobColorTexture.wrapS = THREE.RepeatWrapping
  woobColorTexture.wrapT = THREE.RepeatWrapping
  woobColorTexture.offset.x = 0.15
  const woobAOTexture = textureLoader.load(
    'https://resplendent-chimera-ba596d.netlify.app/src/static/textures/v02/woodPlank/ulyobjsn_2K_AO.jpg'
  )
  woobAOTexture.repeat.x = 6
  woobAOTexture.repeat.y = 6
  woobAOTexture.wrapS = THREE.RepeatWrapping
  woobAOTexture.wrapT = THREE.RepeatWrapping
  woobAOTexture.offset.x = 0.15
  const woobNormalTexture = textureLoader.load(
    'https://resplendent-chimera-ba596d.netlify.app/src/static/textures/v02/woodPlank/ulyobjsn_2K_Normal.jpg'
  )
  woobNormalTexture.repeat.x = 6
  woobNormalTexture.repeat.y = 6
  woobNormalTexture.wrapS = THREE.RepeatWrapping
  woobNormalTexture.wrapT = THREE.RepeatWrapping
  woobNormalTexture.offset.x = 0.15

  // Patio textures
  // parameters
  const patiorepeat = 5
  const patioOffsetX = 0
  const patioRotation = Math.PI * 0.5
  // textures
  const patioColorTexture = textureLoader.load(
    'https://resplendent-chimera-ba596d.netlify.app/src/static/textures/v02/woodPlank/ulyobjsn_2K_Albedo.jpg'
  )
  patioColorTexture.repeat.x = patiorepeat
  patioColorTexture.repeat.y = patiorepeat
  patioColorTexture.wrapS = THREE.RepeatWrapping
  patioColorTexture.wrapT = THREE.RepeatWrapping
  patioColorTexture.offset.x = patioOffsetX
  patioColorTexture.rotation = patioRotation
  const patioAOTexture = textureLoader.load(
    'https://resplendent-chimera-ba596d.netlify.app/src/static/textures/v02/woodPlank/ulyobjsn_2K_AO.jpg'
  )
  patioAOTexture.repeat.x = patiorepeat
  patioAOTexture.repeat.y = patiorepeat
  patioAOTexture.wrapS = THREE.RepeatWrapping
  patioAOTexture.wrapT = THREE.RepeatWrapping
  patioAOTexture.offset.x = patioOffsetX
  patioAOTexture.rotation = patioRotation
  const patioNormalTexture = textureLoader.load(
    'https://resplendent-chimera-ba596d.netlify.app/src/static/textures/v02/woodPlank/ulyobjsn_2K_Normal.jpg'
  )
  patioNormalTexture.repeat.x = patiorepeat
  patioNormalTexture.repeat.y = patiorepeat
  patioNormalTexture.wrapS = THREE.RepeatWrapping
  patioNormalTexture.wrapT = THREE.RepeatWrapping
  patioNormalTexture.offset.x = patioOffsetX
  patioNormalTexture.rotation = patioRotation

  // concrete
  const concreteAOTexture = textureLoader.load(
    'https://resplendent-chimera-ba596d.netlify.app/src/static/textures/v02/stone_terrazzo/vd5iffro_2K_AO.jpg'
  )
  concreteAOTexture.repeat.x = 10
  concreteAOTexture.repeat.y = 10
  concreteAOTexture.wrapS = THREE.RepeatWrapping
  concreteAOTexture.wrapT = THREE.RepeatWrapping

  /**
   * HDRI
   */
  const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)
  const environmentMapTexture = cubeTextureLoader.load([
    'https://resplendent-chimera-ba596d.netlify.app/src/static/textures/Standard-Cube-Map/01/px.png',
    'https://resplendent-chimera-ba596d.netlify.app/src/static/textures/Standard-Cube-Map/01/nx.png',
    'https://resplendent-chimera-ba596d.netlify.app/src/static/textures/Standard-Cube-Map/01/py.png',
    'https://resplendent-chimera-ba596d.netlify.app/src/static/textures/Standard-Cube-Map/01/ny.png',
    'https://resplendent-chimera-ba596d.netlify.app/src/static/textures/Standard-Cube-Map/01/pz.png',
    'https://resplendent-chimera-ba596d.netlify.app/src/static/textures/Standard-Cube-Map/01/nz.png',
  ])

  /**
   * Materials
   */

  // Material floor
  const materialfloor = new THREE.MeshBasicMaterial()
  materialfloor.color = new THREE.Color(0xbec9cb)
  materialfloor.side = THREE.DoubleSide

  // Shadow material
  const shadowMaterial = new THREE.ShadowMaterial()
  shadowMaterial.opacity = 1

  // Material wood
  const materialWood = new THREE.MeshStandardMaterial()
  materialWood.map = woobColorTexture
  materialWood.aoMap = woobAOTexture
  materialWood.aoMapIntensity = 10
  materialWood.normalMap = woobNormalTexture
  materialWood.normalScale.set(1, 1)

  // Material patio
  const materialPatio = new THREE.MeshStandardMaterial()
  materialPatio.map = patioColorTexture
  materialPatio.aoMap = patioAOTexture
  materialPatio.aoMapIntensity = 10
  materialPatio.normalMap = patioNormalTexture
  materialPatio.normalScale.set(1, 1)

  // Material roof
  const materialRoof = new THREE.MeshStandardMaterial()
  materialRoof.color = new THREE.Color(0x303030)
  materialRoof.metalness = 0
  materialRoof.roughness = 1

  // Material walls
  const materialWalls = new THREE.MeshStandardMaterial()
  materialWalls.color = new THREE.Color('white')
  materialWalls.map = concreteAOTexture

  materialWalls.metalness = 0.1
  materialWalls.roughness = 1

  // Material glass
  const materialGlass = new THREE.MeshStandardMaterial()
  materialGlass.color = new THREE.Color('white')
  materialGlass.metalness = 1
  materialGlass.roughness = 0
  materialGlass.envMap = environmentMapTexture
  materialGlass.envMapIntensity = 0.5
  materialGlass.transparent = true //set the transparent property to true
  materialGlass.opacity = 0.5 //and then set the opacity

  /**
   * Scene
   */

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xbec9cb)

  const group = new THREE.Group()
  scene.add(group)

  /**
   * Helpers
   */

  const gridHelper = new THREE.GridHelper(10, 10, 'red', 'white')
  // scene.add(gridHelper)
  const axesHelper = new THREE.AxesHelper(10)
  // scene.add(axesHelper)

  /**
   * Camera
   */

  const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height)
  scene.add(camera)

  const cameraTarget = new THREE.Vector3(4.76, 2.79, 0)
  // gui.add(cameraTarget, 'x', -20, 20, 0.01).name('target-x')
  // gui.add(cameraTarget, 'y', -20, 20, 0.01).name('target-y')
  // gui.add(cameraTarget, 'z', -20, 20, 0.01).name('target-z')

  camera.position.x = -16.94
  camera.position.y = 2.79
  camera.position.z = -17.69

  camera.rotation.x = -Math.PI
  camera.rotation.y = -0.89
  camera.rotation.z = -Math.PI

  /**
   * CONTROLS
   */

  //  const controls = new OrbitControls(camera, canvas)
  //  controls.enableDamping = true
  //  controls.minDistance = 28
  //  controls.maxDistance = 31
  //  controls.minPolarAngle = -Math.PI / 2;
  //  controls.maxPolarAngle = Math.PI / 2;
  //  controls.minAzimuthAngle = - Math.PI * 0.88
  //  controls.maxAzimuthAngle = - Math.PI / 1.8

  /**
   *  3D Models
   */

  // PLane shadow floor
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), shadowMaterial)
  scene.add(plane)
  plane.position.y = 0.05
  plane.rotation.x = -Math.PI / 2
  plane.receiveShadow = true

  // DIY Scene v02 gltf scene import

  gltfLoader.load('https://resplendent-chimera-ba596d.netlify.app/src/static/diy_scene_v02/diy_scene_v02.gltf', (gltf) => {
    group.add(gltf.scene)

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name === 'floor') {
          child.material = materialfloor
        }
        if (child.name === 'glass') {
          child.material = materialGlass
        }
        if (child.name === 'patio') {
          child.material = materialPatio
        }
        if (child.name === 'wallWood' || child.name === 'floorEnter') {
          child.material = materialWood
        }
        if (
          child.name === 'roof' ||
          child.name === 'funnel' ||
          child.name === 'glassFrames'
        ) {
          child.material = materialRoof
        }
        if (
          child.name === 'wall' ||
          child.name === 'curtains' ||
          child.name === 'patioCurtain' ||
          child.name === 'door' ||
          child.name === 'groundFloor' ||
          child.name === 'fundament'
        ) {
          child.material = materialWalls
        }
        if (
          child.name === 'chair01' ||
          child.name === 'chair02' ||
          child.name === 'sofa'
        ) {
          child.material = materialWalls
        }

        child.castShadow = true
        child.receiveShadow = true
      }
    })
  })

  /**
   * Light
   */

  /**
   * Directional light
   */

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)

  group.add(directionalLight)

  // DIY Lights v02 import light parameters

  gltfLoader.load('https://resplendent-chimera-ba596d.netlify.app/src/static/diy_scene_v02/diy_lights_v02.gltf', (gltf) => {
    // export coordinates from the scene
    const infinityLight = gltf.scene.children[4]
    directionalLight.rotation.x = infinityLight.rotation.x
    directionalLight.rotation.y = infinityLight.rotation.y
    directionalLight.rotation.z = infinityLight.rotation.z
  })

  directionalLight.position.x = -28.67
  directionalLight.position.y = 45.91
  directionalLight.position.z = 19.27

  const dirLightvariantion = { variant: true }
  folderDirectionalLight
    .add(dirLightvariantion, 'variant')
    .name('light variations')
    .onChange(() => {
      if (dirLightvariantion.variant) {
        directionalLight.position.x = -28.67
        directionalLight.position.y = 45.91
        directionalLight.position.z = 19.27
      }
      if (!dirLightvariantion.variant) {
        directionalLight.position.x = -10.23
        directionalLight.position.y = 45.91
        directionalLight.position.z = -33.59
      }
    })

  // folderDirectionalLight.add(directionalLight, 'intensity', 0.1, 2, 0.01).name('dir-light-intensity')
  folderDirectionalLight
    .add(directionalLight.position, 'x', -50, 50, 0.01)
    .name('dir-light-pos-x')
  folderDirectionalLight
    .add(directionalLight.position, 'y', 0, 100, 0.01)
    .name('dir-light-pos-y')
  folderDirectionalLight
    .add(directionalLight.position, 'z', -50, 50, 0.01)
    .name('dir-light-pos-z')

  // Shadows
  directionalLight.shadow.camera.near = 0.5
  directionalLight.shadow.camera.far = 70
  directionalLight.shadow.camera.top = 10
  directionalLight.shadow.camera.right = 10
  directionalLight.shadow.camera.bottom = -10
  directionalLight.shadow.camera.left = -10
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  directionalLight.shadow.intensity = 1

  // directional light camera helper
  const directionalLightCameraHelper = new THREE.CameraHelper(
    directionalLight.shadow.camera
  )
  // scene.add(directionalLightCameraHelper)

  /**
   * Area light
   */

  // arealight01 patio down
  const rectAreaLight01 = new THREE.RectAreaLight(0xffffff, 1, 2.3, 2.5)
  group.add(rectAreaLight01)
  rectAreaLight01.rotation.x = -Math.PI / 2

  // import arealight01 position
  gltfLoader.load('https://resplendent-chimera-ba596d.netlify.app/src/static/diy_scene_v02/diy_lights_v02.gltf', (gltf) => {
    // export coordinates from the scene
    const areaLight = gltf.scene.children[2]
    rectAreaLight01.position.x = areaLight.position.x
    rectAreaLight01.position.y = areaLight.position.y - 0.2
    rectAreaLight01.position.z = areaLight.position.z
  })

  const rectAreaLightHelper01 = new RectAreaLightHelper(rectAreaLight01)
  // scene.add(rectAreaLightHelper01)

  folderAreaLight01
    .add(rectAreaLight01, 'intensity', 0, 5, 0.01)
    .name('area-01-intensity')
  folderAreaLight01
    .add(rectAreaLight01, 'width', 0.1, 20, 0.01)
    .name('area-01-width')
  folderAreaLight01
    .add(rectAreaLight01, 'height', 0.1, 10, 0.01)
    .name('area-01-height')
  folderAreaLight01
    .add(rectAreaLight01.position, 'x', -20, 20, 0.01)
    .name('area-01-pos-x')
  folderAreaLight01
    .add(rectAreaLight01.position, 'y', -20, 20, 0.01)
    .name('area-01-pos-y')
  folderAreaLight01
    .add(rectAreaLight01.position, 'z', -20, 20, 0.01)
    .name('area-01-pos-z')

  folderAreaLight01
    .add(rectAreaLight01.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-01-rot-x')
  folderAreaLight01
    .add(rectAreaLight01.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-01-rot-y')
  folderAreaLight01
    .add(rectAreaLight01.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-01-rot-z')

  // arealight02 patio up
  const rectAreaLight02 = new THREE.RectAreaLight(0xffffff, 0.5, 2.3, 4)
  group.add(rectAreaLight02)
  rectAreaLight02.rotation.x = Math.PI / 2

  // import arealight02 position
  gltfLoader.load('https://resplendent-chimera-ba596d.netlify.app/src/static/diy_scene_v02/diy_lights_v02.gltf', (gltf) => {
    // export coordinates from the scene
    const areaLight = gltf.scene.children[2]
    rectAreaLight02.position.x = areaLight.position.x
    rectAreaLight02.position.y = areaLight.position.y + 0.115
    rectAreaLight02.position.z = areaLight.position.z
  })

  const rectAreaLightHelper02 = new RectAreaLightHelper(rectAreaLight02)
  // scene.add(rectAreaLightHelper02)

  folderAreaLight02
    .add(rectAreaLight02, 'intensity', 0, 5, 0.01)
    .name('area-02-intensity')
  folderAreaLight02
    .add(rectAreaLight02, 'width', 0.1, 20, 0.01)
    .name('area-02-width')
  folderAreaLight02
    .add(rectAreaLight02, 'height', 0.1, 10, 0.01)
    .name('area-02-height')
  folderAreaLight02
    .add(rectAreaLight02.position, 'x', -20, 20, 0.01)
    .name('area-02-pos-x')
  folderAreaLight02
    .add(rectAreaLight02.position, 'y', -20, 20, 0.01)
    .name('area-02-pos-y')
  folderAreaLight02
    .add(rectAreaLight02.position, 'z', -20, 20, 0.01)
    .name('area-02-pos-z')

  folderAreaLight02
    .add(rectAreaLight02.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-02-rot-x')
  folderAreaLight02
    .add(rectAreaLight02.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-02-rot-y')
  folderAreaLight02
    .add(rectAreaLight02.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-02-rot-z')

  // arealight03 wall
  const rectAreaLight03 = new THREE.RectAreaLight(0xffffff, 0.8, 8, 7.52)
  group.add(rectAreaLight03)
  rectAreaLight03.rotation.x = Math.PI / 2

  rectAreaLight03.position.x = -5.08
  rectAreaLight03.position.y = 2.3
  rectAreaLight03.position.z = 0

  rectAreaLight03.rotation.x = 0
  rectAreaLight03.rotation.y = -Math.PI / 2
  rectAreaLight03.rotation.z = 0

  folderAreaLight03
    .add(rectAreaLight03, 'intensity', 0, 5, 0.01)
    .name('area-03-intensity')
  folderAreaLight03
    .add(rectAreaLight03, 'width', 0.1, 20, 0.01)
    .name('area-03-width')
  folderAreaLight03
    .add(rectAreaLight03, 'height', 0.1, 10, 0.01)
    .name('area-03-height')
  folderAreaLight03
    .add(rectAreaLight03.position, 'x', -20, 20, 0.01)
    .name('area-03-pos-x')
  folderAreaLight03
    .add(rectAreaLight03.position, 'y', -20, 20, 0.01)
    .name('area-03-pos-y')
  folderAreaLight03
    .add(rectAreaLight03.position, 'z', -20, 20, 0.01)
    .name('area-03-pos-z')

  folderAreaLight03
    .add(rectAreaLight03.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-03-rot-x')
  folderAreaLight03
    .add(rectAreaLight03.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-03-rot-y')
  folderAreaLight03
    .add(rectAreaLight03.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-03-rot-z')

  const rectAreaLightHelper03 = new RectAreaLightHelper(rectAreaLight03)
  // scene.add(rectAreaLightHelper03)

  // arealight04 enter
  const rectAreaLight04 = new THREE.RectAreaLight(0xffffff, 1.4, 8, 4)
  group.add(rectAreaLight04)
  rectAreaLight04.rotation.x = Math.PI / 2

  rectAreaLight04.position.x = -5.08
  rectAreaLight04.position.y = 1.32
  rectAreaLight04.position.z = -8

  rectAreaLight04.rotation.x = 0
  rectAreaLight04.rotation.y = -Math.PI / 2
  rectAreaLight04.rotation.z = 0

  folderAreaLight04
    .add(rectAreaLight04, 'intensity', 0, 5, 0.01)
    .name('area-04-intensity')
  folderAreaLight04
    .add(rectAreaLight04, 'width', 0.1, 20, 0.01)
    .name('area-04-width')
  folderAreaLight04
    .add(rectAreaLight04, 'height', 0.1, 10, 0.01)
    .name('area-04-height')
  folderAreaLight04
    .add(rectAreaLight04.position, 'x', -20, 20, 0.01)
    .name('area-04-pos-x')
  folderAreaLight04
    .add(rectAreaLight04.position, 'y', -20, 20, 0.01)
    .name('area-04-pos-y')
  folderAreaLight04
    .add(rectAreaLight04.position, 'z', -20, 20, 0.01)
    .name('area-04-pos-z')

  folderAreaLight04
    .add(rectAreaLight04.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-04-rot-x')
  folderAreaLight04
    .add(rectAreaLight04.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-04-rot-y')
  folderAreaLight04
    .add(rectAreaLight04.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-04-rot-z')

  const rectAreaLightHelper04 = new RectAreaLightHelper(rectAreaLight04)
  // scene.add(rectAreaLightHelper04)

  // arealight05 side floor
  const rectAreaLight05 = new THREE.RectAreaLight(0xffffff, 2.1, 6.3, 5.86)
  group.add(rectAreaLight05)

  rectAreaLight05.position.set(2.3, 2.3, -12.56)
  rectAreaLight05.rotation.y = Math.PI

  folderAreaLight05
    .add(rectAreaLight05, 'intensity', 0, 5, 0.01)
    .name('area-05-intensity')
  folderAreaLight05
    .add(rectAreaLight05, 'width', 0.1, 20, 0.01)
    .name('area-05-width')
  folderAreaLight05
    .add(rectAreaLight05, 'height', 0.1, 10, 0.01)
    .name('area-05-height')
  folderAreaLight05
    .add(rectAreaLight05.position, 'x', -20, 20, 0.01)
    .name('area-05-pos-x')
  folderAreaLight05
    .add(rectAreaLight05.position, 'y', -20, 20, 0.01)
    .name('area-05-pos-y')
  folderAreaLight05
    .add(rectAreaLight05.position, 'z', -20, 20, 0.01)
    .name('area-05-pos-z')

  folderAreaLight05
    .add(rectAreaLight05.rotation, 'x', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-05-rot-x')
  folderAreaLight05
    .add(rectAreaLight05.rotation, 'y', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-05-rot-y')
  folderAreaLight05
    .add(rectAreaLight05.rotation, 'z', -Math.PI * 2, Math.PI * 2, 0.01)
    .name('area-05-rot-z')

  const rectAreaLightHelper05 = new RectAreaLightHelper(rectAreaLight05)
  // scene.add(rectAreaLightHelper05)

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // Physically accurate lighting
  renderer.useLegacyLights = false

  renderer.toneMappingExposure = 1
  renderer.toneMapping = THREE.LinearToneMapping

  gui.add(renderer, 'toneMapping', {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
  })

  function animate() {
    requestAnimationFrame(animate)

    // controls.update();

    renderer.render(scene, camera)
  }

  animate()

  /**
   * Resizes
   */

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = innerWidth * widthOffset
    sizes.height = innerHeight

    //Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update render
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  /**
   * CAamera track mouse
   */

  let dynamicCamera = { status: false }

  folderCamera
    .add(dynamicCamera, 'status')
    .name('dynamic')
    .onChange(() => {
      if (dynamicCamera.status) {
        window.addEventListener('mousemove', onMouseMove)
        console.log('test')
      }
      if (!dynamicCamera.status) {
        window.removeEventListener('mousemove', onMouseMove)
        console.log('test')
        group.rotation.y = 0
      }
    })

  window.addEventListener('mousemove', onMouseMove)
  function onMouseMove(event) {
    mouse.x = (event.clientX / sizes.width) * 2 - 1
    mouse.y = -((event.clientY / sizes.height) * 2 - 1)
    group.rotation.y = math.mapRange(mouse.x, 0, 1, 0.05, 0.5)
  }

  function onMouseMove(event) {
    mouse.x = (event.clientX / sizes.width) * 2 - 1
    mouse.y = -((event.clientY / sizes.height) * 2 - 1)

    group.rotation.y = math.mapRange(mouse.x, 0, 1, 0.05, 0.5)
  }
}

export default initModel
