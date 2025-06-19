
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
      adresse: '',
      ville: '',
      telephone: '',
      email: ''
    },
    documents: {
      cni: null,
      permis: null,
      photo: null,
      certificatMedical: null
    },
    accepteCGU: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: 'Type de demande', icon: CreditCard },
    { id: 2, title: 'Informations personnelles', icon: User },
    { id: 3, title: 'Justificatifs', icon: FileText },
    { id: 4, title: 'Validation', icon: CheckCircle }
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

  const updateFormData = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quel type de demande souhaitez-vous faire ?</h3>
              <RadioGroup value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <div className="space-y-4">
                  <Card className="p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="carte_conducteur" id="carte_conducteur" />
                      <Label htmlFor="carte_conducteur" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">Carte conducteur</div>
                            <div className="text-sm text-muted-foreground">Première demande ou renouvellement</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </Card>
                  
                  <Card className="p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="carte_chronotachygraphe" id="carte_chronotachygraphe" />
                      <Label htmlFor="carte_chronotachygraphe" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="font-medium">Carte chronotachygraphe</div>
                            <div className="text-sm text-muted-foreground">Pour véhicules équipés</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </Card>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="motif">Motif de la demande</Label>
              <Textarea
                id="motif"
                placeholder="Précisez le motif de votre demande..."
                value={formData.motif}
                onChange={(e) => setFormData(prev => ({ ...prev, motif: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 2:
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

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Justificatifs requis</h3>
            
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Upload className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Carte Nationale d'Identité (CNI)</div>
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

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Validation de votre demande</h3>
            
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h4 className="font-medium mb-2">Récapitulatif de votre demande</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Type:</strong> {formData.type.replace('_', ' ')}</p>
                <p><strong>Nom:</strong> {formData.informationsPersonnelles.prenom} {formData.informationsPersonnelles.nom}</p>
                <p><strong>Date de naissance:</strong> {formData.informationsPersonnelles.dateNaissance}</p>
                <p><strong>Ville:</strong> {formData.informationsPersonnelles.ville}</p>
              </div>
            </Card>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="cgu" 
                checked={formData.accepteCGU}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, accepteCGU: checked as boolean }))}
              />
              <Label htmlFor="cgu" className="text-sm leading-5">
                J'accepte les <button type="button" className="text-blue-600 hover:underline">conditions générales d'utilisation</button> et 
                la <button type="button" className="text-blue-600 hover:underline">politique de confidentialité</button> de transport.nzile.ga
              </Label>
            </div>

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
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 ${
                        isCompleted ? 'bg-green-500 border-green-500 text-white' :
                        isActive ? 'bg-blue-500 border-blue-500 text-white' :
                        'bg-gray-100 border-gray-300 text-gray-400'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className={`text-xs text-center font-medium ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 mb-6 ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
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
