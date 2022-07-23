import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const fetchAllEmails = async (email: string) => {
    const EmailExists = await prisma.users.findFirst({
        where: { email: email },
        select: {
            id: true,
        }
    })
    if (!EmailExists) {
        await prisma.users.create({
            data: {
                email: email,
            }
        })
    };
    return EmailExists;
}

export default fetchAllEmails;
