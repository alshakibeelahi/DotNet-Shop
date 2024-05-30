"use client"

import React, { useState } from "react";
import { Button, Form, Input, Typography, Divider, Checkbox } from "antd";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { AllImages } from "@/assets/AllImages";
import { setLocalStorageItem } from "@/app/utils/storageService";
import { useSignUpMutation } from "@/Redux/features/authApi";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const [signUp, isSuccess] = useSignUpMutation();
  const [isLoading, setLoading] = useState(false);

  const onFinishFailed = (errorInfo:any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values:any) => {
    setLoading(true);
    console.log("Success:", values);
    values["UserType"] = "user";
    try {
      const res = await signUp(values);
      if (isSuccess) {
        Swal.fire({
          icon: 'success',
          title: "Registration Successful",
          showConfirmButton: true,
          timer: 1500
        }).then(() => {
          setLoading(false);
          router.push("/login");
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (err:any) {
      console.log("err", err);
      Swal.fire({
        icon: 'error',
        title: err.data.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form
        className="lg:w-[40%] mx-auto py-10"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="text-center mb-10">
          <Link href="/product">
            <Image
              src={AllImages.logo}
              className="h-24 w-fit cursor-pointer"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>
          <Typography.Title level={3}>Welcome to Dot Net Shop</Typography.Title>
          <Typography.Paragraph>Create your account easily with less information.</Typography.Paragraph>
        </div>
        
        <Divider>Sign-up</Divider>

        <Form.Item
          name="Name"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="DateOfBirth"
          rules={[{ required: true, message: "Please enter your date of birth!" }]}
        >
          <Input type="date" placeholder="Date of Birth" />
        </Form.Item>

        <Form.Item
          name="BloodGroup"
          rules={[{ required: true, message: "Please enter your blood group!" }]}
        >
          <Input placeholder="Blood Group" />
        </Form.Item>

        <Form.Item
          name="Username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="Email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input placeholder="Email" type="email" />
        </Form.Item>

        <Form.Item
          name="PhoneNo"
          rules={[{ required: true, message: "Please enter your phone number!" }]}
        >
          <Input placeholder="Phone Number" type="tel" />
        </Form.Item>

        <Form.Item
          name="Password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["Password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("Password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full"
          >
            Create Account
          </Button>
        </Form.Item>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login">
            <div className="text-blue-500">Log in</div>
          </Link>
        </div>

        <Divider />

        <p className="text-sm text-center">
          Dot Net Shop collects and uses personal data in accordance with our Privacy Policy. By creating an account, you agree to our Terms & Conditions.
        </p>
      </Form>
    </div>
  );
};

export default Signup;
