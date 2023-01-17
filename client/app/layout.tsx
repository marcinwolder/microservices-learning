import './global.css';
import Link from 'next/link';
import {headers as getHeaders, cookies} from 'next/headers';

import {useClientPath} from '@/hooks/use-client';
import LogInConsole from './LogInConsole';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
  const clientPath = useClientPath();
  const headers = getHeaders();
  headers.forEach(x=>console.log(x));

  const currentUser = await fetch(clientPath+"/auth/currentUser", {headers, cache: 'no-cache'}).then(res => res.json()).catch((err) => {});
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
