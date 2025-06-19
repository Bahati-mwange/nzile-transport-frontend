
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PageLayout from '@/components/PageLayout';
import { 
  Plus, 
  Building2, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const EntrepriseEntreprises: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Données de démonstration
  const entreprises = [
    {
      id: 1,
      denomination: "TRANSPORT GABON EXPRESS",
      siret: "LBV-2018-B-1234",
      adresse: "Boulevard Triomphal, Face CCJA",
      ville: "Libreville",
      secteur: "Transport de marchandises",
      telephone: "+241-01-77-88-99",
      email: "contact@transport-gabon.ga",
      statut: "Active",
      nbChauffeurs: 25,
      nbVehicules: 18,
      dateCreation: "2018-05-15"
    },
    {
      id: 2,
      denomination: "LOGISTICS PLUS SARL",
      siret: "LBV-2020-B-5678",
      adresse: "Zone Industrielle d'Oloumi",
      ville: "Libreville",
      secteur: "Logistique et transport",
      telephone: "+241-01-88-99-00",
      email: "info@logistics-plus.ga",
      statut: "Active",
      nbChauffeurs: 12,
      nbVehicules: 8,
      dateCreation: "2020-03-10"
    },
    {
      id: 3,
      denomination: "TRANS EQUATEUR",
      siret: "LBV-2019-B-9012",
      adresse: "Quartier Lalala",
      ville: "Libreville",
      secteur: "Transport voyageurs",
      telephone: "+241-01-99-00-11",
      email: "contact@transequateur.ga",
      statut: "Suspendue",
      nbChauffeurs: 8,
      nbVehicules: 5,
      dateCreation: "2019-11-20"
    }
  ];

  const filteredEntreprises = entreprises.filter(entreprise =>
    entreprise.denomination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entreprise.secteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entreprise.ville.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'Active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">🟢 Active</Badge>;
      case 'Suspendue':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">🔴 Suspendue</Badge>;
      case 'En attente':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">🟠 En attente</Badge>;
      default:
        return <Badge variant="secondary">{statut}</Badge>;
    }
  };

  const actionButton = (
    <Button className="bg-transport-secondary hover:bg-green-700">
      <Plus className="h-4 w-4 mr-2" />
      <span className="hidden sm:inline">Ajouter une entreprise</span>
      <span className="sm:hidden">Ajouter</span>
    </Button>
  );

  return (
    <PageLayout title="Entreprises liées" actions={actionButton}>
      <div className="space-y-6">
        {/* Filtres et recherche */}
        <Card>
          <CardHeader>
            <CardTitle>Rechercher une entreprise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom, secteur ou ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total entreprises</p>
                  <p className="text-2xl font-bold">{entreprises.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Actives</p>
                  <p className="text-2xl font-bold text-green-600">
                    {entreprises.filter(e => e.statut === 'Active').length}
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total chauffeurs</p>
                  <p className="text-2xl font-bold">
                    {entreprises.reduce((acc, e) => acc + e.nbChauffeurs, 0)}
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total véhicules</p>
                  <p className="text-2xl font-bold">
                    {entreprises.reduce((acc, e) => acc + e.nbVehicules, 0)}
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des entreprises */}
        <div className="space-y-4">
          {filteredEntreprises.map((entreprise) => (
            <Card key={entreprise.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="text-lg font-semibold">{entreprise.denomination}</h3>
                      {getStatutBadge(entreprise.statut)}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span>SIRET: {entreprise.siret}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{entreprise.adresse}, {entreprise.ville}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span>Secteur: {entreprise.secteur}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{entreprise.telephone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{entreprise.email}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Créée le {new Date(entreprise.dateCreation).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        {entreprise.nbChauffeurs} chauffeurs
                      </span>
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
                        {entreprise.nbVehicules} véhicules
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2">
                    <Button variant="ghost" size="sm" className="flex-1 lg:flex-none">
                      <Eye className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Voir</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 lg:flex-none">
                      <Edit className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Modifier</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 lg:flex-none text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Supprimer</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEntreprises.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune entreprise trouvée</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? "Aucune entreprise ne correspond à votre recherche." : "Vous n'avez pas encore d'entreprises liées."}
              </p>
              <Button className="bg-transport-secondary hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une entreprise
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default EntrepriseEntreprises;
