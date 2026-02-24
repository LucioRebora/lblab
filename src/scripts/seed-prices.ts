import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data = [
    { name: "ANTIFUNGIGRAMA", nbuUnits: 10 },
    { name: "ANTIBIOGRAMA", nbuUnits: 9 },
    { name: "BACILOSCOPIA", nbuUnits: 5 },
    { name: "CALCEMIA", nbuUnits: 1.5 },
    { name: "CALCIURIA", nbuUnits: 2 },
    { name: "CALCIURIA (Orina espontánea)", nbuUnits: 2 },
    { name: "TOXINA CLOSTRIDIUM DIFICCILE (Toxina A + Toxina B)", nbuUnits: 80 },
    { name: "COCAINA EN ORINA (SCREENING)", nbuUnits: 17.5 },
    { name: "COOMBS DIRECTA", nbuUnits: 2 },
    { name: "PRUEBA DE COOMBS INDIRECTA", nbuUnits: 6 },
    { name: "COPROCULTIVO", nbuUnits: 10 },
    { name: "CULTIVO", nbuUnits: 9 },
    { name: "CULTIVO BACILOS ÁCIDO-ALCOHOL RESISTENTES", nbuUnits: 10 },
    { name: "HEMOCULTIVO (Sencillo)", nbuUnits: 7.5 },
    { name: "DETERMINACION DE ANTIGENO NS1, Ac IgM y Ac IgG PARA DENGUE", nbuUnits: 70 },
    { name: "DIMERO D", nbuUnits: 115 },
    { name: "ESTADO ACIDO BASE", nbuUnits: 20 },
    { name: "ESPERMOCULTIVO", nbuUnits: 7 },
    { name: "ESPERMOGRAMA", nbuUnits: 28 },
    { name: "ESPUTO", nbuUnits: 9 },
    { name: "BUSQUEDA DE STAPHYLOCOCCUS AUREUS", nbuUnits: 9 },
    { name: "EXAMEN FUNCIONAL DE HECES", nbuUnits: 7 },
    { name: "EXUDADO DE LAGRIMAL", nbuUnits: 7 },
    { name: "EXUDADO DE OIDO", nbuUnits: 7 },
    { name: "EXUDADO URETRAL", nbuUnits: 11 },
    { name: "FLUJO VAGINAL", nbuUnits: 16 },
    { name: "PARASITOLOGICO FRESCO", nbuUnits: 4 },
    { name: "HEMOGRAMA", nbuUnits: 5 },
    { name: "HEMOCULTIVO (Especial)", nbuUnits: 30 },
    { name: "HISOPADO ANAL", nbuUnits: 9 },
    { name: "HISOPADO DE FAUCES (Cultivo)", nbuUnits: 5 },
    { name: "HISOPADO NASAL", nbuUnits: 7 },
    { name: "HISOPADO RECTAL", nbuUnits: 7 },
    { name: "HISOPADO VAGINAL", nbuUnits: 9 },
    { name: "HISTAMINA PLAMATICA", nbuUnits: 38 },
    { name: "IONOGRAMA PLASMATICO", nbuUnits: 4.5 },
    { name: "IONOGRAMA URINARIO (Orina aislada)", nbuUnits: 3.5 },
    { name: "IONOGRAMA URINARIO", nbuUnits: 3.5 },
    { name: "MARIHUANA EN ORINA (SCREENING)", nbuUnits: 17.5 },
    { name: "EXAMEN DE MATERIA FECAL (I)", nbuUnits: 8 },
    { name: "EXAMEN DE MATERIA FECAL (II)", nbuUnits: 4 },
    { name: "MICOLOGICO", nbuUnits: 10 },
    { name: "MICROALBUMINURIA 24 HS", nbuUnits: 12.5 },
    { name: "INVESTIGACIÓN MYCOPLASMA HOMINIS", nbuUnits: 25 },
    { name: "PROTEINA C REACTIVA", nbuUnits: 5 },
    { name: "NT-proBNP", nbuUnits: 95 },
    { name: "PROCALCITONINA", nbuUnits: 137 },
    { name: "PROTEINURIA AL AZAR", nbuUnits: 1.5 },
    { name: "PROTEINURIA 24 HS", nbuUnits: 1.5 },
    { name: "MICROALBUMINURIA (Directa)", nbuUnits: 16 },
    { name: "ROTAVIRUS-Ag / ADENOVIRUS-Ag (MATERIA FECAL)", nbuUnits: 44 },
    { name: "EXAMEN PARASITOLÓGICO EN MATERIA FECAL", nbuUnits: 4 },
    { name: "SANGRE OCULTA MAFETERIA FECAL", nbuUnits: 8 },
    { name: "EXAMEN PARASITOLOGICO EN MATERIA FECAL (Test de Graham)", nbuUnits: 3 },
    { name: "TEST RAPIDO PARA DETECCION DE STREPTOCOCCUS grupo A", nbuUnits: 12.5 },
    { name: "TROPONINA I - (CUANTITATIVA).", nbuUnits: 50 },
    { name: "TROPONINA T", nbuUnits: 50 },
    { name: "INVESTIGACIÓN UREAPLASMA UREALYTICUM", nbuUnits: 25 },
    { name: "UROCULTIVO", nbuUnits: 20 },
    { name: "REACCION DE WIDAL", nbuUnits: 4 },
];

async function main() {
    console.log("Seeding prices...");

    // Set NBU value first
    await prisma.globalConfig.upsert({
        where: { key: "NBU_VALUE" },
        update: { value: "529" },
        create: { key: "NBU_VALUE", value: "529" }
    });

    await prisma.globalConfig.upsert({
        where: { key: "VIGENCIA" },
        update: { value: "Febrero 2026" },
        create: { key: "VIGENCIA", value: "Febrero 2026" }
    });

    for (const item of data) {
        await prisma.analysisPrice.upsert({
            where: { name: item.name },
            update: { nbuUnits: item.nbuUnits },
            create: { name: item.name, nbuUnits: item.nbuUnits }
        });
    }

    console.log("Seed finished!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
