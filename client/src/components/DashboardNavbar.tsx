'use client';

import { UserButton } from '@clerk/nextjs';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Navbar = () => {
  return (
    <nav className='bg-white shadow-md p-4'>
      <div className='w-full mx-auto flex justify-between items-center'>
        {/* Sidebar trigger for mobile */}
        <div className='md:hidden'>
          <SidebarTrigger className='text-gray-700 hover:text-gray-900' />
        </div>

        {/* User button */}
        <div className='flex items-center ml-auto'>
          <UserButton
            appearance={{
              elements: {
                userButtonOuterIdentifier: 'text-gray-600 hover:text-gray-800',
                userButtonBox: 'scale-90 sm:scale-100',
              },
            }}
            showName={true}
            userProfileMode='navigation'
            userProfileUrl={'/profile'}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
