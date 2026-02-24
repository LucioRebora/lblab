import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Update Global Config for Veterinarias
    await prisma.globalConfig.upsert({
        where: { key: 'NBU_VALUE_VET' },
        update: { value: '686' },
        create: { key: 'NBU_VALUE_VET', value: '686' },
    })

    await prisma.globalConfig.upsert({
        where: { key: 'VIGENCIA_VET' },
        update: { value: 'enero 2026' },
        create: { key: 'VIGENCIA_VET', value: 'enero 2026' },
    })

    const veterinaryAnalyses = [
        { name: 'ACIDO FOLICO', nbuUnits: 11, category: 'VETERINARIA' },
        { name: 'ALANINO AMINOTRASFERASA (GPT)', nbuUnits: 1.5, category: 'VETERINARIA' },
        { name: 'ALBUMINA', nbuUnits: 1.5, category: 'VETERINARIA' },
        { name: 'ALDOLASA', nbuUnits: 6, category: 'VETERINARIA' },
    ]

    for (const analysis of veterinaryAnalyses) {
        await prisma.analysisPrice.upsert({
            where: { name: analysis.name },
            update: {
                nbuUnits: analysis.nbuUnits,
                category: analysis.category
            },
            create: analysis,
        })
    }

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
