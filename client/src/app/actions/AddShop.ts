'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Shop } from '@/lib/types';

interface ShopResult {
  data?: Shop;
  error?: string;
}

export const AddShop = async (formData: FormData): Promise<ShopResult> => {
  const name = formData.get('name') as string;
  const town = formData.get('town') as string;
  const province = formData.get('province') as string;
  const contactNumber = formData.get('contact_number') as string;

  // check for input values
  if (!name || !town || !province) {
    return { error: 'All fields are required' };
  }

  // get logged in user
  const { userId } = await auth();

  // check for user
  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const shopData = await prisma.shop.create({
      data: {
        name,
        town,
        province,
        contactNumber,
        userId,
      },
    });

    // revalidate the cache
    revalidatePath('/dashboard');

    return { data: shopData };
  } catch {
    return { error: 'Failed to add shop' };
  }
};
