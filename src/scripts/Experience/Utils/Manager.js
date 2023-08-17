import * as THREE from 'three';
import { gsap } from 'gsap'

import Materials from '../Materials';

export default class Manager {
    constructor() {

        this.loaded = false
        this.progressRatio = 0

        this.loading = new THREE.LoadingManager(
            // Loaded
            () => {
                console.log('loaded');
            },

            // Progress
            (itemUrl, itemsLoaded, itemsTotal) => {
                this.progressRatio = itemsLoaded / itemsTotal
            }
        )
    }

    onLoadComplete() {
        this.loaded = true
        this.material.opacity = 0
    }
}

