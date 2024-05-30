"use client";

import React, { useEffect, useState } from "react";
import { Button, Drawer, List, Typography, InputNumber, Input } from "antd";
import { FaShoppingCart } from 'react-icons/fa';
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "@/app/utils/storageService";
import { useAllProductsQuery } from "@/Redux/features/productApi";
import { useRouter } from "next/navigation";
import { useAddOrderMutation } from "@/Redux/features/orderApi";
import Swal from "sweetalert2";

interface Product {
  Id: number;
  ProductId: number;
  SizeId: number;
  ColorId: number;
  ProductName: string;
  Quantity: number;
  SellingPrice: number;
  Image: string;
  Size: string;
  Color: string;
}

interface CartItem {
  ProductId: number;
  SizeId: number;
  ColorId: number;
  ProductName: string;
  OrderedQuantity: number;
  SellingPrice: number;
  Image: string;
  Size: string;
  Color: string;
  maxQuantity?: number;
}

const Shop = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const [addOrder, isSuccess] = useAddOrderMutation();

  const {data} = useAllProductsQuery({});
  console.log(data);
  const products = data

  const addToCart = (item: Product) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.ProductId === item.ProductId && cartItem.SizeId === item.SizeId
    );
    let newCartItems;
    if (existingItemIndex >= 0) {
      newCartItems = [...cartItems];
      // Increase the quantity of the existing item
      newCartItems[existingItemIndex].OrderedQuantity += 1;
    } else {
      // Add the item to the cart with quantity 1
      newCartItems = [
        ...cartItems,
        {
          ProductName: item.ProductName,
          ProductId: item.ProductId,
          SizeId: item.SizeId,
          ColorId: item.ColorId,
          SellingPrice: item.SellingPrice,
          Image: item.Image,
          Size: item.Size,
          Color: item.Color,
          OrderedQuantity: 1,
          maxQuantity: item.Quantity
        }
      ];
    }
    setCartItems(newCartItems);
    setCartVisible(true);
  };
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [shippingAddressError, setShippingAddressError] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [contactNumberError, setContactNumberError] = useState<string>('');
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = getLocalStorageItem("user");
      if (userData) {
        setUser(userData);
      }
    }
  }, []);

  console.log(user)

  const handleContactNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactNumber(e.target.value);
    setContactNumberError('');
  };

  const handleShippingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress(e.target.value);
    setShippingAddressError('');
  }

  useEffect(() => {
    setLocalStorageItem("cartItems", cartItems);
  }, [cartItems]);

  const removeFromCart = (index: number) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const updateCartItemQuantity = (index: number, quantity: number) => {
    const newCartItems = [...cartItems];
    newCartItems[index].OrderedQuantity = quantity;
    setCartItems(newCartItems);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.SellingPrice * item.OrderedQuantity, 0).toFixed(2);
  };
  const router = useRouter();

  const handleCheckOut = async () => {
    if (!user || (user && (user.Username === null || user.Username === undefined))) {
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
      ProductOrderMaps: cartItems,
      ContactNumber: contactNumber,
      ShippingAddress: shippingAddress,
      UserId: user.Username,
      totalPrice: Number(getTotalPrice())
    };


    console.log(data);
    try {
      const res = await addOrder(data).unwrap();
      if(isSuccess){
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

  return (
    <div className="py-20">
      <div className="lg:w-[80%] mx-auto">
        <h1 className="-mb-5 text-2xl text-site-color font-bold">Shop</h1>
      </div>
      <div className="lg:w-[80%] mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          { products && products.length> 0 && products.map((product: Product, index: number) => (
            <div key={index} className="bg-white overflow-hidden rounded-lg shadow-md">
              <img
                src={product.Image}
                alt={product.ProductName}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h1 className="text-xl font-bold mb-2">{product.ProductName}</h1>
                <p className="text-gray-600">Size: {product.Size}</p>
                <p className="text-gray-600">Color: {product.Color}</p>
                <p className="text-gray-600">Price: ${product.SellingPrice}</p>
                <Button
                  type="primary"
                  className="mt-2"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        {cartItems.length > 0 && (
          <div className="relative flex items-center justify-center border border-blue-600 bg-blue-600 rounded-full w-16 h-16">
            <Button
              type="primary"
              shape="circle"
              icon={<FaShoppingCart style={{ fontSize: '24px' }} />}
              onClick={() => setCartVisible(!cartVisible)}
              className="p-0"
              style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
            >
              <span className="absolute -top-1 -right-1 mt-2 mr-2 text-white w-6 h-6 flex items-center justify-center text-x; font-bold">{cartItems.length}</span>
            </Button>
          </div>
        )}
        <Drawer
          title="Cart"
          placement="right"
          onClose={() => setCartVisible(false)}
          open={cartVisible}
          size="large"
        >
          {cartItems.length === 0 ? (
            <Typography.Text>Your cart is empty.</Typography.Text>
          ) : (
            <>
              <List
                dataSource={cartItems}
                renderItem={(item, index) => (
                  <List.Item
                    key={index + 9}
                    actions={[
                      <Button danger onClick={() => removeFromCart(index)} key={index + 101}>
                        Remove
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={item.ProductName}
                      description={`Size: ${item.Size} | Color: ${item.Color} | Price: $${item.SellingPrice}`}
                    />
                    <InputNumber
                      min={1}
                      max={item.maxQuantity}
                      value={item.OrderedQuantity || 0} // Set a default value of 0 if item.quantity is null
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
    </div>
  );
};

export default Shop;
