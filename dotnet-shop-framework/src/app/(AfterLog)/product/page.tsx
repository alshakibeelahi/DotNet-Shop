import Home from "@/Components/AfterLog/Product/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Dot Net Shop Home page",
};

const HomePages = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default HomePages;
