import { SidebarProvider } from '@/components/ui/sidebar';
import ShopSidebar from '@/components/ShopSidebar';
import { checkUser } from '@/lib/checkUser';
import { redirect } from 'next/navigation';
import DashboardNavbar from '@/components/DashboardNavbar';

async function ShopLayout({ children }: { children: React.ReactNode }) {
  const user = await checkUser();
  if (!user) {
    return redirect('/');
  }

  return (
    <SidebarProvider>
      <div className='min-h-screen w-full bg-customgreys-primarybg flex'>
        <ShopSidebar />
        <div className='w-screen'>
          <DashboardNavbar />
          <main className='px-8 py-20 w-full'>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
export default ShopLayout;
