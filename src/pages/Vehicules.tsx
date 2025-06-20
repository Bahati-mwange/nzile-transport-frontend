import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Eye, Trash2, Truck } from 'lucide-react';
import type { Vehicle } from '@/hooks/useApiData';

const Vehicules: React.FC = () => {
  const { getVehicles, isLoading } = useApiData();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const data = await getVehicles();
    setVehicles(data);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.modele.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.immatriculation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      setVehicles(prev => prev.filter(v => v.id !== id));
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Véhicules">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Chargement...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Gestion des Véhicules">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un véhicule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button asChild>
            <Link to="/vehicules/nouveau">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau véhicule
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-transport-primary" />
                    <div>
                      <CardTitle className="text-lg">
                        {vehicle.marque} {vehicle.modele}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-mono">
                        {vehicle.immatriculation}
                      </p>
                    </div>
                  </div>
                  <Badge variant={vehicle.chronotachygraphe ? "default" : "secondary"}>
                    {vehicle.chronotachygraphe ? "Chronotachygraphe" : "Standard"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-1">
                  <p><strong>Type:</strong> {vehicle.typeVehicule}</p>
                  <p><strong>Année:</strong> {vehicle.annee}</p>
                  <p><strong>Chronotachygraphe:</strong> {vehicle.chronotachygraphe ? 'Oui' : 'Non'}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild className="text-xs px-2 py-1 h-7">
                    <Link to={`/vehicules/${vehicle.id}`}>
                      <Eye className="h-3 w-3 mr-1" />
                      Voir
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="text-xs px-2 py-1 h-7">
                    <Link to={`/vehicules/${vehicle.id}/edit`}>
                      <Edit className="h-3 w-3 mr-1" />
                      Modifier
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(vehicle.id)}
                    className="text-xs px-2 py-1 h-7 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun véhicule trouvé.</p>
            <Button asChild className="mt-4">
              <Link to="/vehicules/nouveau">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter le premier véhicule
              </Link>
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Vehicules;
