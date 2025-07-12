"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImgSlider = () => {
    return (

        <section className="relative container  mx-auto sm:py-15 py-8 sm:px-5 px-0  xl:px-0 text-center">
            <div className="w-full  flex items-center justify-center">
                <div className="w-full max-w-6xl">

                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        loop
                        className="rounded-2xl shadow-lg overflow-hidden"
                    >
                        <SwiperSlide>
                            <img src={'/slider/s1.png'} alt={`slider image`} className="w-full md:h-[600px] sm:h-[400px] object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={'/slider/s2.png'} alt={`slider image`} className="w-full md:h-[600px] sm:h-[400px] object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={'/slider/s3.png'} alt={`slider image`} className="w-full md:h-[600px] sm:h-[400px] object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={'/slider/s4.png'} alt={`slider image`} className="w-full md:h-[600px] sm:h-[400px] object-cover" />
                        </SwiperSlide>
                        


                    </Swiper>
                </div>
            </div>

        </section>
    )
}
export default ImgSlider