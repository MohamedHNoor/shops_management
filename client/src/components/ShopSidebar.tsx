'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LogOut,
  PanelLeft,
  Settings,
  User,
  LayoutDashboard,
  Store,
} from 'lucide-react';
// import Loading from './Loading';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const ShopSidebar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const navLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Store, label: 'Add Shop', href: '#' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  // if (!isLoaded) return <Loading />;
  if (!user) return <div>User not found</div>;

  return (
    <Sidebar
      collapsible='icon'
      style={{ height: '100vh' }}
      className='border-none shadow-lg'
    >
      <SidebarHeader>
        <SidebarMenu className='mt-5 group-data-[collapsible=icon]:mt-7'>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              onClick={() => toggleSidebar()}
              className='group'
            >
              <div className='flex justify-between items-center gap-5 pl-3 pr-1 h-10 w-full group-data-[collapsible=icon]:ml-1 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:px-0 group'>
                <div className='flex items-center gap-5'>
                  <Image
                    src='/logo.png'
                    alt='logo'
                    width={60}
                    height={60}
                    className='transition duration-200 group-data-[collapsible=icon]:group-hover:brightness-75 w-auto'
                  />
                </div>
                <PanelLeft className='text-gray-400 w-5 h-5 group-data-[collapsible=icon]:hidden' />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className='mt-7 gap-0'>
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <SidebarMenuItem
                key={link.href}
                className={cn(
                  'group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:py-4 hover:bg-green-600',
                  isActive && 'bg-green-500'
                )}
              >
                <SidebarMenuButton
                  asChild
                  size='lg'
                  className={cn(
                    'gap-4 p-8 hover:bg-gray-500 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center',
                    !isActive && 'text-white'
                  )}
                >
                  <Link
                    href={link.href}
                    className='relative flex items-center'
                    scroll={false}
                  >
                    <link.icon
                      className={isActive ? 'text-white' : 'text-gray-800'}
                    />
                    <span
                      className={cn(
                        'font-medium text-md ml-4 group-data-[collapsible=icon]:hidden',
                        isActive ? 'text-white' : 'text-gray-800'
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
                {isActive && (
                  <div className='absolute right-0 top-0 h-full w-[4px] bg-green-500' />
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button onClick={() => signOut()} className='text-green-700 pl-8'>
                <LogOut className='mr-2 h-6 w-6' />
                <span>Sign out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ShopSidebar;
