import './global.css';
import Link from 'next/link';
import { headers as getHeaders } from 'next/headers';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

import { useClient } from '@/hooks/use-client';
import LogInConsole from './LogInConsole';
import LogOutConsole from './LogOutConsole';
import genHeaders from '@/src/genHeaders';

export const revalidate = 0;

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const client = useClient();
	const headers = genHeaders(getHeaders());
  const supabase = createBrowserSupabaseClient();

	const currentUser = await client
		.get('/auth/currentUser', { headers })
		.then((res) => res.data);

	return (
		<html>
			<head />
			<body>
        <SessionContextProvider supabaseClient={supabase}>
          <div className=' bg-slate-400 flex px-6 py-1 justify-between items-center'>
            <div className='p-2 font-bold text-2xl italic'>
              <Link href={'/'}>LMuML</Link>
            </div>
            {currentUser && <p>{currentUser.email}</p>}
            {currentUser ? <LogOutConsole /> : <LogInConsole />}
          </div>
          {children}
        </SessionContextProvider>
			</body>
		</html>
	);
}
