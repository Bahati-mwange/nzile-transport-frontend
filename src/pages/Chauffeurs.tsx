import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Eye, Trash2 } from 'lucide-react';
import type { Driver } from '@/hooks/useApiData';

const Chauffeurs: React.FC = () => {
  const { getDrivers, isLoading } = useApiData();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    const data = await getDrivers();
    setDrivers(data);
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce chauffeur ?')) {
      setDrivers(prev => prev.filter(d => d.id !== id));
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Chauffeurs">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Chargement...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Gestion des Chauffeurs">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un chauffeur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button asChild>
            <Link to="/chauffeurs/nouveau">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau chauffeur
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDrivers.map((driver) => (
            <Card key={driver.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {driver.prenom} {driver.nom}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{driver.email}</p>
                  </div>
                  <Badge variant={driver.entrepriseId ? "default" : "secondary"}>
                    {driver.entrepriseId ? "Entreprise" : "Particulier"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-1">
                  <p><strong>CNI:</strong> {driver.cni}</p>
                  <p><strong>Permis:</strong> {driver.permis}</p>
                  <p><strong>Téléphone:</strong> {driver.telephone}</p>
                  <p><strong>Ville:</strong> {driver.ville}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild className="text-xs px-2 py-1 h-7">
                    <Link to={`/chauffeurs/${driver.id}`}>
                      <Eye className="h-3 w-3 mr-1" />
                      Voir
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="text-xs px-2 py-1 h-7">
                    <Link to={`/chauffeurs/${driver.id}/edit`}>
                      <Edit className="h-3 w-3 mr-1" />
                      Modifier
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(driver.id)}
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

        {filteredDrivers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun chauffeur trouvé.</p>
            <Button asChild className="mt-4">
              <Link to="/chauffeurs/nouveau">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter le premier chauffeur
              </Link>
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Chauffeurs;
