import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages publiques
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterEntreprise from "./pages/RegisterEntreprise";
import RegisterParticulier from "./pages/RegisterParticulier";

// Pages particuliers
import DashboardParticulier from "./pages/DashboardParticulier";
import MesDemandes from "./pages/MesDemandes";
import NouvelleDemande from "./pages/NouvelleDemande";

// Pages entreprises
import DashboardEntreprise from "./pages/DashboardEntreprise";
import EntrepriseMandataires from "./pages/EntrepriseMandataires";
import EntrepriseEntreprises from "./pages/EntrepriseEntreprises";
import EntrepriseDocuments from "./pages/EntrepriseDocuments";
import EntrepriseNouvelleDemande from "./pages/EntrepriseNouvelleDemande";
import EntrepriseDemandes from "./pages/EntrepriseDemandes";
import EntrepriseSessions from "./pages/EntrepriseSessions";
import EntrepriseChronoData from "./pages/EntrepriseChronoData";

// Pages communes
import Cartes from "./pages/CartesEntreprise";
import NouvelleCarteForm from "./pages/NouvelleCarteForm";
import CarteDetail from "./pages/CarteDetail";
import Sessions from "./pages/Sessions";
import SessionDetail from "./pages/SessionDetail";
import Chauffeurs from "./pages/Chauffeurs";
import NouveauChauffeur from "./pages/NouveauChauffeur";
import ChauffeurDetail from "./pages/ChauffeurDetail";
import ChauffeurEdit from "./pages/ChauffeurEdit";
import Vehicules from "./pages/Vehicules";
import NouveauVehicule from "./pages/NouveauVehicule";
import VehiculeDetail from "./pages/VehiculeDetail";
import Profil from "./pages/Profil";
import NotFound from "./pages/NotFound";

// Nouvelles pages
import Notifications from "./pages/Notifications";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import ChronoData from "./pages/ChronoData";
import DemandeDetail from "./pages/DemandeDetail";
import DocumentDetail from "./pages/DocumentDetail";
import SessionDetailEntreprise from "./pages/SessionDetailEntreprise";

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

          {/* Pages particuliers */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedUserTypes={['particulier']}>
              <DashboardParticulier />
            </ProtectedRoute>
          } />

          <Route path="/mes-demandes" element={
            <ProtectedRoute allowedUserTypes={['particulier']}>
              <MesDemandes />
            </ProtectedRoute>
          } />

          <Route path="/mes-demandes/nouvelle" element={
            <ProtectedRoute allowedUserTypes={['particulier']}>
              <NouvelleDemande />
            </ProtectedRoute>
          } />
          <Route path="/cartes" element={
            <ProtectedRoute>
              <Cartes />
            </ProtectedRoute>
          } />

          <Route path="/mes-demandes/:id" element={
            <ProtectedRoute allowedUserTypes={['particulier']}>
              <DemandeDetail />
            </ProtectedRoute>
          } />

          <Route path="/mes-demandes/:id/edit" element={
            <ProtectedRoute allowedUserTypes={['particulier']}>
              <NouvelleCarteForm />
            </ProtectedRoute>
          } />

          {/* Pages entreprises */}
          <Route path="/entreprise" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <DashboardEntreprise />
            </ProtectedRoute>
          } />
          <Route path="/entreprise/cartes" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <Cartes />
            </ProtectedRoute>
          } />

          <Route path="/entreprise/sessions/:id" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <SessionDetailEntreprise />
            </ProtectedRoute>
          } />
          <Route path="/entreprise/sessions" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <EntrepriseSessions />
            </ProtectedRoute>
          } />

          <Route path="/entreprise/chrono-data" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <EntrepriseChronoData />
            </ProtectedRoute>
          } />

          <Route path="/entreprise/demandes" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <EntrepriseDemandes />
            </ProtectedRoute>
          } />

          <Route path="/entreprise/demandes/nouvelle-demande" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <EntrepriseNouvelleDemande />
            </ProtectedRoute>
          } />

          <Route path="/entreprise/demandes/:id" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <DemandeDetail />
            </ProtectedRoute>
          } />

          <Route path="/entreprise/documents" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <EntrepriseDocuments />
            </ProtectedRoute>
          } />

          <Route path="/entreprise/documents/:id" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <DocumentDetail />
            </ProtectedRoute>
          } />

          <Route path="/entreprise/suivi/:id" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <CarteDetail />
            </ProtectedRoute>
          } />

          <Route path="/entreprise/profil" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <Profil />
            </ProtectedRoute>
          } />

          <Route path="/entreprise/notifications" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <Notifications />
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

          <Route path="/vehicules/:id" element={
            <ProtectedRoute allowedUserTypes={['entreprise']}>
              <VehiculeDetail />
            </ProtectedRoute>
          } />

          {/* Pages communes */}


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

          <Route path="/sessions/:id" element={
            <ProtectedRoute>
              <SessionDetail />
            </ProtectedRoute>
          } />

          <Route path="/sessions/nouvelle" element={
            <ProtectedRoute>
              <Sessions />
            </ProtectedRoute>
          } />

          <Route path="/chrono-data" element={
            <ProtectedRoute>
              <ChronoData />
            </ProtectedRoute>
          } />

          <Route path="/profil" element={
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          } />

          <Route path="/profil/edit" element={
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          } />

          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />

          <Route path="/faq" element={
            <ProtectedRoute>
              <FAQ />
            </ProtectedRoute>
          } />

          <Route path="/contact" element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } />

          {/* Redirections */}
          <Route path="/mon-espace" element={<Navigate to="/dashboard" replace />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
