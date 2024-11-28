import { currentUser } from '@clerk/nextjs/server';
import prisma from './db';

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userDb = await prisma.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  if (userDb) {
    return userDb;
  }

  const newUser = await prisma.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};
//  get admin user from db and check if user is admin
export const checkAdmin = async () => {
  const user = await checkUser();
  if (!user) {
    return false;
  }

  const userDb = await prisma.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  if (!userDb) {
    return false;
  }

  return userDb.role === 'ADMIN';
};
