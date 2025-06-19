
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Truck, 
  CreditCard, 
  Clock, 
  Shield, 
  Users, 
  Building2,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-transport-primary mr-3" />
              <span className="text-xl font-bold text-gray-900">Transport.nzile.ga</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-transport-primary hover:bg-blue-700">
                  S'inscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Gestion des Cartes Conducteur
              <span className="block text-transport-primary">& Chronotachygraphe</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Plateforme officielle gabonaise pour la gestion des cartes de conducteur 
              et le suivi des sessions chronotachygraphe pour les entreprises de transport 
              et les chauffeurs particuliers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-transport-primary hover:bg-blue-700">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-transport-primary mb-2">100%</div>
              <p className="text-gray-600">Conforme aux réglementations gabonaises</p>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-transport-secondary mb-2">24/7</div>
              <p className="text-gray-600">Service disponible en continu</p>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-transport-primary mb-2">Sécurisé</div>
              <p className="text-gray-600">Données protégées et cryptées</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités principales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une solution complète pour la gestion du transport professionnel au Gabon
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="animate-fade-in hover:shadow-lg transition-shadow">
              <CardHeader>
                <CreditCard className="h-12 w-12 text-transport-primary mb-4" />
                <CardTitle>Cartes Conducteur</CardTitle>
                <CardDescription>
                  Demande, renouvellement et gestion des cartes conducteur officielles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Demandes en ligne
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Suivi du statut
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Téléchargement sécurisé
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-fade-in hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-transport-secondary mb-4" />
                <CardTitle>Chronotachygraphe</CardTitle>
                <CardDescription>
                  Enregistrement et analyse des sessions de conduite
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Sessions automatiques
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Détection d'infractions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Rapports détaillés
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-fade-in hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building2 className="h-12 w-12 text-transport-primary mb-4" />
                <CardTitle>Gestion Entreprise</CardTitle>
                <CardDescription>
                  Tableau de bord complet pour les entreprises de transport
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Multi-chauffeurs
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Gestion de flotte
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Analytics avancés
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-transport-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à démarrer ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez les professionnels du transport qui font confiance à notre plateforme
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register/entreprise">
              <Button size="lg" className="bg-white text-transport-primary hover:bg-gray-100">
                <Building2 className="mr-2 h-5 w-5" />
                Compte Entreprise
              </Button>
            </Link>
            <Link to="/register/particulier">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-transport-primary">
                <Users className="mr-2 h-5 w-5" />
                Compte Particulier
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-transport-primary mr-3" />
                <span className="text-xl font-bold">Transport.nzile.ga</span>
              </div>
              <p className="text-gray-400">
                Plateforme officielle gabonaise de gestion des cartes conducteur 
                et du chronotachygraphe.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register" className="hover:text-white">S'inscrire</Link></li>
                <li><Link to="/login" className="hover:text-white">Se connecter</Link></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: contact@transport.nzile.ga</li>
                <li>Tél: +241-01-00-00-00</li>
                <li>Adresse: Libreville, Gabon</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Transport.nzile.ga - Tous droits réservés</p>
            <p className="mt-2">
              🔒 Synchronisation sécurisée avec{' '}
              <span className="text-transport-primary font-semibold">nzile.ga</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
