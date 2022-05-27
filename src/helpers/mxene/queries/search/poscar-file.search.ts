import { searchById } from "@typeDeclarations/mxene"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const singleSearch = async (searchParameters: searchById) => {
    const SearchResults = await prisma.mxene.findMany({
        where: { id: searchParameters.id },
        select: {
            poscar_file: true,
        }
    })
    return SearchResults;
}

export default singleSearch;
