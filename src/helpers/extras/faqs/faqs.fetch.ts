import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const fetchAllFAQs = async () => {
    const AllFaqs = await prisma.faqs.findMany({
        select: {
            id: true,
            question: true,
            answer: true,
        }
    })
    return AllFaqs;
}

export default fetchAllFAQs;
