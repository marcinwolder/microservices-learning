import React from 'react';
import Link from 'next/link';

const LogInConsole = () => {
  return (
    <div className='flex gap-2 items-center'>
      <Link href={"./user/sign-up"}><button className='px-4 py-1 rounded border border-black hover:bg-slate-600 hover:text-white'>Sign Up</button></Link>
      <Link href={"./user/sign-in"}><button className='px-4 py-1 rounded border border-black hover:bg-slate-600 hover:text-white'>Sign In</button></Link>
    </div>
  );
};

export default LogInConsole;