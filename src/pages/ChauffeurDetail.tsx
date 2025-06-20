import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, ArrowLeft, Trash2, CreditCard, Calendar, MapPin } from 'lucide-react';
import type { Driver } from '@/hooks/useApiData';

const ChauffeurDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDriverById } = useApiData();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDriver();
  }, [id]);

  const loadDriver = async () => {
    if (!id) return;
    
    // Données enrichies avec carte conducteur
    const enrichedDriver: Driver = {
      id: id,
      nom: 'ONDO',
      prenom: 'Jean-Baptiste',
      email: 'jb.ondo@gmail.com',
      telephone: '+241-01-23-45-67',
      cni: '173456789',
      permis: 'GA-2021-001234',
      adresse: 'Quartier Glass, Libreville',
      ville: 'Libreville',
      lieuNaissance: 'Libreville',
      dateNaissance: '1985-03-15',
      entrepriseId: '1',
      carteConducteur: {
        id: '1',
        driverId: id,
        numero: 'GAB-2023-001234',
        dateEmission: '2023-01-15',
        dateExpiration: '2028-01-15',
        statut: 'validee',
        type: 'conducteur',
        documents: ['permis.pdf', 'medical.pdf'],
        typeVehicule: 'Poids lourd',
        autoriteEmission: 'Direction Générale des Transports - Gabon'
      }
    };
    
    setDriver(enrichedDriver);
    setIsLoading(false);
  };

  const handleDelete = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce conducteur ?')) {
      navigate('/chauffeurs');
    }
  };

  const getStatutCarteBadgeVariant = (statut: string) => {
    switch (statut) {
      case 'validee': return 'default';
      case 'en_attente': return 'secondary';
      case 'expiree': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatutCarteLabel = (statut: string) => {
    switch (statut) {
      case 'validee': return 'Valide';
      case 'en_attente': return 'En attente';
      case 'expiree': return 'Expirée';
      default: return statut;
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Détail du conducteur">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Chargement...</div>
        </div>
      </PageLayout>
    );
  }

  if (!driver) {
    return (
      <PageLayout title="Conducteur introuvable">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Ce conducteur n'existe pas.</p>
          <Button asChild>
            <Link to="/chauffeurs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la liste
            </Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={`${driver.prenom} ${driver.nom}`}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/chauffeurs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Link>
          </Button>
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" asChild>
              <Link to={`/chauffeurs/${driver.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Nom complet</h3>
                <p className="text-lg font-semibold">{driver.prenom} {driver.nom}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Date de naissance</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p>{new Date(driver.dateNaissance).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Lieu de naissance</h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p>{driver.lieuNaissance}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">CNI</h3>
                <p>{driver.cni}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Statut</h3>
                <Badge variant={driver.entrepriseId ? "default" : "secondary"}>
                  {driver.entrepriseId ? "Conducteur d'entreprise" : "Conducteur particulier"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact & Adresse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
                <p>{driver.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Téléphone</h3>
                <p>{driver.telephone}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Adresse</h3>
                <p>{driver.adresse}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Ville</h3>
                <p>{driver.ville}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permis de conduire</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Numéro de permis</h3>
                <p className="font-mono">{driver.permis}</p>
              </div>
            </CardContent>
          </Card>

          {/* Carte conducteur */}
          {driver.carteConducteur && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Carte conducteur
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Numéro</h3>
                    <p className="font-mono font-semibold">{driver.carteConducteur.numero}</p>
                  </div>
                  <Badge variant={getStatutCarteBadgeVariant(driver.carteConducteur.statut)}>
                    {getStatutCarteLabel(driver.carteConducteur.statut)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Date d'émission</h3>
                    <p>{new Date(driver.carteConducteur.dateEmission).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Date d'expiration</h3>
                    <p>{new Date(driver.carteConducteur.dateExpiration).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                
                {driver.carteConducteur.typeVehicule && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Type de véhicule autorisé</h3>
                    <p>{driver.carteConducteur.typeVehicule}</p>
                  </div>
                )}
                
                {driver.carteConducteur.autoriteEmission && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Autorité d'émission</h3>
                    <p className="text-sm">{driver.carteConducteur.autoriteEmission}</p>
                  </div>
                )}
                
                {driver.carteConducteur.statut === 'expiree' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm font-medium">
                      ⚠️ Cette carte est expirée. Une demande de renouvellement est nécessaire.
                    </p>
                  </div>
                )}
                
                {driver.carteConducteur.statut === 'en_attente' && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-orange-700 text-sm font-medium">
                      ⚠️ Cette carte est en attente de validation.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ChauffeurDetail;
