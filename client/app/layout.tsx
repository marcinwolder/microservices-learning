import './global.css';
import Link from 'next/link';
import { headers as getHeaders } from 'next/headers';

import { useClient } from '@/hooks/use-client';
import LogInConsole from './LogInConsole';
import LogOutConsole from './LogOutConsole';
import genHeaders from '@/utils/genHeaders';

export const revalidate = 0;

export default async function RootLayout({ children }: {
	children: React.ReactNode;
}) {
	const client = useClient();
	const headers = genHeaders(getHeaders());

	const currentUser = await client
		.get('/api/auth/currentUser', { headers })
		.then((res) => res.data);

	return (
		<html>
			<head />
			<body>
          <div className=' bg-slate-400 flex px-6 py-1 justify-between items-center'>
            <div className='p-2 font-bold text-2xl italic'>
              <Link href={'/'}>LMuML</Link>
            </div>
            {currentUser && <p>{currentUser.email}</p>}
            {currentUser ? <LogOutConsole /> : <LogInConsole />}
          </div>
          {children}
			</body>
		</html>
	);
}
