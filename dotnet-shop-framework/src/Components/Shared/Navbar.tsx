"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import { CgProfile } from "react-icons/cg";
import { IoMdPersonAdd } from "react-icons/io";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";
import { AllImages } from "@/assets/AllImages";
import { usePathname, useRouter } from "next/navigation";
import { clearLocalStorageItems, getLocalStorageItem } from "@/app/utils/storageService";

interface User {
  fullName: string;
  email: string;
  role: string;
  Username: string;
}

const Navbar = () => {
  const [user, setUser] = useState<User>({} as User);
  const path = usePathname();
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  useEffect(() => {
    // Ensure localStorage is available (client-side)
    if (typeof window !== "undefined") {
      // Retrieve user data from localStorage
      const userData = getLocalStorageItem("user");
      if (userData) {
        setUser(userData as User); // Cast userData to User type
      }
    }
  }, []);

  const handleMobileMenuClick = () => {
    setMobileMenuVisible(prevState => !prevState);
  };

  const select = (index: any) => {
    setSelected(index);
    setMobileMenuVisible(false); // Close mobile menu when an item is selected
  };

  const handleLogout = () => {
    clearLocalStorageItems();
    window.location.href = "/login";
  };

  return (
    <div className="">
      <div className="container mx-auto flex items-center justify-between py-4 gap-16 ">
        <div className="flex items-center  ">
          <div>
            <Link href={"/product"}>
              <Image
                src={AllImages.logo}
                className="h-[70px] w-fit mr-20"
                alt="logo"
                width={100} // Set a width for Image component
                height={100} // Set a height for Image component
              />
            </Link>
          </div>
        </div>

        <div className="lg:flex items-center hidden  ">
          {user && user.Username!==null && user.Username!==undefined ? (
            <div className="flex justify-center items-center">
              <Link href="/upload-details" className="pl-3">
                <Button
                  shape="circle"
                  icon={<CgProfile className="h-6 w-6 hover:text-black" />}
                />
              </Link>
              <div className="ml-4">
                <button
                  className={`flex items-center gap-3 hover: hover:text-black delay-150 p-3 rounded-full`}
                  onClick={handleLogout}
                >
                  <LuLogOut className="h-5 w-fit" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        <div className="flex items-center lg:hidden">
          {user && user.Username!==null && user.Username!==undefined && (
            <div className="mr-2  lg:hidden">
              <Link href="/upload-details">
                <Button
                  shape="circle"
                  icon={
                    <CgProfile className="h-7 w-7 items-center justify-center -mt-1 text-black hover:text-site-text" />
                  }
                />
              </Link>
            </div>
          )}

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
            {!user || user.Username===null || user.Username===undefined ? (
              <>
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
              </>
            ) : (
              <>
                <div>
                  <button
                    className={`flex items-center gap-3 hover: hover:text-black delay-150 p-3 rounded-full`}
                    onClick={handleLogout}
                  >
                    <LuLogOut className="h-5 w-fit" />
                    <span className="text-sm">Log out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
function setMobileMenuVisible(arg0: boolean) {
  throw new Error("Function not implemented.");
}

