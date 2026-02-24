import prisma from '../lib/prisma';

async function checkUsers() {
    const users = await prisma.user.findMany();
    console.log(JSON.stringify(users.map(u => ({ email: u.email, role: u.role })), null, 2));
}

checkUsers()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
