"use client"

import React, { useEffect } from "react";
import { List, Typography, Divider } from "antd";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import { useGetOrderDetailsQuery } from "@/Redux/features/orderApi";

interface CartItem {
  products: {
    id: {
      price: Number,
    },
    name: String,
    quantity: Number,
    size: String,
    price: Number,
    type: String,
  }[],
  totalPrice: Number,
}

const Checkout = ({
  id,
}: {
  id: String;
}) => {
  useEffect(() => {
    Swal.fire({
      title: "Thank you!",
      text: "The site is under development. Thank you for your patience!",
      icon: "success",
      showConfirmButton: true,
    });
  }, [id]);

  const { data } = useGetOrderDetailsQuery({ id })
  const cartDetails:CartItem = data?.data?.attributes || {}

  console.log(cartDetails)

  // Define the renderItem function
  const renderItem = (item: any) => (
    <List.Item>
      <List.Item.Meta
        title={item.name}
        description={`${
          item.size ? `Size: ${item.size} | ` : ""
        }Quantity: ${item.quantity} | Price: $${item.id.price * item.quantity}`}
      />
    </List.Item>
  );

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cartDetails?.totalPrice, // Using demoTotalPrice as the value
          },
        },
      ],
    });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      console.log(data, details);
      alert("Transaction completed by " + details.payer.name.given_name);
    });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between w-full lg:w-[80%] mx-auto mt-10">
      <div className="lg:w-1/2 pr-0 lg:pr-4 mb-6 lg:mb-0">
        <Typography.Title level={2} style={{ fontSize: "1.5rem" }}>Order Summary</Typography.Title>
        <List dataSource={cartDetails.products} renderItem={renderItem} />
        <Divider />
        <Typography.Text strong style={{ fontSize: "1.2rem" }}>Total Price: ${(cartDetails.totalPrice || 0).toFixed(2)}</Typography.Text>
        <div className="mt-2">
          <Typography.Text type="warning" style={{ fontSize: "1rem" }}>Note: This order will be valid for the next 10 minutes. If payment is not completed within this time, the order will be canceled.</Typography.Text>
        </div>
      </div>

      <div className="lg:w-1/2 pl-0 lg:pl-4">
        <Typography.Title level={3}>Pay with PayPal</Typography.Title>
        <PayPalScriptProvider options={{ clientId: "AVmEAzGogaeT0pVHi-N0OviOUVE4N1-7cwVcZBI_QA9SLNBTlXg--o2gf9a1cCc8nly90Q4n4VNa4N3D", currency: "USD" }}>
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
      </div>
    </div>

  );
};

export default Checkout;
