
import React, { useState } from 'react';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Eye, Edit, Download, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

const MesDemandes: React.FC = () => {
  const { currentUser, isInitialized, mockData } = useApiData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement de vos demandes..." />
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

  const userDriverCards = mockData.driverCards.filter(c => c.driverId === currentUser.id);
  
  const filteredCards = userDriverCards.filter(carte => {
    const matchesSearch = carte.numero.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || carte.statut === statusFilter;
    const matchesType = typeFilter === 'all' || carte.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'validee':
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Validée
          </Badge>
        );
      case 'en_attente':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            En cours
          </Badge>
        );
      case 'rejetee':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Rejetée
          </Badge>
        );
      case 'expiree':
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Expirée
          </Badge>
        );
      default:
        return <Badge variant="outline">{statut}</Badge>;
    }
  };

  const getTraitementDetails = (carte: any) => {
    const dateEmission = new Date(carte.dateEmission);
    const dateExpiration = new Date(carte.dateExpiration);
    const now = new Date();
    
    switch (carte.statut) {
      case 'validee':
        return {
          message: `Carte émise le ${dateEmission.toLocaleDateString('fr-FR')}`,
          detail: `Valide jusqu'au ${dateExpiration.toLocaleDateString('fr-FR')}`,
          color: 'text-green-600'
        };
      case 'en_attente':
        return {
          message: 'Demande en cours de traitement',
          detail: 'Délai de traitement: 5-10 jours ouvrables',
          color: 'text-orange-600'
        };
      case 'rejetee':
        return {
          message: 'Demande rejetée',
          detail: 'Documents non conformes ou incomplets',
          color: 'text-red-600'
        };
      case 'expiree':
        return {
          message: 'Carte expirée',
          detail: 'Renouvellement nécessaire',
          color: 'text-gray-600'
        };
      default:
        return {
          message: 'Statut inconnu',
          detail: '',
          color: 'text-gray-600'
        };
    }
  };

  return (
    <PageLayout title="Mes demandes">
      <div className="space-y-6">
        {/* En-tête avec bouton d'action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Mes demandes</h2>
            <p className="text-muted-foreground">
              Gérez et suivez toutes vos demandes de cartes conducteur
            </p>
          </div>
          <Button asChild>
            <Link to="/mes-demandes/nouvelle">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle demande
            </Link>
          </Button>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par numéro..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="en_attente">En cours</SelectItem>
                  <SelectItem value="validee">Validée</SelectItem>
                  <SelectItem value="rejetee">Rejetée</SelectItem>
                  <SelectItem value="expiree">Expirée</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="conducteur">Carte conducteur</SelectItem>
                  <SelectItem value="entreprise">Carte entreprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des demandes */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des demandes ({filteredCards.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredCards.length > 0 ? (
              <>
                {/* Vue tableau pour desktop */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Numéro</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Détails de traitement</TableHead>
                        <TableHead>Date demande</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCards.map((carte) => {
                        const traitementInfo = getTraitementDetails(carte);
                        return (
                          <TableRow key={carte.id}>
                            <TableCell className="font-medium">{carte.numero}</TableCell>
                            <TableCell className="capitalize">{carte.type}</TableCell>
                            <TableCell>{getStatusBadge(carte.statut)}</TableCell>
                            <TableCell>
                              <div className={`text-sm ${traitementInfo.color}`}>
                                <p className="font-medium">{traitementInfo.message}</p>
                                <p className="text-xs text-gray-500">{traitementInfo.detail}</p>
                              </div>
                            </TableCell>
                            <TableCell>{new Date(carte.dateEmission).toLocaleDateString('fr-FR')}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/mes-demandes/${carte.id}`}>
                                    <Eye className="h-3 w-3" />
                                  </Link>
                                </Button>
                                {carte.statut === 'en_attente' && (
                                  <Button variant="outline" size="sm" asChild>
                                    <Link to={`/mes-demandes/${carte.id}/edit`}>
                                      <Edit className="h-3 w-3" />
                                    </Link>
                                  </Button>
                                )}
                                {carte.statut === 'validee' && (
                                  <Button variant="outline" size="sm">
                                    <Download className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Vue cartes pour mobile */}
                <div className="md:hidden space-y-4">
                  {filteredCards.map((carte) => {
                    const traitementInfo = getTraitementDetails(carte);
                    return (
                      <Card key={carte.id}>
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{carte.numero}</h3>
                              {getStatusBadge(carte.statut)}
                            </div>
                            <div className="space-y-1 text-sm">
                              <p>Type: {carte.type}</p>
                              <div className={traitementInfo.color}>
                                <p className="font-medium">{traitementInfo.message}</p>
                                <p className="text-xs">{traitementInfo.detail}</p>
                              </div>
                              <p className="text-muted-foreground">
                                Demandée le: {new Date(carte.dateEmission).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button variant="outline" size="sm" className="flex-1" asChild>
                                <Link to={`/mes-demandes/${carte.id}`}>
                                  <Eye className="h-3 w-3 mr-1" />
                                  Voir
                                </Link>
                              </Button>
                              {carte.statut === 'en_attente' && (
                                <Button variant="outline" size="sm" className="flex-1" asChild>
                                  <Link to={`/mes-demandes/${carte.id}/edit`}>
                                    <Edit className="h-3 w-3 mr-1" />
                                    Modifier
                                  </Link>
                                </Button>
                              )}
                              {carte.statut === 'validee' && (
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Download className="h-3 w-3 mr-1" />
                                  Télécharger
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                    ? "Aucune demande ne correspond aux critères de recherche"
                    : "Vous n'avez encore aucune demande"}
                </div>
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
      </div>
    </PageLayout>
  );
};

export default MesDemandes;
