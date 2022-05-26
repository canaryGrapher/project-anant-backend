import { searchById } from "@typeDeclarations/mxene"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const singleSearch = async (searchParameters: searchById) => {
    const SearchResults = await prisma.mxene.findMany({
        where: { id: searchParameters.id },
        select: {
            id: true,
            mxene: true,
            isMetallic: true,
            bandGap: true,
            latticeConstant: true,
            magneticMoment: true,
            poscar_file: true,
            bands_png: true,
        }
    })
    return SearchResults;
}

export default singleSearch;
