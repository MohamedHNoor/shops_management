import { Loader2 } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div className='flex items-center justify-center space-x-2 p-4'>
      <Loader2 className='animate-spin text-green-500' size={24} />
      <span className='text-lg text-gray-700'>Loading...</span>
    </div>
  );
};

export default Loading;
