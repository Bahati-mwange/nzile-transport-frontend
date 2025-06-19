
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useApiData } from '@/hooks/useApiData';
import { useToast } from "@/hooks/use-toast";
import Navigation from '@/components/Navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { 
  CreditCard, 
  Upload, 
  FileText, 
  Camera,
  ArrowLeft
} from 'lucide-react';

const NouvelleCarteForm: React.FC = () => {
  const { currentUser, getDrivers, isLoading } = useApiData();
  const [drivers, setDrivers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    driverId: '',
    type: 'conducteur',
    documents: [] as string[],
    photoPath: '',
    permisPath: '',
    medicalPath: '',
    notes: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const loadDrivers = async () => {
      const driversData = await getDrivers();
      
      if (currentUser.type === 'entreprise') {
        const companyId = currentUser.profile.id;
        const companyDrivers = driversData.filter(d => d.entrepriseId === companyId);
        setDrivers(companyDrivers);
      } else {
        // Pour un particulier, pré-sélectionner son propre profil
        setFormData(prev => ({ ...prev, driverId: currentUser.profile.id }));
        setDrivers([currentUser.profile]);
      }
    };

    loadDrivers();
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.driverId) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un conducteur",
        variant: "destructive"
      });
      return;
    }

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Demande envoyée",
      description: "Votre demande de carte conducteur a été soumise avec succès"
    });
    
    navigate('/cartes');
  };

  const handleFileUpload = (fileType: string) => {
    // Simulation d'upload de fichier
    const fileName = `${fileType}_${Date.now()}.pdf`;
    
    if (fileType === 'photo') {
      setFormData(prev => ({ ...prev, photoPath: fileName }));
    } else if (fileType === 'permis') {
      setFormData(prev => ({ ...prev, permisPath: fileName }));
    } else if (fileType === 'medical') {
      setFormData(prev => ({ ...prev, medicalPath: fileName }));
    }
    
    toast({
      title: "Fichier uploadé",
      description: `Le fichier ${fileName} a été uploadé avec succès`
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <LoadingSpinner size="lg" text="Chargement du formulaire..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button
            onClick={() => navigate('/cartes')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la liste
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900">
            Nouvelle demande de carte conducteur
          </h1>
          <p className="mt-2 text-gray-600">
            Remplissez le formulaire pour demander une nouvelle carte conducteur
          </p>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Informations de la demande
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sélection du conducteur (pour les entreprises) */}
              {currentUser?.type === 'entreprise' && (
                <div className="space-y-2">
                  <Label htmlFor="driverId">Conducteur *</Label>
                  <Select value={formData.driverId} onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, driverId: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un conducteur" />
                    </SelectTrigger>
                    <SelectContent>
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.prenom} {driver.nom} - {driver.permis}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Type de carte */}
              <div className="space-y-2">
                <Label htmlFor="type">Type de carte *</Label>
                <Select value={formData.type} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, type: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conducteur">Carte conducteur</SelectItem>
                    <SelectItem value="entreprise">Carte entreprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Documents requis */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Documents requis</h3>
                
                {/* Photo du conducteur */}
                <div className="space-y-2">
                  <Label>Photo du conducteur *</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      onClick={() => handleFileUpload('photo')}
                      variant="outline"
                      className="flex items-center"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {formData.photoPath ? 'Photo uploadée' : 'Télécharger photo'}
                    </Button>
                    {formData.photoPath && (
                      <span className="text-sm text-green-600">✓ {formData.photoPath}</span>
                    )}
                  </div>
                </div>

                {/* Permis de conduire */}
                <div className="space-y-2">
                  <Label>Copie du permis de conduire *</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      onClick={() => handleFileUpload('permis')}
                      variant="outline"
                      className="flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {formData.permisPath ? 'Permis uploadé' : 'Télécharger permis'}
                    </Button>
                    {formData.permisPath && (
                      <span className="text-sm text-green-600">✓ {formData.permisPath}</span>
                    )}
                  </div>
                </div>

                {/* Certificat médical (optionnel) */}
                <div className="space-y-2">
                  <Label>Certificat médical (facultatif)</Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      type="button"
                      onClick={() => handleFileUpload('medical')}
                      variant="outline"
                      className="flex items-center"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {formData.medicalPath ? 'Certificat uploadé' : 'Télécharger certificat'}
                    </Button>
                    {formData.medicalPath && (
                      <span className="text-sm text-green-600">✓ {formData.medicalPath}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes additionnelles */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes additionnelles</Label>
                <Textarea
                  id="notes"
                  placeholder="Informations complémentaires..."
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>

              {/* Informations importantes */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Informations importantes</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Le traitement de votre demande peut prendre 5 à 10 jours ouvrables</li>
                  <li>• Tous les documents doivent être clairement lisibles</li>
                  <li>• La photo doit respecter les normes d'identité officielles</li>
                  <li>• Vous recevrez un email de confirmation une fois la demande traitée</li>
                </ul>
              </div>

              {/* Boutons */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  onClick={() => navigate('/cartes')}
                  variant="outline"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="bg-transport-primary hover:bg-blue-700"
                  disabled={!formData.driverId || !formData.photoPath || !formData.permisPath}
                >
                  Envoyer la demande
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NouvelleCarteForm;
