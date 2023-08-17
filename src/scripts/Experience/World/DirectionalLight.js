import * as THREE from 'three'

export default class DirectionalLight {
    constructor() {
        this.instance = new THREE.DirectionalLight(0xffffff, 0.7)
        this.setCoordinates()
        this.setShadows()
    }

    setCoordinates() {
        this.instance.position.x = -26.21
        this.instance.position.y = 37.2
        this.instance.position.z = 22.67
        this.instance.rotation.x = -2.2617
        this.instance.rotation.y = -0.1349
        this.instance.rotation.z = 0.5949
    }
    setShadows() {
        this.instance.castShadow = true
        this.instance.shadow.mapSize.width = 2048
        this.instance.shadow.mapSize.height = 2048
        this.instance.shadow.intensity = 1

        this.instance.shadow.camera.near = 0.5
        this.instance.shadow.camera.far = 70
        this.instance.shadow.camera.top = 15
        this.instance.shadow.camera.right = 15
        this.instance.shadow.camera.bottom = - 15
        this.instance.shadow.camera.left = - 15
    }
}

/*


 
 
 // folderDirectionalLight.add(directionalLight, 'intensity', 0.1, 2, 0.01).name('dir-light-intensity')
 folderDirectionalLight.add(directionalLight.position, 'x', -50, 50, 0.01).name('dir-light-pos-x')
 folderDirectionalLight.add(directionalLight.position, 'y', 0, 100, 0.01).name('dir-light-pos-y')
 folderDirectionalLight.add(directionalLight.position, 'z', -50, 50, 0.01).name('dir-light-pos-z')
 
 // Shadows
 directionalLight.shadow.camera.near = 0.5
 directionalLight.shadow.camera.far = 70
 directionalLight.shadow.camera.top = 10
 directionalLight.shadow.camera.right = 10
 directionalLight.shadow.camera.bottom = - 10
 directionalLight.shadow.camera.left = - 10
 directionalLight.castShadow = true
 directionalLight.shadow.mapSize.width = 2048
 directionalLight.shadow.mapSize.height = 2048
 directionalLight.shadow.intensity = 1
 
 // directional light camera helper
 const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
 // scene.add(directionalLightCameraHelper)

*/

