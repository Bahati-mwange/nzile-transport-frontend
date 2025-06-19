
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface Alerte {
  id: string;
  type: string;
  message: string;
  gravite: 'critique' | 'moyenne' | 'faible';
  timestamp: string;
  resolu: boolean;
}

interface AlertesCritiquesProps {
  alertes: Alerte[];
  onResoudre?: (id: string) => void;
}

const AlertesCritiques: React.FC<AlertesCritiquesProps> = ({ alertes, onResoudre }) => {
  const getGraviteColor = (gravite: string) => {
    switch (gravite) {
      case 'critique': return 'bg-red-100 text-red-800 border-red-200';
      case 'moyenne': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'faible': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIcon = (gravite: string) => {
    switch (gravite) {
      case 'critique': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'moyenne': return <Clock className="h-4 w-4 text-orange-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const alertesNonResolues = alertes.filter(a => !a.resolu);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          Alertes critiques
          {alertesNonResolues.length > 0 && (
            <Badge variant="destructive">{alertesNonResolues.length}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alertesNonResolues.length > 0 ? (
            alertesNonResolues.map((alerte) => (
              <div key={alerte.id} className="flex items-start gap-3 p-3 border rounded-lg bg-gray-50">
                {getIcon(alerte.gravite)}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className={getGraviteColor(alerte.gravite)}>
                      {alerte.gravite}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(alerte.timestamp).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{alerte.message}</p>
                </div>
                {onResoudre && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onResoudre(alerte.id)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Aucune alerte critique</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertesCritiques;
