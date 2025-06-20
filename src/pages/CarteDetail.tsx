
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApiData } from '@/hooks/useApiData';
import { useToast } from "@/hooks/use-toast";
import Navigation from '@/components/Navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { 
  CreditCard, 
  Download, 
  Edit, 
  Trash2, 
  FileText, 
  Calendar,
  User,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';

const CarteDetail: React.FC = () => {
  const { id } = useParams();
  const { currentUser, getDriverCardById, getDriverById, isLoading } = useApiData();
  const [card, setCard] = useState<any>(null);
  const [driver, setDriver] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate('/cartes');
      return;
    }

    const loadCardData = async () => {
      const cardData = await getDriverCardById(id);
      if (cardData) {
        setCard(cardData);
        const driverData = await getDriverById(cardData.driverId);
        setDriver(driverData);
      } else {
        toast({
          title: "Erreur",
          description: "Carte non trouvée",
          variant: "destructive"
        });
        navigate('/cartes');
      }
    };

    loadCardData();
  }, [id, currentUser]);

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

  const handleDownload = () => {
    toast({
      title: "Téléchargement",
      description: "La carte a été téléchargée avec succès"
    });
  };

  const handleRenew = () => {
    navigate('/cartes/nouvelle');
  };

  const handleDelete = () => {
    toast({
      title: "Carte supprimée",
      description: "La demande de carte a été supprimée avec succès"
    });
    navigate('/cartes');
  };

  if (isLoading || !card) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <LoadingSpinner size="lg" text="Chargement des détails..." />
      </div>
    );
  }

  const isExpiringSoon = () => {
    const expirationDate = new Date(card.dateExpiration);
    const today = new Date();
    const daysUntilExpiration = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilExpiration <= 30 && daysUntilExpiration > 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button
            onClick={() => navigate('/cartes')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la liste
          </Button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Carte {card.numero}
              </h1>
              <p className="mt-2 text-gray-600">
                Détails de la carte conducteur
              </p>
            </div>
            <Badge className={getStatusColor(card.statut)}>
              {getStatusLabel(card.statut)}
            </Badge>
          </div>
        </div>

        {/* Alerte d'expiration */}
        {isExpiringSoon() && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-orange-600 mr-3" />
                <div>
                  <h3 className="font-medium text-orange-900">Carte expirant bientôt</h3>
                  <p className="text-sm text-orange-700">
                    Cette carte expire le {new Date(card.dateExpiration).toLocaleDateString('fr-FR')}. 
                    Pensez à la renouveler.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Informations de la carte
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-700">Numéro de carte</p>
                    <p className="text-gray-900 text-lg font-mono">{card.numero}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Type</p>
                    <p className="text-gray-900 capitalize">{card.type}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Date d'émission</p>
                    <p className="text-gray-900">
                      {new Date(card.dateEmission).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Date d'expiration</p>
                    <p className={`font-medium ${isExpiringSoon() ? 'text-orange-600' : 'text-gray-900'}`}>
                      {new Date(card.dateExpiration).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations du conducteur */}
            {driver && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Conducteur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Nom complet</p>
                      <p className="text-gray-900">{driver.prenom} {driver.nom}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">CNI</p>
                      <p className="text-gray-900">{driver.cni}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Permis de conduire</p>
                      <p className="text-gray-900">{driver.permis}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Téléphone</p>
                      <p className="text-gray-900">{driver.telephone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="font-medium text-gray-700">Adresse</p>
                      <p className="text-gray-900">{driver.adresse}, {driver.ville}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Documents */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Documents joints
                </CardTitle>
              </CardHeader>
              <CardContent>
                {card.documents && card.documents.length > 0 ? (
                  <div className="space-y-2">
                    {card.documents.map((document: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm">{document}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Télécharger
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Aucun document joint</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {card.statut === 'validee' && (
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-transport-primary hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger la carte
                  </Button>
                )}
                
                {(card.statut === 'expiree' || isExpiringSoon()) && (
                  <Button
                    onClick={handleRenew}
                    className="w-full bg-transport-secondary hover:bg-green-700"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Renouveler
                  </Button>
                )}
                
                <Button
                  onClick={() => navigate(`/cartes/${card.id}/edit`)}
                  variant="outline"
                  className="w-full"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                
                <Button
                  onClick={handleDelete}
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </CardContent>
            </Card>

            {/* Statistiques */}
            <Card>
              <CardHeader>
                <CardTitle>Validité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Émise il y a</span>
                    <span className="font-medium">
                      {Math.floor((Date.now() - new Date(card.dateEmission).getTime()) / (1000 * 3600 * 24))} jours
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expire dans</span>
                    <span className={`font-medium ${isExpiringSoon() ? 'text-orange-600' : ''}`}>
                      {Math.ceil((new Date(card.dateExpiration).getTime() - Date.now()) / (1000 * 3600 * 24))} jours
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Durée de validité</span>
                    <span className="font-medium">5 ans</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarteDetail;
