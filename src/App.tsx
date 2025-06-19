
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterEntreprise from "./pages/RegisterEntreprise";
import RegisterParticulier from "./pages/RegisterParticulier";
import DashboardEntreprise from "./pages/DashboardEntreprise";
import DashboardParticulier from "./pages/DashboardParticulier";
import Cartes from "./pages/Cartes";
import NouvelleCarteForm from "./pages/NouvelleCarteForm";
import CarteDetail from "./pages/CarteDetail";
import Sessions from "./pages/Sessions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/entreprise" element={<RegisterEntreprise />} />
          <Route path="/register/particulier" element={<RegisterParticulier />} />
          <Route path="/entreprise" element={<DashboardEntreprise />} />
          <Route path="/mon-espace" element={<DashboardParticulier />} />
          <Route path="/cartes" element={<Cartes />} />
          <Route path="/cartes/nouvelle" element={<NouvelleCarteForm />} />
          <Route path="/cartes/:id" element={<CarteDetail />} />
          <Route path="/sessions" element={<Sessions />} />
          {/* Pages qui seront ajoutées */}
          <Route path="/chauffeurs" element={<NotFound />} />
          <Route path="/vehicules" element={<NotFound />} />
          <Route path="/sessions/:id" element={<NotFound />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
