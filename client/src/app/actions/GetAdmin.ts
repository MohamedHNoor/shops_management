import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/db';

export const checkAdminStatus = async () => {
  const user = await currentUser();
  if (!user) {
    return false;
  }

  const userDb = await prisma.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  return userDb?.role === 'ADMIN';
};
