"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Typography, Divider } from "antd";
import Link from "next/link";
import SubmitButton from "@/Components/Shared/SubmitButton";
import Swal from "sweetalert2";
import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import { useSignInMutation } from '../../../../Redux/features/authApi';
import { setLocalStorageItem } from "@/app/utils/storageService";
import { useRouter } from "next/navigation";

type FieldType = {
  Username?: string;
  Password?: string;
  remember?: string;
};

const Login = ({
  path,
}: {
  path: String;
}) => {
  if (path === null || path === undefined) {
    path = '/product'
  }
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signIn, isSuccess] = useSignInMutation();
  const router = useRouter();

  const onFinish = async (values: FieldType) => {
    try {
      const res = await signIn(values)
      console.log("res", res)
      if (isSuccess) {
        console.log("res", res.data)
        Swal.fire({
          icon: 'success',
          title: 'Login Successfull',
          showConfirmButton: true,
          timer: 1500
        }).then(() => {
          setLocalStorageItem("token", res.data.token.TokenKey)
          setLocalStorageItem("user", res.data.userData)
          setLocalStorageItem("userId", res.data.userData.Username)
          router.push(path as string) // Change the type of 'path' to 'string'
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
    catch (err: any) {
      console.log("err", err)
      Swal.fire({
        icon: 'error',
        title: err.data.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  };

  const onFinishFailed = (errorInfo: any) => { };
  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      className="lg:w-[40%] mx-auto h-screen my-10"
    >
      <Form
        className="lg:w-[80%] mx-2 lg:mx-auto"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className=" text-black">
          {/* Upper for google and facebook login  */}

          <div>
            <div className="flex justify-center mb-14">
              <Link href="/product">
                <Image
                  src={AllImages.logo}
                  className="h-24 w-fit"
                  alt="logo"
                  width={100} // Set a width for Image component
                  height={100} // Set a height for Image component
                />
              </Link>
            </div>
            <div className="mb-12 text-center">
              <h1 className="mb-3 text-3xl font-bold ">
                Great to have you back !
              </h1>
            </div>
            {/* <Button
            className="w-full flex items-center my-3 border-site-te text-xl h-8 text-black font-thin  py-5 "
            style={{
              background: "transparent",
              borderColor: "#363062",
              color: "black",
            }}
          >
            <SiGoogle className="ml-8 mr-2 text-black font-thin bg-transparent hover:bg-transparent" />
            Continue with Google
          </Button>
          <Button
            className="w-full flex items-center my-3 border-site-text text-xl h-8 text-black font-thin  py-5 "
            style={{
              background: "transparent",
              borderColor: "#363062",
              color: "black",
            }}
          >
            <TiSocialFacebook className="ml-7 mr-1 text-3xl text-black font-thin bg-transparent hover:bg-transparent" />
            Continue with Facebook
          </Button> */}
          </div>

          <Divider style={{ borderBlockColor: "gray" }}>
            <span className="text-site-text">Login</span>
          </Divider>
        </div>
        <Typography.Title level={5}>
          <span className="text-site-text">Username</span>
        </Typography.Title>
        <Form.Item<FieldType>
          name="Username"
          className="mb-6"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            className="bg-transparent"
            size="large"
            style={{
              background: "transparent",
              color: "black",
            }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Typography.Title level={5}>
          <span className="text-site-text">Password</span>
        </Typography.Title>

        <Form.Item<FieldType>
          name="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            className="bg-transparent "
            size="large"
            style={{
              background: "transparent",
              color: "black",
            }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item>
          <SubmitButton title={"Sign in"} />
        </Form.Item>
        <div>
          <div className="flex justify-center items-center text-black ">
            <p>New here?</p>
            <Link href="/signup">
              <Button
                type="link"
                style={{
                  color: "#363062",
                  border: "none",
                  borderBottom: "1px solid #363062",
                }}
              >
                Create an account
              </Button>
            </Link>
          </div>
          <Divider style={{ borderBlockColor: "white" }} className="py-2" />
          <p className="text-black text-balance text-center">
            Dot Net Shop collects and uses personal data in accordance with our
            Privacy Policy. By creating an account, you agree to our Terms &
            Conditions.
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
