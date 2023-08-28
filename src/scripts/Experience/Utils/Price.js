import * as dat from 'lil-gui'
import PARAMS from './PARAMS'

export default class Price {
    constructor(folder) {
        // this.gui = new dat.GUI({ width: 550 }).open()

        this.folder = folder

        this.info = {}
        this.number = {}
        this.infoGUI = {}
        this.numberGUI = {}

        this.component = {}

        this.update()

    }

    setInfo() {
        this.info.patioType = PARAMS.patioType
        this.info.patioSizes = `${PARAMS.roofWidth}x${PARAMS.roofDepth} = ${Math.round(PARAMS.roofWidth * PARAMS.roofDepth)}`
        this.info.latticeType = PARAMS.latticeType
        this.info.patioProjection = `${PARAMS.roofDepth}`
        this.info.attachment = PARAMS.attachment
        this.info.rafterType = PARAMS.rafterType
        this.info.beamsType = PARAMS.beamsType
        this.info.beamsSizeType = PARAMS.beamsSizeType
        this.info.postsType = PARAMS.postsType
        this.info.postsNumber = `${PARAMS.postsNumber * 2}`
    }

    setNumber() {
        this.number.roofPrice = 0
        this.number.attachmentPrice = 0
        this.number.rafterPrice = 0
        this.number.beamsPrice = 0
        this.number.totalRoof = 0
        this.number.postsPrice = 0
        this.number.total = 0
    }

    setInfoGUI() {
        this.infoGUI.patioType = this.folder.add(this.info, "patioType").name('patioType').disable()
        this.infoGUI.patioSizes = this.folder.add(this.info, "patioSizes").name('patioSizes').disable()
        this.infoGUI.latticeType = this.folder.add(this.info, "latticeType").name('latticeType').disable()
        this.infoGUI.patioProjection = this.folder.add(this.info, "patioProjection").name('patioProjection').disable()
        this.infoGUI.attachmentType = this.folder.add(this.info, "attachment").name('attachment').disable()
        this.infoGUI.rafterType = this.folder.add(this.info, "rafterType").name('rafterType').disable()
        this.infoGUI.beamsType = this.folder.add(this.info, "beamsType").name('beamsType').disable()
        this.infoGUI.beamsSizeType = this.folder.add(this.info, "beamsSizeType").name('beamsSizeType').disable()
        this.infoGUI.postsType = this.folder.add(this.info, "postsType").name('postsType').disable()
        this.infoGUI.postsNumber = this.folder.add(this.info, "postsNumber").name('postsNumber').disable()
    }

    setNumberGUI() {
        this.numberGUI.roof = this.folder.add(this.number, 'roofPrice').name('roofPrice')
        this.numberGUI.attachmentType = this.folder.add(this.number, 'attachmentPrice').name('attachmentPrice')
        this.numberGUI.rafterType = this.folder.add(this.number, 'rafterPrice').name('rafterPrice')
        this.numberGUI.beamsType = this.folder.add(this.number, 'beamsPrice').name('beamsPrice')
        this.numberGUI.totalRoof = this.folder.add(this.number, 'totalRoof').name('totalRoof')
        this.numberGUI.postsType = this.folder.add(this.number, 'postsPrice').name('postsPrice')
        this.numberGUI.total = this.folder.add(this.number, 'total').name('total')
    }

    setGUI() {
        this.setInfo()
        this.setNumber()
        this.setInfoGUI()
        this.setNumberGUI()
    }

    setComponent() {
        this.component.solid = 0
        this.component.lattice = 0
        this.component.insulated = 17.17
        this.component.roof = 0
        this.component.attachment = 0
        this.component.rafters = 0
        this.component.beams = 0
        this.component.totalRoof = 0
        this.component.posts = 0
        this.component.totalPosts = 0
        this.component.total = 0
    }

    delete() {
        while (this.folder.children[0]) {
            this.folder.children.forEach((child) => {
                child.destroy()
            })
        }
    }

    solid() {
        if (this.info.patioProjection === '10') {
            this.component.solid = 11.73
            this.infoGUI.patioProjection.setValue(`10 ($${this.component.solid})`)
        }
        if (this.info.patioProjection === '11') {
            this.component.solid = 13.63
            this.infoGUI.patioProjection.setValue(`11 ($${this.component.solid})`)
        }
        if (this.info.patioProjection === '12') {
            this.component.solid = 16.74
            this.infoGUI.patioProjection.setValue(`12 ($${this.component.solid})`)
        }
    }

    lattice() {
        if (this.info.latticeType === '2x2') {
            this.component.lattice = 11.73
            this.infoGUI.latticeType.setValue(`2x2 ($${this.component.lattice})`)
        }
        if (this.info.latticeType === '3x2') {
            this.component.lattice = 12.48
            this.infoGUI.latticeType.setValue(`3x2 ($${this.component.lattice})`)
        }
    }

    insulated() {

    }

    patioType() {
        if (PARAMS.patioType === 'solid') {
            this.infoGUI.patioProjection.show()
            this.infoGUI.latticeType.hide()
            this.component.lattice = 0
            this.component.insulated = 0
        }
        if (PARAMS.patioType === 'lattice') {
            this.infoGUI.patioProjection.hide()
            this.infoGUI.latticeType.show()
            this.component.solid = 0
            this.component.insulated = 0

        }
        if (PARAMS.patioType === 'insulated') {
            this.infoGUI.patioProjection.hide()
            this.infoGUI.latticeType.hide()
            this.component.solid = 0
            this.component.lattice = 0
            this.component.insulated = 17.17
        }
    }

    roof() {

        this.solid()
        this.lattice()
        this.insulated()
        this.patioType()

        const area = PARAMS.roofWidth * PARAMS.roofDepth
        this.component.roof = this.component.solid + this.component.lattice + this.component.insulated
        this.numberGUI.roof.setValue("$" + this.component.roof)
    }

    attachment() {
        if (PARAMS.attachment === 'free standing') {
            this.component.attachment = 3.3
            this.numberGUI.attachmentType.setValue(`$${this.component.attachment}`)
        }
        else {
            this.component.attachment = 0
            this.numberGUI.attachmentType.setValue(`$${this.component.attachment}`)

        }
    }

    rafters() {
        if (PARAMS.rafterType === '2x6') {
            this.component.rafters = 0
            this.infoGUI.rafterType.setValue(`2x6 (+$${this.component.rafters})`)
            this.numberGUI.rafterType.setValue(`+ $${this.component.rafters}`)
        }
        if (PARAMS.rafterType === '3x8') {
            this.component.rafters = 2.64
            this.infoGUI.rafterType.setValue(`3x8 (+$${this.component.rafters})`)
            this.numberGUI.rafterType.setValue(`+ $${this.component.rafters}`)
        }
    }

    beams() {
        if (PARAMS.beamsType === 'double' && PARAMS.beamsSizeType === '8x3') {
            if (PARAMS.attachment === 'free standing') {
                this.component.beams = 4.8
            }
            else {
                this.component.beams = 1.5
            }
            this.infoGUI.beamsSizeType.setValue(`8x3 (+$${this.component.beams})`)
            this.numberGUI.beamsType.setValue(`+ $${this.component.beams}`)
        }
        else {
            this.component.beams = 0
            this.numberGUI.beamsType.setValue(`+ $${this.component.beams}`)
        }
    }

    totalRoof() {
        const area = PARAMS.roofWidth * PARAMS.roofDepth
        this.component.totalRoof = (this.component.roof + this.component.attachment + this.component.rafters + this.component.beams) * area
        this.component.totalRoof.toFixed(2)

        this.numberGUI.totalRoof.setValue(`($${this.component.roof.toFixed(2)} + $${this.component.attachment.toFixed(2)} + $${this.component.rafters.toFixed(2)} + $${this.component.beams.toFixed(2)}) * ${area} = $${this.component.totalRoof.toFixed(2)}`)
    }

    posts() {
        if (PARAMS.postsType === 'default') {
            this.component.posts = 417
        }
        if (PARAMS.postsType === '8x8') {
            this.component.posts = 850
        }
        if (PARAMS.postsType === '10x10') {
            this.component.posts = 1125
        }
        if (PARAMS.postsType === 'D=8') {
            this.component.posts = 700
        }
        if (PARAMS.postsType === 'D=10') {
            this.component.posts = 850
        }

        let postsNumber = PARAMS.postsNumber * 2
        if (PARAMS.attachment === 'free standing')
            postsNumber = PARAMS.postsNumber * 2
        if (PARAMS.attachment === 'attached')
            postsNumber = PARAMS.postsNumber

        this.component.totalPosts = this.component.posts * postsNumber
        this.numberGUI.postsType.setValue(`$${this.component.posts} * ${postsNumber} = $${this.component.totalPosts}`)
    }

    total() {
        const summary = this.component.totalRoof + this.component.totalPosts
        this.numberGUI.total.setValue(`${summary.toFixed(2)}`)
    }

    create() {
        this.roof()
        this.attachment()
        this.rafters()
        this.beams()
        this.totalRoof()
        this.posts()
        this.total()
    }

    update() {
        this.delete()

        this.setGUI()

        this.create()
    }

}

