"use client";

import React, { useState } from "react";
import { Segmented, Typography, Layout } from "antd";
import BuyerProfile from "./buyerProfile";
import SellerProfile from "./sellerProfile";

const { Title } = Typography;
const { Content } = Layout;

const Order = () => {
  const [myProfile, setMyProfile] = useState("buyer");

  const handleSegmentChange = (value:any) => {
    setMyProfile(value);
  };

  return (
    <Content className="p-5 w-[80%] mx-auto bg-white rounded shadow">
      <div className="flex flex-col justify-start mb-5">
        <Title level={2}>Order List</Title>
        <Segmented
          options={[
            { label: "Buyer Profile", value: "buyer" },
            { label: "Seller Profile", value: "seller" }
          ]}
          value={myProfile}
          onChange={handleSegmentChange}
          className="mb-5 font-semibold"
        />
      </div>
      {myProfile === "buyer" ? <BuyerProfile /> : <SellerProfile />}
    </Content>
  );
};

export default Order;
