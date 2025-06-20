
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PageLayout from '@/components/PageLayout';
import PieceIdentiteInput from '@/components/PieceIdentiteInput';
import ConditionsGenerales from '@/components/ConditionsGenerales';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Upload } from 'lucide-react';

const chauffeurSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  typePiece: z.string().min(1, 'Le type de pièce est requis'),
  numeroPiece: z.string().min(5, 'Le numéro de pièce est requis'),
  permis: z.string().min(5, 'Le numéro de permis est requis'),
  telephone: z.string().min(10, 'Le numéro de téléphone est requis'),
  email: z.string().email('Email invalide'),
  adresse: z.string().min(5, 'L\'adresse est requise'),
  ville: z.string().min(2, 'La ville est requise'),
  lieuNaissance: z.string().min(2, 'Le lieu de naissance est requis'),
  dateNaissance: z.string().min(1, 'La date de naissance est requise'),
});

type ChauffeurFormData = z.infer<typeof chauffeurSchema>;

const NouveauChauffeur: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [aCarteConducteur, setACarteConducteur] = useState(false);
  const [numeroCarte, setNumeroCarte] = useState('');
  const [typePiece, setTypePiece] = useState('');
  const [numeroPiece, setNumeroPiece] = useState('');
  const [accepteConditions, setAccepteConditions] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ChauffeurFormData>({
    resolver: zodResolver(chauffeurSchema)
  });

  const onSubmit = async (data: ChauffeurFormData) => {
    if (!accepteConditions) {
      toast({
        title: "Erreur",
        description: "Veuillez accepter les conditions générales d'utilisation",
        variant: "destructive"
      });
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Conducteur ajouté",
        description: "Le conducteur a été ajouté avec succès"
      });
      
      navigate('/chauffeurs');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout",
        variant: "destructive"
      });
    }
  };

  return (
    <PageLayout title="Nouveau Conducteur">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Ajouter un nouveau conducteur</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom *</Label>
                <Input
                  id="prenom"
                  {...register('prenom')}
                  placeholder="Jean-Baptiste"
                />
                {errors.prenom && (
                  <p className="text-sm text-red-600">{errors.prenom.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nom">Nom *</Label>
                <Input
                  id="nom"
                  {...register('nom')}
                  placeholder="ONDO"
                />
                {errors.nom && (
                  <p className="text-sm text-red-600">{errors.nom.message}</p>
                )}
              </div>
            </div>

            {/* Pièce d'identité */}
            <PieceIdentiteInput
              typePiece={typePiece}
              onTypePieceChange={(type) => {
                setTypePiece(type);
                setValue('typePiece', type);
              }}
              numeroPiece={numeroPiece}
              onNumeroPieceChange={(numero) => {
                setNumeroPiece(numero);
                setValue('numeroPiece', numero);
              }}
              error={errors.numeroPiece?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lieuNaissance">Lieu de naissance *</Label>
                <Input
                  id="lieuNaissance"
                  {...register('lieuNaissance')}
                  placeholder="Libreville"
                />
                {errors.lieuNaissance && (
                  <p className="text-sm text-red-600">{errors.lieuNaissance.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateNaissance">Date de naissance *</Label>
                <Input
                  id="dateNaissance"
                  type="date"
                  {...register('dateNaissance')}
                />
                {errors.dateNaissance && (
                  <p className="text-sm text-red-600">{errors.dateNaissance.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="permis">Numéro de permis *</Label>
              <Input
                id="permis"
                {...register('permis')}
                placeholder="GA-2021-001234"
              />
              {errors.permis && (
                <p className="text-sm text-red-600">{errors.permis.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="conducteur@email.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone *</Label>
                <Input
                  id="telephone"
                  {...register('telephone')}
                  placeholder="+241-01-23-45-67"
                />
                {errors.telephone && (
                  <p className="text-sm text-red-600">{errors.telephone.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse *</Label>
                <Input
                  id="adresse"
                  {...register('adresse')}
                  placeholder="Quartier Glass, Libreville"
                />
                {errors.adresse && (
                  <p className="text-sm text-red-600">{errors.adresse.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ville">Ville *</Label>
                <Input
                  id="ville"
                  {...register('ville')}
                  placeholder="Libreville"
                />
                {errors.ville && (
                  <p className="text-sm text-red-600">{errors.ville.message}</p>
                )}
              </div>
            </div>

            {/* Section carte conducteur */}
            <Card>
              <CardHeader>
                <CardTitle>Carte conducteur</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="a-carte-conducteur"
                    checked={aCarteConducteur}
                    onCheckedChange={(checked) => setACarteConducteur(checked as boolean)}
                  />
                  <Label htmlFor="a-carte-conducteur">
                    Ce conducteur possède déjà une carte conducteur
                  </Label>
                </div>

                {aCarteConducteur ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="numero-carte">Numéro de carte conducteur</Label>
                      <Input
                        id="numero-carte"
                        value={numeroCarte}
                        onChange={(e) => setNumeroCarte(e.target.value)}
                        placeholder="GAB-2023-001234"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Fichier de la carte conducteur (recto-verso)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Cliquez pour télécharger ou glissez-déposez
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, PDF jusqu'à 10MB</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Documents justificatifs requis pour la demande de carte conducteur :
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Photo d'identité</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="text-xs text-gray-600">Photo récente</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Copie pièce d'identité</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="text-xs text-gray-600">Recto-verso</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Copie permis de conduire</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="text-xs text-gray-600">Recto-verso</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Certificat médical</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="text-xs text-gray-600">Moins de 3 mois</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Conditions générales */}
            <ConditionsGenerales
              accepted={accepteConditions}
              onAcceptedChange={setAccepteConditions}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Ajouter le conducteur
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/chauffeurs')}
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default NouveauChauffeur;
