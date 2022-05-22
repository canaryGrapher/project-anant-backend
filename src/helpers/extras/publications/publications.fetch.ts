import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const fetchAllPublications = async () => {
    const AllPublications = await prisma.publications.findMany({
        select: {
            id: true,
            title: true,
            author: true,
            year: true,
            journal: true,
            volume: true,
            pages: true,
            month: true,
            url: true,
            favorite: true
        }
    })
    return AllPublications;
}

export default fetchAllPublications;
