
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Index from "./pages/Index";
import DreamPage from "./pages/DreamPage";
import NewDreamPage from "./pages/NewDreamPage";
import EditDreamPage from "./pages/EditDreamPage";
import ChatPage from "./pages/ChatPage";
import StatsPage from "./pages/StatsPage";
import NotFound from "./pages/NotFound";
import { initializeStorageWithSampleData } from "./utils/storage";

const queryClient = new QueryClient();

const App = () => {
  // Initialize sample data when the app loads
  useEffect(() => {
    initializeStorageWithSampleData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dream/:id" element={<DreamPage />} />
            <Route path="/new" element={<NewDreamPage />} />
            <Route path="/edit/:id" element={<EditDreamPage />} />
            <Route path="/chat/:id" element={<ChatPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
