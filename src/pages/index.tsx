import Layout from "@/components/Layout";
import { Card, Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  return (
    <Layout>
      <Title>Welcome to Next.js with React Query and Ant Design</Title>
      <Card title="Getting Started" style={{ marginTop: 16 }}>
        <p>
          Edit <code>src/pages/index.tsx</code> to start building your
          application.
        </p>
      </Card>
    </Layout>
  );
}
