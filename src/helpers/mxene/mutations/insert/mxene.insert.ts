import { requestBodyForAddingMxene } from "@typeDeclarations/mxene"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


const addMxeneDetails = async (searchParameters: requestBodyForAddingMxene) => {
    const mxeneName: string = `${searchParameters.M1}-${searchParameters.M2}-${searchParameters.X}-${searchParameters.T1}-${searchParameters.T2}`
    const bandGapFormat: string = parseFloat(searchParameters.bandGap).toFixed(4)
    const latticeConstantFormat: string = parseFloat(searchParameters.latticeConstant).toFixed(4)
    const magneticMomentFormat: string = parseFloat(searchParameters.magneticMoment).toFixed(4)

    const newMxene = await prisma.mxene.create({
        data: {
            M1: searchParameters.M1,
            M2: searchParameters.M2,
            T1: searchParameters.T1,
            T2: searchParameters.T2,
            X: searchParameters.X,
            bandGap: bandGapFormat,
            isMetallic: parseFloat(searchParameters.bandGap) == 0,
            latticeConstant: latticeConstantFormat,
            magneticMoment: magneticMomentFormat,
            mxene: mxeneName,
            poscar_file: `poscars/relax_POSCAR_${mxeneName}`,
            bands_dat: `band_dat/bands_${mxeneName}.dat`,
            bands_png: `band_plots/bands_${mxeneName}.png`,
        },
    })
    return newMxene
}


export default addMxeneDetails;
