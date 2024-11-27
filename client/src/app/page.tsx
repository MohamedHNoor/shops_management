import { checkUser } from '@/lib/checkUser';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LandingSection = dynamic(() => import('@/components/LandingSection'));

export default async function Home() {
  const user = await checkUser();

  if (user) {
    return redirect('/dashboard');
  }

  return (
    <div className='flex flex-col min-h-screen w-full'>
      <Header />
      <main className='flex flex-grow w-full h-full justify-center items-center'>
        <LandingSection />
      </main>
      <Footer />
    </div>
  );
}
