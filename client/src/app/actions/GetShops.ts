'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { Shop } from '@/lib/types';
import { checkAdminStatus } from './GetAdmin';

export const GetAllShops = async (): Promise<{
  data?: Shop[];
  error?: string;
}> => {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const admin = await checkAdminStatus();

    const shopsQuery = admin
      ? prisma.shop.findMany({ orderBy: { createdAt: 'desc' } })
      : prisma.shop.findMany({
          where: {
            userId,
          },
          orderBy: { createdAt: 'desc' },
        });

    const shops = await shopsQuery;

    return { data: shops };
  } catch {
    return { error: 'Failed to get shops' };
  }
};
