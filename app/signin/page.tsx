"use client"
import { CustomButton } from '@/components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Signin = () => {
    const [UnameOrEmail, setUnameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');

    useEffect(() => {
    }, [])


    const handleSignIn = async () => {
        const { data } = await axios.post('http://localhost:8000/signin', {
            email: UnameOrEmail,
            password
        }, {
            withCredentials: true
        });
        if (data.error) {
            setError(data.error);
        } else {
            // Navigate to '/feed' page and refresh it inorder to get the updated User information.
            console.log(data);
        }
    };

    return (
        <div className='flex flex-col'>
            <div className='sign-in__bar' id='signin'>
                <div className='flex justify-center'>
                    <h1 className='title'>Sign in to ThreadVisio</h1>
                </div>
                <div className='margin-20'>
                    <p>Email</p>
                    <div className='bar__item'>
                        <input
                            type='text'
                            name='model'
                            value={UnameOrEmail}
                            onChange={(e) => setUnameOrEmail(e.target.value)}
                            placeholder='Email'
                            className='bar__input'
                        />
                    </div>
                </div>
                <div className='margin-20'>
                    <div className='flex flex-row justify-between'>
                        <p>Password</p>
                        <a href='' className='underlined'>forgot password?</a>
                    </div>
                    <div className='bar__item'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='model'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            className='bar__input'
                        />
                        {password && (
                            <div className='password-toggle' onClick={() => setShowPassword(!showPassword)}>
                                <img
                                    src={showPassword ? 'toggle-hide.png' : 'toggle-show.png'}
                                    alt='show-hide toggle'
                                    width={25} height={25}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ color: 'red' }}>{error}</div>
                <div className='margin-20 flex justify-center'>
                    <CustomButton
                        title='Sign in'
                        btnType='button'
                        containerStyles='rounded-full bg-transparent sign-in__btn min-w-[130px]'
                        handleClick={handleSignIn}
                    />
                </div>
            </div>
            <div className='sign-in__bar'>
                <div className='flex flex-row justify-center'>
                    <p>New to ThreadVisio? </p>
                    &nbsp; {/* White space */}
                    <a href='/signup' className='underlined'> Create an account</a>
                </div>
                <a href='/' className='flex flex-row justify-center underlined'>Go back to Homepage</a>
            </div>
        </div>
    );
}

export default Signin;