import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { Card, Typography } from "antd";
import Layout from "@/components/Layout";
import { AuthContext } from "@/context/auth.context";

const Table = dynamic(() => import("antd/lib/table"), { ssr: false });

const { Title } = Typography;
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];
export default function Home() {
  const authContext = useContext(AuthContext)!;
  const { user } = authContext;

  return (
    <Layout>
      <Title>
        Hi {user?.email} - {user?.name} - Welcome to Next.js with React Query
        and Ant Design
      </Title>
      <Card title="Getting Started" style={{ marginTop: 16 }}>
        <p>
          Edit <code>src/pages/index.tsx</code> to start building your
          application.
        </p>
      </Card>
      <Table dataSource={dataSource} columns={columns} />
    </Layout>
  );
}
