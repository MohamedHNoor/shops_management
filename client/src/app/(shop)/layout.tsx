import { SidebarProvider } from '@/components/ui/sidebar';
import ShopSidebar from '@/components/ShopSidebar';
import { checkUser } from '@/lib/checkUser';
import { redirect } from 'next/navigation';

async function ShopLayout({ children }: { children: React.ReactNode }) {
  const user = await checkUser();
  if (!user) {
    return redirect('/');
  }

  return (
    <SidebarProvider>
      <div className='min-h-screen w-full bg-customgreys-primarybg flex'>
        <ShopSidebar />
        <main className='px-8 py-20 w-screen'>{children}</main>
      </div>
    </SidebarProvider>
  );
}
export default ShopLayout;
