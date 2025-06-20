import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

const CartesParticulier: React.FC = () => {
    const { currentUser } = useApiData();
    if (!currentUser || currentUser.type !== 'particulier') {
        return (
            <PageLayout title="Ma Carte Conducteur">
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Aucun utilisateur particulier connecté</p>
                </div>
            </PageLayout>
        );
    }

    // Récupérer la carte du particulier
    const driverId = currentUser.profile.id;
    const card = currentUser.driverCard || null;

    if (!card) {
        return (
            <PageLayout title="Ma Carte Conducteur">
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Vous n'avez pas encore de carte conducteur.</p>
                </div>
            </PageLayout>
        );
    }

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
                            <p><strong>Type véhicule :</strong> {card.typeVehicule || '-'}</p>
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
};

export default CartesParticulier;
