import { requestBodyForEditingMxene } from "@typeDeclarations/mxene"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


const updateMxeneDetails = async (updateParameter: requestBodyForEditingMxene) => {
    const mxeneName: string = `${updateParameter.M1}-${updateParameter.M2}-${updateParameter.X}-${updateParameter.T1}-${updateParameter.T2}`
    const bandGapFormat: string = parseFloat(updateParameter.bandGap).toFixed(4)
    const latticeConstantFormat: string = parseFloat(updateParameter.latticeConstant).toFixed(4)
    const magneticMomentFormat: string = parseFloat(updateParameter.magneticMoment).toFixed(4)

    const mxene = await prisma.mxene.update({
        where: {
            id: updateParameter.id,
        },
        data: {
            M1: updateParameter.M1,
            M2: updateParameter.M2,
            T1: updateParameter.T1,
            T2: updateParameter.T2,
            X: updateParameter.X,
            bandGap: bandGapFormat,
            isMetallic: parseFloat(updateParameter.bandGap) == 0,
            latticeConstant: latticeConstantFormat,
            magneticMoment: magneticMomentFormat,
            mxene: mxeneName,
            poscar_file: `poscars/relax_POSCAR_${mxeneName}`,
            bands_dat: `band_dat/bands_${mxeneName}.dat`,
            bands_png: `band_plots/bands_${mxeneName}.png`,

        }
    })
    return mxene
}


export default updateMxeneDetails;
