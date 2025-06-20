import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import { Alerte } from '@/data/mockData';
import PageLayout from '@/components/PageLayout';
import DashboardCard from '@/components/DashboardCard';
import SessionChart from '@/components/SessionChart';
import AlertesCritiques from '@/components/AlertesCritiques';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Car,
  Clock,
  AlertTriangle,
  Download,
  Upload,
  TrendingUp,
  Activity,
  Plus,
  FileText
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

const DashboardEntreprise: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, isInitialized, getDashboardStats, getChartData, getAlertes } = useApiData();
  const [alertes, setAlertes] = useState<Alerte[]>(getAlertes());

  if (!isInitialized) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement du tableau de bord..." />
      </div>
    );
  }

  if (!currentUser || currentUser.type !== 'entreprise') {
    navigate('/login');
    return null;
  }

  const stats = getDashboardStats('entreprise');
  const chartData = getChartData('evolutionDemandes');

  const handleResoudreAlerte = (alerteId: string) => {
    setAlertes(prev => prev.map(a =>
      a.id === alerteId ? { ...a, resolu: true } : a
    ));
  };

  const actionButtons = (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Exporter</span>
      </Button>
      <Button variant="outline" size="sm">
        <Upload className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Uploader session</span>
      </Button>
    </div>
  );

  return (
    <PageLayout title="Dashboard Entreprise" actions={actionButtons}>
      <div className="space-y-6">
        {/* En-tête entreprise */}
        <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                  {(currentUser.profile as any).denomination}
                </h2>
                <p className="text-green-100">
                  Vue d'ensemble des activités du {new Date().toLocaleDateString('fr-FR')}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span>RCCM: {(currentUser.profile as any).rccm}</span>
                  <span>•</span>
                  <span>{(currentUser.profile as any).ville}, Gabon</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-white text-green-700 px-3 py-1">
                  {stats.alertesCritiques} alertes
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métriques principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DashboardCard
            title="Sessions aujourd'hui"
            value={stats.sessionsAujourdhui}
            icon={Activity}
            iconColor="text-blue-600"
            onClick={() => navigate('/entreprise/sessions')}
          />

          <DashboardCard
            title="Conducteurs en ligne"
            value={`${stats.chauffeursEnLigne}/15`}
            icon={Users}
            iconColor="text-green-600"
            onClick={() => navigate('/chauffeurs')}
          />

          <DashboardCard
            title="Véhicules actifs"
            value={`${stats.vehiculesActifs}/12`}
            icon={Car}
            iconColor="text-purple-600"
            onClick={() => navigate('/vehicules')}
          />

          <DashboardCard
            title="Vitesse moyenne"
            value={`${stats.vitesseMoyenne} km/h`}
            icon={TrendingUp}
            iconColor="text-orange-600"
          />
        </div>

        {/* Temps et infractions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temps conduite total</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.tempsConduiteTotal}h</p>
                  <p className="text-xs text-gray-500">Aujourd'hui</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temps repos total</p>
                  <p className="text-2xl font-bold text-green-600">{stats.tempsReposTotal}h</p>
                  <p className="text-xs text-gray-500">Aujourd'hui</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Infractions détectées</p>
                  <p className="text-2xl font-bold text-red-600">{stats.infractionsDuJour}</p>
                  <p className="text-xs text-gray-500">Aujourd'hui</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques et alertes */}
        <div className="grid lg:grid-cols-2 gap-6">
          <SessionChart
            data={chartData}
            type="bar"
            title="Évolution des demandes (6 derniers mois)"
            dataKeys={[
              { key: 'validees', color: '#10b981', name: 'Validées' },
              { key: 'enCours', color: '#f59e0b', name: 'En cours' },
              { key: 'rejetees', color: '#ef4444', name: 'Rejetées' }
            ]}
          />

          <AlertesCritiques
            alertes={alertes}
            onResoudre={handleResoudreAlerte}
          />
        </div>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/chauffeurs/nouveau')}
              >
                <Plus className="h-6 w-6" />
                <span>Ajouter Conducteur</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/vehicules/nouveau')}
              >
                <Car className="h-6 w-6" />
                <span>Nouveau véhicule</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/entreprise/demandes')}
              >
                <FileText className="h-6 w-6" />
                <span>Nouvelle demande</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/entreprise/sessions')}
              >
                <Activity className="h-6 w-6" />
                <span>Voir sessions</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DashboardEntreprise;
