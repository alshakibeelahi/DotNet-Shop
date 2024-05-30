/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, Input, InputNumber, Form, Upload, message } from "antd";

import SubmitButton from "@/Components/Shared/SubmitButton";
import { useAddProductMutation, useAllProductsQuery, useDeleteProductMutation } from "@/Redux/features/productApi";
import { RiUpload2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { getLocalStorageItem } from "@/app/utils/storageService";

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

const Shop: React.FC = () => {
  const [form] = Form.useForm();
  var [user, setUser] = useState({} as any);

  useEffect(() => {
    var userData = {} as any; // Initialize userData with an empty object
    if (typeof window !== "undefined") {
      userData = getLocalStorageItem("user");
    }
    if (userData) {
      setUser(userData);
    }
  }, [])
  const { data } = useAllProductsQuery({});
  console.log(data);
  const products = data
  const [addProduct, isSuccess] = useAddProductMutation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [image, setImage] = useState(null);
  const [newProduct, setNewProduct] = useState<Product>({
    Id: 0,
    ProductId: 0,
    SizeId: 0,
    ColorId: 0,
    ProductName: "",
    Quantity: 0,
    SellingPrice: 0,
    Image: "",
    Size: "",
    Color: "",
  });

  const onFinishFailed = (errorInfo: any) => { };

  const handleAddProduct = async (value: any) => {
    if (!image) {
      message.error('Please upload an image');
      return;
    }
    if (value.type === 'clothings') {
      if (!value.size || value.size.length === 0) {
        message.error('Please add at least one size');
        return;
      }
    }

    const formData = new FormData();
    formData.append('Name', value.productName);
    formData.append('Quantity', value.quantity);
    formData.append('SellingPrice', value.sellingPrice);
    formData.append('Size', value.size);
    formData.append('Color', value.color);

    // Append image
    if (image) {
      formData.append('file', image);
    }
    // setModalVisible(false);
    try {
      const res = await addProduct(formData);
      console.log('Product added:------', res);
      if (isSuccess) {
        Swal.fire({
          icon: 'success',
          title: 'Product added successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          setModalVisible(false);
          form.resetFields();
          setImage(null);
        });
      }
    }
    catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Product not added, please try again!',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleRemoveImage = (info: any) => {
    setImage(null);
  };

  const [deleteProduct] = useDeleteProductMutation();

  const handleRemove = async (item: any) => {
    try {
      const res = await deleteProduct({ id: item._id }).unwrap();
      console.log('Product deleted:', res);
      if (res && res.statusCode === '200') {
        Swal.fire({
          icon: 'success',
          title: 'Product deleted successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Product not deleted, please try again!',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  const handleImageUpload = (info: any) => {
    setImage(info.fileList[info?.fileList?.length - 1].originFileObj);
    info.fileList = [];
  };

  return (
    <>
      {
        user && user.UserType === 'admin' ? (
          <div className="py-20 w-[80%] mx-auto">
            <div className="flex justify-between mx-5">
              <div className="text-center ">
                <h1 className="-mb-5 text-2xl text-site-color font-bold">
                  Shop
                </h1>
              </div>
              <div
                className=" h-10 w-10 grid items-center justify-center border border-gray-500 cursor-pointer"
                onClick={() => setModalVisible(true)}
              >
                <p className="font-bold text-2xl cursor-pointer">+</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {products && products.length > 0 && products.map((product: Product, index: number) => (
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
                  </div>
                </div>
              ))}
            </div>
            <Modal
              title="Add New Product"
              open={modalVisible}
              onCancel={() => setModalVisible(false)}
              footer={null}
            >
              <Form form={form} onFinish={handleAddProduct} onFinishFailed={onFinishFailed}>
                <Form.Item
                  label="Image"
                  name="image"
                >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={() => false} // Prevent default upload behavior
                    onChange={handleImageUpload}
                  >
                    {image ? (
                      <div className="flex-col">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="avatar"
                          width={70}
                          height={70}
                          className="ml-1.5"
                        />
                        <Button
                          className="bg-red-600 text-white font-semibold"
                          onClick={handleRemoveImage} // Clear the image when the button is clicked
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <RiUpload2Line style={{ fontSize: "24px" }} />
                      </div>
                    )}
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="Product Name"
                  name="productName"
                  rules={[{ required: true, message: 'Please input the product name!' }]}
                >
                  <Input
                    placeholder="Product Name"
                    value={newProduct.ProductName}
                    onChange={(e) => setNewProduct({ ...newProduct, ProductName: e.target.value })}
                  />
                </Form.Item>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[{ required: true, message: 'Please input the quantity!' }]}
                >
                  <InputNumber
                    placeholder="Quantity"
                    min={1}
                    value={newProduct.Quantity}
                    onChange={(value) => setNewProduct({ ...newProduct, Quantity: value || 0 })}
                    className="w-full mt-2"
                  />
                </Form.Item>
                <Form.Item
                  label="Selling Price"
                  name="sellingPrice"
                  rules={[{ required: true, message: 'Please input the selling price!' }]}
                >
                  <InputNumber
                    placeholder="Selling Price"
                    min={0}
                    value={newProduct.SellingPrice}
                    onChange={(value) => setNewProduct({ ...newProduct, SellingPrice: value || 0 })}
                    className="w-full mt-2"
                  />
                </Form.Item>
                <Form.Item
                  label="Size"
                  name="size"
                >
                  <Input
                    placeholder="Size"
                    value={newProduct.Size}
                    onChange={(e) => setNewProduct({ ...newProduct, Size: e.target.value })}
                  />
                </Form.Item>
                <Form.Item
                  label="Color"
                  name="color"
                >
                  <Input
                    placeholder="Color"
                    value={newProduct.Color}
                    onChange={(e) => setNewProduct({ ...newProduct, Color: e.target.value })}
                  />
                </Form.Item>
                <Form.Item>
                  <SubmitButton title={"Submit"} />
                </Form.Item>
              </Form>
            </Modal>

          </div >
        ) : (
          <></>
        )
      }
    </>
  );

};

export default Shop;
