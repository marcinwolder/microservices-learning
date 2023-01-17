import './global.css';
import Link from 'next/link';
import {headers as getHeaders} from 'next/headers';

import {useClient} from '@/hooks/use-client';
import LogInConsole from './LogInConsole';
import genHeaders from '@/src/genHeaders';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
  const client = useClient();
  const headers = genHeaders(getHeaders());
  
  const currentUser = await client.get('/auth/currentUser', {headers}).then(res=>res.data);
	console.log('🚀 ~ file: layout.tsx:20 ~ currentUser', currentUser);

	return (
		<html>
			<head />
			<body>
				<div className=' bg-slate-400 flex px-6 py-1 justify-between'>
					<div className='p-2 font-bold text-2xl italic'>
						<Link href={'/'}>ticketing.dev</Link>
					</div>
					<LogInConsole />
				</div>
				{children}
			</body>
		</html>
	);
}
