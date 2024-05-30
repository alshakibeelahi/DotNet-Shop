import MusicArtist from "@/Components/AfterLog/MusicArtist/MusicArtist";
import Order from "@/Components/AfterLog/Order/order";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music Artist",
  description: "Dot Net Shop Music Artist page",
};

const MusicArtistPage = () => {
  return (
    <>
      <Order />
    </>
  );
};

export default MusicArtistPage;
