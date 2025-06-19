
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Upload, Filter, Clock, Moon, AlertTriangle, TrendingUp } from 'lucide-react';
import { mockChronoData, ChronoData } from '@/data/mockData';

const ChronoDataTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data] = useState<ChronoData[]>(mockChronoData);

  const filteredData = data.filter(item => 
    item.locationStart.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.driverId.includes(searchTerm) ||
    item.vehicleId.includes(searchTerm)
  );

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins.toString().padStart(2, '0')}`;
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'conduite':
        return <Badge className="bg-blue-100 text-blue-800">🚗 Conduite</Badge>;
      case 'pause':
        return <Badge className="bg-green-100 text-green-800">⏸️ Pause</Badge>;
      case 'arret':
        return <Badge className="bg-gray-100 text-gray-800">🛑 Arrêt</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const getStatusBadge = (hasViolation: boolean) => {
    return hasViolation 
      ? <Badge variant="destructive">❌ Non conforme</Badge>
      : <Badge className="bg-green-100 text-green-800">✅ Conforme</Badge>;
  };

  // Calculs des statistiques
  const totalTempsConduite = data
    .filter(item => item.actionType === 'conduite')
    .reduce((acc, item) => acc + item.duration, 0);
  
  const totalTempsRepos = data
    .filter(item => item.actionType === 'pause')
    .reduce((acc, item) => acc + item.duration, 0);
  
  const infractions = data.filter(item => item.violationType).length;
  const vitesseMoyenne = Math.round(
    data
      .filter(item => item.speed)
      .reduce((acc, item) => acc + (item.speed || 0), 0) / 
    data.filter(item => item.speed).length
  );

  return (
    <div className="space-y-6">
      {/* Statistiques synthétiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Temps conduite</p>
                <p className="text-lg font-bold text-blue-600">
                  {formatDuration(totalTempsConduite)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Temps repos</p>
                <p className="text-lg font-bold text-green-600">
                  {formatDuration(totalTempsRepos)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Infractions</p>
                <p className="text-lg font-bold text-red-600">{infractions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Vitesse moy.</p>
                <p className="text-lg font-bold text-purple-600">{vitesseMoyenne} km/h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <CardTitle>Données Chronotachygraphe</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exporter CSV
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Uploader session
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher par localisation, conducteur, véhicule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Heure</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Vitesse</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Infractions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(item.timestamp).toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </TableCell>
                  <TableCell>
                    {getActionBadge(item.actionType)}
                  </TableCell>
                  <TableCell>{formatDuration(item.duration)}</TableCell>
                  <TableCell>
                    {item.speed ? `${item.speed} km/h` : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{item.locationStart}</div>
                      {item.locationEnd && (
                        <div className="text-muted-foreground">→ {item.locationEnd}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(!!item.violationType)}
                  </TableCell>
                  <TableCell>
                    {item.violationType ? (
                      <Badge variant="destructive" className="text-xs">
                        {item.violationType}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Aucune donnée trouvée.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChronoDataTable;
