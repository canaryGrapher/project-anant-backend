import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const mxenePaths = async () => {
    const SearchResults = await prisma.mxene.findMany({
        select: {
            id: true,
        }
    })
    return SearchResults;
}

export default mxenePaths;
