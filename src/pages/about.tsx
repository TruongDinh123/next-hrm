// "use client";
// import { useQuery } from "@tanstack/react-query";
// import { Typography, Card, Spin } from "antd";
// import axios from "axios";
// import Layout from "@/components/Layout";

// const { Title } = Typography;

// interface Post {
//   id: number;
//   title: string;
//   body: string;
// }

// const fetchPost = async (): Promise<Post> => {
//   const { data } = await axios.get(
//     "https://jsonplaceholder.typicode.com/posts/1"
//   );
//   return data;
// };

// export default function About() {
//   const { data, isLoading, error } = useQuery<Post, Error>({
//     queryKey: ["post"],
//     queryFn: fetchPost,
//   });

//   return (
//     <Layout>
//       <Title>About Page</Title>
//       <Card title="Example Post" style={{ marginTop: 16 }}>
//         {isLoading ? (
//           <Spin />
//         ) : error ? (
//           <p>Error: {error.message}</p>
//         ) : (
//           <>
//             <h3>{data?.title}</h3>
//             <p>{data?.body}</p>
//           </>
//         )}
//       </Card>
//     </Layout>
//   );
// }
