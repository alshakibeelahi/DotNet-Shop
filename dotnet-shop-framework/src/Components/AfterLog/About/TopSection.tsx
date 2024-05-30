/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { PiUserCirclePlus } from "react-icons/pi";
import { Spin } from "antd"; // Import Spin from Ant Design
import Swal from "sweetalert2";
import { getImageUrl } from "@/app/utils";
import { useArtistDetailsQuery } from "@/Redux/features/userApi";
import { useAddFollowingMutation } from "@/Redux/features/followApi";
import { useRouter } from "next/navigation";
import { getLocalStorageItem } from "@/app/utils/storageService";

interface User {
  fullName: string;
  facebook: string;
  instagram: string;
  image: string;
  designation: string;
  address: string;
  _id: string;
  isFollowing: boolean;
}

const TopSection = ({ id }: { id: string }) => {
  const { data, isLoading } = useArtistDetailsQuery({ id, select: "profile" });
  const user: User = data?.data?.attributes;
  const imageBaseURL = getImageUrl();
  const [addFollowing] = useAddFollowingMutation();
  const router = useRouter()
  const [myData, setMyData] = useState<any>({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = getLocalStorageItem("user");
      if (userData) {
        setMyData(userData);
      }
    }
  }, []);

  const handleFollow = async () => {
    if (!myData || (myData && myData._id === null && myData._id === undefined)) {
      const fullPath = window.location.pathname + window.location.search;
      router.push(`/login?redirectTo=${fullPath}`);
    }
    if (myData._id.toString() === id.toString()) {
      Swal.fire({
        icon: "error",
        title: "You can't follow yourself.",
        showConfirmButton: true,
        timer: 1500,
      })
      return;
    }
    try {
      const res = await addFollowing({ toFollow: id }).unwrap();
      if (res.statusCode === "201") {
        Swal.fire({
          icon: "success",
          title: "You are now following this artist.",
          showConfirmButton: true,
          timer: 1500,
        })
      }
      if (res.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "You have just unfollowed this artist.",
          showConfirmButton: true,
          timer: 1500,
        })
      }
    }
    catch (err: any) {
      if (err.status === 401 || err.status === 500) {
        router.push("/login");
      }
    }
  };

  return (
    <>
      {isLoading ? ( // Render Spin component if isLoading is true
        <div className="text-center p-52">
          <Spin size="large" />
        </div>
      ) : user && user !== null ? (
        <>
          <div className="flex flex-col lg:flex-row justify-start items-center lg:mx-10 gap-10 lg:w-[80%] mx-auto  my-20">
            <div className="lg:text-7xl text-4xl lg:w-[50%] lg:mt-0 lg:mx-0 mx-auto lg:text-start text-center font-bold leading-snug flex flex-col items-center justify-center relative">
              <div>
                <div className="relative lg:left-[40%] left-6">
                  <img
                    src={imageBaseURL + user.image}
                    className="lg:max-h-96 h-80 w-full lg:w-fit rounded-xl"
                    alt="rectangle"
                  />
                </div>
              </div>
            </div>
            <div className="lg:text-xl lg:w-[50%] mt-6 text-start lg:right-0 flex flex-col lg:items-start items-center lg:absolute ">
              <div className="my-5">
                <h1 className="text-3xl font-bold ">{user?.fullName}</h1>
                {user.designation && user.designation !== "undefined" && (
                  <h1 className="text-lg font-sans font-bold">
                    {user?.designation}
                  </h1>
                )}
                {user.address && user.address !== "undefined" && (
                  <h1 className="text-lg font-sans font-bold">
                    {user?.address}
                  </h1>
                )}
              </div>

              {user && user.isFollowing ? (
                <>
                  <button
                    className="flex gap-2 items-center rounded-md px-5"
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      color: "black	",
                      fontSize: 20,
                      fontWeight: 500,
                      border: "none",
                      backgroundColor: "#48d956",
                    }}
                    onClick={handleFollow}
                  >
                    <span>
                      <PiUserCirclePlus className="h-7 w-7" />
                    </span>{" "}
                    <span>Following</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="flex gap-2 items-center rounded-md px-5"
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      color: "black	",
                      fontSize: 20,
                      fontWeight: 500,
                      border: "none",
                      backgroundColor: "#b8b9ba",
                    }}
                    onClick={handleFollow}
                  >
                    <span>
                      <RiUserFollowLine className="h-7" />
                    </span>{" "}
                    <span>Follow</span>
                  </button>
                </>
              )}
              <div className="flex my-5 gap-4 items-center justify-center">
                <a
                  href={user.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="h-8 w-fit hover:text-site-text hover: rounded-lg" />
                </a>
                <a
                  href={user.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="h-7 w-fit hover:text-site-text hover: rounded-lg" />
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TopSection;
