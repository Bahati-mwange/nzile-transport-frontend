import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import ConditionsGenerales from '@/components/ConditionsGenerales';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Clock, Upload, User, FileText, CheckCircle } from 'lucide-react';

const NouvelleDemande: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    motif: '',
    informationsPersonnelles: {
      nom: '',
      prenom: '',
      dateNaissance: '',
      lieuNaissance: '',
      nationalite: 'Gabonaise',
      pieceIdentite: 'CNI',
      numeroPiece: '',
      adresse: '',
      ville: '',
      telephone: '',
      email: ''
    },
    documents: {
      pieceIdentite: null as File | null,
      permis: null as File | null,
      photo: null as File | null,
      certificatMedical: null as File | null
    },
    accepteCGU: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Pour un particulier, le type de demande est fixé à carte conducteur
  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      type: 'carte_conducteur'
    }));
  }, []);

  // Étapes : 1 = Informations personnelles, 2 = Justificatifs, 3 = Validation
  const steps = [
    { id: 1, title: 'Informations personnelles', icon: User },
    { id: 2, title: 'Justificatifs', icon: FileText },
    { id: 3, title: 'Validation', icon: CheckCircle }
  ];

  const piecesIdentite = [
    { value: 'CNI', label: 'Carte Nationale d\'Identité (CNI)' },
    { value: 'Passeport', label: 'Passeport' },
    { value: 'Carte_sejour', label: 'Carte de séjour' },
    { value: 'Permis_conduire', label: 'Permis de conduire (pièce d\'identité)' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulation de soumission
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Demande envoyée",
        description: "Votre demande a été enregistrée avec succès. Vous recevrez un email de confirmation."
      });

      navigate('/mes-demandes');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi de votre demande",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (section: keyof typeof formData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, any>),
        [field]: value
      }
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  value={formData.informationsPersonnelles.nom}
                  onChange={(e) => updateFormData('informationsPersonnelles', 'nom', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  value={formData.informationsPersonnelles.prenom}
                  onChange={(e) => updateFormData('informationsPersonnelles', 'prenom', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateNaissance">Date de naissance</Label>
                <Input
                  id="dateNaissance"
                  type="date"
                  value={formData.informationsPersonnelles.dateNaissance}
                  onChange={(e) => updateFormData('informationsPersonnelles', 'dateNaissance', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lieuNaissance">Lieu de naissance</Label>
                <Input
                  id="lieuNaissance"
                  value={formData.informationsPersonnelles.lieuNaissance}
                  onChange={(e) => updateFormData('informationsPersonnelles', 'lieuNaissance', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="numeroPiece">
                  Numéro de pièce d'identité
                  <span className="text-xs text-gray-500"> (CNI, Passeport, Carte de séjour, Permis de conduire)</span>
                </Label>
                <Input
                  id="numeroPiece"
                  value={formData.informationsPersonnelles.numeroPiece}
                  onChange={(e) => updateFormData('informationsPersonnelles', 'numeroPiece', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="adresse">Adresse complète</Label>
              <Textarea
                id="adresse"
                value={formData.informationsPersonnelles.adresse}
                onChange={(e) => updateFormData('informationsPersonnelles', 'adresse', e.target.value)}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ville">Ville</Label>
                <Input
                  id="ville"
                  value={formData.informationsPersonnelles.ville}
                  onChange={(e) => updateFormData('informationsPersonnelles', 'ville', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  type="tel"
                  value={formData.informationsPersonnelles.telephone}
                  onChange={(e) => updateFormData('informationsPersonnelles', 'telephone', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Justificatifs requis</h3>

            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Upload className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">
                        {piecesIdentite.find(p => p.value === formData.informationsPersonnelles.pieceIdentite)?.label || 'Pièce d\'identité'}
                      </div>
                      <div className="text-sm text-muted-foreground">Format: PDF, JPG (max 5MB)</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-3 w-3 mr-1" />
                    Choisir
                  </Button>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Upload className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Permis de conduire</div>
                      <div className="text-sm text-muted-foreground">Recto et verso</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-3 w-3 mr-1" />
                    Choisir
                  </Button>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Upload className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Photo d'identité</div>
                      <div className="text-sm text-muted-foreground">Récente, fond blanc</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-3 w-3 mr-1" />
                    Choisir
                  </Button>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Upload className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Certificat médical</div>
                      <div className="text-sm text-muted-foreground">Délivré par un médecin agréé (moins de 3 mois)</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-3 w-3 mr-1" />
                    Choisir
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Validation de votre demande</h3>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <h4 className="font-medium mb-2">Récapitulatif de votre demande</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Type:</strong> {formData.type.replace('_', ' ')}</p>
                <p><strong>Nom:</strong> {formData.informationsPersonnelles.prenom} {formData.informationsPersonnelles.nom}</p>
                <p><strong>Date de naissance:</strong> {formData.informationsPersonnelles.dateNaissance}</p>
                <p><strong>Lieu de naissance:</strong> {formData.informationsPersonnelles.lieuNaissance}</p>
                <p><strong>Pièce d'identité:</strong> {formData.informationsPersonnelles.pieceIdentite} - {formData.informationsPersonnelles.numeroPiece}</p>
                <p><strong>Ville:</strong> {formData.informationsPersonnelles.ville}</p>
              </div>
            </Card>

            {/* Prix */}
            <Card className="p-4">
              <h4 className="font-medium mb-2">Facture</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Carte conducteur</span>
                  <span className="font-medium">25 000 XAF</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>25 000 XAF</span>
                  </div>
                </div>
              </div>
            </Card>

            <ConditionsGenerales
              accepted={formData.accepteCGU}
              onAcceptedChange={(accepted) => setFormData(prev => ({ ...prev, accepteCGU: accepted }))}
            />

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Information importante:</strong> Une fois votre demande envoyée, vous recevrez un email de confirmation.
                Le traitement de votre dossier peut prendre jusqu'à 15 jours ouvrables.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageLayout title="Nouvelle demande">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progression */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex w-full justify-between items-center gap-0">
              {/* À gauche */}
              <div className="flex flex-col items-center w-1/3">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 mx-auto ${currentStep > 1 ? 'bg-green-500 border-green-500 text-white' : currentStep === 1 ? 'bg-blue-500 border-blue-500 text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                  <User className="h-6 w-6" />
                </div>
                <span className={`text-xs text-center font-medium ${currentStep === 1 ? 'text-blue-600' : currentStep > 1 ? 'text-green-600' : 'text-gray-400'}`}>Informations personnelles</span>
              </div>
              {/* Milieu */}
              <div className="flex flex-col items-center w-1/3">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 mx-auto ${currentStep > 2 ? 'bg-green-500 border-green-500 text-white' : currentStep === 2 ? 'bg-blue-500 border-blue-500 text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                  <FileText className="h-6 w-6" />
                </div>
                <span className={`text-xs text-center font-medium ${currentStep === 2 ? 'text-blue-600' : currentStep > 2 ? 'text-green-600' : 'text-gray-400'}`}>Justificatifs</span>
              </div>
              {/* À droite */}
              <div className="flex flex-col items-center w-1/3">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 mx-auto ${currentStep === 3 ? 'bg-blue-500 border-blue-500 text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                  <CheckCircle className="h-6 w-6" />
                </div>
                <span className={`text-xs text-center font-medium ${currentStep === 3 ? 'text-blue-600' : 'text-gray-400'}`}>Validation</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contenu de l'étape */}
        <Card>
          <CardHeader>
            <CardTitle>Étape {currentStep} sur {steps.length}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Précédent
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={handleNext}>
              Suivant
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!formData.accepteCGU || isLoading}
            >
              {isLoading ? "Envoi en cours..." : "Envoyer la demande"}
            </Button>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default NouvelleDemande;
