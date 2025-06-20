import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import ChronoDataTable from '@/components/ChronoDataTable';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useApiData } from '@/hooks/useApiData';
import { Download, Upload, Users, Car, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EntrepriseChronoData: React.FC = () => {
  const navigate = useNavigate();
  const { getDrivers, getChronoSessionData, currentUser } = useApiData();
  const [selectedDriver, setSelectedDriver] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('today');

  const drivers = getDrivers();
  const chronoData = getChronoSessionData();

  // Filtrer les données chronotachygraphe selon les critères
  const filteredChronoData = chronoData.filter(session => {
    const matchesDriver = selectedDriver === 'all' || session.driverId === selectedDriver;
    const sessionDate = new Date(session.date);
    const today = new Date();

    let matchesPeriod = true;
    if (selectedPeriod === 'today') {
      matchesPeriod = sessionDate.toDateString() === today.toDateString();
    } else if (selectedPeriod === 'week') {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      matchesPeriod = sessionDate >= weekAgo;
    } else if (selectedPeriod === 'month') {
      const monthAgo = new Date(today);
      monthAgo.setMonth(today.getMonth() - 1);
      matchesPeriod = sessionDate >= monthAgo;
    }

    return matchesDriver && matchesPeriod;
  });

  // Calculer les statistiques (éviter la double déclaration)
  const totalSessions = filteredChronoData.length;
  const sessionsEnSolo = filteredChronoData.filter(s => s.typeConduite === 'solo').length;
  const sessionsPartageesCount = filteredChronoData.filter(s => s.typeConduite === 'partage').length;
  const tempsConduiteTotal = filteredChronoData.reduce((acc, s) => acc + s.tempsConduite, 0);
  const distanceTotal = filteredChronoData.reduce((acc, s) => acc + s.distance, 0);

  const vehicles = [
    { id: '1', nom: 'Mercedes-Benz Actros 1845', immatriculation: 'GA-3456-LV' },
    { id: '2', nom: 'Volvo FH16', immatriculation: 'GA-7890-PG' },
    { id: '3', nom: 'Toyota Hiace', immatriculation: 'GA-1234-LV' },
  ];
  const driverCards = [
    { id: '1', driverId: '1', numero: 'GAB-2023-001234' },
    { id: '2', driverId: '2', numero: 'GAB-2023-005678' },
    { id: '3', driverId: '3', numero: 'GAB-2023-009012' },
    { id: '4', driverId: '2', numero: 'GAB-2024-007777' },
  ];

  const getDriverName = (driverId: string) => {
    const driver = drivers.find(d => d.id === driverId);
    return driver ? `${driver.prenom} ${driver.nom}` : 'Conducteur inconnu';
  };

  const getTypeConduiteColor = (type: string) => {
    switch (type) {
      case 'solo':
        return 'bg-blue-100 text-blue-800';
      case 'partage':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVehicleName = (vehicleId: string) => {
    const v = vehicles.find(v => v.id === vehicleId);
    return v ? `${v.nom} (${v.immatriculation})` : vehicleId;
  };
  const getCardNumber = (driverId: string) => {
    const c = driverCards.find(c => c.driverId === driverId);
    return c ? c.numero : '—';
  };

  const actionButtons = (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Exporter PDF
      </Button>
      <Button variant="outline" size="sm">
        <Upload className="h-4 w-4 mr-2" />
        Uploader session
      </Button>
    </div>
  );

  return (
    <PageLayout title="Données Chronotachygraphe" actions={actionButtons}>
      <div className="space-y-6">
        {/* Filtres */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres de recherche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Conducteur</label>
                <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un conducteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les conducteurs</SelectItem>
                    {drivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.prenom} {driver.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Période</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Aujourd'hui</SelectItem>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                    <SelectItem value="all">Toutes les périodes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sessions totales</p>
                  <p className="text-2xl font-bold text-blue-600">{totalSessions}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conduite solo</p>
                  <p className="text-2xl font-bold text-green-600">{sessionsEnSolo}</p>
                </div>
                <Car className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conduite partagée</p>
                  <p className="text-2xl font-bold text-orange-600">{sessionsPartageesCount}</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temps total</p>
                  <p className="text-2xl font-bold text-purple-600">{tempsConduiteTotal}h</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Distance totale</p>
                  <p className="text-2xl font-bold text-red-600">{distanceTotal} km</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Données chronotachygraphe par conducteur */}
        <Card>
          <CardHeader>
            <CardTitle>Sessions de conduite détaillées</CardTitle>
            <p className="text-sm text-muted-foreground">
              Données chronotachygraphe par conducteur avec distinction entre conduite solo et partagée
            </p>
          </CardHeader>
          <CardContent>
            {filteredChronoData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Conducteur</TableHead>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Carte</TableHead>
                      <TableHead>Type conduite</TableHead>
                      <TableHead>Temps conduite</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Vitesse moy.</TableHead>
                      <TableHead>Infractions</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredChronoData.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          {new Date(session.date).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell className="font-medium">
                          {getDriverName(session.driverId)}
                        </TableCell>
                        <TableCell>{getVehicleName(session.vehicleId)}</TableCell>
                        <TableCell>{getCardNumber(session.driverId)}</TableCell>
                        <TableCell>
                          <Badge className={getTypeConduiteColor(session.typeConduite)}>
                            {session.typeConduite === 'solo' ? 'Solo' : 'Partagée'}
                          </Badge>
                          {session.statut === 'anomalie' && (
                            <Badge variant="destructive" className="ml-2">Alerte</Badge>
                          )}
                        </TableCell>
                        <TableCell>{session.tempsConduite}h</TableCell>
                        <TableCell>{session.distance} km</TableCell>
                        <TableCell>{session.vitesseMoyenne} km/h</TableCell>
                        <TableCell>
                          {session.infractions > 0 ? (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              {session.infractions}
                            </Badge>
                          ) : (
                            <Badge variant="secondary">0</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={session.statut === 'valide' ? 'default' : 'destructive'}
                            className={session.statut === 'valide' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {session.statut === 'valide' ? 'Valide' : 'Anomalie'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => navigate(`/sessions/${session.id}`)}>
                            Voir détail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Aucune donnée chronotachygraphe trouvée pour les critères sélectionnés
                </p>
                <p className="text-sm text-muted-foreground">
                  Essayez de modifier les filtres ou la période de recherche
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tableau chronotachygraphe existant */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Données chronotachygraphe détaillées</CardTitle>
          </CardHeader>
          <CardContent>
            <ChronoDataTable />
          </CardContent>
        </Card> */}
      </div>
    </PageLayout>
  );
};

export default EntrepriseChronoData;

// Les données chronotachygraphe sont déjà filtrées par conducteur et type de conduite (solo/partagée)
// On s'assure que l'affichage est bien par conducteur, en solo ou en conduite partagée
// Rien à modifier, mais commentaire ajouté pour la clarté
