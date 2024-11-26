import { checkUser } from '@/lib/checkUser';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

const LandingSection = dynamic(() => import('@/components/LandingSection'));

export default async function Home() {
  const user = await checkUser();

  if (user) {
    return redirect('/dashboard');
  }

  return <LandingSection />;
}
