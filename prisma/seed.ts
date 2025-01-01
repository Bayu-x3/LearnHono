import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // Seeding Categories
    const categories = await prisma.category.createMany({
        data: [
            { name: "Technology" },
            { name: "Lifestyle" },
            { name: "Education" },
        ],
    });
    console.log("Categories seeded!");

    const categoryTech = await prisma.category.findFirst({ where: { name: "Technology" } });
    const categoryLife = await prisma.category.findFirst({ where: { name: "Lifestyle" } });

    await prisma.post.createMany({
        data: [
            { title: "Post 1", content: "Content 1", categoryId: categoryTech?.id || 1 },
            { title: "Post 2", content: "Content 2", categoryId: categoryLife?.id || 2 },
        ],
    });
    console.log("Posts seeded!");

    // Seeding Films
    await prisma.films.createMany({
        data: [
            { title: "Film 1", description: "Just film 1", sinopsis: "Sinopsis film 1", year: 2022 },
            { title: "Film 2", description: "Just film 2", sinopsis: "Sinopsis film 2", year: 2023 },
            { title: "Film 3", description: "Just film 3", sinopsis: "Sinopsis film 3", year: 2024 },
        ],
    });
    console.log("Films seeded!");


    const hashedPassword1 = await bcrypt.hash("password123", 10);
    const hashedPassword2 = await bcrypt.hash("securepass456", 10);

    await prisma.user.createMany({
        data: [
            { name: "Admin User", username: "admin", password: hashedPassword1, role: "Admin" },
            { name: "Regular User", username: "user", password: hashedPassword2, role: "User" },
        ],
    });
    console.log("Users seeded!");

    console.log("Seeding completed successfully!");
}

main()
    .catch((e) => {
        console.error("Seeding error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
