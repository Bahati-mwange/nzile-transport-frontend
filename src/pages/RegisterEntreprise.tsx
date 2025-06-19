
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Building2, Mail, Lock, Phone, MapPin, FileText } from 'lucide-react';

const RegisterEntreprise: React.FC = () => {
  const [formData, setFormData] = useState({
    denomination: '',
    rccm: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephone: '',
    responsableLegal: '',
    adresse: '',
    ville: '',
    pays: 'Gabon'
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
        description: "Votre compte entreprise a été créé avec succès"
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
            <Building2 className="h-12 w-12 text-transport-secondary" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Inscription Entreprise de Transport
          </CardTitle>
          <CardDescription>
            Créez votre compte entreprise pour gérer votre flotte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="denomination">Dénomination sociale</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="denomination"
                  type="text"
                  placeholder="Nom de votre entreprise"
                  value={formData.denomination}
                  onChange={(e) => handleChange('denomination', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rccm">N° RCCM</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="rccm"
                    type="text"
                    placeholder="LBV-2023-B-XXXX"
                    value={formData.rccm}
                    onChange={(e) => handleChange('rccm', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsableLegal">Responsable légal</Label>
                <Input
                  id="responsableLegal"
                  type="text"
                  placeholder="Nom du responsable"
                  value={formData.responsableLegal}
                  onChange={(e) => handleChange('responsableLegal', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email professionnel</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@entreprise.ga"
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

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="adresse"
                    type="text"
                    placeholder="Adresse de l'entreprise"
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

            <Button type="submit" className="w-full bg-transport-secondary hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Création du compte..." : "Créer le compte entreprise"}
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

export default RegisterEntreprise;
