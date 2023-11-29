import * as THREE from 'three'
import PARAMS from '../../Utils/PARAMS'
import Materials from '../../Materials.js'

export default class Posts
{
    constructor()
    {
        this.materials = new Materials()

        this.postSide01, this.postSide02, this.postCenter
        this.postAsset = new THREE.Group()

        this.frontGroup = new THREE.Group()
        this.backGroup = new THREE.Group()

        this.postStatus = null
        this.maxDistance = null
        this.maxBlocks = null

        this.beamsOffset

        this.setPosition()
        this.setAsset()
        this.create()

    }

    setPosition()
    {
        this.frontGroup.position.z = - (PARAMS.roofDepth / 2 - 1)
        this.backGroup.position.z = PARAMS.roofDepth / 2 - 1
    }


    checkBeams()
    {
        if (PARAMS.beamsType === 'single') this.beamsOffset = PARAMS.beamsSizes.height * 2
        if (PARAMS.beamsType === 'double') this.beamsOffset = 0
    }

    setAsset()
    {

        this.checkBeams()

        this.postSide01 = new THREE.Mesh(
            new THREE.BoxGeometry(PARAMS.postsSizes.widthSide, PARAMS.postsSizes.height, PARAMS.postsSizes.depthSide),
            this.materials.posts
        )
        this.postSide02 = new THREE.Mesh(
            new THREE.BoxGeometry(PARAMS.postsSizes.widthSide, PARAMS.postsSizes.height, PARAMS.postsSizes.depthSide),
            this.materials.posts
        )
        this.postCenter = new THREE.Mesh(
            new THREE.BoxGeometry(PARAMS.postsSizes.widthCenter, PARAMS.postsSizes.height, PARAMS.postsSizes.depthCenter),
            this.materials.posts
        )
        this.postSide01.position.z = - (PARAMS.postsSizes.depthCenter / 2 + PARAMS.postsSizes.depthSide / 2)
        this.postSide02.position.z = PARAMS.postsSizes.depthCenter / 2 + PARAMS.postsSizes.depthSide / 2

        this.postAsset.add(this.postSide01, this.postSide02, this.postCenter)

        this.setShadow()
    }

    setShadow()
    {
        this.postAsset.traverse((child) =>
        {
            if (child.isMesh)
            {
                child.receiveShadow = true
                child.castShadow = true
            }
        })
    }

    setPostsStatus()
    {

        if (PARAMS.beamsType === 'single')
        {
            this.postsStatus = '01'
        }
        if (PARAMS.beamsType === 'double' && PARAMS.beamsSizeType === '6x2')
        {
            this.postsStatus = '01'
        }
        if (PARAMS.beamsType === 'double' && PARAMS.beamsSizeType === '8x3')
        {
            this.postsStatus = '02'
        }
    }

    setMaxBlocks()
    {

        let totalWidth

        if (PARAMS.patioType === 'solid' || PARAMS.patioType === 'insulated')
        {

            if (this.postsStatus === '01')
            {
                if (PARAMS.roofDepth === 10 && PARAMS.roofDepth < 11)
                {
                    totalWidth = PARAMS.roofWidth
                    this.maxDistance = 8.58 // 8.7 ft
                }
                if (PARAMS.roofDepth === 11 || PARAMS.roofDepth < 12)
                {
                    totalWidth = PARAMS.roofWidth
                    this.maxDistance = 8.167 // 8.2 ft
                }
                if (PARAMS.roofDepth === 12)
                {
                    totalWidth = PARAMS.roofWidth
                    this.maxDistance = 7.667 // 7.8 ft
                }
            }
            if (this.postsStatus === '02')
            {
                if (PARAMS.roofDepth === 10 && PARAMS.roofDepth < 11)
                {
                    totalWidth = PARAMS.roofWidth
                    this.maxDistance = 12.33 // 12.4 ft
                }
                if (PARAMS.roofDepth === 11 || PARAMS.roofDepth < 12)
                {
                    totalWidth = PARAMS.roofWidth
                    this.maxDistance = 11.33 // 11.4 ft
                }
                if (PARAMS.roofDepth === 12)
                {
                    totalWidth = PARAMS.roofWidth
                    this.maxDistance = 10.417 // 10.5 ft
                }
            }
        }

        if (PARAMS.patioType === 'lattice')
        {
            if (PARAMS.roofDepth === 10 && PARAMS.roofDepth < 11)
            {
                totalWidth = PARAMS.roofWidth - 2
                this.maxDistance = 10.167 // 10.2 ft
            }
            if (PARAMS.roofDepth === 11 || PARAMS.roofDepth < 12)
            {
                totalWidth = PARAMS.roofWidth - 2
                this.maxDistance = 9.667 // 9.8 ft
            }
            if (PARAMS.roofDepth === 12)
            {
                totalWidth = PARAMS.roofWidth - 2
                this.maxDistance = 9.167 // 9.2 ft
            }
        }

        this.maxBlocks = Math.floor(totalWidth / this.maxDistance)

    }

    setNumber()
    {
        this.setPostsStatus()
        this.setMaxBlocks()

        PARAMS.postsNumber = 2 + this.maxBlocks
    }

    create()
    {

        this.setNumber()

        const margin = (PARAMS.roofWidth - 2) / (PARAMS.postsNumber - 1)

        for (let i = 0; i < PARAMS.postsNumber; i++)
        {

            const postBack = this.postAsset.clone()
            postBack.position.x = - (PARAMS.roofWidth - 2) / 2 + i * margin
            this.backGroup.add(postBack)
            const postFront = this.postAsset.clone()
            postFront.position.x = - (PARAMS.roofWidth - 2) / 2 + i * margin
            this.frontGroup.add(postFront)
        }

        this.setPosition()
    }

    createFront()
    {
        this.setNumber()

        const margin = (PARAMS.roofWidth - 2) / (PARAMS.postsNumber - 1)

        for (let i = 0; i < PARAMS.postsNumber; i++)
        {

            const postFront = this.postAsset.clone()
            postFront.position.x = - (PARAMS.roofWidth - 2) / 2 + i * margin
            this.frontGroup.add(postFront)
        }

        this.setPosition()
    }

    delete()
    {
        while (this.backGroup.children[0])
        {
            this.backGroup.remove(this.backGroup.children[0])
        }
        while (this.frontGroup.children[0])
        {
            this.frontGroup.remove(this.frontGroup.children[0])
        }
    }

    setType(value)
    {
        if (value === 'default')
        {
            PARAMS.postsSizes.diametr = 0
            PARAMS.postsSizes.widthSide = 0.66
            PARAMS.postsSizes.depthSide = 0.208
            PARAMS.postsSizes.widthCenter = 0.25
            PARAMS.postsSizes.depthCenter = 0.25
        }
        if (value === '8x8')
        {
            PARAMS.postsSizes.diametr = 0
            PARAMS.postsSizes.widthSide = 0
            PARAMS.postsSizes.depthSide = 0
            PARAMS.postsSizes.widthCenter = 0.66
            PARAMS.postsSizes.depthCenter = 0.66

        }
        if (value === '10x10')
        {
            PARAMS.postsSizes.diametr = 0
            PARAMS.postsSizes.widthSide = 0
            PARAMS.postsSizes.depthSide = 0
            PARAMS.postsSizes.widthCenter = 0.833
            PARAMS.postsSizes.depthCenter = 0.833
        }
        if (value === 'D=8')
        {
            PARAMS.postsSizes.diametr = 0.66 / 2
            PARAMS.postsSizes.widthSide = 0
            PARAMS.postsSizes.depthSide = 0
            PARAMS.postsSizes.widthCenter = 0
            PARAMS.postsSizes.depthCenter = 0
        }
        if (value === 'D=10')
        {
            PARAMS.postsSizes.diametr = 0.833 / 2
            PARAMS.postsSizes.widthSide = 0
            PARAMS.postsSizes.depthSide = 0
            PARAMS.postsSizes.widthCenter = 0
            PARAMS.postsSizes.depthCenter = 0
        }
    }

    setGeometry()
    {

        this.checkBeams()

        if (PARAMS.postsSizes.diametr)
        {
            this.postSide01.geometry = new THREE.BoxGeometry(PARAMS.postsSizes.widthSide, PARAMS.postsSizes.height, PARAMS.postsSizes.depthSide)
            this.postSide02.geometry = new THREE.BoxGeometry(PARAMS.postsSizes.widthSide, PARAMS.postsSizes.height, PARAMS.postsSizes.depthSide)
            this.postCenter.geometry = new THREE.CylinderGeometry(PARAMS.postsSizes.diametr, PARAMS.postsSizes.diametr, PARAMS.postsSizes.height, 32, 4)
        }
        if (PARAMS.postsSizes.widthCenter)
        {
            this.postSide01.geometry = new THREE.BoxGeometry(PARAMS.postsSizes.widthSide, PARAMS.postsSizes.height + this.beamsOffset, PARAMS.postsSizes.depthSide)
            this.postSide02.geometry = new THREE.BoxGeometry(PARAMS.postsSizes.widthSide, PARAMS.postsSizes.height + this.beamsOffset, PARAMS.postsSizes.depthSide)
            this.postCenter.geometry = new THREE.BoxGeometry(PARAMS.postsSizes.widthCenter, PARAMS.postsSizes.height, PARAMS.postsSizes.depthCenter)
        }
    }

    updateType(value)
    {

        this.setType(value)
        this.setGeometry()
        this.update()

    }

    update()
    {
        this.setGeometry()
        this.delete()
        if (PARAMS.attachment === 'free standing')
            this.create()
        if (PARAMS.attachment === 'attached')
            this.createFront()
    }

    updateToMaterial(value)
    {
        this.frontGroup.children.forEach((asset) =>
        {
            for (let i = 0; i < asset.children.length; i++)
            {
                asset.children[i].material = value
            }
        })
        this.backGroup.children.forEach((asset) =>
        {
            for (let i = 0; i < asset.children.length; i++)
            {
                asset.children[i].material = value
            }
        })
    }

}
