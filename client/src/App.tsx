import { ProtectedRoute } from "@/lib/auth";
import About from "@/pages/About";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import VideoDownloader from "@/pages/VideoDonwloader";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Privacy from "./pages/Privacy";
import SignUp from "./pages/SignUp";
import Thread from "./pages/Thread";
import ViralFeed from "./pages/ViralFeed";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/faq" component={FAQ} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={() => (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      )} />
       <Route path="/viral-feed" component={() => (
        <ProtectedRoute>
          <ViralFeed />
        </ProtectedRoute>
      )} />
      <Route path="/thread" component={() => (
        <ProtectedRoute>
          <Thread />
        </ProtectedRoute>
      )} />
      <Route path="/video" component={() => (
        <ProtectedRoute>
          <VideoDownloader />
        </ProtectedRoute>
      )} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
