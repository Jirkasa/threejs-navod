/**
 * Models Data Object
 * - name: name of model
 * - modelName: name of file containing model
 * - srcFolder: path to folder of model
 * - textures: array of texture types for model (used when there is only one texture variation for model)
 * - textureVariations: array of objects describing texture variations for model (use when there are more texture variations for model)
 *      - Every object contains these properties:
 *          - name: name of texture variation
 *          - folderName: folder containing textures for this variation
 *          - types: array of texture types for this texture variation
 *          - some objects contain instead of types property parts property:
 *              - parts property contains array of objects describing textures (when has different textures for some parts):
 *                  - name: beginning name of textures
 *                  - types: array of texture types
 * - defaultTextureVariation: index of texture variation that should be displayed by default
 * - lod: true/false
 * - rotationParts: array of objects describing model parts that are supposed to be loaded
 *      - Every object contains these properties:
 *          - partName: Name of mesh that is supposed to be rotated
 *          - labelName: Label of input that will be used to rotate mesh
 *          - min: minimum rotation
 *          - max: maximum rotation
 */

/**
 * Texture Types
 * - BaseColor
 * - Metallic
 * - Roughness
 * - Normal
 * - AmbientOcclusion
 * - Alpha
 * - Emissive
 */


const modelsData = [
    {
        name: "Chair 1",
        modelName: "Chair1",
        srcFolder: "../static/models/chair1",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Chair 2",
        modelName: "Chair2",
        srcFolder: "../static/models/chair2",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Chair 3",
        modelName: "Chair3",
        srcFolder: "../static/models/chair3",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Chair 4",
        modelName: "Chair4",
        srcFolder: "../static/models/chair4",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Chair 5",
        modelName: "Chair5",
        srcFolder: "../static/models/chair5",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Armchair",
        modelName: "Armchair",
        srcFolder: "../static/models/armchair",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 1
    },
    {
        name: "Table 1",
        modelName: "Table1",
        srcFolder: "../static/models/table1",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2,
        envMapIntensity: 2.5
    },
    {
        name: "Table 2",
        modelName: "Table2",
        srcFolder: "../static/models/table2",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Table 3",
        modelName: "Table3",
        srcFolder: "../static/models/table3",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Table 4",
        modelName: "Table4",
        srcFolder: "../static/models/table4",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 1,
        envMapIntensity: 1.3
    },
    {
        name: "Table 5",
        modelName: "Table5",
        srcFolder: "../static/models/table5",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Desk",
        modelName: "Desk",
        srcFolder: "../static/models/desk",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Kitchen line",
        modelName: "KitchenLine",
        srcFolder: "../static/models/kitchen-line",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 1,
        envMapIntensity: 1.4
    },
    {
        name: "Kitchen line with sink",
        modelName: "KitchenLineWithSink",
        srcFolder: "../static/models/kitchen-line-with-sink",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2,
        envMapIntensity: 1.4
    },
    {
        name: "Library",
        modelName: "Library",
        srcFolder: "../static/models/library",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 1
    },
    {
        name: "Library Small",
        modelName: "LibrarySmall",
        srcFolder: "../static/models/library-small",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Cabinet",
        modelName: "Cabinet",
        srcFolder: "../static/models/cabinet",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Cabinet 2 Larger",
        modelName: "Cabinet2Larger",
        srcFolder: "../static/models/cabinet2larger",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Cabinet 2 Smaller",
        modelName: "Cabinet2Smaller",
        srcFolder: "../static/models/cabinet2smaller",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Cabinet 3",
        modelName: "Cabinet3",
        srcFolder: "../static/models/cabinet3",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Cabinet 4",
        modelName: "Cabinet4",
        srcFolder: "../static/models/cabinet4",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Cabinet 5",
        modelName: "Cabinet5",
        srcFolder: "../static/models/cabinet5",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Wardrobe",
        modelName: "Wardrobe",
        srcFolder: "../static/models/wardrobe",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Sofa",
        modelName: "Sofa",
        srcFolder: "../static/models/sofa",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Sofa2",
        modelName: "Sofa2",
        srcFolder: "../static/models/sofa2",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Bed",
        modelName: "Bed",
        srcFolder: "../static/models/bed",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                parts: [
                    {
                        name: "BedFrame",
                        types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
                    },
                    {
                        name: "BedMattress",
                        types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
                    }
                ]
            },
            {
                name: "dirty",
                folderName: "dirty",
                parts: [
                    {
                        name: "BedFrame",
                        types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
                    },
                    {
                        name: "BedMattress",
                        types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
                    }
                ]
            }
        ],
        defaultTextureVariation: 1,
        envMapIntensity: 1
    },
    {
        name: "Bench",
        modelName: "Bench",
        srcFolder: "../static/models/bench",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty with scratches",
                folderName: "dirty-with-scratches",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 2
    },
    {
        name: "Bath",
        modelName: "Bath",
        srcFolder: "../static/models/bath",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 1,
        envMapIntensity: 1
    },
    {
        name: "Toilet",
        modelName: "Toilet",
        srcFolder: "../static/models/toilet",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
            }
        ],
        defaultTextureVariation: 1,
        envMapIntensity: 1
    },
    {
        name: "Cooker",
        modelName: "Cooker",
        srcFolder: "../static/models/cooker",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion", "Alpha"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion", "Alpha"]
            }
        ],
        defaultTextureVariation: 1
    },
    {
        name: "Fridge",
        modelName: "Fridge",
        srcFolder: "../static/models/fridge",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion", "Alpha", "Emissive"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion", "Alpha", "Emissive"]
            }
        ],
        defaultTextureVariation: 1,
        envMapIntensity: 1.3,
        rotationParts: [
            {
                partName: "Fridge_DoorLower",
                labelName: "Dveře2",
                min: 0,
                max: Math.PI * 0.5
            },
            {
                partName: "Fridge_DoorUpper",
                labelName: "Dveře1",
                min: 0,
                max: Math.PI * 0.5
            }
        ]
    },
    {
        name: "Little Creature Statue",
        modelName: "LittleCreatureStatue",
        srcFolder: "../static/models/little-creature-statue",
        textures: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"],
        envMapIntensity: 1.5,
        lod: true
    },
    {
        name: "Wine Glass",
        modelName: "WineGlass",
        srcFolder: "../static/models/wine-glass",
        textureVariations: [
            {
                name: "clean",
                folderName: "clean",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion", "Alpha"]
            },
            {
                name: "dirty",
                folderName: "dirty",
                types: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion", "Alpha"]
            }
        ],
        defaultTextureVariation: 1
    },
    {
        name: "Apple",
        modelName: "Apple",
        srcFolder: "../static/models/apple",
        textures: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"],
        lod: true
    },
    {
        name: "Chocolate",
        modelName: "Chocolate",
        srcFolder: "../static/models/chocolate",
        textures: ["BaseColor", "Metallic", "Roughness", "Normal", "AmbientOcclusion"]
    }
]

export default modelsData;