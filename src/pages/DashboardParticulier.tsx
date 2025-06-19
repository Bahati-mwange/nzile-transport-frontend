
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApiData } from '@/hooks/useApiData';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navigation from '@/components/Navigation';
import { 
  CreditCard, 
  Clock, 
  AlertCircle, 
  CheckCircle,
  Calendar,
  FileText,
  Download,
  Plus
} from 'lucide-react';

const DashboardParticulier: React.FC = () => {
  const { currentUser, getDriverCards, getTachographSessions, isLoading } = useApiData();
  const [userCard, setUserCard] = useState<any>(null);
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.type !== 'particulier') {
      navigate('/login');
      return;
    }

    const loadUserData = async () => {
      const [cards, sessions] = await Promise.all([
        getDriverCards(),
        getTachographSessions()
      ]);

      const driverId = currentUser.profile.id;
      const card = cards.find(c => c.driverId === driverId);
      const userSessions = sessions.filter(s => s.driverId === driverId).slice(0, 3);

      setUserCard(card);
      setRecentSessions(userSessions);
    };

    loadUserData();
  }, [currentUser, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <LoadingSpinner size="lg" text="Chargement de votre espace..." />
      </div>
    );
  }

  if (!currentUser || currentUser.type !== 'particulier') {
    return null;
  }

  const driver = currentUser.profile as any;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validee':
        return 'bg-green-100 text-green-800';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'expiree':
        return 'bg-red-100 text-red-800';
      case 'rejetee':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'validee':
        return 'Validée';
      case 'en_attente':
        return 'En attente';
      case 'expiree':
        return 'Expirée';
      case 'rejetee':
        return 'Rejetée';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Mon Espace - {driver.prenom} {driver.nom}
          </h1>
          <p className="mt-2 text-gray-600">
            Gérez votre carte conducteur et suivez vos activités
          </p>
        </div>

        {/* Carte conducteur */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Ma carte conducteur
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userCard ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Numéro de carte</p>
                      <p className="text-sm text-gray-600">{userCard.numero}</p>
                    </div>
                    <Badge className={getStatusColor(userCard.statut)}>
                      {getStatusLabel(userCard.statut)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Date d'émission</p>
                      <p className="text-gray-600">
                        {new Date(userCard.dateEmission).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Date d'expiration</p>
                      <p className="text-gray-600">
                        {new Date(userCard.dateExpiration).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  {userCard.statut === 'validee' && (
                    <Button 
                      onClick={() => navigate(`/cartes/${userCard.id}`)}
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger la carte
                    </Button>
                  )}

                  {userCard.statut === 'expiree' && (
                    <Button 
                      onClick={() => navigate('/cartes/nouvelle')}
                      className="w-full bg-transport-primary hover:bg-blue-700"
                    >
                      Renouveler la carte
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Vous n'avez pas encore de carte conducteur
                  </p>
                  <Button 
                    onClick={() => navigate('/cartes/nouvelle')}
                    className="bg-transport-primary hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Demander une carte
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informations personnelles */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Mes informations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-700">CNI</p>
                    <p className="text-gray-600">{driver.cni}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Permis</p>
                    <p className="text-gray-600">{driver.permis}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Téléphone</p>
                  <p className="text-gray-600">{driver.telephone}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Email</p>
                  <p className="text-gray-600">{driver.email}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Adresse</p>
                  <p className="text-gray-600">{driver.adresse}, {driver.ville}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions récentes */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Mes sessions récentes
                </CardTitle>
                <CardDescription>
                  Dernières activités de conduite enregistrées
                </CardDescription>
              </div>
              <Button 
                onClick={() => navigate('/sessions')}
                variant="outline" 
                size="sm"
              >
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentSessions.length > 0 ? (
              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {session.trajetDepart} → {session.trajetArrivee}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(session.dateDebut).toLocaleDateString('fr-FR')} - 
                        {Math.floor(session.dureeConduite / 60)}h{session.dureeConduite % 60}min
                      </p>
                      {session.infractions.length > 0 && (
                        <div className="flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-xs text-red-600">
                            {session.infractions.length} infraction(s)
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{session.distanceParcourue} km</p>
                      <p className="text-sm text-gray-600">
                        Moy. {session.vitesseMoyenne} km/h
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Aucune session enregistrée</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={() => navigate('/cartes')}
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center"
          >
            <CreditCard className="h-6 w-6 mb-2" />
            Gérer ma carte
          </Button>
          
          <Button 
            onClick={() => navigate('/sessions')}
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center"
          >
            <FileText className="h-6 w-6 mb-2" />
            Mes rapports
          </Button>
          
          <Button 
            onClick={() => navigate('/cartes/nouvelle')}
            className="h-24 flex flex-col items-center justify-center bg-transport-primary hover:bg-blue-700"
          >
            <Plus className="h-6 w-6 mb-2" />
            Nouvelle demande
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardParticulier;
