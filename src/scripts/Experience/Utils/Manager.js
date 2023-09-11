import * as THREE from 'three';

import Materials from '../Materials';



export default class Manager {
    constructor(progressBarContainer, progressBar) {

        this.progressBarContainer = progressBarContainer
        this.progressBar = progressBar

        this.loader = new THREE.LoadingManager(
            // Loaded
            () => {
                // console.log('loaded');
                this.progressBarContainer.style.display = 'none'
            },

            // Progress
            (url, loaded, total) => {
                // console.log('progress');
                this.progressBar.value = (loaded / total) * 100

            }
        )

    }


}

