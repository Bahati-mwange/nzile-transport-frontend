
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApiData } from '@/hooks/useApiData';
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from '@/components/LoadingSpinner';
import { Truck, Mail, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useApiData();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const user = await login(email, password);
      if (user) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur transport.nzile.ga"
        });
        navigate(user.type === 'entreprise' ? '/entreprise' : '/mon-espace');
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la connexion",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <LoadingSpinner size="lg" text="Connexion en cours..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Truck className="h-12 w-12 text-transport-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Transport.nzile.ga
          </CardTitle>
          <CardDescription>
            Plateforme de gestion des cartes conducteur et chronotachygraphe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-transport-primary hover:bg-blue-700">
              Se connecter
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-transport-primary hover:underline font-medium">
                S'inscrire
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
            <p className="font-medium mb-1">Comptes de démonstration :</p>
            <p>Entreprise: admin@transport-gabon.ga / password123</p>
            <p>Particulier: mc.mbadinga@yahoo.fr / password123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
