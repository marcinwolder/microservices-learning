import NextAuth from 'next-auth';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
	providers: [
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
		}),
	],
	adapter: SupabaseAdapter({
		url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
		secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
	}),
});
