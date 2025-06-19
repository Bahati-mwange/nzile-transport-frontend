
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, ArrowLeft, Trash2, Calendar, Wrench, Fuel } from 'lucide-react';
import type { Vehicle } from '@/hooks/useApiData';

const VehiculeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getVehicleById, getVehiculeDetails, getSessionsByVehicle } = useApiData();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVehicle();
  }, [id]);

  const loadVehicle = async () => {
    if (!id) return;
    const data = await getVehicleById(id);
    setVehicle(data || null);
    setIsLoading(false);
  };

  const handleDelete = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      navigate('/vehicules');
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Détail du véhicule">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Chargement...</div>
        </div>
      </PageLayout>
    );
  }

  if (!vehicle) {
    return (
      <PageLayout title="Véhicule introuvable">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Ce véhicule n'existe pas.</p>
          <Button asChild>
            <Link to="/vehicules">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la liste
            </Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  const vehicleDetails = getVehiculeDetails(vehicle.id);
  const recentSessions = getSessionsByVehicle(vehicle.id).slice(0, 3);

  return (
    <PageLayout title={`${vehicle.marque} ${vehicle.modele}`}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/vehicules">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Link>
          </Button>
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" asChild>
              <Link to={`/vehicules/${vehicle.id}/edit`}>
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
              <CardTitle>Informations véhicule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Marque et modèle</h3>
                <p className="text-lg font-semibold">{vehicle.marque} {vehicle.modele}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Immatriculation</h3>
                <p className="font-mono text-lg">{vehicle.immatriculation}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Type de véhicule</h3>
                <p>{vehicle.typeVehicule}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Année</h3>
                <p>{vehicle.annee}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Chronotachygraphe</h3>
                <Badge variant={vehicle.chronotachygraphe ? "default" : "secondary"}>
                  {vehicle.chronotachygraphe ? "Équipé" : "Non équipé"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {vehicleDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Maintenance & Contrôles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Prochain contrôle</h3>
                    <p>{new Date(vehicleDetails.prochainControle).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wrench className="h-4 w-4 text-green-600" />
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Dernière maintenance</h3>
                    <p>{new Date(vehicleDetails.derniereMaintenance).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fuel className="h-4 w-4 text-orange-600" />
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Consommation moyenne</h3>
                    <p>{vehicleDetails.consommationMoyenne} L/100km</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Kilométrage</h3>
                  <p>{vehicleDetails.kilometrage.toLocaleString()} km</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Coût entretien annuel</h3>
                  <p>{vehicleDetails.coutEntretien.toLocaleString()} FCFA</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sessions récentes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentSessions.length > 0 ? (
              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {new Date(session.dateDebut).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {session.trajetDepart} → {session.trajetArrivee}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{session.distanceParcourue} km</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.floor(session.dureeConduite / 60)}h{session.dureeConduite % 60}m
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aucune session enregistrée.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default VehiculeDetail;
