
import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Clock, Plus, User, FileText, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

const DashboardParticulier: React.FC = () => {
  const { currentUser, isInitialized, mockData } = useApiData();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement de votre espace..." />
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
  const userSessions = mockData.sessions.filter(s => s.driverId === currentUser.id);

  return (
    <PageLayout title={`Bienvenue ${profile.prenom} ${profile.nom}`}>
      <div className="space-y-6">
        {/* Informations utilisateur */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Mon profil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{profile.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Permis de conduire</p>
                <p className="font-mono">{profile.permis}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ville</p>
                <p>{profile.ville}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mes cartes conducteur */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Mes cartes conducteur
            </CardTitle>
            <Button size="sm" asChild>
              <Link to="/cartes/nouvelle">
                <Plus className="h-3 w-3 mr-1" />
                Nouvelle demande
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {userDriverCards.length > 0 ? (
              <div className="space-y-3">
                {userDriverCards.map((carte) => (
                  <div key={carte.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{carte.numero}</p>
                      <p className="text-sm text-muted-foreground">
                        Expire le {new Date(carte.dateExpiration).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        carte.statut === 'validee' ? 'default' :
                        carte.statut === 'en_attente' ? 'secondary' :
                        'destructive'
                      }>
                        {carte.statut.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/cartes/${carte.id}`}>Détails</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Aucune carte conducteur</p>
                <Button asChild>
                  <Link to="/cartes/nouvelle">
                    <Plus className="h-4 w-4 mr-2" />
                    Faire ma première demande
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mes sessions récentes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Mes sessions récentes
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/sessions">Voir toutes</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {userSessions.length > 0 ? (
              <div className="space-y-3">
                {userSessions.slice(0, 3).map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {session.trajetDepart} → {session.trajetArrivee}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(session.dateDebut).toLocaleDateString('fr-FR')} - 
                        {session.distanceParcourue} km - {Math.floor(session.dureeConduite / 60)}h{session.dureeConduite % 60}min
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.infractions.length > 0 && (
                        <Badge variant="destructive">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {session.infractions.length} infraction(s)
                        </Badge>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/sessions/${session.id}`}>Détails</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucune session enregistrée</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions rapides */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documents & Rapports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Téléchargez vos rapports de conduite et documents officiels.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Rapport mensuel
                </Button>
                <Button size="sm" variant="outline">
                  Mes documents
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Mon compte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Gérez vos informations personnelles et préférences.
              </p>
              <div className="flex gap-2">
                <Button size="sm" asChild>
                  <Link to="/profil">Mon profil</Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/profil/edit">Modifier</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardParticulier;
