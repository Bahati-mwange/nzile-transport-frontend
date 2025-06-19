
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileText } from 'lucide-react';

interface ConditionsGeneralesProps {
  accepted: boolean;
  onAcceptedChange: (accepted: boolean) => void;
}

const ConditionsGenerales: React.FC<ConditionsGeneralesProps> = ({ 
  accepted, 
  onAcceptedChange 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Conditions générales d'utilisation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="max-h-48 overflow-y-auto p-4 bg-gray-50 rounded text-sm">
            <h4 className="font-medium mb-3">CONDITIONS GÉNÉRALES D'UTILISATION - TRANSPORT.NZILE.GA</h4>
            
            <div className="space-y-3">
              <div>
                <h5 className="font-medium mb-1">Article 1 - Objet</h5>
                <p>
                  Le présent document définit les conditions générales d'utilisation de la plateforme 
                  transport.nzile.ga pour les demandes de cartes conducteur et chronotachygraphes numériques 
                  au Gabon.
                </p>
              </div>
              
              <div>
                <h5 className="font-medium mb-1">Article 2 - Obligations de l'utilisateur</h5>
                <p>
                  L'utilisateur s'engage à fournir des informations exactes et à jour. Toute fausse 
                  déclaration peut entraîner le rejet de la demande et des poursuites judiciaires.
                </p>
              </div>
              
              <div>
                <h5 className="font-medium mb-1">Article 3 - Traitement des demandes</h5>
                <p>
                  Le délai de traitement des demandes est de 15 jours ouvrables à compter de la réception 
                  du dossier complet avec tous les justificatifs requis.
                </p>
              </div>
              
              <div>
                <h5 className="font-medium mb-1">Article 4 - Frais et paiement</h5>
                <p>
                  Les frais de traitement sont non remboursables en cas de rejet de la demande pour 
                  non-conformité des documents. Le paiement doit être effectué avant le traitement de la demande.
                </p>
              </div>
              
              <div>
                <h5 className="font-medium mb-1">Article 5 - Protection des données</h5>
                <p>
                  Vos données personnelles sont traitées conformément à la législation gabonaise sur 
                  la protection des données personnelles et ne sont utilisées que pour le traitement 
                  de votre demande.
                </p>
              </div>
              
              <div>
                <h5 className="font-medium mb-1">Article 6 - Responsabilité</h5>
                <p>
                  La plateforme transport.nzile.ga ne peut être tenue responsable des retards dus à 
                  des documents incomplets ou non conformes fournis par l'utilisateur.
                </p>
              </div>
              
              <div>
                <h5 className="font-medium mb-1">Article 7 - Modification des conditions</h5>
                <p>
                  Ces conditions peuvent être modifiées à tout moment. Les utilisateurs seront informés 
                  des modifications par email ou notification sur la plateforme.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="conditions-generales" 
              checked={accepted}
              onCheckedChange={(checked) => onAcceptedChange(checked as boolean)}
            />
            <Label htmlFor="conditions-generales" className="text-sm leading-5">
              J'ai lu et j'accepte les conditions générales d'utilisation et la politique de 
              confidentialité de transport.nzile.ga. Je certifie que les informations fournies 
              sont exactes et complètes.
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConditionsGenerales;
