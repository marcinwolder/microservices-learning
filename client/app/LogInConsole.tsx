import React from 'react';
import Link from 'next/link';

const LogInConsole = () => {
  return (
    <div className='flex gap-2 items-center'>
      <button className='px-4 py-1 rounded border border-black hover:bg-slate-600 hover:text-white'><Link href={"./user/sign-up"}>Sign Up</Link></button>
      <button className='px-4 py-1 rounded border border-black hover:bg-slate-600 hover:text-white'><Link href={"./user/sign-in"}>Sign In</Link></button>
    </div>
  );
};

export default LogInConsole;