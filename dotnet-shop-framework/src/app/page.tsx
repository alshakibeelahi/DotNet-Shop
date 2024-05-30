"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "./utils/storageService";

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    // var user;
    // if (typeof window !== "undefined") {
    //   user = getLocalStorageItem("user");
    // }
    // if (user) {
      router.push("/product")
    // } else {
    //   router.push("/home");
    // }

  }, []);

  return <main></main>;
}
