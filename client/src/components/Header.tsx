import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <nav className='w-full bg-white shadow-md px-8'>
      <div className=' container mx-auto flex justify-between items-center '>
        {/* Logo Section */}

        <Link href='/' scroll={false}>
          <Image
            src='/logo.png'
            alt='logo'
            width={100}
            height={100}
            className='w-full h-full'
          />
        </Link>

        {/* Actions Section */}
        <div className='flex items-center gap-4'>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonOuterIdentifier: 'text-green-500',
                  userButtonBox: 'scale-90 sm:scale-100',
                },
              }}
              showName={true}
              userProfileMode='navigation'
              userProfileUrl='/dashboard'
            />
          </SignedIn>
          <SignedOut>
            <Link
              href='/signin'
              className='px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600'
              scroll={false}
            >
              Log in
            </Link>
            <Link
              href='/signup'
              className='px-4 py-2 text-sm font-medium text-green-500 border border-green-500 rounded hover:bg-green-500 hover:text-white'
              scroll={false}
            >
              Sign up
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}

export default Header;
