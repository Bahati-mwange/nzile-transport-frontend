
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApiData } from '@/hooks/useApiData';
import { 
  Clock, 
  ArrowLeft,
  Truck,
  User,
  MapPin,
  AlertTriangle,
  Download,
  BarChart3,
  Users
} from 'lucide-react';

const SessionDetail: React.FC = () => {
  const { id } = useParams();
  const { getSessionById } = useApiData();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadSession();
  }, [id]);

  const loadSession = async () => {
    if (!id) return;
    
    const sessionData = await getSessionById(id);
    setSession(sessionData);
    setLoading(false);
  };

  if (loading) {
    return <PageLayout title="Détail de la session"><div>Chargement...</div></PageLayout>;
  }

  if (!session) {
    return <PageLayout title="Session introuvable"><div>Session non trouvée</div></PageLayout>;
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <PageLayout title={`Session du ${new Date(session.dateDebut).toLocaleDateString('fr-FR')}`}>
      <div className="space-y-6">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Informations de la session
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-700">Date de début</p>
                    <p className="text-gray-900">{new Date(session.dateDebut).toLocaleString('fr-FR')}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Date de fin</p>
                    <p className="text-gray-900">{new Date(session.dateFin).toLocaleString('fr-FR')}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Durée de conduite</p>
                    <p className="text-gray-900">{formatDuration(session.dureeConduite)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Durée de repos</p>
                    <p className="text-gray-900">{formatDuration(session.dureeRepos)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Distance parcourue</p>
                    <p className="text-gray-900">{session.distanceParcourue} km</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Vitesse moyenne</p>
                    <p className="text-gray-900">{session.vitesseMoyenne} km/h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trajet */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Itinéraire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Départ</p>
                      <p className="text-gray-600">{session.trajetDepart}</p>
                    </div>
                  </div>
                  <div className="border-l-2 border-gray-300 ml-1.5 h-6"></div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Arrivée</p>
                      <p className="text-gray-600">{session.trajetArrivee}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Infractions */}
            {session.infractions && session.infractions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-600">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Infractions détectées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {session.infractions.map((infraction: string, index: number) => (
                      <div key={index} className="flex items-center p-2 bg-orange-50 border border-orange-200 rounded">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                        <span className="text-orange-800">{infraction}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Conducteurs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {session.conducteurs?.secondaire ? (
                    <Users className="h-5 w-5 mr-2" />
                  ) : (
                    <User className="h-5 w-5 mr-2" />
                  )}
                  Conducteur{session.conducteurs?.secondaire ? 's' : ''}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{session.conducteurs?.principal || session.driverName}</p>
                  <p className="text-sm text-gray-600">Conducteur principal</p>
                  <p className="text-sm text-gray-600">Carte: GAB-2023-001234</p>
                </div>
                {session.conducteurs?.secondaire && (
                  <div className="pt-2 border-t">
                    <p className="font-medium">{session.conducteurs.secondaire}</p>
                    <p className="text-sm text-gray-600">Conducteur secondaire</p>
                    <p className="text-sm text-gray-600">Carte: GAB-2023-005678</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Véhicule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Véhicule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{session.vehicleName}</p>
                <p className="text-sm text-gray-600">GA-3456-LV</p>
              </CardContent>
            </Card>

            {/* Statistiques */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Vitesse max</span>
                  <span className="font-medium">{session.vitesseMax} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Économie carburant</span>
                  <span className="font-medium text-green-600">+12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Score conduite</span>
                  <Badge variant="default">Bon</Badge>
                </div>
                {session.conducteurs?.secondaire && (
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-gray-600">Conduite partagée</span>
                    <Badge variant="secondary">2 conducteurs</Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger le rapport
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SessionDetail;
