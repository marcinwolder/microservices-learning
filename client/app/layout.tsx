import './global.css';
import Link from 'next/link';
import { headers as getHeaders } from 'next/headers';
import { unstable_getServerSession } from 'next-auth';
import authOptions from '../pages/api/auth/[...nextauth]';

import { useClient } from '@/hooks/use-client';
import LogInConsole from './LogInConsole';
import LogOutConsole from './LogOutConsole';
import genHeaders from '@/src/genHeaders';

export const revalidate = 0;

export default async function RootLayout(props: {
	children: React.ReactNode;
}) {
	const client = useClient();
	const headers = genHeaders(getHeaders());

	const currentUser = await client
		.get('/auth/currentUser', { headers })
		.then((res) => res.data);

  console.log(props);

	return (
		<html>
			<head />
			<body>
          <div className=' bg-slate-400 flex px-6 py-1 justify-between items-center'>
            <div className='p-2 font-bold text-2xl italic'>
              <Link href={'/'}>LMuML</Link>
            </div>
            <div>
              
            </div>
            {currentUser && <p>{currentUser.email}</p>}
            {currentUser ? <LogOutConsole /> : <LogInConsole />}
          </div>
          {props.children}
			</body>
		</html>
	);
}
