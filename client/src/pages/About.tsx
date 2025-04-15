import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Layout from "../components/Layout";

const About: React.FC = () => (
  <Layout>
    <div className="flex items-center justify-center min-h-[70vh] bg-background">
      <Card className="border border-border bg-black rounded-xl">
        <CardContent className="pt-8 pb-8 px-8">
          <h1 className="text-2xl font-bold mb-4 text-white">About Us</h1>
          <p className="text-sm text-gray-400">
            We are a small, passionate team of builders from around the world, dedicated to creating useful tools that make a difference. Our mission is to empower users with simple, effective solutions for everyday challenges. Thank you for supporting our journey!
          </p>
        </CardContent>
      </Card>
    </div>
  </Layout>
);

export default About;
