
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from '@/components/PageLayout';
import { 
  Plus, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Bell,
  TrendingUp,
  Calendar
} from 'lucide-react';

const DashboardParticulier: React.FC = () => {
  // Données de démonstration
  const stats = {
    enCours: 3,
    terminees: 12,
    rejetees: 1,
    total: 16
  };

  const recentDemandes = [
    {
      id: 1,
      numero: "CT-2025-001",
      type: "Carte Conducteur",
      statut: "En cours",
      dateCreation: "2025-01-15",
      etapeActuelle: "Vérification documents"
    },
    {
      id: 2,
      numero: "CH-2025-002", 
      type: "Chronotachygraphe",
      statut: "Validée",
      dateCreation: "2025-01-10",
      etapeActuelle: "Terminé"
    },
    {
      id: 3,
      numero: "CT-2024-045",
      type: "Carte Conducteur",
      statut: "Rejetée",
      dateCreation: "2024-12-20",
      etapeActuelle: "Document non conforme"
    }
  ];

  const notifications = [
    {
      id: 1,
      message: "Votre demande CT-2025-001 nécessite un document complémentaire",
      type: "attention",
      date: "Il y a 2 heures"
    },
    {
      id: 2,
      message: "Demande CH-2025-002 validée avec succès",
      type: "success",
      date: "Hier"
    }
  ];

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'En cours':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">🟠 En cours</Badge>;
      case 'Validée':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">🟢 Validée</Badge>;
      case 'Rejetée':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">🔴 Rejetée</Badge>;
      default:
        return <Badge variant="secondary">{statut}</Badge>;
    }
  };

  const actionButton = (
    <Link to="/mes-demandes/nouvelle">
      <Button className="bg-transport-primary hover:bg-blue-700">
        <Plus className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Nouvelle demande</span>
        <span className="sm:hidden">Nouvelle</span>
      </Button>
    </Link>
  );

  return (
    <PageLayout title="Tableau de bord" actions={actionButton}>
      <div className="space-y-6">
        {/* Statistiques principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En cours</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.enCours}</div>
              <p className="text-xs text-muted-foreground">demandes actives</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Terminées</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.terminees}</div>
              <p className="text-xs text-muted-foreground">validées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejetées</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejetees}</div>
              <p className="text-xs text-muted-foreground">à reprendre</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <p className="text-xs text-muted-foreground">demandes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Demandes récentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Mes demandes récentes
                </span>
                <Link to="/mes-demandes">
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentDemandes.map((demande) => (
                <div key={demande.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{demande.numero}</span>
                      {getStatutBadge(demande.statut)}
                    </div>
                    <p className="text-sm text-gray-600">{demande.type}</p>
                    <p className="text-xs text-gray-500">{demande.etapeActuelle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {demande.dateCreation}
                    </span>
                    <Link to={`/mes-demandes/${demande.id}`}>
                      <Button variant="ghost" size="sm">
                        Voir
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications récentes
                </span>
                <Link to="/notifications">
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-1">{notif.message}</p>
                  <p className="text-xs text-gray-500">{notif.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Accédez rapidement aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/mes-demandes/nouvelle">
                <Button variant="outline" className="w-full h-20 flex-col gap-2">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Nouvelle demande</span>
                </Button>
              </Link>
              <Link to="/mes-demandes">
                <Button variant="outline" className="w-full h-20 flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Mes demandes</span>
                </Button>
              </Link>
              <Link to="/profil">
                <Button variant="outline" className="w-full h-20 flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Mon profil</span>
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="w-full h-20 flex-col gap-2">
                  <Bell className="h-6 w-6" />
                  <span className="text-sm">Support</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DashboardParticulier;
