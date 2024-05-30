"use client";

import SubmitButton from "@/Components/Shared/SubmitButton";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Form, Input, Typography } from "antd";
import Link from "next/link";
import { GrShieldSecurity } from "react-icons/gr";
import { RiLockPasswordFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { useResetPasswordMutation } from "@/Redux/features/authApi";
import { getLocalStorageItem, removeLocalStorageItem } from "@/app/utils/storageService";
import { useRouter } from "next/navigation";

export default function ConfirmPassword() {
  const router = useRouter()
  const [resetPassword] = useResetPasswordMutation();
  const onFinish = async (values: any) => {
    const data = {
      password: values.password,
      email: getLocalStorageItem("email"),
    };
    try {
      const res = await resetPassword(data).unwrap()
      console.log("res", res)
      if (res && res.statusCode === "200") {
        removeLocalStorageItem("forget-password-token");
        removeLocalStorageItem("email");
        Swal.fire({
          icon: "success",
          title: "Reset password",
          text: res.data.message || "Password reset successfully",
        }).then(() => {
          router.push("/login");
        });
      }
      else {
        Swal.fire({
          icon: 'error',
          title: res?.message || "Password reset failed",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
            router.push("/forgot-password");
          });
      }
    }
    catch (err: any) {
      console.log("err", err)
      Swal.fire({
        icon: 'error',
        title: err.data.message,
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        router.push("/forgot-password");
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] lg:w-[30%] w-full mx-2 lg:mx-auto border border-site-text">
        <div className="mb-6 ">
          <div className="flex items-baseline gap-2 text-2xl font-bold mb-4">
            <Link href="/forgot-password">
              <ArrowLeftOutlined />
            </Link>
            <h1 className="font-sans">Set New Password </h1>
          </div>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Typography.Title level={5} className="font-sans ">
            <span className="text-black">Enter New Password </span>
          </Typography.Title>
          <Form.Item
            className="text-black"
            name="password"
            rules={[{ required: true, message: "Please Enter new password" }]}
          >
            <Input.Password
              size="large"
              prefix={<GrShieldSecurity className="site-form-item-icon mr-2" />}
              placeholder="Enter New password"
              style={{
                background: "transparent",
                color: "black",
              }}
            />
          </Form.Item>
          <Typography.Title level={5} className="font-sans ">
            <span className="text-black">Confirm Password </span>
          </Typography.Title>
          <Form.Item
            className="text-black"
            name="confirm_password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Re-write new password again!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={
                <RiLockPasswordFill className="site-form-item-icon mr-2" />
              }
              placeholder="Re-enter your password"
              style={{
                background: "transparent",
                color: "black",
              }}
            />
          </Form.Item>

          <Form.Item>
            <SubmitButton title="submit" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
