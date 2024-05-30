"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { AllImages } from "@/assets/AllImages";
import { useGetSpecificDashboardContentsQuery } from "@/Redux/features/dashboardContentApi";
import { getImageUrl } from "@/app/utils";
import { Spin } from "antd";

const PartyPortraits = () => {
  const {data, isLoading} = useGetSpecificDashboardContentsQuery({type: 'party-potraits'});
  const party = data?.data?.attributes;
  console.log(party, data)
  const imageBaseURL = getImageUrl();
  if(isLoading){
    return(
      <div className="flex justify-center items-center">
        <Spin size="large"/>
      </div>
    )
  }
  return (
    <div className="">
      <h1 className="text-2xl  my-5">
        Party Portraits
      </h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper "
      >
        {
          party && party.map((party, index) => (
            <SwiperSlide key={index}>
                <Image src={imageBaseURL+party.image} alt="party" className="h-80 w-full" width={300} height={300} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};

export default PartyPortraits;
