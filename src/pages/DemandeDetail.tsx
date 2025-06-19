
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApiData } from '@/hooks/useApiData';
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Edit, 
  Calendar,
  User,
  ArrowLeft,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const DemandeDetail: React.FC = () => {
  const { id } = useParams();
  const { currentUser, getDriverCardById, getDriverById } = useApiData();
  const [demande, setDemande] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadDemande();
  }, [id]);

  const loadDemande = async () => {
    if (!id) return;
    
    // Simulation des données de demande
    const mockDemande = {
      id,
      numero: `DEM-2024-${id?.padStart(4, '0')}`,
      type: 'carte_conducteur',
      statut: 'en_cours',
      dateCreation: '2024-01-15',
      dateMiseAJour: '2024-01-20',
      conducteur: {
        nom: 'ONDO',
        prenom: 'Jean-Baptiste',
        dateNaissance: '1985-03-15',
        lieuNaissance: 'Libreville',
        pieceIdentite: 'CNI',
        numeroPiece: '173456789',
        telephone: '+241-01-23-45-67',
        email: 'jb.ondo@gmail.com',
        adresse: 'Quartier Glass, Libreville'
      },
      documents: [
        { nom: 'CNI recto-verso', type: 'piece_identite', statut: 'valide' },
        { nom: 'Permis de conduire', type: 'permis', statut: 'valide' },
        { nom: 'Photo d\'identité', type: 'photo', statut: 'valide' },
        { nom: 'Certificat médical', type: 'medical', statut: 'en_attente' }
      ],
      facture: {
        montant: 25000,
        devise: 'XAF',
        statut: 'en_attente'
      }
    };
    
    setDemande(mockDemande);
    setLoading(false);
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'en_cours':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />En cours</Badge>;
      case 'validee':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Validée</Badge>;
      case 'rejetee':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejetée</Badge>;
      default:
        return <Badge variant="outline">{statut}</Badge>;
    }
  };

  const getDocumentStatutBadge = (statut: string) => {
    switch (statut) {
      case 'valide':
        return <Badge variant="default" className="text-xs">Valide</Badge>;
      case 'en_attente':
        return <Badge variant="secondary" className="text-xs">En attente</Badge>;
      case 'refuse':
        return <Badge variant="destructive" className="text-xs">Refusé</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{statut}</Badge>;
    }
  };

  if (loading) {
    return <PageLayout title="Détail de la demande"><div>Chargement...</div></PageLayout>;
  }

  if (!demande) {
    return <PageLayout title="Demande introuvable"><div>Demande non trouvée</div></PageLayout>;
  }

  return (
    <PageLayout title={`Demande ${demande.numero}`}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          {getStatutBadge(demande.statut)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Informations de la demande
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-700">Numéro</p>
                    <p className="text-gray-900">{demande.numero}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Type</p>
                    <p className="text-gray-900 capitalize">{demande.type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Date de création</p>
                    <p className="text-gray-900">{new Date(demande.dateCreation).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Dernière mise à jour</p>
                    <p className="text-gray-900">{new Date(demande.dateMiseAJour).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations du conducteur */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-700">Nom complet</p>
                    <p className="text-gray-900">{demande.conducteur.prenom} {demande.conducteur.nom}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Date de naissance</p>
                    <p className="text-gray-900">{new Date(demande.conducteur.dateNaissance).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Lieu de naissance</p>
                    <p className="text-gray-900">{demande.conducteur.lieuNaissance}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Pièce d'identité</p>
                    <p className="text-gray-900">{demande.conducteur.pieceIdentite} - {demande.conducteur.numeroPiece}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Téléphone</p>
                    <p className="text-gray-900">{demande.conducteur.telephone}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <p className="text-gray-900">{demande.conducteur.email}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="font-medium text-gray-700">Adresse</p>
                    <p className="text-gray-900">{demande.conducteur.adresse}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Justificatifs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {demande.documents.map((doc: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                        <div>
                          <span className="text-sm font-medium">{doc.nom}</span>
                          <div className="mt-1">
                            {getDocumentStatutBadge(doc.statut)}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Télécharger
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Actions et Facture */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier la demande
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger le dossier
                </Button>
              </CardContent>
            </Card>

            {/* Facture */}
            <Card>
              <CardHeader>
                <CardTitle>Facture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Montant</span>
                    <span className="font-medium">{demande.facture.montant.toLocaleString()} {demande.facture.devise}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut</span>
                    <Badge variant={demande.facture.statut === 'payee' ? 'default' : 'secondary'}>
                      {demande.facture.statut === 'payee' ? 'Payée' : 'En attente'}
                    </Badge>
                  </div>
                  {demande.facture.statut === 'en_attente' && (
                    <Button className="w-full">
                      Procéder au paiement
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DemandeDetail;
