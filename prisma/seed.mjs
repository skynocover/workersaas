import pkg from '@prisma/client';
const { PrismaClient } = pkg;

// import sha256 from 'crypto-js/sha256';
const prisma = new PrismaClient();

async function main() {
  //   await prisma.users.create({
  //     data: {
  //       account: 'admin',
  //       password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
  //     },
  //   });
  // await prisma.services.create({
  //   data: {
  //     name: 'temp',
  //     active: false,
  //   },
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
