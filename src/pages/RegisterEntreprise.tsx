
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Building2, ArrowLeft } from 'lucide-react';

const RegisterEntreprise: React.FC = () => {
  const [formData, setFormData] = useState({
    denomination: '',
    rccm: '',
    email: '',
    telephone: '',
    responsableLegal: '',
    adresse: '',
    ville: '',
    password: '',
    confirmPassword: ''
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }

    // Simulation d'inscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Inscription réussie",
      description: "Votre compte entreprise a été créé avec succès"
    });
    
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/register" className="inline-flex items-center text-transport-primary mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au choix du type de compte
        </Link>

        <Card className="animate-fade-in">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Building2 className="h-12 w-12 text-transport-secondary" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Inscription Entreprise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="denomination">Dénomination sociale *</Label>
                  <Input
                    id="denomination"
                    name="denomination"
                    placeholder="ex: TRANSPORT GABON EXPRESS"
                    value={formData.denomination}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rccm">N° RCCM *</Label>
                  <Input
                    id="rccm"
                    name="rccm"
                    placeholder="ex: LBV-2023-B-1234"
                    value={formData.rccm}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email professionnel *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="contact@votre-entreprise.ga"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    placeholder="+241-01-23-45-67"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsableLegal">Responsable légal *</Label>
                <Input
                  id="responsableLegal"
                  name="responsableLegal"
                  placeholder="Nom et prénom du représentant légal"
                  value={formData.responsableLegal}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adresse">Adresse *</Label>
                  <Input
                    id="adresse"
                    name="adresse"
                    placeholder="Adresse du siège social"
                    value={formData.adresse}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ville">Ville *</Label>
                  <Input
                    id="ville"
                    name="ville"
                    placeholder="ex: Libreville"
                    value={formData.ville}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-transport-secondary hover:bg-green-700">
                Créer le compte entreprise
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterEntreprise;
