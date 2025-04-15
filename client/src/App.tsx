import { Toaster } from "@/components/ui/toaster";
import About from "@/pages/About";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import VideoDownloader from "@/pages/VideoDonwloader";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Thread from "./pages/Thread";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/thread" component={Thread} />
      <Route path="/video" component={VideoDownloader} />
      <Route path="/about" component={About} />
      <Route path="/faq" component={FAQ} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
