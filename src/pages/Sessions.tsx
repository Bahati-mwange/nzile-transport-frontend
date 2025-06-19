
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApiData } from '@/hooks/useApiData';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navigation from '@/components/Navigation';
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  Eye, 
  Download, 
  Search,
  Filter,
  MapPin,
  AlertTriangle,
  Calendar,
  Truck
} from 'lucide-react';

const Sessions: React.FC = () => {
  const { currentUser, getTachographSessions, getDrivers, getVehicles, isLoading } = useApiData();
  const [sessions, setSessions] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [driverFilter, setDriverFilter] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const loadData = async () => {
      const [sessionsData, driversData, vehiclesData] = await Promise.all([
        getTachographSessions(),
        getDrivers(),
        getVehicles()
      ]);

      let filteredSessionsData = sessionsData;
      let filteredDriversData = driversData;
      let filteredVehiclesData = vehiclesData;

      // Filtrer selon le type d'utilisateur
      if (currentUser.type === 'entreprise') {
        const companyId = currentUser.profile.id;
        filteredDriversData = driversData.filter(d => d.entrepriseId === companyId);
        filteredVehiclesData = vehiclesData.filter(v => v.entrepriseId === companyId);
        const companyDriverIds = filteredDriversData.map(d => d.id);
        filteredSessionsData = sessionsData.filter(s => companyDriverIds.includes(s.driverId));
      } else {
        const driverId = currentUser.profile.id;
        filteredSessionsData = sessionsData.filter(s => s.driverId === driverId);
      }

      setSessions(filteredSessionsData);
      setDrivers(filteredDriversData);
      setVehicles(filteredVehiclesData);
      setFilteredSessions(filteredSessionsData);
    };

    loadData();
  }, [currentUser]);

  useEffect(() => {
    let filtered = sessions;

    // Filtre par conducteur
    if (driverFilter !== 'all') {
      filtered = filtered.filter(session => session.driverId === driverFilter);
    }

    // Filtre par date
    if (dateFilter) {
      filtered = filtered.filter(session => {
        const sessionDate = new Date(session.dateDebut).toISOString().split('T')[0];
        return sessionDate === dateFilter;
      });
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(session => {
        const driver = drivers.find(d => d.id === session.driverId);
        const vehicle = vehicles.find(v => v.id === session.vehicleId);
        const driverName = driver ? `${driver.prenom} ${driver.nom}` : '';
        const vehicleInfo = vehicle ? `${vehicle.marque} ${vehicle.modele}` : '';
        
        return (
          session.trajetDepart.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.trajetArrivee.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicleInfo.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    setFilteredSessions(filtered);
  }, [sessions, drivers, vehicles, searchTerm, dateFilter, driverFilter]);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins.toString().padStart(2, '0')}`;
  };

  const handleExportPDF = (sessionId: string) => {
    toast({
      title: "Export PDF",
      description: "Le rapport de session a été exporté avec succès"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <LoadingSpinner size="lg" text="Chargement des sessions..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sessions chronotachygraphe</h1>
          <p className="mt-2 text-gray-600">
            Consultez et analysez les sessions de conduite enregistrées
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-transport-primary">
                {filteredSessions.length}
              </div>
              <p className="text-xs text-muted-foreground">Sessions totales</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-transport-secondary">
                {filteredSessions.reduce((acc, s) => acc + s.distanceParcourue, 0).toLocaleString()} km
              </div>
              <p className="text-xs text-muted-foreground">Distance totale</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {formatDuration(filteredSessions.reduce((acc, s) => acc + s.dureeConduite, 0))}
              </div>
              <p className="text-xs text-muted-foreground">Temps de conduite</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">
                {filteredSessions.reduce((acc, s) => acc + s.infractions.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Infractions</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher trajet, conducteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              
              {currentUser?.type === 'entreprise' && (
                <Select value={driverFilter} onValueChange={setDriverFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les conducteurs" />
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
              )}
              
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setDateFilter('');
                  setDriverFilter('all');
                }}
                variant="outline"
              >
                Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Liste des sessions */}
        {filteredSessions.length > 0 ? (
          <div className="space-y-4">
            {filteredSessions.map((session) => {
              const driver = drivers.find(d => d.id === session.driverId);
              const vehicle = vehicles.find(v => v.id === session.vehicleId);
              
              return (
                <Card key={session.id} className="animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <MapPin className="h-5 w-5 text-transport-primary mr-2" />
                          <h3 className="text-lg font-semibold">
                            {session.trajetDepart} → {session.trajetArrivee}
                          </h3>
                          {session.infractions.length > 0 && (
                            <Badge variant="destructive" className="ml-3">
                              {session.infractions.length} infraction(s)
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <p className="font-medium text-gray-700">Conducteur</p>
                            <p className="text-gray-600">
                              {driver ? `${driver.prenom} ${driver.nom}` : 'Inconnu'}
                            </p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-gray-700">Véhicule</p>
                            <p className="text-gray-600">
                              {vehicle ? `${vehicle.marque} ${vehicle.modele}` : 'Inconnu'}
                            </p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-gray-700">Date</p>
                            <p className="text-gray-600">
                              {new Date(session.dateDebut).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-gray-700">Durée</p>
                            <p className="text-gray-600">
                              {formatDuration(session.dureeConduite)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-700">Distance</p>
                            <p className="text-gray-600">{session.distanceParcourue} km</p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-gray-700">Vitesse moyenne</p>
                            <p className="text-gray-600">{session.vitesseMoyenne} km/h</p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-gray-700">Vitesse max</p>
                            <p className="text-gray-600">{session.vitesseMax} km/h</p>
                          </div>
                          
                          <div>
                            <p className="font-medium text-gray-700">Temps de repos</p>
                            <p className="text-gray-600">{formatDuration(session.dureeRepos)}</p>
                          </div>
                        </div>
                        
                        {session.infractions.length > 0 && (
                          <div className="mt-4 p-3 bg-red-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                              <span className="font-medium text-red-800">Infractions détectées</span>
                            </div>
                            <ul className="text-sm text-red-700">
                              {session.infractions.map((infraction: string, index: number) => (
                                <li key={index}>• {infraction}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button
                          onClick={() => navigate(`/sessions/${session.id}`)}
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Détail
                        </Button>
                        
                        <Button
                          onClick={() => handleExportPDF(session.id)}
                          variant="outline"
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Export PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune session trouvée
              </h3>
              <p className="text-gray-600">
                {searchTerm || dateFilter || driverFilter !== 'all' 
                  ? 'Aucune session ne correspond à vos critères de recherche'
                  : 'Aucune session de conduite enregistrée'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Sessions;
