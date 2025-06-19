
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, MessageSquare, HelpCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    type: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais."
      });
      
      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        type: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi de votre message",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <PageLayout title="Contact">
      <div className="space-y-6">
        {/* En-tête */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Contactez-nous</h2>
          <p className="text-muted-foreground mt-2">
            Notre équipe est là pour vous accompagner dans vos démarches
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Informations de contact */}
          <div className="space-y-6">
            {/* Coordonnées */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Coordonnées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">support@transport.nzile.ga</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-sm text-muted-foreground">+241 01 23 45 67</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-sm text-muted-foreground">
                      Boulevard de l'Indépendance<br />
                      Immeuble CCJA<br />
                      Libreville, Gabon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Horaires */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horaires d'ouverture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Lundi - Vendredi</span>
                  <span className="text-sm font-medium">8h00 - 17h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Samedi</span>
                  <span className="text-sm font-medium">8h00 - 12h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Dimanche</span>
                  <span className="text-sm text-muted-foreground">Fermé</span>
                </div>
              </CardContent>
            </Card>

            {/* Aide rapide */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Besoin d'aide immédiate ?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Consultez notre FAQ pour des réponses rapides aux questions courantes.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/faq">Consulter la FAQ</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Envoyez-nous un message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nom">Nom complet</Label>
                      <Input
                        id="nom"
                        value={formData.nom}
                        onChange={(e) => handleChange('nom', e.target.value)}
                        placeholder="Votre nom et prénom"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telephone">Téléphone (optionnel)</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => handleChange('telephone', e.target.value)}
                        placeholder="+241-XX-XX-XX-XX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type de demande</Label>
                      <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="question">Question générale</SelectItem>
                          <SelectItem value="technique">Problème technique</SelectItem>
                          <SelectItem value="carte">Carte conducteur</SelectItem>
                          <SelectItem value="chronotachygraphe">Chronotachygraphe</SelectItem>
                          <SelectItem value="compte">Gestion de compte</SelectItem>
                          <SelectItem value="reclamation">Réclamation</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="sujet">Sujet</Label>
                    <Input
                      id="sujet"
                      value={formData.sujet}
                      onChange={(e) => handleChange('sujet', e.target.value)}
                      placeholder="Résumé de votre demande"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Décrivez votre demande en détail..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800">
                      <strong>Temps de réponse :</strong> Nous répondons généralement sous 24h en jours ouvrables. 
                      Pour les demandes urgentes, appelez-nous directement au +241 01 23 45 67.
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Services disponibles */}
        <Card>
          <CardHeader>
            <CardTitle>Services disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Cartes conducteur</h3>
                <p className="text-sm text-muted-foreground">
                  Aide pour vos demandes, renouvellements et questions sur les cartes conducteur
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Chronotachygraphe</h3>
                <p className="text-sm text-muted-foreground">
                  Support technique et réglementaire pour les dispositifs chronotachygraphe
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <HelpCircle className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Support technique</h3>
                <p className="text-sm text-muted-foreground">
                  Assistance pour l'utilisation de la plateforme et résolution des problèmes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Contact;
