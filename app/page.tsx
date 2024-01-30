import { Imageslider } from "@/components";
import { Navbar } from "@/components";
import Image from 'next/image';

export default function Home() {
  const images = ["/slider_image1.png", "/slider_image2.png", "/slider_image3.png", 
  "/slider_image4.png", "/slider_image5.png"];

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <div className="flex-1 padding-x pt-36">
          <h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            <br /> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</h1>
          <div className='flex flex-col mt-5 mb-10'>
            <div className='flex justify-center mr-10 sm:mr-40'>
              <Image
                src='/slider_image_title1.png'
                alt='slider image title 1'
                width={200} height={100}
                className='img1-invert'
              />
            </div>
            <div className='flex justify-center ml-10 sm:ml-40'>
              <Image
                src='/slider_image_title2.png'
                alt='slider image title 2'
                width={300} height={200}
                className='img2-invert'
              />
            </div>
          </div>
          
          <Imageslider images={images} />
        </div>
      </main>
    </>
  );
}
