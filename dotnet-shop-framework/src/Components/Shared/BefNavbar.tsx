"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "antd";
import { IoMdPersonAdd } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";

const BefNavbar = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const handleMobileMenuClick = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };
  return (
    <div className="">
      <div className="container mx-auto flex items-center justify-between py-4 gap-16 ">
        <Link href={"/product"}>
          <div className="flex items-center text-center pt-5">
            <div>
              <div className="text-5xl font-galleryModern font-bold tracking-wider ">
                Dot Net Shop
              </div>
              <div className="font-sans tracking-wider">
                Made by Artists, For Artists
              </div>
            </div>
          </div>
        </Link>
        <div className="lg:flex items-center hidden  ">
          <Link href="/signup">
            <button
              className={`flex items-center gap-2 hover: hover:text-black delay-150 p-3 rounded-full ml-6`}
            >
              <IoMdPersonAdd className="h-5 w-fit" />
              <span>Create Account</span>
            </button>
          </Link>

          <Link href="/login">
            <button
              className={`flex items-center gap-3 hover: hover:text-black delay-150 p-3 rounded-full`}
            >
              <LuLogIn className="h-5 w-fit" />
              <span>Log In</span>
            </button>
          </Link>
        </div>

        <div className="flex items-center lg:hidden">
          <div className="lg:hidden">
            <Button
              shape="circle"
              icon={
                <IoMenu className="h-7 w-7 items-center justify-center -mt-1 text-black hover:text-site-text" />
              }
              onClick={handleMobileMenuClick}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuVisible && (
        <div className="container mx-auto py-2 lg:hidden">
          <div className="flex flex-col items-center">
            <Link href="/signup">
              <button
                className={`flex items-center gap-2 hover: hover:text-black delay-150 p-3 rounded-full ml-6`}
              >
                <IoMdPersonAdd className="h-5 w-fit" />
                <span>Create Account</span>
              </button>
            </Link>

            <Link href="/login">
              <button
                className={`flex items-center gap-3 hover: hover:text-black delay-150 p-3 rounded-full`}
              >
                <LuLogIn className="h-5 w-fit" />
                <span>Log In</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BefNavbar;
