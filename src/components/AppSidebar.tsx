
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
  Building2
} from 'lucide-react';
import { Button } from './ui/button';

const AppSidebar: React.FC = () => {
  const { currentUser, logout } = useApiData();
  const location = useLocation();

  if (!currentUser) return null;

  const isEntreprise = currentUser.type === 'entreprise';

  const entrepriseMenuItems = [
    { title: "Tableau de bord", url: "/entreprise", icon: Home },
    { title: "Chauffeurs", url: "/chauffeurs", icon: Users },
    { title: "Véhicules", url: "/vehicules", icon: Truck },
    { title: "Cartes conducteur", url: "/cartes", icon: CreditCard },
    { title: "Sessions", url: "/sessions", icon: Clock },
    { title: "Profil", url: "/profil", icon: Settings },
  ];

  const particulierMenuItems = [
    { title: "Mon espace", url: "/mon-espace", icon: Home },
    { title: "Mes cartes", url: "/cartes", icon: CreditCard },
    { title: "Mes sessions", url: "/sessions", icon: Clock },
    { title: "Mon profil", url: "/profil", icon: User },
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
          <div>
            <h2 className="font-bold text-lg">Transport.nzile.ga</h2>
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
                      <Link to={item.url}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p className="font-medium">
              {isEntreprise 
                ? (currentUser.profile as any).denomination 
                : `${(currentUser.profile as any).prenom} ${(currentUser.profile as any).nom}`
              }
            </p>
            <p className="text-muted-foreground">{currentUser.email}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
