import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full bg-hero">
      <div className="max-w-5xl mx-auto w-full px-4 pt-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center cursor-pointer">
            <img
              src="/assets/tools4x-logo.png"
              width={18}
              height={18}
              className="mr-2"
              alt="tools4x logo"
            />
            <span className="text-white font-semibold text-lg">tools4x</span>
          </a>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex gap-2 ml-4">
            <Button
              asChild
              size="sm"
              variant="link"
              className="hover:bg-black hover:text-white hover:no-underline"
            >
              <a href="/login">Sign In</a>
            </Button>
            <Button
              asChild
              size="sm"
              variant="default"
              className="bg-white text-black font-semibold hover:bg-gray-100"
            >
              <a href="/signup">Get Started</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
