"use client";

import SubmitButton from "@/Components/Shared/SubmitButton";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import Link from "next/link";
import Swal from "sweetalert2";
import { useForgetPasswordMutation } from "@/Redux/features/authApi";
import { setLocalStorageItem } from "@/app/utils/storageService";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [forgetPassword, {isLoading}] = useForgetPasswordMutation();
  const onFinish = async (values: any) => {
    try {
      const res = await forgetPassword(values).unwrap()
      console.log("res", res)
      if (res && res.statusCode === "201") {
        console.log("res", res.data)
        Swal.fire({
          icon: 'success',
          title: res?.message || "OTP is sent successfully",
          showConfirmButton: true,
          timer: 1500
        }).then(() => {
          setLocalStorageItem("email", values.email);
          router.push("/verify/forgot-password");
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: res?.message || "OTP is already sent to the email",
          showConfirmButton: true,
          timer: 1500
        }).then(() => {
          setLocalStorageItem("email", values.email);
          router.push("/verify/forgot-password");
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] lg:w-[30%] w-full mx-2 lg:mx-auto border border-site-text">
        <div className="mb-6 ">
          <div className="flex items-baseline gap-2 text-2xl font-bold mb-4">
            <Link href="/login">
              <ArrowLeftOutlined />
            </Link>
            <h1 className="font-sans">Forgot Password</h1>
          </div>
          <p className="font-sans">
            Enter your email below to request a Mélangé account password reset.
          </p>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Typography.Title level={5} className="font-sans ">
            <span className="text-black">Email </span>
          </Typography.Title>
          <Form.Item
            className="text-black"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              size="large"
              prefix={<MailOutlined className="site-form-item-icon mr-2" />}
              placeholder="Enter your email"
              style={{
                background: "transparent",
                color: "black",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={isLoading}
              htmlType="submit"
              className="w-full border-none font-bold rounded-none"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
