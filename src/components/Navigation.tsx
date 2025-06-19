
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useApiData } from '@/hooks/useApiData';
import { 
  Home, 
  CreditCard, 
  Building2, 
  Users, 
  Truck, 
  Clock, 
  LogOut,
  User,
  Menu
} from 'lucide-react';

const Navigation: React.FC = () => {
  const { currentUser, logout } = useApiData();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentUser) return null;

  const isEntreprise = currentUser.type === 'entreprise';
  const isParticulier = currentUser.type === 'particulier';

  const navigationItems = [
    { 
      path: isEntreprise ? '/entreprise' : '/mon-espace', 
      label: 'Tableau de bord', 
      icon: Home 
    },
    { 
      path: '/cartes', 
      label: 'Cartes conducteur', 
      icon: CreditCard 
    },
    { 
      path: '/sessions', 
      label: 'Sessions chronotachygraphe', 
      icon: Clock 
    },
    ...(isEntreprise ? [
      { path: '/chauffeurs', label: 'Chauffeurs', icon: Users },
      { path: '/vehicules', label: 'Véhicules', icon: Truck }
    ] : [])
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={isEntreprise ? '/entreprise' : '/mon-espace'} className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Truck className="h-8 w-8 text-transport-primary mr-2" />
                <span className="font-bold text-xl text-gray-900">Transport.nzile.ga</span>
              </div>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-transport-primary bg-blue-50'
                        : 'text-gray-600 hover:text-transport-primary hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-1" />
              {isEntreprise ? 
                (currentUser.profile as any).denomination : 
                `${(currentUser.profile as any).prenom} ${(currentUser.profile as any).nom}`
              }
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
