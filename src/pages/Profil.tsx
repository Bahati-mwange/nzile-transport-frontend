
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, User, Building2 } from 'lucide-react';

const Profil: React.FC = () => {
  const { currentUser } = useApiData();

  if (!currentUser) {
    return (
      <PageLayout title="Profil">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun utilisateur connecté</p>
        </div>
      </PageLayout>
    );
  }

  const isEntreprise = currentUser.type === 'entreprise';
  const profile = currentUser.profile as any;

  return (
    <PageLayout title="Mon Profil">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isEntreprise ? (
              <Building2 className="h-8 w-8 text-transport-primary" />
            ) : (
              <User className="h-8 w-8 text-transport-primary" />
            )}
            <div>
              <h2 className="text-2xl font-bold">
                {isEntreprise ? profile.denomination : `${profile.prenom} ${profile.nom}`}
              </h2>
              <Badge variant="outline">
                {isEntreprise ? 'Entreprise' : 'Particulier'}
              </Badge>
            </div>
          </div>
          <Button asChild>
            <Link to="/profil/edit">
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {isEntreprise ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Informations légales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Dénomination sociale</h3>
                    <p className="text-lg">{profile.denomination}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">N° RCCM</h3>
                    <p className="font-mono">{profile.rccm}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Responsable légal</h3>
                    <p>{profile.responsableLegal}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Date d'inscription</h3>
                    <p>{new Date(profile.dateInscription).toLocaleDateString('fr-FR')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact & Localisation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
                    <p>{profile.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Téléphone</h3>
                    <p>{profile.telephone}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Adresse</h3>
                    <p>{profile.adresse}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Ville</h3>
                    <p>{profile.ville}, {profile.pays}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{profile.nbChauffeurs}</div>
                      <div className="text-sm text-blue-600">Chauffeurs</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{profile.nbVehicules}</div>
                      <div className="text-sm text-green-600">Véhicules</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Nom complet</h3>
                    <p className="text-lg">{profile.prenom} {profile.nom}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Date de naissance</h3>
                    <p>{new Date(profile.dateNaissance).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">CNI</h3>
                    <p className="font-mono">{profile.cni}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Permis de conduire</h3>
                    <p className="font-mono">{profile.permis}</p>
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
                    <p>{profile.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Téléphone</h3>
                    <p>{profile.telephone}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Adresse</h3>
                    <p>{profile.adresse}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Ville</h3>
                    <p>{profile.ville}</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Profil;
