"use client"

import { ClothDetailProps } from '@/types'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { Imageslider } from '.'
import ImageUploader from './ImageUploader'
import { handleUploadFile } from '@/utils'

const ClothDetails = ({ isOpen, closeModal, cloth, submitClothItem }: ClothDetailProps &
{ submitClothItem?: any }) => {

    //******* Code related only to adding a new cloth. *******//
    const [isNew, setIsNew] = useState(cloth.imageUrl === '/question_mark.jpg');
    const [images, setImages] = useState(cloth.otherImagesUrl ? [...[cloth.imageUrl], ...cloth.otherImagesUrl] :
        [cloth.imageUrl]);
    const [toUpload, setToUpload] = useState<any>([]);
    const [name, setName] = useState(cloth.name);
    const [price, setPrice] = useState(cloth.price);
    const [size, setSize] = useState(cloth.size);
    const [description, setDescription] = useState(cloth.description);
    const [quantity, setQuantity] = useState(cloth.quantity);
    const [color, setColor] = useState(cloth.color);
    const [material, setMaterial] = useState(cloth.material);
    const options = ['s', 'm', 'l', 'xl', 'xxl', '3xl'];
    const [first, setFirst] = useState(true);

    useEffect(() => {
        let temp = [];
        for (let i = 0; i < images.length; i++) {
            temp.push("http://localhost:8000/Images/" + images[i]);
        }
        setImages(temp);
    }, [])


    const addImageToCloth = (event: any) => {
        try {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            const data = new FormData()
            data.append('file', event.target.files[0])

            if (first) {
                setImages([imageUrl]);
                setFirst(false);
            } else {
                setImages([...images, ...[imageUrl]]);
            }

            if (!toUpload) {
                setToUpload([data]);
            } else {
                setToUpload([...toUpload, ...[data]]);
            }
        } catch (error) {
            console.error('Error pushin upload image', error);
        }
    }

    const handleNameChange = (e: { target: { value: string } }) => {
        setName(e.target.value);
    }

    const handlePriceChange = (e: { target: { value: string } }) => {
        try {
            setPrice(parseFloat(e.target.value));
        } catch (error) {
            console.error("Error setting price", error)
        }
    }

    const handleSizeChange = (e: { target: { value: string } }) => {
        setSize(e.target.value);
    }

    const handleDescChange = (e: { target: { value: string } }) => {
        setDescription(e.target.value);
    }

    const handleQuantityChange = (e: { target: { value: string } }) => {
        try {
            setQuantity(parseFloat(e.target.value));
        } catch (error) {
            console.error("Error setting quantity", error)
        }
    }

    const handleColorChange = (e: { target: { value: string } }) => {
        setColor(e.target.value);
    }

    const handleMaterialChange = (e: { target: { value: string } }) => {
        setMaterial(e.target.value);
    }

    const submitClothItemTrig = async () => {
        for (let i = 0; i < toUpload.length; i++) {
            const img_path = await handleUploadFile(toUpload[i]);
            if (i == 0) {
                cloth.imageUrl = img_path;
            } else {
                if (!cloth.otherImagesUrl) {
                    cloth.otherImagesUrl = [img_path];
                } else {
                    cloth.otherImagesUrl?.push(img_path);
                }
            }
        }

        cloth.name = name;
        cloth.price = price;
        cloth.size = size;
        cloth.description = description;
        cloth.quantity = quantity;
        cloth.color = color;
        cloth.material = material;
        submitClothItem(cloth);
    }
    //***************************************************************//

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                                    <div className='flex-1 flex flex-col gap-3 pt-4'>
                                        <div className='relative w-full bg-pattern bg-cover bg-center rounded-lg'>
                                            <div className='carouselWrapper h-fit'>
                                                <Imageslider
                                                    images={images} />
                                            </div>

                                            {isNew && <ImageUploader addImageToCloth={addImageToCloth} />}
                                        </div>
                                    </div>
                                    {!isNew &&
                                        <div className='flex-1 flex flex-col gap-3 pt-4'>
                                            <h2 className='font-semibold text-xl capitalize'>
                                                {cloth.price}$
                                            </h2>
                                            <p>{cloth.description}</p>
                                        </div>
                                    }

                                    {/* This Section is for setting all the neccessary data for the new cloth */}
                                    {isNew &&
                                        <div className='flex-1 flex flex-col gap-3 pt-4 round-input'>

                                            <input
                                                className='font-semibold text-xl capitalize rounded-full'
                                                type="text"
                                                value={name}
                                                onChange={handleNameChange}
                                            />

                                            <div className='flex flex-row'>
                                                <input
                                                    className='font-semibold text-xl capitalize rounded-full'
                                                    type="number"
                                                    value={price}
                                                    onChange={handlePriceChange}
                                                    required
                                                />
                                                <h2 className='font-semibold text-xl capitalize'>
                                                    $
                                                </h2>
                                            </div>

                                            <select className='rounded-full bg-transparent sign-in__btn min-w-[130px]'
                                                value={size} onChange={handleSizeChange}>
                                                {options.map((option, index) => (
                                                    <option className='style__option' key={index} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>

                                            <input
                                                className='font-semibold text-xl capitalize rounded-full'
                                                type="text"
                                                value={description}
                                                onChange={handleDescChange}
                                            />

                                            <input
                                                className='font-semibold text-xl capitalize rounded-full'
                                                type="number"
                                                value={quantity}
                                                onChange={handleQuantityChange}
                                                required
                                            />

                                            <input
                                                className='font-semibold text-xl capitalize rounded-full'
                                                type="text"
                                                value={color}
                                                onChange={handleColorChange}
                                            />

                                            <input
                                                className='font-semibold text-xl capitalize rounded-full'
                                                type="text"
                                                value={material}
                                                onChange={handleMaterialChange}
                                            />

                                        </div>
                                    }
                                    {/*************************************************************************/}

                                    {isNew && <button
                                        className='m-auto rounded-full bg-transparent sign-in__btn min-w-[130px]'
                                        onClick={() => submitClothItemTrig()}>
                                        Submit
                                    </button>}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ClothDetails