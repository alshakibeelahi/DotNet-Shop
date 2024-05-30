/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line react/jsx-key
"use client";
import React, { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Select, Button, Drawer, List, Typography, InputNumber, Input, message } from "antd";
import { SelectProps } from 'antd';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { FaShoppingCart } from 'react-icons/fa';
import { useAllProductsQuery, useDeleteProductMutation } from "@/Redux/features/productApi";
import { getImageUrl } from "@/app/utils";
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "@/app/utils/storageService";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useAddOrderMutation } from "@/Redux/features/orderApi";

interface CartItem {
  id: string;
  name: string;
  size: string;
  type: string,
  quantity: number;
  price: number;
  maxQuantity: number;
}

const Shop = ({ id }: { id: string }) => {
  const [slidesPerView, setSlidesPerView] = useState<number>(3);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedMaxQuantity, setSelectedMaxQuantity] = useState<number>(1);
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [shippingAddressError, setShippingAddressError] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [contactNumberError, setContactNumberError] = useState<string>('');
  const router = useRouter();
  const [addOrder] = useAddOrderMutation();
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = getLocalStorageItem("user");
      if (userData) {
        setUser(userData);
      }
    }
  }, []);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      return getLocalStorageItem("cartItems") || [];
    }
    return [];
  });
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const { data } = useAllProductsQuery({ id });
  const products = data?.data?.attributes;
  const imageBaseURL = getImageUrl();

  useEffect(() => {
    // Set default size and max quantity for clothing items
    if (products && products.length > 0) {
     
      const clothingItem = products.find((item: any) => item.type === 'clothings');
      if (clothingItem) {
        const defaultSize = clothingItem.size[0].size;
        const defaultMaxQuantity = clothingItem.size[0].quantity;
        setSelectedSize(defaultSize);
        setSelectedMaxQuantity(defaultMaxQuantity);
      }
    }
  }, [products]);

  const onChange = (value: string, item: any) => {
    console.log(`selected ${value}`);
    setSelectedSize(value); // Update the selected size state [2/2]
    const selectedSizeItem = item.size.find((s: any) => s.size === value);
    setSelectedMaxQuantity(selectedSizeItem ? selectedSizeItem.quantity : 1); // Update the max quantity for the selected size
  };

  console.log(user)

  const handleCheckOut = async () => {
    if (!user || user.Username === null || user.Username === undefined) {
      const fullPath = window.location.pathname + window.location.search;
      router.push(`/login?redirectTo=${fullPath}`);
    }
    if (!shippingAddress || !contactNumber) {
      if (!shippingAddress) {
        setShippingAddressError('Shipping address is required');
      }
      if (!contactNumber) {
        setContactNumberError('Contact number is required');
      }
      return;
    }
    const data = {
      products: cartItems,
      shippingContactInfo: {
        address: shippingAddress,
        phoneNumber: contactNumber
      },
      seller: id,
      totalPrice: Number(getTotalPrice())
    };

    console.log(data);
    try {
      const res = await addOrder(data).unwrap();
      console.log(res);
      if(res && res.statusCode==="201"){
        Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          setCartItems([])
          removeLocalStorageItem("cartItems");
          setShippingAddress("")
          setContactNumber("")
        })
      }
    }
    catch (err:any) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: err.data.message || 'Something went wrong, try again later',
        showConfirmButton: false,
        timer: 1500
      
      })
    }

  }

  const filterOption: SelectProps['filterOption'] = (input, option) => {
    const label = option?.label;
    if (typeof label === 'string') {
      return label.toLowerCase().includes(input.toLowerCase());
    }
    return false;
  };

  const handleContactNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactNumber(e.target.value);
    setContactNumberError('');
  };

  const handleShippingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress(e.target.value);
    setShippingAddressError('');
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesPerView(1); // Small screens
      } else if (window.innerWidth <= 1024) {
        setSlidesPerView(3); // Medium screens
      }
    };

    // Add event listener to update dimensions on window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once to set initial values
    handleResize();

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setLocalStorageItem("cartItems", cartItems);
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    console.log(item);
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.name === item.name && cartItem.size === item.size
    );
    let newCartItems;
    if (existingItemIndex >= 0) {
      newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += item.quantity;
    } else {
      newCartItems = [...cartItems, item];
    }
    setCartItems(newCartItems);
    setCartVisible(true);
  };

  const removeFromCart = (index: number) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const updateCartItemQuantity = (index: number, quantity: number) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = quantity;
    setCartItems(newCartItems);
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <>
      {
        products && products.length > 0 ? (
          <div className="py-20">
            <div className="lg:w-[80%] mx-auto">
              <h1 className="-mb-5 text-2xl text-site-color font-bold">Shop</h1>
            </div>
            <div className="lg:w-[80%] mx-auto mt-10">
              <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={5}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop={true}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {products.map((item: any, index: any) => (
                  <SwiperSlide key={index} className="mb-10">
                    <div className="w-[70%] mx-auto">
                      <Image src={imageBaseURL + item.image} alt="images" layout="responsive" width={500} height={500} />
                      <h2>{item.name}</h2>
                      <p className="font-serif">{item.description}</p>
                      <div className="flex justify-between gap-2 pt-5">
                        {item.type === 'clothings' && (
                          <Select
                            placeholder="Select Size"
                            optionFilterProp="children"
                            onChange={(value) => onChange(value, item)}
                            filterOption={filterOption}
                            options={item.size.map((s: any) => ({ value: s.size, label: s.size }))}
                          />
                        )}
                        <div>
                          <p className="mt-2">${item.price}</p>
                          <Button
                            type="primary"
                            className="mt-2"
                            onClick={() => addToCart({
                              id: item._id,
                              name: item.name,
                              size: item.type === 'clothings' ? selectedSize : '', // Set size only if product type is 'clothings'
                              type: item.type,
                              quantity: 1,
                              price: item.price,
                              maxQuantity: item.type === 'clothings' ? selectedMaxQuantity : item.quantity
                            })}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

              </Swiper>
            </div>
            <div className="fixed bottom-4 right-4">
              {getTotalQuantity() > 0 && (
                <div className="relative flex items-center justify-center border border-blue-600 bg-blue-600 rounded-full w-16 h-16">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<FaShoppingCart style={{ fontSize: '24px' }} />}
                    onClick={() => setCartVisible(!cartVisible)}
                    className="p-0"
                    style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
                  >
                    <span className="absolute -top-1 -right-1 mt-2 mr-2 text-white w-6 h-6 flex items-center justify-center text-x; font-bold">{getTotalQuantity()}</span>
                  </Button>
                </div>
              )}
              <Drawer
                title="Cart"
                placement="right"
                onClose={() => setCartVisible(false)}
                open={cartVisible}
              >
                {cartItems.length === 0 ? (
                  <Typography.Text>Your cart is empty.</Typography.Text>
                ) : (
                  <>
                    <List
                      dataSource={cartItems}
                      renderItem={(item, index) => (
                        <List.Item
                          key={index+9}
                          actions={[
                            <Button danger onClick={() => removeFromCart(index)} key={index+101}>
                              Remove
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            title={item.name}
                            description={
                              item.size ?
                                `Size: ${item.size} | Price: $${item.price}` : `Price: $${item.price}`}
                          />
                          <InputNumber
                            min={1}
                            max={item.maxQuantity}
                            value={item.quantity || 0} // Set a default value of 0 if item.quantity is null
                            onChange={(value) => updateCartItemQuantity(index, value || 0)} // Set a default value of 0 if value is null
                          />
                        </List.Item>
                      )}
                    />
                    <div className="mt-4">
                      <Typography.Text>Total Price: ${getTotalPrice()}</Typography.Text>
                    </div>

                    <div className="mt-4">
                      <Typography.Text strong>Shipping Address:</Typography.Text>
                      <Input
                        className="w-full"
                        type="text"
                        value={shippingAddress || ''}
                        style={{ width: '100%' }}
                        onChange={handleShippingAddress}
                      />
                      {shippingAddressError && (
                        <Typography.Text type="danger">
                          {shippingAddressError}
                        </Typography.Text>
                      )}
                      <div className="mt-2"></div>
                      <Typography.Text strong>Contact Number:</Typography.Text>
                      <Input
                        className="w-full"
                        type="text"
                        value={contactNumber || ''}
                        style={{ width: '100%' }}
                        onChange={handleContactNumber}
                      />
                      {contactNumberError && (
                        <Typography.Text type="danger">
                          {contactNumberError}
                        </Typography.Text>
                      )}

                    </div>
                    <Button type="primary" block className="mt-4" onClick={handleCheckOut}>
                      Proceed to Checkout
                    </Button>
                  </>
                )}
              </Drawer>
            </div>
          </div >
        ) : (
          <></>
        )
      }
    </>
  );
};

export default Shop;
