'use client';

import { SignUp } from '@clerk/nextjs';
import React from 'react';
// import { dark } from '@clerk/themes';

const SignUpComponent = () => {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary:
            'bg-green-500 text-white hover:bg-green-600 !shadow-none',
          footerActionLink: 'text-green-500 hover:text-green-600',
        },
      }}
      signInUrl={'/signin'}
      routing='hash'
      afterSignOutUrl='/'
    />
  );
};

export default SignUpComponent;
