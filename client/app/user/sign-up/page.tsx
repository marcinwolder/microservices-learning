'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface apiError {
	message: string;
	field?: string;
}

interface errResponse {
	errors: apiError[];
}

const Page = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [errors, setErrors] = useState<errResponse>({ errors: [] });

	const router = useRouter();

  const genError = () => {
    return <div>
      Oops...
      <ul>
        { errors.errors.map((error)=>{
          return <li key={error.message}>{error.field && error.field + ": "}{error.message}</li>
        }) }
      </ul>
    </div>
  }

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

		await fetch('/auth/signUp', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      }
		})
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          router.push('/');
          router.refresh();
          return data;
        } else {
          setErrors(data);
        }
      })
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
      {errors.errors && genError()}
		</div>
	);
};

export default Page;
