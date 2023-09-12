import PARAMS from './Experience/Utils/PARAMS';


function controlsSetup() {
function patioTypesSetup() {

    if (PARAMS.patioType === 'solid') {
        roof.setScale(1)
        lattice.setScale(0)
        beams.setScale(1)
        posts.update()
    }
    if (PARAMS.patioType === 'lattice') {
        roof.setScale(0)
        lattice.setScale(1)
        beams.setScale(1)
        posts.update()
    }
    if (PARAMS.patioType === 'insulated') {
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

// Find control elements
const typeList = document.querySelector('#patio-type')

// Add event listener
typeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('button-item, is--type')) {
        let typeName = event.target.getAttribute('data-name')
        console.log('typeName: ', typeName)
    }

    console.log(event.target)

    // Set the value for the selected option
    PARAMS.patioType = event.target.value
    console.log('patioType: ', PARAMS.patioType)    
    patioTypesSetup()

    price.update()
})

}

export default controlsSetup