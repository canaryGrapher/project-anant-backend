import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const fetchAllEmails = async (email: string) => {
    const EmailExists = await prisma.users.findMany({
        where: { email: email },
        select: {
            id: true,
        }
    })
    if (EmailExists.length === 0) {
        await prisma.users.create({
            data: {
                email: email,
            }
        })
    };
    return EmailExists;
}

export default fetchAllEmails;
