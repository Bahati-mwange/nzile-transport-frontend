
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, Phone, MapPin, CreditCard } from 'lucide-react';

const RegisterParticulier: React.FC = () => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephone: '',
    cni: '',
    permis: '',
    adresse: '',
    ville: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // Simulation d'inscription
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès"
      });
      
      navigate('/login');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'inscription",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <Card className="w-full max-w-2xl animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <User className="h-12 w-12 text-transport-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Inscription Chauffeur Particulier
          </CardTitle>
          <CardDescription>
            Créez votre compte pour gérer vos cartes conducteur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  type="text"
                  placeholder="Votre prénom"
                  value={formData.prenom}
                  onChange={(e) => handleChange('prenom', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  type="text"
                  placeholder="Votre nom"
                  value={formData.nom}
                  onChange={(e) => handleChange('nom', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="telephone"
                    type="tel"
                    placeholder="+241-XX-XX-XX-XX"
                    value={formData.telephone}
                    onChange={(e) => handleChange('telephone', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cni">CNI</Label>
                <Input
                  id="cni"
                  type="text"
                  placeholder="N° CNI"
                  value={formData.cni}
                  onChange={(e) => handleChange('cni', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="permis">N° Permis de conduire</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="permis"
                  type="text"
                  placeholder="GA-2023-XXXXXX"
                  value={formData.permis}
                  onChange={(e) => handleChange('permis', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="adresse"
                    type="text"
                    placeholder="Votre adresse"
                    value={formData.adresse}
                    onChange={(e) => handleChange('adresse', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ville">Ville</Label>
                <Input
                  id="ville"
                  type="text"
                  placeholder="Libreville"
                  value={formData.ville}
                  onChange={(e) => handleChange('ville', e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-transport-primary hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Création du compte..." : "Créer mon compte"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="text-transport-primary hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterParticulier;
