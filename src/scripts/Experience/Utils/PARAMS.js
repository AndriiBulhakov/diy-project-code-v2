const PARAMS =
{
    patioType: 'lattice', // solid, lattice, insulated
    patioSizes: '10x10', // '10x10', '11x11', '12x12', '12x16', '12x20', '12x24'
    patioProjection: '10', // '10', '11', '12'
    roofWidth: 10,
    roofDepth: 10,
    attachment: 'attached', // 'free standing', 'attached'
    attachmentType: 'wall', // 'roof', 'fasciaEave', 'underEave', 'wall', 
    latticeType: '2x2', // '2x2', '3x2'
    latticeMaxDistance: 0.1667, //2 inch = 0.1667
    latticeSizes: {
        height: 0.1667, //2 inch
        depth: 0.1667, //2 inch
    },
    rafterType: '2x6', // '2x6', '3x8'
    raftersSizes: {
        width: 0.1667, // 2 inch 
        height: 0.5    // 6 inch
    },
    rafterMaxDistance: 2, //2 ft 
    postsNumber: 2,
    postsSizes: {
        height: 10, // 8 ft
        widthSide: 0.5, // 6 inch
        depthSide: 0.167, // 2 inch
        widthCenter: 0.25, // 3 inch
        depthCenter: 0.25, // 3 inch
        diametr: 0 // 0.66 ft = 8 inch
    },
    postsType: 'default', // 'default', '8x8', '10x10', 'D=8', 'D=10'
    postsHeight: '8 ft', // '8 ft', '10 ft'
    beamsSizes: {
        height: 0.66,
        depth: 0.25,
    },
    beamsType: 'single', // 'single', 'double'
    beamsSizeType: '8x3', // '6x2', '8x3'
}

export default PARAMS