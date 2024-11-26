import LandingSection from '@/components/LandingSection';
import { checkUser } from '@/lib/checkUser';

export default async function Home() {
  const user = await checkUser();

  if (!user) {
    return <LandingSection />;
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
