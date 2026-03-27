// seedUser.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin123!", 10); // choose a strong password

  await prisma.user.create({
    data: {
      email: "admin@factory.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin user created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());