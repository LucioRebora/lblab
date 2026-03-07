const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const derivaciones = await prisma.derivacion.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    })
    console.log(JSON.stringify(derivaciones, null, 2))
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
