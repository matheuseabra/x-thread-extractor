import Layout from "@/components/Layout";
import ThreadExtractor from "@/components/ThreadExtractor";
import React from "react";

const Home: React.FC = () => {
  return (
    <Layout>
      <ThreadExtractor />
    </Layout>
  );
};

export default Home;
