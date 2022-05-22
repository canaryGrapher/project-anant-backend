import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const fetchAllUpdates = async () => {
    const AllUpdates = await prisma.updates.findMany({
        select: {
            id: true,
            message: true,
            date: true,

        }
    })
    return AllUpdates;
}

export default fetchAllUpdates;
