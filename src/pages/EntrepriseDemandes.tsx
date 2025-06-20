
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Eye, Calendar, User, Clock } from 'lucide-react';

interface Demande {
  id: string;
  type: 'carte_conducteur' | 'chronotachygraphe';
  conducteur?: {
    nom: string;
    prenom: string;
    email: string;
  };
  vehicule?: {
    marque: string;
    modele: string;
    immatriculation: string;
  };
  statut: 'en_attente' | 'en_cours' | 'validee' | 'rejetee';
  dateCreation: string;
  montant: number;
}

const EntrepriseDemandes: React.FC = () => {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtreStatut, setFiltreStatut] = useState<string>('tous');
  const { isLoading } = useApiData();

  useEffect(() => {
    // Données mockées des demandes
    const mockDemandes: Demande[] = [
      {
        id: '1',
        type: 'carte_conducteur',
        conducteur: {
          nom: 'ONDO',
          prenom: 'Jean-Baptiste',
          email: 'jb.ondo@gmail.com'
        },
        statut: 'en_cours',
        dateCreation: '2024-01-15',
        montant: 25000
      },
      {
        id: '2',
        type: 'carte_conducteur',
        conducteur: {
          nom: 'MBADINGA',
          prenom: 'Marie-Claire',
          email: 'mc.mbadinga@yahoo.fr'
        },
        statut: 'validee',
        dateCreation: '2024-01-10',
        montant: 25000
      },
      {
        id: '3',
        type: 'chronotachygraphe',
        vehicule: {
          marque: 'Mercedes',
          modele: 'Sprinter',
          immatriculation: 'LBV-1234-GA'
        },
        statut: 'en_attente',
        dateCreation: '2024-01-20',
        montant: 15000
      },
      {
        id: '4',
        type: 'carte_conducteur',
        conducteur: {
          nom: 'NZIGOU',
          prenom: 'Paul-Henri',
          email: 'ph.nzigou@gmail.com'
        },
        statut: 'rejetee',
        dateCreation: '2024-01-05',
        montant: 25000
      }
    ];
    
    setDemandes(mockDemandes);
  }, []);

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'validee': return 'default';
      case 'en_cours': return 'secondary';
      case 'en_attente': return 'outline';
      case 'rejetee': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'validee': return 'Validée';
      case 'en_cours': return 'En cours';
      case 'en_attente': return 'En attente';
      case 'rejetee': return 'Rejetée';
      default: return statut;
    }
  };

  const demandesFiltrees = demandes.filter(demande => {
    const matchesSearch = 
      demande.conducteur?.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demande.conducteur?.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demande.conducteur?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demande.vehicule?.immatriculation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demande.vehicule?.marque.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatut = filtreStatut === 'tous' || demande.statut === filtreStatut;
    
    return matchesSearch && matchesStatut;
  });

  if (isLoading) {
    return (
      <PageLayout title="Demandes">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Chargement...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Gestion des Demandes">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une demande..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="px-3 py-2 border rounded-md"
              value={filtreStatut}
              onChange={(e) => setFiltreStatut(e.target.value)}
            >
              <option value="tous">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="en_cours">En cours</option>
              <option value="validee">Validée</option>
              <option value="rejetee">Rejetée</option>
            </select>
          </div>
          <Button asChild>
            <Link to="/entreprise/demandes/nouvelle-demande">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle demande
            </Link>
          </Button>
        </div>

        <div className="grid gap-4">
          {demandesFiltrees.map((demande) => (
            <Card key={demande.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {demande.type === 'carte_conducteur' ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                      {demande.type === 'carte_conducteur' ? 'Carte Conducteur' : 'Chronotachygraphe'}
                    </CardTitle>
                    {demande.conducteur ? (
                      <p className="text-sm text-muted-foreground">
                        {demande.conducteur.prenom} {demande.conducteur.nom} - {demande.conducteur.email}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {demande.vehicule?.marque} {demande.vehicule?.modele} - {demande.vehicule?.immatriculation}
                      </p>
                    )}
                  </div>
                  <Badge variant={getStatutColor(demande.statut)}>
                    {getStatutLabel(demande.statut)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(demande.dateCreation).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="font-medium">
                      {demande.montant.toLocaleString()} XAF
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/entreprise/demandes/${demande.id}`}>
                      <Eye className="h-3 w-3 mr-1" />
                      Voir détails
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {demandesFiltrees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucune demande trouvée.</p>
            <Button asChild className="mt-4">
              <Link to="/entreprise/demandes/nouvelle-demande">
                <Plus className="h-4 w-4 mr-2" />
                Créer la première demande
              </Link>
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default EntrepriseDemandes;
