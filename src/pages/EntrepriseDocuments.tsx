
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageLayout from '@/components/PageLayout';
import { 
  Upload, 
  FileText, 
  Search, 
  Download, 
  Eye,
  RefreshCw,
  Calendar,
  Filter
} from 'lucide-react';

const EntrepriseDocuments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('tous');
  const [filterType, setFilterType] = useState('tous');

  // Données de démonstration
  const documents = [
    {
      id: 1,
      nom: "Statuts de l'entreprise",
      type: "Juridique",
      statut: "Validé",
      taille: "2.4 MB",
      dateUpload: "2025-01-15T10:30:00",
      dateValidation: "2025-01-16T14:20:00",
      uploadedBy: "Admin Système",
      format: "PDF"
    },
    {
      id: 2,
      nom: "Attestation RCCM",
      type: "Administratif",
      statut: "Validé",
      taille: "1.8 MB",
      dateUpload: "2025-01-14T09:15:00",
      dateValidation: "2025-01-15T11:30:00",
      uploadedBy: "OBAME NGUEMA François",
      format: "PDF"
    },
    {
      id: 3,
      nom: "Certificat transport marchandises",
      type: "Autorisation",
      statut: "En cours",
      taille: "3.1 MB",
      dateUpload: "2025-01-18T16:45:00",
      dateValidation: null,
      uploadedBy: "Admin Système",
      format: "PDF"
    },
    {
      id: 4,
      nom: "Police d'assurance flotte",
      type: "Assurance",
      statut: "Expiré",
      taille: "4.2 MB",
      dateUpload: "2024-12-01T08:00:00",
      dateValidation: "2024-12-02T10:15:00",
      uploadedBy: "OBAME NGUEMA François",
      format: "PDF"
    },
    {
      id: 5,
      nom: "Cartes grises véhicules (lot 1)",
      type: "Véhicule",
      statut: "Rejeté",
      taille: "8.7 MB",
      dateUpload: "2025-01-10T14:30:00",
      dateValidation: "2025-01-12T09:45:00",
      uploadedBy: "Admin Système",
      format: "ZIP"
    }
  ];

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'Validé':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">🟢 Validé</Badge>;
      case 'En cours':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">🟠 En cours</Badge>;
      case 'Rejeté':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">🔴 Rejeté</Badge>;
      case 'Expiré':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">⚪ Expiré</Badge>;
      default:
        return <Badge variant="secondary">{statut}</Badge>;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatut = filterStatut === 'tous' || doc.statut === filterStatut;
    const matchesType = filterType === 'tous' || doc.type === filterType;
    
    return matchesSearch && matchesStatut && matchesType;
  });

  const actionButton = (
    <Button className="bg-transport-secondary hover:bg-green-700">
      <Upload className="h-4 w-4 mr-2" />
      <span className="hidden sm:inline">Téléverser un document</span>
      <span className="sm:hidden">Upload</span>
    </Button>
  );

  return (
    <PageLayout title="Documents entreprise" actions={actionButton}>
      <div className="space-y-6">
        {/* Filtres et recherche */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres et recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un document..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterStatut} onValueChange={setFilterStatut}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les statuts</SelectItem>
                  <SelectItem value="Validé">Validé</SelectItem>
                  <SelectItem value="En cours">En cours</Select>
                  <SelectItem value="Rejeté">Rejeté</SelectItem>
                  <SelectItem value="Expiré">Expiré</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les types</SelectItem>
                  <SelectItem value="Juridique">Juridique</SelectItem>
                  <SelectItem value="Administratif">Administratif</SelectItem>
                  <SelectItem value="Autorisation">Autorisation</SelectItem>
                  <SelectItem value="Assurance">Assurance</SelectItem>
                  <SelectItem value="Véhicule">Véhicule</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total documents</p>
                  <p className="text-2xl font-bold">{documents.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Validés</p>
                  <p className="text-2xl font-bold text-green-600">
                    {documents.filter(d => d.statut === 'Validé').length}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En cours</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {documents.filter(d => d.statut === 'En cours').length}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">À renouveler</p>
                  <p className="text-2xl font-bold text-red-600">
                    {documents.filter(d => d.statut === 'Expiré' || d.statut === 'Rejeté').length}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des documents */}
        <div className="space-y-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {document.nom}
                      </h3>
                      {getStatutBadge(document.statut)}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        <div>Type: <span className="font-medium">{document.type}</span></div>
                        <div>Format: <span className="font-medium">{document.format}</span></div>
                        <div>Taille: <span className="font-medium">{document.taille}</span></div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Upload: {new Date(document.dateUpload).toLocaleDateString('fr-FR')}
                        </div>
                        {document.dateValidation && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Validé: {new Date(document.dateValidation).toLocaleDateString('fr-FR')}
                          </div>
                        )}
                        <div>Par: <span className="font-medium">{document.uploadedBy}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2">
                    <Button variant="ghost" size="sm" className="flex-1 lg:flex-none">
                      <Eye className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Voir</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 lg:flex-none">
                      <Download className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Télécharger</span>
                    </Button>
                    {document.statut === 'Expiré' || document.statut === 'Rejeté' ? (
                      <Button variant="ghost" size="sm" className="flex-1 lg:flex-none text-blue-600 hover:text-blue-700">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Renouveler</span>
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="flex-1 lg:flex-none text-orange-600 hover:text-orange-700">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Mettre à jour</span>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document trouvé</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatut !== 'tous' || filterType !== 'tous' 
                  ? "Aucun document ne correspond à vos critères de recherche." 
                  : "Vous n'avez pas encore de documents uploadés."}
              </p>
              <Button className="bg-transport-secondary hover:bg-green-700">
                <Upload className="h-4 w-4 mr-2" />
                Téléverser un document
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default EntrepriseDocuments;
