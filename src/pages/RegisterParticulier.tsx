
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, ArrowLeft } from 'lucide-react';

const RegisterParticulier: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    cni: '',
    permis: '',
    dateNaissance: '',
    telephone: '',
    email: '',
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
      description: "Votre compte particulier a été créé avec succès"
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
              <User className="h-12 w-12 text-transport-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Inscription Particulier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    name="nom"
                    placeholder="ex: MBADINGA"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    name="prenom"
                    placeholder="ex: Marie-Claire"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cni">Numéro CNI *</Label>
                  <Input
                    id="cni"
                    name="cni"
                    placeholder="ex: 174567890"
                    value={formData.cni}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="permis">Numéro permis de conduire *</Label>
                  <Input
                    id="permis"
                    name="permis"
                    placeholder="ex: GA-2023-001234"
                    value={formData.permis}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateNaissance">Date de naissance *</Label>
                <Input
                  id="dateNaissance"
                  name="dateNaissance"
                  type="date"
                  value={formData.dateNaissance}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    placeholder="+241-05-67-89-01"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adresse">Adresse *</Label>
                  <Input
                    id="adresse"
                    name="adresse"
                    placeholder="Votre adresse complète"
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

              <Button type="submit" className="w-full bg-transport-primary hover:bg-blue-700">
                Créer le compte particulier
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterParticulier;
