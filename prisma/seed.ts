import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.post.createMany({
        data: [
            { title: "Post 1", content: "Content 1" },
            { title: "Post 2", content: "Content 2" },
        ],
    });

    console.log('Seeding success');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async() => {
    await prisma.$disconnect();
})