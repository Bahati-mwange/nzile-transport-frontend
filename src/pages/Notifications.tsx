
import React, { useState } from 'react';
import { useApiData } from '@/hooks/useApiData';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, CheckCircle, AlertCircle, Info, Trash2, MarkAsUnread } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actions?: { label: string; href: string }[];
}

const Notifications: React.FC = () => {
  const { currentUser, isInitialized } = useApiData();
  const [filter, setFilter] = useState('all');
  
  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Carte conducteur validée',
      message: 'Votre carte conducteur GAB-2023-005678 a été validée avec succès. Vous pouvez maintenant la télécharger.',
      type: 'success',
      isRead: false,
      createdAt: '2024-01-15T10:30:00',
      actions: [{ label: 'Télécharger', href: '/cartes/1' }]
    },
    {
      id: '2',
      title: 'Document manquant',
      message: 'Votre demande nécessite un document complémentaire : certificat médical récent (moins de 3 mois).',
      type: 'warning',
      isRead: false,
      createdAt: '2024-01-14T14:15:00',
      actions: [{ label: 'Compléter', href: '/mes-demandes/2' }]
    },
    {
      id: '3',
      title: 'Rappel d\'expiration',
      message: 'Votre carte conducteur GAB-2020-001234 expire dans 30 jours. Pensez à faire votre demande de renouvellement.',
      type: 'info',
      isRead: true,
      createdAt: '2024-01-13T09:00:00',
      actions: [{ label: 'Renouveler', href: '/mes-demandes/nouvelle' }]
    },
    {
      id: '4',
      title: 'Demande rejetée',
      message: 'Votre demande a été rejetée en raison d\'un document illisible. Veuillez soumettre une nouvelle photo de votre permis.',
      type: 'error',
      isRead: true,
      createdAt: '2024-01-12T16:45:00',
      actions: [{ label: 'Corriger', href: '/mes-demandes/3' }]
    },
    {
      id: '5',
      title: 'Maintenance programmée',
      message: 'Une maintenance est prévue ce dimanche de 2h à 6h. Les services seront temporairement indisponibles.',
      type: 'info',
      isRead: true,
      createdAt: '2024-01-11T12:00:00'
    }
  ];

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement des notifications..." />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <PageLayout title="Accès refusé">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Vous devez être connecté pour voir vos notifications</p>
        </div>
      </PageLayout>
    );
  }

  const filteredNotifications = mockNotifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    if (filter !== 'all') return notification.type === filter;
    return true;
  });

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Succès</Badge>;
      case 'warning':
        return <Badge className="bg-orange-100 text-orange-800">Attention</Badge>;
      case 'error':
        return <Badge variant="destructive">Erreur</Badge>;
      default:
        return <Badge variant="outline">Information</Badge>;
    }
  };

  return (
    <PageLayout title="Notifications">
      <div className="space-y-6">
        {/* En-tête avec statistiques */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Bell className="h-6 w-6" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                </Badge>
              )}
            </h2>
            <p className="text-muted-foreground">
              Restez informé de l'évolution de vos demandes et des actualités
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Marquer tout comme lu
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-1" />
              Effacer lues
            </Button>
          </div>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrer par..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les notifications</SelectItem>
                  <SelectItem value="unread">Non lues ({unreadCount})</SelectItem>
                  <SelectItem value="read">Lues</SelectItem>
                  <SelectItem value="success">Succès</SelectItem>
                  <SelectItem value="warning">Attention</SelectItem>
                  <SelectItem value="error">Erreurs</SelectItem>
                  <SelectItem value="info">Informations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des notifications */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`${!notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''}`}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-semibold ${!notification.isRead ? 'text-blue-900' : ''}`}>
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{new Date(notification.createdAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</span>
                            {getNotificationBadge(notification.type)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            {notification.isRead ? (
                              <MarkAsUnread className="h-4 w-4" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {notification.actions && (
                        <div className="flex gap-2 pt-2">
                          {notification.actions.map((action, index) => (
                            <Button key={index} size="sm" variant="outline">
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {filter === 'unread' 
                    ? "Aucune notification non lue" 
                    : filter === 'all'
                    ? "Aucune notification"
                    : "Aucune notification dans cette catégorie"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Notifications;
