
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

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
import Chauffeurs from "./pages/Chauffeurs";
import NouveauChauffeur from "./pages/NouveauChauffeur";
import ChauffeurDetail from "./pages/ChauffeurDetail";
import ChauffeurEdit from "./pages/ChauffeurEdit";
import Vehicules from "./pages/Vehicules";
import NouveauVehicule from "./pages/NouveauVehicule";
import Profil from "./pages/Profil";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Pages publiques */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/entreprise" element={<RegisterEntreprise />} />
          <Route path="/register/particulier" element={<RegisterParticulier />} />
          
          {/* Pages protégées - Entreprise */}
          <Route path="/entreprise" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <DashboardEntreprise />
            </ProtectedRoute>
          } />
          
          <Route path="/chauffeurs" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <Chauffeurs />
            </ProtectedRoute>
          } />
          
          <Route path="/chauffeurs/nouveau" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <NouveauChauffeur />
            </ProtectedRoute>
          } />
          
          <Route path="/chauffeurs/:id" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <ChauffeurDetail />
            </ProtectedRoute>
          } />
          
          <Route path="/chauffeurs/:id/edit" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <ChauffeurEdit />
            </ProtectedRoute>
          } />
          
          <Route path="/vehicules" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <Vehicules />
            </ProtectedRoute>
          } />
          
          <Route path="/vehicules/nouveau" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <NouveauVehicule />
            </ProtectedRoute>
          } />
          
          {/* Pages protégées - Particulier */}
          <Route path="/mon-espace" element={
            <ProtectedRoute allowedUserTypes={['particulier']}>
              <DashboardParticulier />
            </ProtectedRoute>
          } />
          
          {/* Pages protégées - Communes */}
          <Route path="/cartes" element={
            <ProtectedRoute>
              <Cartes />
            </ProtectedRoute>
          } />
          
          <Route path="/cartes/nouvelle" element={
            <ProtectedRoute>
              <NouvelleCarteForm />
            </ProtectedRoute>
          } />
          
          <Route path="/cartes/:id" element={
            <ProtectedRoute>
              <CarteDetail />
            </ProtectedRoute>
          } />
          
          <Route path="/sessions" element={
            <ProtectedRoute>
              <Sessions />
            </ProtectedRoute>
          } />
          
          <Route path="/profil" element={
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
