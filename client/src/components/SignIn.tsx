'use client';

import { SignIn } from '@clerk/nextjs';
import React from 'react';

const SignInComponent = () => {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary:
            'bg-green-500 text-white hover:bg-green-700 !shadow-none',
          footerActionLink: 'text-green-500 hover:text-green-600',
        },
      }}
      signUpUrl='/signup'
      routing='hash'
      afterSignOutUrl='/'
    />
  );
};

export default SignInComponent;
