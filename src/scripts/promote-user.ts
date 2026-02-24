import prisma from '../lib/prisma';

async function promote() {
    await prisma.user.update({
        where: { email: 'lucio@itia.ar' },
        data: { role: 'ADMIN' }
    });
    console.log('User lucio@itia.ar promoted to ADMIN');
}

promote()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
