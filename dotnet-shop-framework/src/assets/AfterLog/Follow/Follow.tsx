"use client";
import React, { useState } from "react";
import { Table } from "antd";
import Swal from "sweetalert2";
import { getImageUrl } from "@/app/utils";
import { useAddFollowingMutation, useGetFollowersQuery } from "@/Redux/features/followApi";
import { useRouter } from "next/navigation";
import { IoIosDoneAll } from "react-icons/io";
import { SlUserFollow } from "react-icons/sl";

const imageBaseUrl = getImageUrl();

interface Follower {
  fullName: string;
  image: string;
  type: any;
  isFollowed: boolean;
  followerId: string;
}

const Follow = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: followerData } = useGetFollowersQuery({
    currentPage
  });

  let followerList: Follower[] = [];
  let pagination = {
    currentPage: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 1,
  };

  if (followerData?.data?.attributes) {
    followerList = followerData.data.attributes.followersList;
    pagination = followerData.data.attributes.pagination;
  }

  console.log(followerList);

  const [addFollowing] = useAddFollowingMutation();
  const router = useRouter();

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: any) => (
        <img
          src={`${imageBaseUrl}${image}`}
          alt="image"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Status",
      dataIndex: "isFollowed",
      key: "isFollowed",
      render: (isFollowed: any, record: any) => (
        <div
          className="cursor-pointer"
          onClick={() => handleFollow(record.followerId)}
        >
          {isFollowed ? (
            <div style={{ color: "green" }}>
              <IoIosDoneAll className="h-10 w-10" />
            </div>
          ) : (
            <div style={{ color: "red" }}>
              <SlUserFollow className="h-5 w-10" />
            </div>
          )}
        </div>
      ),
    },
  ];

  const handleFollow = async (id: string) => {
    try {
      const res = await addFollowing({ toFollow: id }).unwrap();
      if (res.statusCode === "201") {
        Swal.fire({
          icon: "success",
          title: "You are now following this artist.",
          showConfirmButton: true,
          timer: 1500,
        });
      }
      if (res.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "You have just unfollowed this artist.",
          showConfirmButton: true,
          timer: 1500,
        });
      }
    } catch (err: any) {
      if (err.status === 401 || err.status === 500) {
        router.push("/login");
      }
    }
  };

  const handleRowClick = (record: Follower) => {
    router.push(`/about/${record.followerId}?type=${record.type[0]}`);
  };

  return (
    <div className="w-[80%] mx-auto ">
      <Table
        columns={columns}
        dataSource={followerList}
        pagination={{
          pageSize: pagination.limit ?? 10,
          current: pagination.currentPage ?? 1,
          total: pagination.totalResults ?? 1,
          onChange: (page, pageSize) => setCurrentPage(page),
        }}
        onRow={(record) => {
          return {
            onClick: () => handleRowClick(record),
            className: "cursor-pointer"
          };
        }}
      />
    </div>
  );
};

export default Follow;
