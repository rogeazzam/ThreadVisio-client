"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CustomButton } from '@/components'

interface DropdownOption {
    title: string;
    url: string;
    onclick: () => void;
}

interface NavbarProps {
    title1: string;
    url_path1: string;
    title2: string;
    url_path2?: string;
    options: DropdownOption[];
}

const UserNavbar = ({ title1, url_path1, title2, url_path2, options }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
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

                    <div className='sm:flex sm:flex-row float-right sm:pl-10 pl-20'>
                        <CustomButton
                            title={title1}
                            btnType='button'
                            containerStyles='rounded-full bg-transparent min-w-[130px]'
                            handleClick={() => window.location.href =  url_path1}
                        />

                        <CustomButton
                            title={title2}
                            btnType='button'
                            containerStyles='rounded-full bg-transparent min-w-[130px]'
                            handleClick={url_path2 ? () => window.location.href = url_path2 :
                            () => window.location.href = ""}
                        />

                        <button
                            type='button'
                            className='items-center rounded-full min-w-[130px] pb-0'
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <Image
                                id={isOpen ? 'drop-down-icon2' : 'drop-down-icon'}
                                src={isOpen ? '/drop_down_icon2.png' : '/drop_down_icon.png'}
                                alt='drop-down-icon'
                                width={70}
                                height={9}
                                className='object-contain drop-down-icon float-right'
                                key={'image1'}
                            />
                        </button>
                    </div>
                </nav>
                {isOpen &&
                    <div className='float-right w-72 footer__link border-slate-900
                     bg-transparent rounded-md items-center border-2'>
                        {options.map((item, i) => (
                            <div key={i} className='p-1'>
                                <CustomButton
                                    title={item.title}
                                    btnType='button'
                                    containerStyles='rounded-full bg-transparent min-w-[130px]'
                                    handleClick={item.onclick}
                                />
                            </div>
                        ))}
                    </div>
                }
            </header>
        </div>
    )
}

export default UserNavbar