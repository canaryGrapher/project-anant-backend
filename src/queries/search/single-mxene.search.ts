import { searchById } from "@typeDeclarations/mxene"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const singleSearch = async (searchParameters: searchById) => {
    const SearchResults = await prisma.mxene.findMany({
        where: { id: searchParameters.id },
        select: {
            id: true,
            M1: true,
            M2: true,
            X: true,
            T1: true,
            T2: true,
            mxene: true,
            isMetallic: true,
            bandGap: true,
            latticeConstant: true,
            magneticMoment: true,
        }
    })
    return SearchResults;
}


export default singleSearch;
