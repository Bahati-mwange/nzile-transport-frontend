import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Driver } from '@/hooks/useApiData';

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

const ChauffeurEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getDriverById } = useApiData();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ChauffeurFormData>({
    resolver: zodResolver(chauffeurSchema)
  });

  useEffect(() => {
    loadDriver();
  }, [id]);

  const loadDriver = async () => {
    if (!id) return;
    const data = await getDriverById(id);
    if (data) {
      setDriver(data);
      // Pré-remplir le formulaire
      setValue('nom', data.nom);
      setValue('prenom', data.prenom);
      setValue('cni', data.cni);
      setValue('permis', data.permis);
      setValue('telephone', data.telephone);
      setValue('email', data.email);
      setValue('adresse', data.adresse);
      setValue('ville', data.ville);
      setValue('dateNaissance', data.dateNaissance);
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: ChauffeurFormData) => {
    try {
      // Simulation de modification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Chauffeur modifié",
        description: "Les informations ont été mises à jour avec succès"
      });
      
      navigate(`/chauffeurs/${id}`);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la modification",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Modification du chauffeur">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Chargement...</div>
        </div>
      </PageLayout>
    );
  }

  if (!driver) {
    return (
      <PageLayout title="Chauffeur introuvable">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Ce chauffeur n'existe pas.</p>
          <Button onClick={() => navigate('/chauffeurs')}>
            Retour à la liste
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={`Modifier ${driver.prenom} ${driver.nom}`}>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Modifier les informations du chauffeur</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom *</Label>
                <Input
                  id="prenom"
                  {...register('prenom')}
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
                Sauvegarder les modifications
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(`/chauffeurs/${id}`)}
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

export default ChauffeurEdit;
