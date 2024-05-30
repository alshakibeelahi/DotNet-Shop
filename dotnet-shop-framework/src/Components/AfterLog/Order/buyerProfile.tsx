"use client"

import React, { useEffect, useState } from "react";
import { Button, Image, Modal, Table, TableProps } from "antd";
import { UserOutlined, PhoneOutlined, ShoppingOutlined } from "@ant-design/icons";
import { getImageUrl } from "@/app/utils";
import { useAllOrdersQuery } from "@/Redux/features/orderApi";
import { profile } from "console";

interface Product {
  name: string;
  quantity: number;
  id?: {
    image: string;
  };
}

interface ShippingContactInfo {
  address: string;
  phoneNumber: string;
}

interface OrderBy {
  image: string;
  fullName: string;
  phoneNumber: string;
}

interface Seller {
  image: string;
  fullName: string;
  phoneNumber: string;
}

interface Order {
  orderId: number;
  products: Product[];
  shippingContactInfo: ShippingContactInfo;
  orderBy: OrderBy;
  seller: Seller;
  totalPrice: number;
  createdAt: string;
}

const BuyerProfile = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const imageBaseUrl = getImageUrl();
  const { data: allOrdersData, isLoading } = useAllOrdersQuery({
    page: page,
    limit: size,
    profile: "buyer"
  });

  const ordersData: Order[] = allOrdersData?.data?.attributes.orderList ?? [];
  const pagination = allOrdersData?.data?.attributes.pagination;

  const [slStart, setSlStart] = useState<number>(0);

  useEffect(() => {
    setSlStart((page - 1) * size + 1);
  }, [page, size]);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const columns: TableProps<Order>["columns"] = [
    {
      title: "Id",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Product Details",
      dataIndex: "products",
      key: "products",
      render: (products: Product[]) => (
        <>
          {products.map((product, index) => (
            <div key={index} className="flex items-center gap-3">
              <div style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                <span title={`${index + 1}. ${product.name} - Quantity: ${product.quantity}`}>
                  {index + 1}. {product.name} - Quantity: {product.quantity}
                </span>
              </div>
            </div>
          ))}
        </>
      ),
      ellipsis: true,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice: number) => (
        <div>
          <span>$ {totalPrice}</span>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Order Status",
      key: "deliveryStatus",
      render: deliveryStatus =>(
        <div>
          {/* make the chatat[0] capital */}
          {deliveryStatus.deliveryStatus.charAt(0).toUpperCase() + deliveryStatus.deliveryStatus.slice(1)}
        </div>
      )
    },
  ];

  const onPaginationChange = (page: number, pageSize?: number) => {
    setPage(page);
  };

  const onTableChange: TableProps<Order>["onChange"] = (pagination, filters, sorter) => {
    console.log("Table changed:", { pagination, filters, sorter });
  };

  return (
    <div>
      <div className="mt-4">
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={ordersData}
          pagination={{
            current: page,
            pageSize: size,
            total: pagination?.totalResults,
            //showSizeChanger: true,
            onChange: onPaginationChange,
          }}
          onChange={onTableChange}
          rowKey="orderId"
        />
      </div>
    </div>
  );
};

export default BuyerProfile;