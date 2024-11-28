'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const hiddenPaths = ['/dashboard', '/addShop', '/profile', '/settings'];

  if (hiddenPaths.includes(pathname)) {
    return null; // Don't render Header and Footer
  }

  return (
    <footer className='w-full bg-gray-800 text-white py-6 mt-auto'>
      <div className='container mx-auto flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0'>
        {/* CopyRight Section */}
        <p className='text-sm text-center md:text-left'>
          &copy; 2024 Eagle Analytics. All Rights Reserved.
        </p>

        {/* Navigation Links */}
        <div className='flex flex-wrap justify-center gap-4'>
          {['About', 'Privacy Policy', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              scroll={false}
              className='text-sm hover:text-green-400 transition-colors'
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Developer Attribution */}
        <div>
          <Link
            href='https://github.com/MohamedHNoor' // Replace with the correct URL
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm hover:text-green-400 transition-colors'
          >
            Developed by MohamedHNoor
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
