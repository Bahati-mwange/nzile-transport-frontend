import React, { useState } from 'react';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Eye, Edit, Trash2, Users, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

const EntrepriseMandataires: React.FC = () => {
  const { currentUser, isInitialized, mockData } = useApiData();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isInitialized) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement des mandataires..." />
      </div>
    );
  }

  if (!currentUser || currentUser.type !== 'entreprise') {
    return (
      <PageLayout title="Accès refusé">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Accès réservé aux entreprises</p>
        </div>
      </PageLayout>
    );
  }

  const entrepriseMandataires = mockData.drivers.filter(d => d.entrepriseId === currentUser.id);

  const filteredMandataires = entrepriseMandataires.filter(mandataire =>
    mandataire.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mandataire.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mandataire.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout title="Gestion des mandataires">
      <div className="space-y-6">
        {/* En-tête avec statistiques */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total mandataires</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{entrepriseMandataires.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mandataires actifs</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{entrepriseMandataires.length}</div>
              <p className="text-xs text-muted-foreground">
                100% du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents vérifiés</CardTitle>
              <Upload className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{Math.round(entrepriseMandataires.length * 0.8)}</div>
              <p className="text-xs text-muted-foreground">
                80% complétés
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions et recherche */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un mandataire..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button asChild>
            <Link to="/chauffeurs/nouveau">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un mandataire
            </Link>
          </Button>
        </div>

        {/* Liste des mandataires */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des mandataires ({filteredMandataires.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredMandataires.length > 0 ? (
              <>
                {/* Vue tableau pour desktop */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom complet</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>CNI</TableHead>
                        <TableHead>Permis</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Documents</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMandataires.map((mandataire) => (
                        <TableRow key={mandataire.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{mandataire.prenom} {mandataire.nom}</div>
                              <div className="text-sm text-muted-foreground">{mandataire.ville}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm">{mandataire.telephone}</div>
                              <div className="text-sm text-muted-foreground">{mandataire.email}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{mandataire.cni}</TableCell>
                          <TableCell className="font-mono text-sm">{mandataire.permis}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Actif</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {Math.random() > 0.5 ? 'Complets' : 'En attente'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/chauffeurs/${mandataire.id}`}>
                                  <Eye className="h-3 w-3" />
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/chauffeurs/${mandataire.id}/edit`}>
                                  <Edit className="h-3 w-3" />
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Vue cartes pour mobile */}
                <div className="md:hidden space-y-4">
                  {filteredMandataires.map((mandataire) => (
                    <Card key={mandataire.id}>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{mandataire.prenom} {mandataire.nom}</h3>
                            <Badge className="bg-green-100 text-green-800">Actif</Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>📞 {mandataire.telephone}</p>
                            <p>✉️ {mandataire.email}</p>
                            <p>🆔 CNI: {mandataire.cni}</p>
                            <p>🚗 Permis: {mandataire.permis}</p>
                            <p>📍 {mandataire.ville}</p>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm" className="flex-1" asChild>
                              <Link to={`/chauffeurs/${mandataire.id}`}>
                                <Eye className="h-3 w-3 mr-1" />
                                Voir
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1" asChild>
                              <Link to={`/chauffeurs/${mandataire.id}/edit`}>
                                <Edit className="h-3 w-3 mr-1" />
                                Modifier
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="text-muted-foreground mb-4">
                  {searchTerm ? "Aucun mandataire ne correspond à votre recherche" : "Aucun mandataire enregistré"}
                </div>
                <Button asChild>
                  <Link to="/chauffeurs/nouveau">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter le premier mandataire
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default EntrepriseMandataires;
