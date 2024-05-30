"use client";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { Spotify } from "react-spotify-embed";
import { useAllContentsQuery } from "@/Redux/features/contentApi";

type FieldType = {
  type?: string;
  link?: string;
  description?: string;
};

const Songs = ({ id }: { id: string }) => {
  const { data } = useAllContentsQuery({
    type: "daily-music-routine",
    id,
  });
  const songs:FieldType[] = data?.data?.attributes;
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesPerView(1); // Small screens
      } else if (window.innerWidth <= 1024) {
        setSlidesPerView(3); // Medium screens
      }
    };

    // Add event listener to update dimensions on window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once to set initial values
    handleResize();

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {
        songs && songs.length > 0 ? (<div className="py-20">
          <div className="lg:w-[80%] mx-auto">
            <h1 className="-mb-5 text-2xl text-site-color font-bold">Daily Music Routine</h1>
          </div>
          <div className=" lg:w-[80%] mx-auto mt-10">
            <Swiper
              slidesPerView={slidesPerView}
              spaceBetween={5}
              centeredSlides={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper "
            >
              {songs.map((item: any, index: any) => (
                <SwiperSlide className="mb-10" key={index}>
                  <div className="w-[70%] mx-auto flex flex-col items-center">
                    <Spotify link={`${item.link}`} />
                    <p className="w-full text-center font-sans text-base">
                      {item.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>) : (
          <></>
        )
      }
    </>
  );
};

export default Songs;
