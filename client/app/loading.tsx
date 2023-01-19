import React from 'react';
import { VscLoading } from 'react-icons/vsc';

const Loading = () => {
  return (
    <div className='w-80 h-32 border border-slate-400 rounded flex justify-center items-center'>
      <div className='transition-all animate-spin'>
        <VscLoading />
      </div>
    </div>
  );
};

export default Loading;