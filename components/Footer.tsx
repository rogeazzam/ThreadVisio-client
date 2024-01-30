import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { footerLinks } from '@/constants'

const Footer = () => {
    return (
        <footer className='flex flex-col mt-5 border-t border-gray-100 bg-slate-900'>
            <div className='flex justify-center w-full '>
                <Link href='/'>
                    <Image
                        src='/logo.png'
                        alt='Logo'
                        width={118} height={20}
                        className='object-contain'
                    />
                </Link>
            </div>
            <div className='footer__links pt-5 pb-5'>
                {footerLinks.map((item) => (
                    <div key={item.title} className="footer__link">
                        <h3 className="font-bold text-white">{item.title}</h3>
                        <div className="flex flex-col gap-5">
                            {item.links.map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.url}
                                    className="text-gray-500"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </footer>
    )
}

export default Footer