import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client'; // or your types file

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding users...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      name: 'System Administrator',
      // Providing both to satisfy the schema
      passwordHash: hashedPassword, // This is the field Prisma is asking for
      role: UserRole.ADMIN,
      active: true,
    }
  });


  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });