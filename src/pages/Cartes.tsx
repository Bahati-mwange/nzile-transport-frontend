
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
  CreditCard, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Download
} from 'lucide-react';

const Cartes: React.FC = () => {
  const { currentUser, getDriverCards, getDrivers, isLoading } = useApiData();
  const [cards, setCards] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [filteredCards, setFilteredCards] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const loadData = async () => {
      const [cardsData, driversData] = await Promise.all([
        getDriverCards(),
        getDrivers()
      ]);

      let filteredCardsData = cardsData;
      let filteredDriversData = driversData;

      // Filtrer selon le type d'utilisateur
      if (currentUser.type === 'entreprise') {
        const companyId = currentUser.profile.id;
        filteredDriversData = driversData.filter(d => d.entrepriseId === companyId);
        const companyDriverIds = filteredDriversData.map(d => d.id);
        filteredCardsData = cardsData.filter(c => companyDriverIds.includes(c.driverId));
      } else {
        const driverId = currentUser.profile.id;
        filteredCardsData = cardsData.filter(c => c.driverId === driverId);
      }

      setCards(filteredCardsData);
      setDrivers(filteredDriversData);
      setFilteredCards(filteredCardsData);
    };

    loadData();
  }, [currentUser]);

  useEffect(() => {
    let filtered = cards;

    // Filtre par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(card => card.statut === statusFilter);
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(card => {
        const driver = drivers.find(d => d.id === card.driverId);
        const driverName = driver ? `${driver.prenom} ${driver.nom}` : '';
        return (
          card.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driverName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    setFilteredCards(filtered);
  }, [cards, drivers, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validee':
        return 'bg-green-100 text-green-800';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'expiree':
        return 'bg-red-100 text-red-800';
      case 'rejetee':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'validee':
        return 'Validée';
      case 'en_attente':
        return 'En attente';
      case 'expiree':
        return 'Expirée';
      case 'rejetee':
        return 'Rejetée';
      default:
        return 'Inconnu';
    }
  };

  const handleDelete = (cardId: string) => {
    toast({
      title: "Carte supprimée",
      description: "La demande de carte a été supprimée avec succès"
    });
    setCards(cards.filter(c => c.id !== cardId));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <LoadingSpinner size="lg" text="Chargement des cartes..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cartes conducteur</h1>
            <p className="mt-2 text-gray-600">
              Gérez les demandes et le statut des cartes conducteur
            </p>
          </div>
          <Button 
            onClick={() => navigate('/cartes/nouvelle')}
            className="bg-transport-primary hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle demande
          </Button>
        </div>

        {/* Filtres */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par numéro ou nom..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="validee">Validée</SelectItem>
                  <SelectItem value="expiree">Expirée</SelectItem>
                  <SelectItem value="rejetee">Rejetée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des cartes */}
        {filteredCards.length > 0 ? (
          <div className="grid gap-4">
            {filteredCards.map((card) => {
              const driver = drivers.find(d => d.id === card.driverId);
              return (
                <Card key={card.id} className="animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <CreditCard className="h-5 w-5 text-transport-primary mr-2" />
                          <h3 className="text-lg font-semibold">{card.numero}</h3>
                          <Badge className={`ml-3 ${getStatusColor(card.statut)}`}>
                            {getStatusLabel(card.statut)}
                          </Badge>
                        </div>
                        
                        {driver && (
                          <p className="text-gray-600 mb-2">
                            Conducteur: {driver.prenom} {driver.nom}
                          </p>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-700">Type</p>
                            <p className="text-gray-600 capitalize">{card.type}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Date d'émission</p>
                            <p className="text-gray-600">
                              {new Date(card.dateEmission).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Date d'expiration</p>
                            <p className="text-gray-600">
                              {new Date(card.dateExpiration).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button
                          onClick={() => navigate(`/cartes/${card.id}`)}
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Détail
                        </Button>
                        
                        {card.statut === 'validee' && (
                          <Button
                            onClick={() => toast({
                              title: "Téléchargement",
                              description: "Carte téléchargée avec succès"
                            })}
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Télécharger
                          </Button>
                        )}
                        
                        <Button
                          onClick={() => navigate(`/cartes/${card.id}/edit`)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        
                        <Button
                          onClick={() => handleDelete(card.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Supprimer
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
              <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune carte trouvée
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Aucune carte ne correspond à vos critères de recherche'
                  : 'Vous n\'avez pas encore de demande de carte conducteur'
                }
              </p>
              <Button 
                onClick={() => navigate('/cartes/nouvelle')}
                className="bg-transport-primary hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Créer une nouvelle demande
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Cartes;
