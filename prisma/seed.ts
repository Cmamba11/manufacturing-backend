import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

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
      role: 'Administrator',
      active: true,
    }
  });
await prisma.sparePart.create({
  data: {
    name: 'Conveyor Belt XL',
    partNumber: 'CB-9000',
    category: 'Mechanical',
    quantity: 5,
    unit: 'pcs',
    minStock: 2,
    location: 'Shelf A1',
    date: '2024-03-20',
    timestamp: BigInt(Date.now()),
  },
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