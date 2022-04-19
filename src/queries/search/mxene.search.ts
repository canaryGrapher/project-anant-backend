import { searchObjects } from "@typeDeclarations/mxene"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

// function to remove empty keys from the object
const filterSearchResults = (searchParameters: any) => {
    Object.keys(searchParameters).forEach((key: string) => {
        if (searchParameters[key] === '') {
            delete searchParameters[key];
        }
    });
    return searchParameters;
}

const fetchMxeneDetails = async (searchParameters: searchObjects) => {
    const filteredSearchParameters = filterSearchResults(searchParameters);

    const SearchResults: any = await prisma.mxn_search_mxene.findMany({
        where: filteredSearchParameters,
        select: {
            M1: true,
            M2: true,
            X: true,
            T1: true,
            T2: true,
            name: true,
            Lc: true,
            Bg: true,
            Mm: true,
            poscar_file: true,
            bands_image: true,
            id: true,
        }
    })
    return SearchResults;
}


export default fetchMxeneDetails;
