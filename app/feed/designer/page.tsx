"use client"

import React, { useState } from 'react'
import { UserAuth } from '@/auth'
import Image from 'next/image'
import axios from 'axios'
import { CustomButton } from '@/components'
import { UserProps } from '@/types'
import { generateImage, submitImage } from '@/utils'

const ClothDesigner = ({ user }: { user: UserProps }) => {
    const [designerDesc, setDesignerDesc] = useState("");
    const [imageUrl, setImageUrl] = useState("/slider_image1.png");
    const [image2Url, setImage2Url] = useState("/slider_image1.png")
    const [submitTxt, setSubmitTxt] = useState("");

    const generateImageTrig = async () => {
        const data = await generateImage(designerDesc);
        if (!data) {
            setImageUrl('/question_mark.jpg');
            setImage2Url('/question_mark.jpg');
        } else {
            setImageUrl(data.data.frontImage);
            setImage2Url(data.data.backImage);
        }
    }

    const submitImageTrig = async () => {
        const data = await submitImage(imageUrl ,image2Url);
        setSubmitTxt(data.data);
    }

    return (
        <main className="overflow-hidden">
            <div className='text-primary-blue flex-1 pt-36'>
                <div className='flex-1'>
                    <div className='flex flex-row'>
                        <div className='hidden md:block'
                            style={{ width: '100%', height: '150px', position: 'relative' }}>
                            <Image
                                alt='designer image 1'
                                src='/designer-main1.jpg'
                                layout='fill'
                            />
                        </div>
                        <div className='block'
                            style={{ width: '100%', height: '150px', position: 'relative' }}>
                            <Image
                                alt='designer gif'
                                src='/designer-main2.gif'
                                layout='fill'
                            />
                        </div>
                        <div className='hidden sm:block'
                            style={{ width: '100%', height: '150px', position: 'relative' }}>
                            <Image
                                alt='designer image 3'
                                src='/designer-main3.jpg'
                                layout='fill'
                            />
                        </div>
                        <div className='hidden md:block'
                            style={{ width: '100%', height: '150px', position: 'relative' }}>
                            <Image
                                alt='designer image 4'
                                src='/designer-main4.png'
                                layout='fill'
                            />
                        </div>
                    </div>
                    <div className='flex-1 pt-10 padding-x pb-10 mb-10'>
                        <div className='bar__item'>
                            <textarea
                                id='designerInput'
                                value={designerDesc}
                                onChange={(e) => setDesignerDesc(e.target.value)}
                                className='designer-input__height bar__input'
                                required
                            />
                            <button
                                className="absolute md:bottom-3 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent 
                            right-2 dark:disabled:bg-white disabled:bg-black disabled:opacity-10 disabled:text-gray-400 
                            enabled:bg-black text-white p-0.5 border border-black rounded-lg dark:border-white dark:bg-white bottom-1.5 transition-colors mr-3"
                                data-testid="send-button"
                                onClick={generateImageTrig}>
                                <span className="" data-state="closed">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white dark:text-black">
                                        <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div className='relative object-contain pt-16'>
                            <Image src={imageUrl} alt='cloth model' width={512} height={512} priority className='object-contain m-auto' />
                            <Image src={image2Url} alt='cloth model' width={512} height={512} priority className='object-contain m-auto pt-10' />
                            {imageUrl !== '/slider_image1.png' && imageUrl !== '/question_mark.jpg' &&
                                <div>
                                    <CustomButton
                                        title='Submit'
                                        btnType='button'
                                        containerStyles='flex flex-1 flex-row rounded-full bg-transparent sign-in__btn min-w-[130px] mt-16'
                                        handleClick={submitImageTrig}
                                        rightIcon='/submit_icon.png'
                                    />
                                    <h3 id='submit_txt'>{submitTxt}</h3>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default UserAuth(ClothDesigner);