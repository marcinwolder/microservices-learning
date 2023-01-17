"use client"

import { useClient } from '@/hooks/use-client';
import { useRouter } from 'next/navigation';
import React from 'react';

const LogOutConsole = () => {
  const client = useClient();
  const router = useRouter();

  const handleClick = async ()=>{
    await client.post("/auth/logout");
    router.refresh();
  }

  return (
    <div className='flex gap-2 items-center'>
      <button onClick={handleClick} className='px-4 py-1 rounded border border-black hover:bg-slate-600 hover:text-white'>Log Out</button>
    </div>
  );
};

export default LogOutConsole;