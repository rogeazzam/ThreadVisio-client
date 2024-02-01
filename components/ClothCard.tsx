"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { ClothDetails, CustomButton } from '.'
import { ClothProps } from '@/types'

interface ClothCardProps {
    cloth: ClothProps;
    op1_title?: string;
    op1_image?: string;
    op1?: any;
    op2_title?: string;
    op2_image?: string;
    op2?: any;
}

const ClothCard = ({ cloth, op1_title = 'Buy now', op1_image = '/buy_now_icon.png', op1,
    op2_title = 'Add to Cart', op2_image = '/cart_icon.png', op2 }: ClothCardProps) => {
    const { name, price, color, material, size, description, quantity, imageUrl } = cloth;

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='cloth-card group'>
            <div className="cloth-card__content">
                <h2 className="cloth-card__content-title">
                    {name}
                </h2>
            </div>

            <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
                <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
                {price}
            </p>

            <div className='relative w-full h-40 my-3 object-contain'>
                <Image src={imageUrl} alt='car model' fill priority className='object-contain' />
            </div>

            <div className='relative flex m-auto w-11/12 mt-2'>
                <div className='flex w-full justify-between'>
                    <CustomButton
                        title={op1_title}
                        btnType='button'
                        containerStyles='custom-btn rounded-full bg-transparent min-w-[130px]'
                        rightIcon={op1_image}
                    />
                    <CustomButton
                        title={op2_title}
                        btnType='button'
                        containerStyles='custom-btn rounded-full bg-transparent min-w-[130px]'
                        rightIcon={op2_image}
                    />
                </div>
            </div>

            <CustomButton
                title='View More'
                btnType='button'
                containerStyles='w-full rounded-full view-more__btn min-h-[30px] min-w-[130px]'
                textStyles='flex justify-center items-center'
                handleClick={() => setIsOpen(true)}
            />

            <ClothDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} cloth={cloth} />
        </div>
    )
}

export default ClothCard