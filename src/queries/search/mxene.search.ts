import { searchObjects } from "@typeDeclarations/mxene"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

// function to remove empty keys from the object
const filterSearchResults = (searchParameters: searchObjects) => {
    Object.keys(searchParameters).forEach((key: string) => {
        if (key === 'currentPage' || searchParameters[key as keyof searchObjects].toString() === '') {
            delete searchParameters[key as keyof searchObjects];
        }
    });
    return searchParameters;
}

const fetchMxeneDetails = async (searchParameters: searchObjects) => {
    const currentPage = searchParameters.currentPage;
    const filteredSearchParameters: searchObjects = filterSearchResults(searchParameters);
    console.log("Reached here")
    const SearchResults: any = await prisma.mxene.findMany({
        skip: (currentPage - 1) * 20,
        take: 20,
        where: filteredSearchParameters,
        select: {
            id: true,
            mxene: true,
            bandGap: true,
            latticeConstant: true,
            magneticMoment: true,
        }
    })

    const totalResults = await prisma.mxene.count({
        where: filteredSearchParameters,
    })

    const totalPages = Math.ceil(totalResults / 20);

    const SearchResultObject: any = {
        currentPage: currentPage,
        totalPages: totalPages,
        totalResults: totalResults,
        mxenes: SearchResults,
    }

    return SearchResultObject;
}


export default fetchMxeneDetails;
