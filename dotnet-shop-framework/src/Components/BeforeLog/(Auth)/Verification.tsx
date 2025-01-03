"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import { useVerifyEmailMutation, useVerifyOtpMutation } from "@/Redux/features/authApi";
import { getLocalStorageItem, setLocalStorageItem } from "@/app/utils/storageService";

const Verification = ({ path }: { path: string }) => {
  const router = useRouter();
  const [verifyEmail] = useVerifyEmailMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  var returnPath = "signup";
  if (path === "email-verification") {
    returnPath = "/signup";
  } else {
    returnPath = "/forgot-password";
  }
  const [otp, setOtp] = useState("");
  const handleVerify = async () => {
    if (!otp) {
      return;
    }
    if (path === "email-verification") {
      try {
        const res = await verifyEmail({ otp: otp }).unwrap()
        console.log("res", res)
        if (res && res.statusCode === "201") {
          console.log("res", res.data)
          Swal.fire({
            icon: 'success',
            title: res?.message || "OTP is verified successfully",
            showConfirmButton: true,
            timer: 1500
          }).then(() => {
            setLocalStorageItem("user", res.data.attributes)
            setLocalStorageItem("token", res.data.accessToken);
            setLocalStorageItem("userId", res.data.attributes._id);
            router.push("/product");
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
    } else {
      try {
        console.log("email", getLocalStorageItem("email"), otp)
        const res = await verifyOtp({
          otp: otp,
          email: getLocalStorageItem("email"),
        }).unwrap()
        console.log("res", res)
        if (res && res.statusCode === "200") {
          console.log("res", res.data)
          Swal.fire({
            icon: 'success',
            title: res?.message || "OTP is verified successfully",
            showConfirmButton: true,
            timer: 1500
          }).then(() => {
            setLocalStorageItem("forget-password-token", res.data.forgetPasswordToken);
            router.push("/confirm-password");
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: res?.message || "OTP not verified",
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
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="py-5 lg:px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] lg:w-[25%] w-full mx-auto border border-site-text">
        <div className="mb-6 ">
          <div className="flex items-baseline gap-2 text-2xl font-bold mb-4">
            <Link href={returnPath}>
              <ArrowLeftOutlined />
            </Link>
            <h1 className="font-sans">Enter Verification Code</h1>
          </div>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          {/* <div className="flex gap-7 justify-center mx-12">
            <Form.Item
              className="text-black"
              name="1"
              rules={[{ required: true, max: 1 }]}
            >
              <Input
                size="large"
                style={{
                  background: "transparent",
                  color: "black",
                }}
              />
            </Form.Item>
            <Form.Item
              className="text-black"
              name="2"
              rules={[{ required: true, max: 1 }]}
            >
              <Input
                size="large"
                style={{
                  background: "transparent",
                  color: "black",
                }}
              />
            </Form.Item>
            <Form.Item
              className="text-black"
              name="3"
              rules={[{ required: true, max: 1 }]}
            >
              <Input
                size="large"
                style={{
                  background: "transparent",
                  color: "black",
                }}
              />
            </Form.Item>
            <Form.Item
              className="text-black"
              name="4"
              rules={[{ required: true, max: 1 }]}
            >
              <Input
                size="large"
                style={{
                  background: "transparent",
                  color: "black",
                }}
              />
            </Form.Item>
            <Form.Item
              className="text-black"
              name="5"
              rules={[{ required: true, max: 1 }]}
            >
              <Input
                size="large"
                style={{
                  background: "transparent",
                  color: "black",
                }}
              />
            </Form.Item>
            <Form.Item
              className="text-black"
              name="6"
              rules={[{ required: true, max: 1 }]}
            >
              <Input
                size="large"
                style={{
                  background: "transparent",
                  color: "black",
                }}
              />
            </Form.Item>
          </div> */}

          <div className="lg:ml-5 my-5 flex justify-center">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputStyle={{
                height: "auto",
                width: "40px",
                borderRadius: "5px",
                marginRight: "20px",
                fontSize: "20px",
                border: "1px solid #000000",
                color: "#000000",
              }}
              renderInput={(props: any) => <input {...props} />}
            />
          </div>

          {/* <p className="text-black -mt-4 mb-4">
            Didn’t receive a code?
            <Button type="link" className="-ml-3 text-site-text">
              Resend
            </Button>
          </p> */}
          <Form.Item>
            <Button
              style={{
                width: "100%",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={handleVerify}
            >
              Verify
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Verification;
