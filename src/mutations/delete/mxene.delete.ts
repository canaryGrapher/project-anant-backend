import { requestBodyForDeletingMxene } from "@typeDeclarations/mxene"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


const deleteMxeneDetails = async (deleteParameter: requestBodyForDeletingMxene) => {
    const mxene = await prisma.mxene.delete({
        where: {
            id: deleteParameter.id,
        }
    })
    return mxene
}


export default deleteMxeneDetails;
