
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, ArrowLeft, Trash2 } from 'lucide-react';
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
    const data = await getDriverById(id);
    setDriver(data || null);
    setIsLoading(false);
  };

  const handleDelete = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce chauffeur ?')) {
      navigate('/chauffeurs');
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Détail du chauffeur">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Chargement...</div>
        </div>
      </PageLayout>
    );
  }

  if (!driver) {
    return (
      <PageLayout title="Chauffeur introuvable">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Ce chauffeur n'existe pas.</p>
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
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Date de naissance</h3>
                <p>{new Date(driver.dateNaissance).toLocaleDateString('fr-FR')}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">CNI</h3>
                <p>{driver.cni}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Statut</h3>
                <Badge variant={driver.entrepriseId ? "default" : "secondary"}>
                  {driver.entrepriseId ? "Chauffeur d'entreprise" : "Chauffeur particulier"}
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
              {driver.carteConducteur && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Carte conducteur</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      driver.carteConducteur.statut === 'validee' ? 'default' :
                      driver.carteConducteur.statut === 'en_attente' ? 'secondary' :
                      'destructive'
                    }>
                      {driver.carteConducteur.statut.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {driver.carteConducteur.numero}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChauffeurDetail;
