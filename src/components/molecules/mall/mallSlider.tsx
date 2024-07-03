import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import type { Swiper as SwiperType } from "swiper";
import { AlibabaProductFindType } from "@/types/alibaba/alibabaProductFindType";

const MallSlider = ({ product }: { product: AlibabaProductFindType; }) => {
  const [ thumbs, setThumbs ] = useState<SwiperType | null>(null);
  const [ mainSwiper, setMainSwiper ] = useState<SwiperType | null>(null);

  // 画像のパスを配列で渡してもらえればスライダーが表示されます。
  const images = product.productImage.images;

  return (
    <div className="w-[30%]">
      <Swiper
        loop={true}
        modules={[ Thumbs ]}
        thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={setMainSwiper}
        className="w-[100%]"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image src={src} alt={`Slide ${index}`} width={100} height={100} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative w-[90%] mx-auto mt-2">
        <Swiper
          modules={[ Thumbs, Navigation ]}
          spaceBetween={12}
          slidesPerView={5}
          watchSlidesProgress
          onSwiper={setThumbs}
          navigation={{
            prevEl: ".custom-swiper-button-prev",
            nextEl: ".custom-swiper-button-next",
          }}
          className="w-[100%]"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} onMouseEnter={() => mainSwiper && mainSwiper.slideToLoop(index)}>
              <Image src={src} alt={`Thumbnail ${index}`} width={100} height={100} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* カスタムナビゲーション矢印 */}
        <div
          className="custom-swiper-button-prev swiper-button-prev absolute !left-[-8%] !top-10 transform -translate-y-1/2 !w-5 !h-9 bg-gray-300 !text-white !text-xs !rounded-sm flex items-center justify-center rounded-full cursor-pointer z-10 after:!text-xs"
        ></div>
        <div
          className="custom-swiper-button-next swiper-button-next absolute !right-[-8%] !top-10 transform -translate-y-1/2 !w-5 !h-9 bg-gray-300 !text-white !text-xs !rounded-sm flex items-center justify-center rounded-full cursor-pointer z-10 after:!text-xs"
        ></div>
      </div>
    </div>
  );
};

export default MallSlider;
