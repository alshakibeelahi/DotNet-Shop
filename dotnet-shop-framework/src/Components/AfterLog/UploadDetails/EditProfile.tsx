"use client";

import {
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Upload,
} from "antd";
import { RiEdit2Line, RiUserFollowLine, RiUpload2Line } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { getImageUrl } from "@/app/utils";
import { getLocalStorageItem, setLocalStorageItem } from "@/app/utils/storageService";
import { useUpdateImageMutation, useUpdateProfileMutation } from "@/Redux/features/userApi";

interface User {
  _id: string;
  Name: string;
  Username: string;
  Email: string;
  PhoneNo: string;
  image: string;
  followers: number;
}

const EditProfile = () => {
  const [user, setUser] = useState<User>({} as User);
  const [isEdit, setIsEdit] = useState(false);
  const imageBaseURL = getImageUrl();
  const [image, setImage] = useState(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateImage] = useUpdateImageMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const [reloadToUpdate, setReloadToUpdate] = useState(false);

  const handleReloadToUpdate = () => {
    setReloadToUpdate(prevState => !prevState);
  }

  useEffect(() => {
    let userData = {} as any; // Initialize userData with an empty object
    if (typeof window !== "undefined") {
      userData = getLocalStorageItem("user");
    }
    if (userData) {
      setUser(userData);
      setName(userData.Name);
      setEmail(userData.Email);
      setPhoneNo(userData.PhoneNo);
    }
  }, [reloadToUpdate]);

  const handleImageUpload = (info: any) => {
    setImage(info.fileList[info?.fileList?.length - 1].originFileObj);
    info.fileList = [];
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleImageUpdate = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    } else {
      window.alert("Please select an image to upload");
      return;
    }
    try {
      const res = await updateImage(formData).unwrap();
      console.log(res);
      if (res && res.statusCode === "200") {
        Swal.fire({
          icon: "success",
          title: "Profile picture updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setIsEdit(false);
          setImage(null);
          setLocalStorageItem("user", res.data.attributes);
          handleReloadToUpdate();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Profile picture update Failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Profile Update Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setIsModalVisible(false);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Email", email);
    formData.append("PhoneNo", phoneNo);

    try {
      const res: any = await updateProfile(formData).unwrap();
      console.log(res);
      if (res && res.statusCode === "200") {
        Swal.fire({
          icon: "success",
          title: "Profile updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setIsEdit(false);
          setLocalStorageItem("user", res.data.attributes);
          handleReloadToUpdate();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Profile update Failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Profile Update Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    setIsModalVisible(false);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const formatFollowers = (count: number): string => {
    let result: string = "";
    if (count >= 1000000) {
      result = (count / 1000000).toFixed(1) + " M";
    } else if (count >= 1000) {
      result = (count / 1000).toFixed(1) + " K";
    } else {
      result = count + "";
    }
    return result;
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:w-[80%] h-auto mx-auto font-sans">
        <div className="flex flex-col lg:w-[100%] items-center justify-start rounded-md bg-gray-100 p-6 shadow-md">

          <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-bold my-2 text-center">
              {user.Name}
            </h1>
            <div className="flex w-full justify-around mt-2">
              <Link href={`/about/${user.Username}`} className="flex flex-col items-center text-center text-gray-700 hover:text-black">
                <span className="text-sm">My Profile</span>
              </Link>
            </div>
          </div>
          <div className="w-auto mx-auto flex justify-between mt-10">
            <div className="w-[80%] mx-auto mb-20">
              <div className="flex  gap-40">
                <div>
                  <Typography.Title level={5}>
                    <span className="text-black">Email</span>
                  </Typography.Title>
                  <span>{user.Email}</span>
                </div>
                <div>
                  <Typography.Title level={5}>
                    <span className="text-black">Contact Number</span>
                  </Typography.Title>
                  <span>{user.PhoneNo}</span>
                </div>
              </div>
              <div className="mt-8 justify-center items-center flex">
                <Button
                  className="bg-blue-800 text-white font-semibold"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Modal
          title="Edit Profile"
          open={isEdit}
          onCancel={handleCancel}
          footer={null}
        >
          <Form>
            <div className="w-full h-full rounded-lg">
              <div className="w-auto mx-auto flex justify-between">
                <div className="w-[80%] mx-auto mb-20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <Typography.Title level={5}>
                        <span className="text-black">Full Name</span>
                      </Typography.Title>
                      <Form.Item name="Name" className="mb-2">
                        <Input
                          defaultValue={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <Typography.Title level={5}>
                        <span className="text-black">Email</span>
                      </Typography.Title>
                      <Form.Item name="Email" className="mb-2">
                        <Input
                          defaultValue={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <Typography.Title level={5}>
                        <span className="text-black">Phone Number</span>
                      </Typography.Title>
                      <Form.Item name="PhoneNo" className="mb-2">
                        <Input
                          defaultValue={phoneNo}
                          onChange={(e) => setPhoneNo(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="mt-8 justify-center items-center flex">
                    <Button
                      className="bg-blue-800 text-white font-semibold"
                      onClick={handleUpdate}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Modal>

        <Modal
          title="Update Profile Picture"
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="cancel" onClick={handleModalClose}>
              Cancel
            </Button>,
            <Button key="save" type="primary" onClick={handleImageUpdate}>
              Save
            </Button>,
          ]}
        >
          <div className="flex flex-col items-center justify-center mt-5">
            <Upload
              listType="picture"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleImageUpload}
              className="mb-4"
            >
              <Button icon={<RiUpload2Line />}>Upload Picture</Button>
            </Upload>
            {image && (
              <div className="mt-4 flex flex-col items-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="max-h-40 mb-4"
                />
                <Button danger onClick={handleRemoveImage}>
                  Remove Image
                </Button>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default EditProfile;
