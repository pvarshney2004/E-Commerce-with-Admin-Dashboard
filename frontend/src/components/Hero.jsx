// import React from 'react'
// import { assets } from '../assets/assets'

// const Hero = () => {
//   return (
//     <div className='flex flex-col sm:flex-row border border-gray-400'>
//         {/* Hero Left Side  */}
//         <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
//             <div className='text-[#414141]'>
//                 <div className="flex items-center gap-2">
//                     <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
//                     <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
//                 </div>
//                 <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
//                 <div className='flex items-center gap-2'>
//                     <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
//                     <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
//                 </div>
//             </div>
//         </div>

//         {/* Hero Right side  */}
//         <img src={assets.hero_img} alt="" className='w-full sm:w-1/2' />

//     </div>
//   )
// }

// export default Hero











import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = [assets.hero_img, assets.p_img1, assets.p_img2_1, assets.p_img31];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 overflow-hidden">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-white">
        <div className="text-[#414141] px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">Latest Arrivals</h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side (Image Carousel) */}
      <div className="w-full sm:w-1/2 relative min-h-[350px] sm:min-h-[500px] overflow-hidden">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`hero-${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out z-0 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
