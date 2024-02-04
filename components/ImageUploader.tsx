import React, { Component } from 'react';

const ImageUploader = ({ addImageToCloth }: any) => {

    return (
        <div className='m-auto rounded-full bg-transparent sign-in__btn min-w-[130px]'>
            <input type="file" onChange={addImageToCloth} />
        </div>
    )
}

export default ImageUploader