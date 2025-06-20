import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useApiData } from '@/hooks/useApiData';
import { 
  Users, 
  Plus, 
  Eye,
  AlertCircle,
  Truck
} from 'lucide-react';

const EntrepriseNouvelleDemande: React.FC = () => {
  const [selectedConducteurs, setSelectedConducteurs] = useState<string[]>([]);
  const [selectedVehicules, setSelectedVehicules] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [accepteCGU, setAccepteCGU] = useState(false);
  const { toast } = useToast();
  const { mockData } = useApiData();
  const navigate = useNavigate();

  // Conducteurs avec cartes expirées ou manquantes seulement
  const conducteursEligibles = [
    {
      id: '1',
      nom: 'ONDO',
      prenom: 'Jean-Baptiste',
      email: 'jb.ondo@gmail.com',
      telephone: '+241-01-23-45-67',
      lieuNaissance: 'Libreville',
      dateNaissance: '1985-03-15',
      carte: {
        numero: 'GAB-2023-001234',
        dateExpiration: '2024-02-15', // Expirée
        statut: 'expire'
      }
    },
    {
      id: '2',
      nom: 'MBADINGA',
      prenom: 'Marie-Claire',
      email: 'mc.mbadinga@yahoo.fr',
      telephone: '+241-05-67-89-01',
      lieuNaissance: 'Port-Gentil',
      dateNaissance: '1990-08-22',
      carte: null // Pas de carte
    }
  ];

  const vehicules = mockData.vehicles.map(v => ({
    ...v,
    needsChronotachygraphe: !v.chronotachygraphe,
    chronoSerial: v.chronotachygraphe ? `CHR-${v.id}-2024` : null
  }));

  const handleConducteurSelect = (conducteurId: string, checked: boolean) => {
    if (checked) {
      setSelectedConducteurs([...selectedConducteurs, conducteurId]);
    } else {
      setSelectedConducteurs(selectedConducteurs.filter(id => id !== conducteurId));
    }
  };

  const handleVehiculeSelect = (vehiculeId: string, checked: boolean) => {
    if (checked) {
      setSelectedVehicules([...selectedVehicules, vehiculeId]);
    } else {
      setSelectedVehicules(selectedVehicules.filter(id => id !== vehiculeId));
    }
  };

  const getStatutCarte = (conducteur: any) => {
    if (!conducteur.carte) {
      return (
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span className="font-medium">Aucune carte - Création nécessaire</span>
        </div>
      );
    }
    
    const dateExpiration = new Date(conducteur.carte.dateExpiration);
    const maintenant = new Date();
    
    if (dateExpiration < maintenant) {
      return (
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span className="font-medium">Carte expirée - Renouvellement nécessaire</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2 text-orange-600">
        <AlertCircle className="h-4 w-4" />
        <span className="font-medium">Expire bientôt - Renouvellement nécessaire</span>
      </div>
    );
  };

  const calculateTotal = () => {
    const prixCarte = 25000;
    const prixChrono = 15000;
    const totalCartes = selectedConducteurs.length * prixCarte;
    const totalChrono = selectedVehicules.length * prixChrono;
    return totalCartes + totalChrono;
  };

  const handleSubmit = async () => {
    if (!accepteCGU) {
      toast({
        title: "Erreur",
        description: "Veuillez accepter les conditions générales d'utilisation",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Demande envoyée",
      description: "Votre demande a été enregistrée avec succès. Redirection vers le paiement...",
    });

    setTimeout(() => {
      navigate('/entreprise/demandes');
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sélection des conducteurs</h3>
              <p className="text-gray-600 mb-4">
                Conducteurs nécessitant une carte conducteur (carte expirée ou manquante)
              </p>
              
              <div className="space-y-4">
                {conducteursEligibles.map((conducteur) => (
                  <Card key={conducteur.id} className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={`conducteur-${conducteur.id}`}
                        checked={selectedConducteurs.includes(conducteur.id)}
                        onCheckedChange={(checked) => handleConducteurSelect(conducteur.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor={`conducteur-${conducteur.id}`} className="text-base font-medium cursor-pointer">
                              {conducteur.prenom} {conducteur.nom}
                            </Label>
                            <p className="text-sm text-gray-600">{conducteur.email}</p>
                            <p className="text-sm text-gray-600">{conducteur.telephone}</p>
                            <p className="text-sm text-gray-600">
                              Né le {new Date(conducteur.dateNaissance).toLocaleDateString('fr-FR')} à {conducteur.lieuNaissance}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="mb-2">
                              {getStatutCarte(conducteur)}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/chauffeurs/${conducteur.id}`)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Détails
                            </Button>
                          </div>
                        </div>
                        {conducteur.carte && (
                          <div className="mt-2 p-2 bg-red-50 rounded text-sm">
                            <p><strong>Carte expirée:</strong> {conducteur.carte.numero}</p>
                            <p><strong>Expirée le:</strong> {new Date(conducteur.carte.dateExpiration).toLocaleDateString('fr-FR')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Sélection des véhicules (Chronotachygraphes)</h3>
              <p className="text-gray-600 mb-4">
                Choisissez les véhicules pour lesquels vous souhaitez faire une demande de chronotachygraphe
              </p>
              
              <div className="space-y-4">
                {vehicules.map((vehicule) => (
                  <Card key={vehicule.id} className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={`vehicule-${vehicule.id}`}
                        checked={selectedVehicules.includes(vehicule.id)}
                        onCheckedChange={(checked) => handleVehiculeSelect(vehicule.id, checked as boolean)}
                        disabled={!vehicule.needsChronotachygraphe}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor={`vehicule-${vehicule.id}`} className="text-base font-medium cursor-pointer">
                              {vehicule.marque} {vehicule.modele}
                            </Label>
                            <p className="text-sm text-gray-600">{vehicule.immatriculation}</p>
                            <p className="text-sm text-gray-600">{vehicule.typeVehicule} - {vehicule.annee}</p>
                          </div>
                          <div className="text-right">
                            <div className="mb-2">
                              {vehicule.needsChronotachygraphe ? (
                                <span className="text-red-600 font-medium">Chronotachygraphe requis</span>
                              ) : (
                                <span className="text-green-600 font-medium">Chronotachygraphe installé</span>
                              )}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/vehicules/${vehicule.id}`)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Détails
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Récapitulatif de votre demande</h3>
            
            {/* Récapitulatif conducteurs */}
            {selectedConducteurs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Demandes de cartes conducteur ({selectedConducteurs.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedConducteurs.map(id => {
                      const conducteur = conducteursEligibles.find(c => c.id === id);
                      return (
                        <div key={id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{conducteur?.prenom} {conducteur?.nom}</p>
                            <p className="text-sm text-gray-600">
                              {conducteur?.carte ? 'Renouvellement' : 'Nouvelle carte'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">25 000 XAF</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Récapitulatif véhicules */}
            {selectedVehicules.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Demandes de chronotachygraphes ({selectedVehicules.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedVehicules.map(id => {
                      const vehicule = vehicules.find(v => v.id === id);
                      return (
                        <div key={id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{vehicule?.marque} {vehicule?.modele}</p>
                            <p className="text-sm text-gray-600">{vehicule?.immatriculation}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">15 000 XAF</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Facture et CGU */}
            <Card>
              <CardHeader>
                <CardTitle>Facture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedConducteurs.length > 0 && (
                    <div className="flex justify-between">
                      <span>Cartes conducteur ({selectedConducteurs.length} × 25 000 XAF)</span>
                      <span>{(selectedConducteurs.length * 25000).toLocaleString()} XAF</span>
                    </div>
                  )}
                  {selectedVehicules.length > 0 && (
                    <div className="flex justify-between">
                      <span>Chronotachygraphes ({selectedVehicules.length} × 15 000 XAF)</span>
                      <span>{(selectedVehicules.length * 15000).toLocaleString()} XAF</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{calculateTotal().toLocaleString()} XAF</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conditions générales d'utilisation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="max-h-40 overflow-y-auto p-4 bg-gray-50 rounded text-sm">
                    <h4 className="font-medium mb-2">CONDITIONS GÉNÉRALES D'UTILISATION</h4>
                    <p className="mb-2">
                      En utilisant ce service, vous acceptez de respecter la réglementation gabonaise 
                      en matière de transport et de chronotachygraphe numérique.
                    </p>
                    <p className="mb-2">
                      Les informations fournies doivent être exactes et à jour. Toute fausse déclaration 
                      peut entraîner le rejet de la demande.
                    </p>
                    <p className="mb-2">
                      Le délai de traitement des demandes est de 15 jours ouvrables à compter de la réception 
                      du dossier complet.
                    </p>
                    <p>
                      Les frais de traitement ne sont pas remboursables en cas de rejet de la demande 
                      pour non-conformité des documents.
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="cgu" 
                      checked={accepteCGU}
                      onCheckedChange={(checked) => setAccepteCGU(checked as boolean)}
                    />
                    <Label htmlFor="cgu" className="text-sm leading-5">
                      J'accepte les conditions générales d'utilisation et la politique de confidentialité 
                      de transport.nzile.ga
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return selectedConducteurs.length > 0 || selectedVehicules.length > 0;
    }
    if (currentStep === 2) {
      return accepteCGU;
    }
    return true;
  };

  return (
    <PageLayout title="Nouvelle demande d'entreprise">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Progression */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}>
                  1
                </div>
                <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
                  Sélection
                </span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200 mx-4">
                <div className={`h-full ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`} 
                     style={{ width: currentStep >= 2 ? '100%' : '0%' }} />
              </div>
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
                  Validation
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contenu de l'étape */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 ? 'Sélection des demandes' : 'Récapitulatif et validation'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Précédent
          </Button>
          
          {currentStep < 2 ? (
            <Button 
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
            >
              Suivant
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="bg-green-600 hover:bg-green-700"
            >
              Valider et procéder au paiement
            </Button>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default EntrepriseNouvelleDemande;
