"use client"
import Checkout from "@/Components/AfterLog/About/Checkout";
import { useSearchParams } from "next/navigation";

const CheckOut = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  console.log("redirectTo", orderId);
  return (
    <>
      <Checkout id={orderId}/>
    </>
  );
};

export default CheckOut;
