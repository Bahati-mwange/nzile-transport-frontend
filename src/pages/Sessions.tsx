
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, Search, Eye, AlertCircle, MapPin, Calendar } from 'lucide-react';
import type { TachographSession } from '@/hooks/useApiData';

const Sessions: React.FC = () => {
  const { getTachographSessions, currentUser, isLoading } = useApiData();
  const [sessions, setSessions] = useState<TachographSession[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    const data = await getTachographSessions();
    // Filtrer selon le type d'utilisateur
    const filteredData = currentUser?.type === 'particulier' 
      ? data.filter(session => session.driverId === currentUser.id)
      : data;
    setSessions(filteredData);
  };

  const filteredSessions = sessions.filter(session => 
    session.trajetDepart.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.trajetArrivee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.driverId.includes(searchTerm)
  );

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <PageLayout title="Sessions">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Chargement...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Sessions Chronotachygraphe">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une session..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-transport-primary" />
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {session.trajetDepart} → {session.trajetArrivee}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(session.dateDebut).toLocaleDateString('fr-FR')}
                        </span>
                        <span>{formatDuration(session.dureeConduite)} de conduite</span>
                        <span>{session.distanceParcourue} km</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {session.infractions.length > 0 && (
                      <Badge variant="destructive">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {session.infractions.length} infraction(s)
                      </Badge>
                    )}
                    <Badge variant="outline">
                      Moy: {session.vitesseMoyenne} km/h
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {formatDuration(session.dureeConduite)}
                    </div>
                    <div className="text-sm text-blue-600">Temps de conduite</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {formatDuration(session.dureeRepos)}
                    </div>
                    <div className="text-sm text-green-600">Temps de repos</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">
                      {session.vitesseMax} km/h
                    </div>
                    <div className="text-sm text-purple-600">Vitesse max</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-600">
                      {session.distanceParcourue} km
                    </div>
                    <div className="text-sm text-gray-600">Distance</div>
                  </div>
                </div>

                {session.infractions.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">Infractions détectées :</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {session.infractions.map((infraction, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <AlertCircle className="h-3 w-3" />
                          {infraction}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/sessions/${session.id}`}>
                      <Eye className="h-3 w-3 mr-1" />
                      Voir détails
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    Exporter PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    Voir trajet
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucune session trouvée.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Sessions;
