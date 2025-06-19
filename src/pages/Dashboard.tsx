
import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Clock, Plus, FileText, Bell, TrendingUp, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { currentUser, isInitialized, mockData } = useApiData();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement de votre tableau de bord..." />
      </div>
    );
  }

  if (!currentUser || currentUser.type !== 'particulier') {
    return (
      <PageLayout title="Accès refusé">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Accès réservé aux particuliers</p>
        </div>
      </PageLayout>
    );
  }

  const profile = currentUser.profile as any;
  const userDriverCards = mockData.driverCards.filter(c => c.driverId === currentUser.id);
  const stats = {
    enCours: userDriverCards.filter(c => c.statut === 'en_attente').length,
    validees: userDriverCards.filter(c => c.statut === 'validee').length,
    rejetees: userDriverCards.filter(c => c.statut === 'rejetee').length,
    total: userDriverCards.length
  };

  return (
    <PageLayout title={`Tableau de bord - ${profile.prenom} ${profile.nom}`}>
      <div className="space-y-6">
        {/* Vue d'ensemble */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demandes en cours</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.enCours}</div>
              <p className="text-xs text-muted-foreground">
                En traitement
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cartes validées</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.validees}</div>
              <p className="text-xs text-muted-foreground">
                Actives
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demandes rejetées</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejetees}</div>
              <p className="text-xs text-muted-foreground">
                À reprendre
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total demandes</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Depuis l'inscription
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Actions rapides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button size="lg" className="h-auto p-4 flex-col space-y-2" asChild>
                <Link to="/mes-demandes/nouvelle">
                  <CreditCard className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-semibold">Nouvelle demande</div>
                    <div className="text-xs opacity-80">Carte conducteur</div>
                  </div>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="h-auto p-4 flex-col space-y-2" asChild>
                <Link to="/mes-demandes">
                  <FileText className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-semibold">Mes demandes</div>
                    <div className="text-xs opacity-60">Voir le suivi</div>
                  </div>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="h-auto p-4 flex-col space-y-2" asChild>
                <Link to="/notifications">
                  <Bell className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-semibold">Notifications</div>
                    <div className="text-xs opacity-60">3 non lues</div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dernières demandes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Mes dernières demandes
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/mes-demandes">Voir toutes</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {userDriverCards.length > 0 ? (
              <div className="space-y-3">
                {userDriverCards.slice(0, 3).map((carte) => (
                  <div key={carte.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{carte.numero}</p>
                        <Badge variant={
                          carte.statut === 'validee' ? 'default' :
                          carte.statut === 'en_attente' ? 'secondary' :
                          'destructive'
                        }>
                          {carte.statut === 'validee' ? 'Validée' :
                           carte.statut === 'en_attente' ? 'En cours' :
                           'Rejetée'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Carte conducteur • Expire le {new Date(carte.dateExpiration).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/mes-demandes/${carte.id}`}>Détails</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Aucune demande en cours</p>
                <Button asChild>
                  <Link to="/mes-demandes/nouvelle">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer ma première demande
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notifications récentes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications récentes
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/notifications">Voir toutes</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Carte conducteur validée</p>
                  <p className="text-xs text-muted-foreground">Votre carte GAB-2023-005678 a été validée • Il y a 2 heures</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Document requis</p>
                  <p className="text-xs text-muted-foreground">Veuillez compléter votre dossier avec un certificat médical • Il y a 1 jour</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Rappel d'expiration</p>
                  <p className="text-xs text-muted-foreground">Votre carte expire dans 30 jours • Il y a 3 jours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
