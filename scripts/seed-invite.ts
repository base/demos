import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

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
            maxUses: 999,
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
