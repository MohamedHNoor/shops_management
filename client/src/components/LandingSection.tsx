import Image from 'next/image';
import Link from 'next/link';

function LandingSection() {
  return (
    <div className=''>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between gap-x-3'>
        {/* <!--Left Col--> */}
        <div className='flex flex-col w-full md:w-1/2 justify-center items-start text-center md:text-left'>
          <p className='uppercase tracking-loose w-full'>Eagle Analytics</p>
          <h1 className='my-4 text-5xl font-bold leading-tight'>
            Empowering Insights, Driving Excellence
          </h1>
          <p className='leading-normal text-2xl mb-8'>
            Transforming data into actionable strategies with our cutting-edge
            analytics solutions.
          </p>
          <Link
            href={'/signin'}
            className='mx-auto lg:mx-0 bg-green-500 text-gray-800 font-bold rounded-md my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out'
          >
            Add Shop
          </Link>
        </div>
        {/* <!--Right Col--> */}
        <div className='w-full md:w-1/2 py-6 text-center'>
          <Image
            className='w-full border border-green-500 rounded-md z-50'
            src='/shop.jpg'
            alt='Shop'
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
export default LandingSection;
