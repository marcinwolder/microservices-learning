'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import genError from '@/utils/getErrors';
import { useClient } from '@/hooks/use-client';

const Page = () => {
  const client = useClient();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [errors, setErrors] = useState<errResponse>({ errors: [] });

	const router = useRouter();


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
    
    if(password !== confirmPass){
      setErrors({errors: [
        {
          message: "passwords are not same",
          field: "confirmPass"
        }
      ]})
      return;
    }


    await client.post('/auth/signUp', {email, password}).then(async (response) => {
      router.push('/');
      router.refresh();
      return response.data;
    }).catch(err=>{ 
      setErrors(err);
    });
      
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className='grid grid-cols-2 w-max gap-2 p-4 border border-slate-400 rounded mx-auto mt-6 items-center'>
				<label htmlFor='email'>E-mail: </label>
				<input
					className='border border-slate-400 rounded p-1'
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					type='email'
					name='email'
				/>
				<label htmlFor='password'>Password: </label>
				<input
					className='border border-slate-400 rounded p-1'
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					type='password'
					name='password'
				/>
				<label htmlFor='confirmPass'>Confirm Password: </label>
				<input
					className='border border-slate-400 rounded p-1'
					value={confirmPass}
					onChange={(e) => {
						setConfirmPass(e.target.value);
					}}
					type='password'
					name='confirmPass'
				/>
				<input
					type='submit'
					value='Sign Up'
					className='col-span-2 border border-slate-400 rounded p-1 w-max px-4 mx-auto hover:bg-slate-400 hover:border-slate-600'
				/>
			</form>
      {errors.errors.length !== 0 && <div className='p-4 m-4 w-max mx-auto border border-slate-400 rounded'>{genError(errors)}</div>}
		</div>
	);
};

export default Page;
