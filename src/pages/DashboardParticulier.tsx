import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import DashboardCard from '@/components/DashboardCard';
import SessionChart from '@/components/SessionChart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Clock,
  AlertTriangle,
  Car,
  TrendingUp,
  Calendar,
  MapPin,
  Plus,
  Eye
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

const DashboardParticulier: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, isInitialized, getDashboardStats, getChartData, getSessions } = useApiData();

  if (!isInitialized) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement du tableau de bord..." />
      </div>
    );
  }

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const stats = getDashboardStats('particulier');
  const chartData = getChartData('tempsConduite');
  const recentSessions = getSessions().slice(0, 3);

  const getCarteStatutBadge = (statut: string) => {
    switch (statut) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">🟢 Active</Badge>;
      case 'expire_bientot':
        return <Badge className="bg-orange-100 text-orange-800">🟠 Expire bientôt</Badge>;
      case 'expiree':
        return <Badge variant="destructive">🔴 Expirée</Badge>;
      default:
        return <Badge variant="outline">{statut}</Badge>;
    }
  };

  return (
    <PageLayout title="Tableau de bord">
      <div className="space-y-6">
        {/* Carte conducteur */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  <h3 className="text-xl font-semibold">Carte Conducteur</h3>
                </div>
                <p className="text-blue-100">
                  {(currentUser.profile as any).prenom} {(currentUser.profile as any).nom}
                </p>
                <div className="flex items-center gap-2">
                  {getCarteStatutBadge(stats.carteStatut)}
                  <span className="text-sm text-blue-100">
                    Expire le {new Date(stats.carteExpiration).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => navigate('/mes-demandes/nouvelle')}
                  className="bg-white text-blue-700 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Faire une demande
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Temps de conduite"
            value={`${stats.tempsConduiteTotal}h`}
            subtitle="Ce mois"
            icon={Clock}
            iconColor="text-blue-600"
            trend={{ value: 12.5, isPositive: true }}
          />

          <DashboardCard
            title="Temps de repos"
            value={`${stats.tempsRepos}h`}
            subtitle="Ce mois"
            icon={Clock}
            iconColor="text-green-600"
            trend={{ value: 8.2, isPositive: true }}
          />

          <DashboardCard
            title="Infractions"
            value={stats.infractions}
            subtitle="Ce mois"
            icon={AlertTriangle}
            iconColor="text-red-600"
            onClick={() => navigate('/sessions')}
          />

          <DashboardCard
            title="Sessions"
            value={stats.sessionsCount}
            subtitle="Ce mois"
            icon={Car}
            iconColor="text-purple-600"
            trend={{ value: 15.3, isPositive: true }}
            onClick={() => navigate('/sessions')}
          />
        </div>

        {/* Graphique et sessions récentes */}
        <div className="grid lg:grid-cols-2 gap-6">
          <SessionChart
            data={chartData}
            type="bar"
            title="Temps de conduite et repos (7 derniers jours)"
            dataKeys={[
              { key: 'conduite', color: '#3b82f6', name: 'Conduite' },
              { key: 'repos', color: '#10b981', name: 'Repos' }
            ]}
            height={280}
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Sessions récentes</span>
                <Button variant="ghost" size="sm" onClick={() => navigate('/sessions')}>
                  <Eye className="h-4 w-4 mr-1" />
                  Voir tout
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {new Date(session.dateDebut).toLocaleDateString('fr-FR')}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {Math.floor(session.dureeConduite / 60)}h{session.dureeConduite % 60}m
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        {session.trajetDepart} → {session.trajetArrivee}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{session.distanceParcourue} km</div>
                      {session.infractions.length > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {session.infractions.length} infraction{session.infractions.length > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/mes-demandes/nouvelle')}
              >
                <Plus className="h-6 w-6" />
                <span>Nouvelle demande</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/sessions')}
              >
                <TrendingUp className="h-6 w-6" />
                <span>Mes sessions</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2"
                onClick={() => navigate('/profil')}
              >
                <CreditCard className="h-6 w-6" />
                <span>Mon profil</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DashboardParticulier;
