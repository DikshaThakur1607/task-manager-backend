import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.delete({
    where: { email: 'dthakur2299@gmail.com' },
  });
  console.log("✅ User deleted! You can now sign up again.");
}

main();