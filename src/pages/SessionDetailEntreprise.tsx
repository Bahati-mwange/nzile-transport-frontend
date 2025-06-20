import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, Car, User, TrendingUp, Clock, MapPin } from 'lucide-react';

const SessionDetailEntreprise: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getChronoSessionData, getDrivers } = useApiData();
    const sessions = getChronoSessionData();
    console.log('SessionDetailEntreprise - id param:', id, 'sessions disponibles:', sessions.map(s => s.id));
    const session = sessions.find(s => s.id.toString() === id?.toString());
    const drivers = getDrivers();

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card>
                    <CardContent className="p-8 text-center">
                        <p className="text-lg text-muted-foreground mb-4">Session introuvable</p>
                        <Button onClick={() => navigate(-1)} variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Retour
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const driver = drivers.find(d => d.id === session.driverId);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mb-4">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Car className="h-5 w-5 text-transport-primary" />
                            Détail de la session de conduite
                        </CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {new Date(session.date).toLocaleDateString('fr-FR')}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                Véhicule : {session.vehicleId}
                            </span>
                            <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                Conducteur : {driver ? `${driver.prenom} ${driver.nom}` : session.driverId}
                            </span>
                            <Badge className="ml-2" variant={session.statut === 'anomalie' ? 'destructive' : 'default'}>
                                {session.statut === 'anomalie' ? 'Anomalie' : 'Valide'}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 rounded-lg p-4 text-center">
                                <div className="text-lg font-bold text-blue-600">{session.tempsConduite} h</div>
                                <div className="text-sm text-blue-600">Temps de conduite</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4 text-center">
                                <div className="text-lg font-bold text-green-600">{session.distance} km</div>
                                <div className="text-sm text-green-600">Distance parcourue</div>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-4 text-center">
                                <div className="text-lg font-bold text-purple-600">{session.vitesseMoyenne} km/h</div>
                                <div className="text-sm text-purple-600">Vitesse moyenne</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Type de conduite :</span>
                            <Badge className={session.typeConduite === 'solo' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}>
                                {session.typeConduite === 'solo' ? 'Solo' : 'Partagée'}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Infractions :</span>
                            {session.infractions > 0 ? (
                                <Badge variant="destructive" className="flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    {session.infractions}
                                </Badge>
                            ) : (
                                <Badge variant="secondary">0</Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SessionDetailEntreprise;
