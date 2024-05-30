"use client";

import Image from "next/image";
import BackgroundImage from "@/Components/Shared/BackgroundImage";
import { AllImages } from "@/assets/AllImages";
import { Spin } from "antd";
import { getImageUrl } from "@/app/utils";
import { useArtistDetailsQuery } from "@/Redux/features/userApi";

interface User {
  about: string;
  aboutBackground: string;
  _id: string;
}

const AboutBanner = ({ id }: { id: string }) => {
  const imageBaseURL = getImageUrl();

  const { data, isLoading } = useArtistDetailsQuery({ id, select: "about" });
  const user: User = data?.data?.attributes;

  let aboutBackground = user?.aboutBackground ? imageBaseURL + user?.aboutBackground : AllImages.defaultBackground;

  return (
    <>
      {
        user && user !== null ? <div className="h-auto">
          <BackgroundImage
            className="bg-black bg-opacity-55 text-white h-auto my-10"
            image={
              <Image
                src={aboutBackground}
                layout="fill"
                objectFit="cover"
                alt="User Background Image"
                className="w-full h-full"
              />
            }
          >
            {isLoading ? (
              <div className="text-center p-96">
                <Spin size="large" />
              </div>
            ) : (
              <>
                <div className="flex flex-col lg:flex-row justify-start items-center lg:mx-10 gap-10 lg:w-[80%] mx-auto p-5 ">
                  <p className="lg:text-3xl text-xl text-gray-300 font-sans text-center whitespace-pre-wrap">{user?.about}</p>
                </div>
              </>
            )}
          </BackgroundImage>
        </div> : <></>
      }
    </>
  );
};

export default AboutBanner;
