import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.post.createMany({
        data: [
            { title: "Post 1", content: "Content 1" },
            { title: "Post 2", content: "Content 2" },
        ],
    });

    await prisma.films.createMany({
        data : [
            { title: "Film 1", description: "Just film 1", sinopsis: "Sinopsis film 1", year: 2022},
            { title: "Film 2", description: "Just film 2", sinopsis: "Sinopsis film 2", year: 2023},
            { title: "Film 3", description: "Just film 3", sinopsis: "Sinopsis film 3", year: 2024},
        ]
    })

    console.log('Seeding success');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async() => {
    await prisma.$disconnect();
})