import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Suspense } from 'react';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={roboto.className}>
          <main className='min-h-screen'>
            <Suspense fallback={null}>{children}</Suspense>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
