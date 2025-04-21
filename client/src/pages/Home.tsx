import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import Pricing from "@/components/Pricing";
import FAQ from "../components/FAQ";

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center text-center w-full">
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
      </div>
    </Layout>
  );
};

export default Home;
