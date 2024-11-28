'use client';
import { useRef } from 'react';
import { AddShop } from '@/app/actions/AddShop';
// import { toast } from 'react-toastify';

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const { error } = await AddShop(formData);

    if (error) {
      // toast.error(error);
      alert(error);
    } else {
      // toast.success('Transaction added');
      alert('Shop added');
      formRef.current?.reset();
    }
  };

  return (
    <>
      <h3 className='text-xl font-semibold mb-6'>Add Shop</h3>
      <form ref={formRef} action={clientAction} className='space-y-4'>
        <div className='flex flex-col'>
          <label
            htmlFor='name'
            className='mb-1 text-sm font-medium text-gray-700'
          >
            Shop Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Enter shop name...'
            className='p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none'
          />
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='town'
            className='mb-1 text-sm font-medium text-gray-700'
          >
            Town
          </label>
          <input
            type='text'
            name='town'
            id='town'
            placeholder='Enter town name...'
            className='p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none'
          />
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='province'
            className='mb-1 text-sm font-medium text-gray-700'
          >
            Province
          </label>
          <input
            type='text'
            name='province'
            id='province'
            placeholder='Enter province name...'
            className='p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none'
          />
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor='contact_number'
            className='mb-1 text-sm font-medium text-gray-700'
          >
            Contact Number
          </label>
          <input
            type='number'
            name='contact_number'
            id='contact_number'
            placeholder='Enter contact number...'
            className='p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
        >
          Add Shop
        </button>
      </form>
    </>
  );
};

export default AddTransaction;
