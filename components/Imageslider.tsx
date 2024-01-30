"use client"

import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '@/app/globals.css'

interface ImagesliderProps {
  images: string[];
}

class Imageslider extends Component<ImagesliderProps> {
  render() {
    const { images } = this.props;

    return (
      <div>
        <div className='flex justify-center'>
          <Carousel width={700}>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt='cloth model' />
                <p>{index+1}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
};

export default Imageslider;