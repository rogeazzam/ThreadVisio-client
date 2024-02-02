"use client"

import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { ClothProps } from '@/types';
import ClothCard from '@/components/ClothCard';
import { Dialog, Transition } from '@headlessui/react';
import { UserAuth } from '@/auth';
import { fetchWishList, removeFromWishList } from '@/utils';

const WishList = ({ isOpen, closeModal, user }: any) => {
    const [clothes, setClothes] = useState<ClothProps[] | null>(null);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await fetchWishList();
        setClothes(data);
    }

    const removeFromWishListTrig = async (cloth: ClothProps) => {
        const data = await removeFromWishList(cloth);
        setClothes(data);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10 bg-convert' onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-out duration-300'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform 
                    rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5 transition-bg-darkmode'>
                                    <button
                                        type='button'
                                        className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                                        onClick={closeModal}
                                    >
                                        <Image
                                            src='/close.svg'
                                            alt='close'
                                            width={20}
                                            height={20}
                                            className='object-contain'
                                        />
                                    </button>

                                    <h1>Your WishList</h1>
                                    {clothes && clothes.map((option, index) => (
                                        <ClothCard cloth={option} op2_title='Remove from Cart' 
                                        op2={removeFromWishListTrig} key={index} />
                                    ))}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default UserAuth(WishList)