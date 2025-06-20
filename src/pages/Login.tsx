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

    console.log('Soumission du formulaire de connexion');

    try {
      const user = await login(email, password);
      console.log('Résultat de login:', user);

      if (user) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur transport.nzile.ga"
        });

        // Navigation basée sur le type d'utilisateur
        const targetPath = user.type === 'entreprise' ? '/entreprise' : '/mon-espace';
        console.log('Navigation vers:', targetPath);
        navigate(targetPath);
      } else {
        console.log('Connexion échouée - utilisateur non trouvé');
        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la connexion",
        variant: "destructive"
      });
    }
  };

  // Fonction pour remplir automatiquement les champs de démonstration
  const fillDemoAccount = (type: 'entreprise' | 'particulier') => {
    if (type === 'entreprise') {
      setEmail('admin@transport-gabon.ga');
      setPassword('password123');
    } else {
      setEmail('mc.mbadinga@yahoo.fr');
      setPassword('password123');
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <Card className="w-full max-w-md mx-auto animate-fade-in shadow-lg">
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
            <p className="font-medium mb-2">Comptes de démonstration :</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => fillDemoAccount('entreprise')}
                className="w-full text-left p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
              >
                <strong>Entreprise:</strong> admin@transport-gabon.ga / password123
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('particulier')}
                className="w-full text-left p-2 bg-green-50 rounded hover:bg-green-100 transition-colors"
              >
                <strong>Particulier:</strong> mc.mbadinga@yahoo.fr / password123
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
