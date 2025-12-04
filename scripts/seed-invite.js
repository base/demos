const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient({
    datasourceUrl: "file:./dev.db"
});

async function main() {
    const code = 'BASE-' + uuidv4().substring(0, 6).toUpperCase();
    console.log("Creating founder invite...");

    await prisma.invite.create({
        data: {
            code,
            type: 'founder',
            maxUses: 2147483647, // Effectively infinite
            status: 'unused'
        }
    });

    console.log("\n============================================");
    console.log("🎉 FOUNDER INVITE CODE GENERATED:");
    console.log(code);
    console.log("============================================\n");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
