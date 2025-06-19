
import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Truck, CreditCard, Clock, Plus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

const DashboardEntreprise: React.FC = () => {
  const { currentUser, isInitialized, mockData } = useApiData();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement du tableau de bord..." />
      </div>
    );
  }

  if (!currentUser || currentUser.type !== 'entreprise') {
    return (
      <PageLayout title="Accès refusé">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Accès réservé aux entreprises</p>
        </div>
      </PageLayout>
    );
  }

  const profile = currentUser.profile as any;
  const stats = {
    chauffeurs: mockData.drivers.filter(d => d.entrepriseId === currentUser.id).length,
    vehicules: mockData.vehicles.filter(v => v.entrepriseId === currentUser.id).length,
    cartesActives: mockData.driverCards.filter(c => c.statut === 'validee').length,
    sessionsRecentes: mockData.sessions.length
  };

  return (
    <PageLayout title={`Tableau de bord - ${profile.denomination}`}>
      <div className="space-y-6">
        {/* Statistiques principales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chauffeurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.chauffeurs}</div>
              <p className="text-xs text-muted-foreground">
                +2 ce mois-ci
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Véhicules</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.vehicules}</div>
              <p className="text-xs text-muted-foreground">
                +1 ce mois-ci
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cartes actives</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.cartesActives}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.cartesActives / stats.chauffeurs) * 100)}% des chauffeurs
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessions récentes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.sessionsRecentes}</div>
              <p className="text-xs text-muted-foreground">
                Cette semaine
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gestion des chauffeurs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Gérez vos chauffeurs, leurs cartes et leurs qualifications.
              </p>
              <div className="flex gap-2">
                <Button size="sm" asChild>
                  <Link to="/chauffeurs/nouveau">
                    <Plus className="h-3 w-3 mr-1" />
                    Nouveau
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/chauffeurs">Voir tous</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Gestion de la flotte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Administrez vos véhicules et leurs équipements.
              </p>
              <div className="flex gap-2">
                <Button size="sm" asChild>
                  <Link to="/vehicules/nouveau">
                    <Plus className="h-3 w-3 mr-1" />
                    Nouveau
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/vehicules">Voir tous</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Cartes conducteur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Suivez les demandes et renouvellements de cartes.
              </p>
              <div className="flex gap-2">
                <Button size="sm" asChild>
                  <Link to="/cartes/nouvelle">
                    <Plus className="h-3 w-3 mr-1" />
                    Nouvelle
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/cartes">Voir toutes</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activité récente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Carte conducteur validée</p>
                  <p className="text-xs text-muted-foreground">Marie-Claire MBADINGA - Il y a 2 heures</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nouveau véhicule ajouté</p>
                  <p className="text-xs text-muted-foreground">Mercedes Actros - GA-3456-LV - Il y a 1 jour</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Session chronotachygraphe terminée</p>
                  <p className="text-xs text-muted-foreground">Jean-Baptiste ONDO - 485 km parcourus - Il y a 2 jours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DashboardEntreprise;
