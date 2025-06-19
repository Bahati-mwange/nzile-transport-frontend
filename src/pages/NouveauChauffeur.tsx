
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PageLayout from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const chauffeurSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  cni: z.string().min(5, 'Le numéro CNI est requis'),
  permis: z.string().min(5, 'Le numéro de permis est requis'),
  telephone: z.string().min(10, 'Le numéro de téléphone est requis'),
  email: z.string().email('Email invalide'),
  adresse: z.string().min(5, 'L\'adresse est requise'),
  ville: z.string().min(2, 'La ville est requise'),
  dateNaissance: z.string().min(1, 'La date de naissance est requise'),
});

type ChauffeurFormData = z.infer<typeof chauffeurSchema>;

const NouveauChauffeur: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<ChauffeurFormData>({
    resolver: zodResolver(chauffeurSchema)
  });

  const onSubmit = async (data: ChauffeurFormData) => {
    try {
      // Simulation d'ajout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Chauffeur ajouté",
        description: "Le chauffeur a été ajouté avec succès"
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
    <PageLayout title="Nouveau Chauffeur">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Ajouter un nouveau chauffeur</CardTitle>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cni">Numéro CNI *</Label>
                <Input
                  id="cni"
                  {...register('cni')}
                  placeholder="173456789"
                />
                {errors.cni && (
                  <p className="text-sm text-red-600">{errors.cni.message}</p>
                )}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="chauffeur@email.com"
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

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Ajouter le chauffeur
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
