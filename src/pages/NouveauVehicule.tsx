
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const vehiculeSchema = z.object({
  marque: z.string().min(2, 'La marque est requise'),
  modele: z.string().min(2, 'Le modèle est requis'),
  immatriculation: z.string().min(5, 'L\'immatriculation est requise'),
  typeVehicule: z.string().min(1, 'Le type de véhicule est requis'),
  annee: z.number().min(1990, 'Année invalide').max(new Date().getFullYear() + 1, 'Année invalide'),
  chronotachygraphe: z.boolean(),
});

type VehiculeFormData = z.infer<typeof vehiculeSchema>;

const NouveauVehicule: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<VehiculeFormData>({
    resolver: zodResolver(vehiculeSchema),
    defaultValues: {
      chronotachygraphe: false
    }
  });

  const onSubmit = async (data: VehiculeFormData) => {
    try {
      // Simulation d'ajout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Véhicule ajouté",
        description: "Le véhicule a été ajouté avec succès"
      });
      
      navigate('/vehicules');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout",
        variant: "destructive"
      });
    }
  };

  return (
    <PageLayout title="Nouveau Véhicule">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Ajouter un nouveau véhicule</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="marque">Marque *</Label>
                <Input
                  id="marque"
                  {...register('marque')}
                  placeholder="Mercedes-Benz"
                />
                {errors.marque && (
                  <p className="text-sm text-red-600">{errors.marque.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="modele">Modèle *</Label>
                <Input
                  id="modele"
                  {...register('modele')}
                  placeholder="Actros 1845"
                />
                {errors.modele && (
                  <p className="text-sm text-red-600">{errors.modele.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="immatriculation">Immatriculation *</Label>
                <Input
                  id="immatriculation"
                  {...register('immatriculation')}
                  placeholder="GA-3456-LV"
                  className="font-mono"
                />
                {errors.immatriculation && (
                  <p className="text-sm text-red-600">{errors.immatriculation.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="annee">Année *</Label>
                <Input
                  id="annee"
                  type="number"
                  {...register('annee', { valueAsNumber: true })}
                  placeholder="2024"
                  min="1990"
                  max={new Date().getFullYear() + 1}
                />
                {errors.annee && (
                  <p className="text-sm text-red-600">{errors.annee.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="typeVehicule">Type de véhicule *</Label>
              <Select onValueChange={(value) => setValue('typeVehicule', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Poids Lourd">Poids Lourd</SelectItem>
                  <SelectItem value="Transport Personnel">Transport Personnel</SelectItem>
                  <SelectItem value="Transport Marchandises">Transport Marchandises</SelectItem>
                  <SelectItem value="Transport Passagers">Transport Passagers</SelectItem>
                </SelectContent>
              </Select>
              {errors.typeVehicule && (
                <p className="text-sm text-red-600">{errors.typeVehicule.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="chronotachygraphe"
                onCheckedChange={(checked) => setValue('chronotachygraphe', !!checked)}
              />
              <Label htmlFor="chronotachygraphe">
                Équipé d'un chronotachygraphe
              </Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Ajouter le véhicule
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/vehicules')}
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

export default NouveauVehicule;
