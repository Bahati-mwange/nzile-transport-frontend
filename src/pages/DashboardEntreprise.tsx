
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApiData } from '@/hooks/useApiData';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navigation from '@/components/Navigation';
import { 
  Users, 
  Truck, 
  CreditCard, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  Plus,
  Eye
} from 'lucide-react';

const DashboardEntreprise: React.FC = () => {
  const { currentUser, getDrivers, getVehicles, getDriverCards, getTachographSessions, isLoading } = useApiData();
  const [stats, setStats] = useState({
    totalDrivers: 0,
    totalVehicles: 0,
    activeCards: 0,
    expiredCards: 0,
    totalSessions: 0,
    infractions: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.type !== 'entreprise') {
      navigate('/login');
      return;
    }

    const loadStats = async () => {
      const [drivers, vehicles, cards, sessions] = await Promise.all([
        getDrivers(),
        getVehicles(),
        getDriverCards(),
        getTachographSessions()
      ]);

      const companyId = currentUser.profile.id;
      const companyDrivers = drivers.filter(d => d.entrepriseId === companyId);
      const companyVehicles = vehicles.filter(v => v.entrepriseId === companyId);
      const driverIds = companyDrivers.map(d => d.id);
      const companyCards = cards.filter(c => driverIds.includes(c.driverId));
      const companySessions = sessions.filter(s => driverIds.includes(s.driverId));

      setStats({
        totalDrivers: companyDrivers.length,
        totalVehicles: companyVehicles.length,
        activeCards: companyCards.filter(c => c.statut === 'validee').length,
        expiredCards: companyCards.filter(c => c.statut === 'expiree').length,
        totalSessions: companySessions.length,
        infractions: companySessions.reduce((acc, s) => acc + s.infractions.length, 0)
      });
    };

    loadStats();
  }, [currentUser, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <LoadingSpinner size="lg" text="Chargement du tableau de bord..." />
      </div>
    );
  }

  if (!currentUser || currentUser.type !== 'entreprise') {
    return null;
  }

  const company = currentUser.profile as any;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de bord - {company.denomination}
          </h1>
          <p className="mt-2 text-gray-600">
            Vue d'ensemble de votre flotte et de vos activités
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chauffeurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-transport-primary">{stats.totalDrivers}</div>
              <p className="text-xs text-muted-foreground">
                Conducteurs actifs
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Véhicules</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-transport-secondary">{stats.totalVehicles}</div>
              <p className="text-xs text-muted-foreground">
                Flotte totale
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cartes actives</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeCards}</div>
              <p className="text-xs text-muted-foreground">
                {stats.expiredCards} expirée(s)
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Infractions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.infractions}</div>
              <p className="text-xs text-muted-foreground">
                Ce mois
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Actions rapides
              </CardTitle>
              <CardDescription>
                Gérez votre flotte efficacement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => navigate('/chauffeurs')} 
                className="w-full justify-start bg-transport-primary hover:bg-blue-700"
              >
                <Users className="h-4 w-4 mr-2" />
                Gérer les chauffeurs
              </Button>
              <Button 
                onClick={() => navigate('/vehicules')} 
                variant="outline" 
                className="w-full justify-start"
              >
                <Truck className="h-4 w-4 mr-2" />
                Gérer les véhicules
              </Button>
              <Button 
                onClick={() => navigate('/cartes/nouvelle')} 
                variant="outline" 
                className="w-full justify-start"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Nouvelle demande de carte
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Activité récente
              </CardTitle>
              <CardDescription>
                Dernières sessions de conduite
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Session Libreville → Franceville</p>
                    <p className="text-xs text-gray-600">ONDO Jean-Baptiste</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">485 km</p>
                    <p className="text-xs text-gray-600">Aujourd'hui</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Session Libreville → Lambaréné</p>
                    <p className="text-xs text-gray-600">MBADINGA Marie-Claire</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">245 km</p>
                    <p className="text-xs text-gray-600">Hier</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/sessions')} 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Voir toutes les sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de l'entreprise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700">RCCM</p>
                <p className="text-gray-600">{company.rccm}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Responsable légal</p>
                <p className="text-gray-600">{company.responsableLegal}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Ville</p>
                <p className="text-gray-600">{company.ville}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Email</p>
                <p className="text-gray-600">{company.email}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Téléphone</p>
                <p className="text-gray-600">{company.telephone}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Date d'inscription</p>
                <p className="text-gray-600">{new Date(company.dateInscription).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardEntreprise;
