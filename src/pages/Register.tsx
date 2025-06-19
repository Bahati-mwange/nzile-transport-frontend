
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, User, Truck } from 'lucide-react';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Truck className="h-16 w-16 text-transport-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Créer un compte
          </h1>
          <p className="text-gray-600">
            Choisissez le type de compte qui correspond à votre profil
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <Building2 className="h-16 w-16 text-transport-secondary group-hover:scale-110 transition-transform" />
              </div>
              <CardTitle className="text-xl text-gray-900">
                Entreprise de transport
              </CardTitle>
              <CardDescription>
                Pour les sociétés de transport, gestionnaires de flotte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">Fonctionnalités incluses :</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Gestion multi-chauffeurs</li>
                  <li>• Tableau de bord complet</li>
                  <li>• Gestion de la flotte</li>
                  <li>• Supervision des sessions</li>
                  <li>• Rapports détaillés</li>
                </ul>
              </div>
              <Link to="/register/entreprise" className="block">
                <Button className="w-full bg-transport-secondary hover:bg-green-700">
                  Créer un compte entreprise
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <User className="h-16 w-16 text-transport-primary group-hover:scale-110 transition-transform" />
              </div>
              <CardTitle className="text-xl text-gray-900">
                Chauffeur particulier
              </CardTitle>
              <CardDescription>
                Pour les conducteurs professionnels indépendants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">Fonctionnalités incluses :</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Gestion carte conducteur</li>
                  <li>• Suivi des sessions</li>
                  <li>• Téléchargement des rapports</li>
                  <li>• Historique de conduite</li>
                  <li>• Alertes d'expiration</li>
                </ul>
              </div>
              <Link to="/register/particulier" className="block">
                <Button className="w-full bg-transport-primary hover:bg-blue-700">
                  Créer un compte particulier
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="text-transport-primary hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
