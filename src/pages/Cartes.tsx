import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Eye, Trash2, CreditCard } from 'lucide-react';
import type { DriverCard } from '@/hooks/useApiData';

const Cartes: React.FC = () => {
    const { getDriverCards, currentUser, isLoading } = useApiData();
    const [cards, setCards] = useState<DriverCard[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        loadCards();
    }, []);

    // Redirection automatique pour les particuliers vers le détail de leur carte
    useEffect(() => {
        if (currentUser?.type === 'particulier' && cards.length === 1) {
            window.location.replace(`/cartes/${cards[0].id}`);
        }
    }, [currentUser, cards]);

    const loadCards = async () => {
        const data = await getDriverCards();
        // Filtrer selon le type d'utilisateur
        // Pour les particuliers, n'afficher que la carte conducteur principale (la plus récente ou la seule)
        let filteredData = data;
        if (currentUser?.type === 'particulier') {
            // On ne garde que la carte conducteur la plus récente
            const userCards = data.filter(card => card.driverId === currentUser.id && card.type === 'conducteur');
            filteredData = userCards.length > 0 ? [userCards.sort((a, b) => new Date(b.dateEmission).getTime() - new Date(a.dateEmission).getTime())[0]] : [];
        } else if (currentUser?.type === 'entreprise') {
            // Les entreprises voient les cartes de leurs conducteurs
            const companyId = currentUser.profile.id;
            // Ici on pourrait filtrer par entreprise si la relation était définie
            filteredData = data;
        }

        setCards(filteredData);
    };

    const filteredCards = cards.filter(card => {
        const matchesSearch = card.numero.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || card.statut === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
            setCards(prev => prev.filter(c => c.id !== id));
        }
    };

    const getStatusBadge = (statut: string) => {
        switch (statut) {
            case 'validee':
                return <Badge variant="default" className="bg-green-100 text-green-800">Validée</Badge>;
            case 'en_attente':
                return <Badge variant="secondary">En attente</Badge>;
            case 'expiree':
                return <Badge variant="outline">Expirée</Badge>;
            case 'rejetee':
                return <Badge variant="destructive">Rejetée</Badge>;
            default:
                return <Badge variant="outline">{statut}</Badge>;
        }
    };

    const getCardTitle = () => {
        if (currentUser?.type === 'particulier') {
            return "Ma Carte Conducteur";
        }
        return "Cartes Conducteur";
    };

    // Affichage direct du détail de la carte conducteur pour les particuliers
    if (currentUser?.type === 'particulier') {
        // On suppose que la carte conducteur principale est accessible via currentUser.driverCard ou similaire
        const card = currentUser.driverCard;
        if (card) {
            return (
                <PageLayout title="Ma Carte Conducteur">
                    <div className="max-w-xl mx-auto mt-8">
                        <Card className="border-blue-200 bg-blue-50">
                            <CardHeader>
                                <CardTitle>Votre carte conducteur</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <CreditCard className="h-6 w-6 text-blue-600" />
                                    <span className="text-lg font-semibold text-blue-900">{card.numero}</span>
                                </div>
                                <div className="text-sm text-blue-700">
                                    <p><strong>Statut :</strong> {card.statut}</p>
                                    <p><strong>Émission :</strong> {new Date(card.dateEmission).toLocaleDateString('fr-FR')}</p>
                                    <p><strong>Expiration :</strong> {new Date(card.dateExpiration).toLocaleDateString('fr-FR')}</p>
                                    <p><strong>Documents :</strong> {card.documents.length} fichier(s)</p>
                                    {card.autoriteEmission && (
                                        <p><strong>Autorité :</strong> {card.autoriteEmission}</p>
                                    )}
                                </div>
                                {card.statut === 'expiree' && (
                                    <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                                        Carte expirée - Renouvellement requis
                                    </div>
                                )}
                                {card.statut === 'validee' && (
                                    <div className="p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                                        ✓ Carte active et valide
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </PageLayout>
            );
        }
    }

    if (isLoading) {
        return (
            <PageLayout title={getCardTitle()}>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">Chargement...</div>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout title={getCardTitle()}>
            <div className="space-y-6">
                {/* En-tête avec informations pour particuliers */}
                {currentUser?.type === 'particulier' && (
                    <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-3">
                                <CreditCard className="h-6 w-6 text-blue-600" />
                                <h3 className="text-lg font-semibold text-blue-900">Votre carte conducteur</h3>
                            </div>
                            <p className="text-sm text-blue-700">
                                Cette section affiche uniquement les détails de votre carte conducteur personnelle.
                                Vous pouvez suivre le statut de vos demandes et télécharger votre carte une fois validée.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Filtres et actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex gap-4 flex-1">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Rechercher une carte..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-48">
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
                    <Button asChild>
                        <Link to="/cartes/nouvelle">
                            <Plus className="h-4 w-4 mr-2" />
                            {currentUser?.type === 'particulier' ? 'Nouvelle demande' : 'Nouvelle demande'}
                        </Link>
                    </Button>
                </div>

                {/* Liste des cartes */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCards.map((card) => (
                        <Card key={card.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5 text-transport-primary" />
                                        <div>
                                            <CardTitle className="text-lg font-mono">
                                                {card.numero}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                Type: {card.type === 'conducteur' ? 'Conducteur' : 'Entreprise'}
                                            </p>
                                        </div>
                                    </div>
                                    {getStatusBadge(card.statut)}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="text-sm space-y-1">
                                    <p><strong>Émission:</strong> {new Date(card.dateEmission).toLocaleDateString('fr-FR')}</p>
                                    <p><strong>Expiration:</strong> {new Date(card.dateExpiration).toLocaleDateString('fr-FR')}</p>
                                    <p><strong>Documents:</strong> {card.documents.length} fichier(s)</p>
                                    {card.autoriteEmission && (
                                        <p className="text-xs text-muted-foreground">
                                            <strong>Autorité:</strong> {card.autoriteEmission}
                                        </p>
                                    )}
                                </div>

                                {card.statut === 'expiree' && (
                                    <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                                        Carte expirée - Renouvellement requis
                                    </div>
                                )}

                                {card.statut === 'validee' && currentUser?.type === 'particulier' && (
                                    <div className="p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                                        ✓ Carte active et valide
                                    </div>
                                )}

                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link to={`/cartes/${card.id}`}>
                                            <Eye className="h-3 w-3 mr-1" />
                                            Détails
                                        </Link>
                                    </Button>
                                    {card.statut !== 'validee' && (
                                        <Button variant="outline" size="sm" asChild>
                                            <Link to={`/cartes/${card.id}/edit`}>
                                                <Edit className="h-3 w-3 mr-1" />
                                                Modifier
                                            </Link>
                                        </Button>
                                    )}
                                    {currentUser?.type === 'entreprise' && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(card.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-3 w-3 mr-1" />
                                            Supprimer
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Message vide */}
                {filteredCards.length === 0 && (
                    <div className="text-center py-12">
                        <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                            {currentUser?.type === 'particulier'
                                ? "Vous n'avez pas encore de carte conducteur."
                                : "Aucune carte trouvée."}
                        </p>
                        <Button asChild>
                            <Link to="/cartes/nouvelle">
                                <Plus className="h-4 w-4 mr-2" />
                                {currentUser?.type === 'particulier'
                                    ? 'Demander ma carte conducteur'
                                    : 'Faire une demande de carte'}
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default Cartes;
