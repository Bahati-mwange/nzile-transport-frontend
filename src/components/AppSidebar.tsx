
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  Home, 
  CreditCard, 
  Users, 
  Truck, 
  Clock, 
  User,
  Settings,
  LogOut,
  Building2,
  FileText,
  Bell,
  HelpCircle,
  Mail,
  Plus
} from 'lucide-react';
import { Button } from './ui/button';

const AppSidebar: React.FC = () => {
  const { currentUser, logout } = useApiData();
  const location = useLocation();

  if (!currentUser) return null;

  const isEntreprise = currentUser.type === 'entreprise';

  const particulierMenuItems = [
    { title: "Tableau de bord", url: "/dashboard", icon: Home },
    { title: "Mes demandes", url: "/mes-demandes", icon: FileText },
    { title: "Nouvelle demande", url: "/mes-demandes/nouvelle", icon: Plus },
    { title: "Notifications", url: "/notifications", icon: Bell },
    { title: "Mon profil", url: "/profil", icon: User },
    { title: "FAQ", url: "/faq", icon: HelpCircle },
    { title: "Contact", url: "/contact", icon: Mail },
  ];

  const entrepriseMenuItems = [
    { title: "Tableau de bord", url: "/entreprise", icon: Home },
    { title: "Mandataires", url: "/entreprise/mandataires", icon: Users },
    { title: "Demandes", url: "/entreprise/demandes", icon: FileText },
    { title: "Entreprises", url: "/entreprise/entreprises", icon: Building2 },
    { title: "Véhicules", url: "/vehicules", icon: Truck },
    { title: "Documents", url: "/entreprise/documents", icon: CreditCard },
    { title: "Sessions", url: "/sessions", icon: Clock },
    { title: "Notifications", url: "/entreprise/notifications", icon: Bell },
    { title: "Profil entreprise", url: "/entreprise/profil", icon: Building2 },
    { title: "FAQ", url: "/faq", icon: HelpCircle },
    { title: "Contact", url: "/contact", icon: Mail },
  ];

  const menuItems = isEntreprise ? entrepriseMenuItems : particulierMenuItems;

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-transport-primary" />
          <div className="min-w-0">
            <h2 className="font-bold text-lg truncate">Transport.nzile.ga</h2>
            <p className="text-sm text-muted-foreground">
              {isEntreprise ? 'Entreprise' : 'Particulier'}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg">
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Actions rapides pour particuliers */}
        {!isEntreprise && (
          <SidebarGroup>
            <SidebarGroupLabel>Actions rapides</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/mes-demandes/nouvelle" className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-600">
                      <Plus className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">Nouvelle demande</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Actions rapides pour entreprises */}
        {isEntreprise && (
          <SidebarGroup>
            <SidebarGroupLabel>Actions rapides</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/chauffeurs/nouveau" className="flex items-center gap-3 px-3 py-2 rounded-lg text-green-600">
                      <Plus className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">Nouveau mandataire</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/vehicules/nouveau" className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-600">
                      <Plus className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">Nouveau véhicule</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-3">
          <div className="text-sm">
            <p className="font-medium truncate">
              {isEntreprise 
                ? (currentUser.profile as any).denomination 
                : `${(currentUser.profile as any).prenom} ${(currentUser.profile as any).nom}`
              }
            </p>
            <p className="text-muted-foreground truncate">{currentUser.email}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start">
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
