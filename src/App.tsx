import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import EvidenceHub from "./pages/EvidenceHub";
import GeoOptimizer from "./pages/GeoOptimizer";
import Assets from "./pages/Assets";
import TrustCard from "./pages/TrustCard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout><></></AppLayout>}>
            {/* Wrapped routes not needed - using layout per page */}
          </Route>
          <Route path="/" element={<AppLayout><Index /></AppLayout>} />
          <Route path="/evidence-hub" element={<AppLayout><EvidenceHub /></AppLayout>} />
          <Route path="/geo-optimizer" element={<AppLayout><GeoOptimizer /></AppLayout>} />
          <Route path="/assets" element={<AppLayout><Assets /></AppLayout>} />
          <Route path="/trust-card/:id" element={<AppLayout><TrustCard /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
