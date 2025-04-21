import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="w-full flex justify-center bg-hero fading min-h-[100vh] pb-24">
      <div className="max-w-5xl flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <h1 className="tracking-normal text-3xl md:text-5xl font-bold text-white mb-6">
          The missing blueprint to grow your X
        </h1>
        <p className="text-md md:text-lg text-gray-400 mb-6 max-w-2xl">
          A powerful suite of tools to find viral tweets, extract threads, and
          download videos from X (Twitter). Save time and boost your engagement
          with our easy-to-use platform.
        </p>
        <Button
          asChild
          size="lg"
          className="flex w-48 items-center gap-2 text-lg bg-white text-black font-semibold"
        >
          <a href="/signup">
            Get Started
            <ArrowRight className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </section>
  );
};
export default Hero;
