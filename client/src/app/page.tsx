import LandingSection from '@/components/LandingSection';
import { checkUser } from '@/lib/checkUser';
import { redirect } from 'next/navigation';
export default async function Home() {
  const user = await checkUser();

  if (user) {
    return redirect('/dashboard');
  }

  return <LandingSection />;
}
