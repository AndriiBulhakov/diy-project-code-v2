
export default class PatioSizes {
    constructor() {

        this.sizes = {

        }

        this.size10x10 = () => {
            const patioSizes = [10, 10]
            return patioSizes
        }
        this.size11x11 = () => {
            const patioSizes = [11, 11]
            return patioSizes
        }
        this.size12x12 = () => {
            const patioSizes = [12, 12]
            return patioSizes

        }
        this.size12x16 = () => {
            const patioSizes = [12, 16]
            return patioSizes

        }
        this.size12x20 = () => {
            const patioSizes = [12, 20]
            return patioSizes

        }

        this.size12x24 = () => {
            const patioSizes = [12, 24]
            return patioSizes
        }

        this.doCustom = false
    }

}
const patioSizesFunctions = {
    patioSize10x10: patioSize10x10,
    patioSize11x11: patioSize11x11,
    patioSize12x12: patioSize12x12,
    patioSize12x16: patioSize12x16,
    patioSize12x20: patioSize12x20,
    patioSize12x24: patioSize12x24,
    doCustom: false,
}

function patioSize10x10() {
    const patioSize11 = [10, 10]
    return patioSize11

}
function patioSize11x11() {
    const patioSize11 = [11, 11]
    return patioSize11

}
function patioSize12x12() {
    const patioSize11 = [12, 12]
    return patioSize11

}
function patioSize12x16() {
    const patioSize11 = [12, 16]
    return patioSize11

}
function patioSize12x20() {
    const patioSize11 = [12, 20]
    return patioSize11

}

function patioSize12x24() {
    const patioSize11 = [12, 24]
    return patioSize11

}

export { patioSizesFunctions, patioSize10x10, patioSize11x11, patioSize12x12, patioSize12x16, patioSize12x20, patioSize12x24 }


