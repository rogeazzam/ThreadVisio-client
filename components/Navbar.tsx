"use client"
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { CustomButton } from '@/components'
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const { push } = useRouter();

    return (
        <header className='w-full  absolute z-10 pd-10'>
            <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent'>
                <Link href='/' className='flex justify-center items-center'>
                    <Image
                        src='/logo.png'
                        alt='logo'
                        width={98}
                        height={11}
                        className='object-contain'
                    />
                </Link>

                <div className='float-right sm:pl-10 pl-20'>
                <CustomButton
                    title='Sign in'
                    btnType='button'
                    containerStyles='text-primary-blue rounded-full bg-transparent min-w-[130px]'
                    handleClick={() => push('/')}
                />

                <CustomButton
                    title='Sign up'
                    btnType='button'
                    containerStyles='text-primary-blue rounded-full bg-transparent min-w-[130px]'
                    handleClick={() => push('/')}
                />
                </div>
            </nav>
        </header>
    )
}

export default Navbar