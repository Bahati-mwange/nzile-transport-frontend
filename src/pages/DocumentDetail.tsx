
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  ArrowLeft,
  Eye,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const DocumentDetail: React.FC = () => {
  const { id } = useParams();
  const [document, setDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDocument();
  }, [id]);

  const loadDocument = async () => {
    if (!id) return;
    
    // Simulation des données de document
    const mockDocument = {
      id,
      nom: 'Permis de conduire - Jean-Baptiste ONDO',
      type: 'permis_conduire',
      statut: 'valide',
      dateUpload: '2024-01-15',
      dateValidation: '2024-01-18',
      taille: '2.5 MB',
      format: 'PDF',
      proprietaire: {
        nom: 'ONDO',
        prenom: 'Jean-Baptiste',
        email: 'jb.ondo@gmail.com'
      },
      validateur: {
        nom: 'Service Validation',
        date: '2024-01-18'
      },
      commentaire: 'Document conforme aux exigences réglementaires.'
    };
    
    setDocument(mockDocument);
    setLoading(false);
  };

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'valide':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Validé</Badge>;
      case 'en_attente':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />En attente</Badge>;
      case 'refuse':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Refusé</Badge>;
      default:
        return <Badge variant="outline">{statut}</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'permis_conduire': 'Permis de conduire',
      'piece_identite': 'Pièce d\'identité',
      'certificat_medical': 'Certificat médical',
      'photo_identite': 'Photo d\'identité',
      'carte_conducteur': 'Carte conducteur',
      'attestation_formation': 'Attestation de formation'
    };
    return types[type] || type;
  };

  if (loading) {
    return <PageLayout title="Détail du document"><div>Chargement...</div></PageLayout>;
  }

  if (!document) {
    return <PageLayout title="Document introuvable"><div>Document non trouvé</div></PageLayout>;
  }

  return (
    <PageLayout title="Détail du document">
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
          {getStatutBadge(document.statut)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Informations du document
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700">Nom du document</p>
                  <p className="text-gray-900 text-lg">{document.nom}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-700">Type</p>
                    <p className="text-gray-900">{getTypeLabel(document.type)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Format</p>
                    <p className="text-gray-900">{document.format}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Taille</p>
                    <p className="text-gray-900">{document.taille}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Date d'upload</p>
                    <p className="text-gray-900">{new Date(document.dateUpload).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Propriétaire */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Propriétaire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{document.proprietaire.prenom} {document.proprietaire.nom}</p>
                  <p className="text-gray-600">{document.proprietaire.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Validation */}
            {document.statut === 'valide' && document.validateur && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Validation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium text-gray-700">Validé par</p>
                      <p className="text-gray-900">{document.validateur.nom}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Date de validation</p>
                      <p className="text-gray-900">{new Date(document.validateur.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    {document.commentaire && (
                      <div>
                        <p className="font-medium text-gray-700">Commentaire</p>
                        <p className="text-gray-900">{document.commentaire}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Prévisualisation */}
            <Card>
              <CardHeader>
                <CardTitle>Prévisualisation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Prévisualisation du document {document.format}
                  </p>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Ouvrir en plein écran
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Actions */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
                <Button className="w-full" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualiser
                </Button>
                {document.statut === 'en_attente' && (
                  <>
                    <Button className="w-full" variant="default">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Valider
                    </Button>
                    <Button className="w-full" variant="destructive">
                      <XCircle className="h-4 w-4 mr-2" />
                      Refuser
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Informations techniques */}
            <Card>
              <CardHeader>
                <CardTitle>Informations techniques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Format</span>
                  <span className="font-medium">{document.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taille</span>
                  <span className="font-medium">{document.taille}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pages</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Résolution</span>
                  <span className="font-medium">300 DPI</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DocumentDetail;
