
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, HelpCircle, CreditCard, Clock, FileText, User } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData: FAQItem[] = [
    // Cartes conducteur
    {
      id: '1',
      question: 'Comment faire une demande de carte conducteur ?',
      answer: 'Pour faire une demande de carte conducteur, connectez-vous à votre espace, cliquez sur "Nouvelle demande" et suivez les étapes. Vous devrez fournir vos informations personnelles, vos documents (CNI, permis, photo, certificat médical) et accepter les conditions générales.',
      category: 'cartes'
    },
    {
      id: '2',
      question: 'Quels documents sont nécessaires pour une carte conducteur ?',
      answer: 'Les documents requis sont : une copie de votre CNI (recto-verso), une copie de votre permis de conduire (recto-verso), une photo d\'identité récente sur fond blanc, et un certificat médical délivré par un médecin agréé (moins de 3 mois).',
      category: 'cartes'
    },
    {
      id: '3',
      question: 'Combien de temps faut-il pour obtenir sa carte ?',
      answer: 'Le délai de traitement d\'une demande de carte conducteur est généralement de 10 à 15 jours ouvrables après réception de votre dossier complet. Vous recevrez des notifications par email pour suivre l\'évolution de votre demande.',
      category: 'cartes'
    },
    {
      id: '4',
      question: 'Combien coûte une carte conducteur ?',
      answer: 'Les frais de délivrance d\'une carte conducteur sont de 25 000 FCFA pour une première demande et 20 000 FCFA pour un renouvellement. Les frais de duplicata en cas de perte ou vol sont de 30 000 FCFA.',
      category: 'cartes'
    },
    
    // Chronotachygraphe
    {
      id: '5',
      question: 'Qu\'est-ce qu\'un chronotachygraphe ?',
      answer: 'Le chronotachygraphe est un dispositif obligatoire qui enregistre automatiquement les temps de conduite, les vitesses, les distances parcourues et les périodes de repos des conducteurs professionnels. Il garantit le respect de la réglementation sur les temps de conduite.',
      category: 'chronotachygraphe'
    },
    {
      id: '6',
      question: 'Quels véhicules doivent être équipés d\'un chronotachygraphe ?',
      answer: 'Tous les véhicules de transport de marchandises de plus de 3,5 tonnes de PTAC et les véhicules de transport de voyageurs de plus de 9 places (conducteur inclus) doivent être équipés d\'un chronotachygraphe numérique.',
      category: 'chronotachygraphe'
    },
    {
      id: '7',
      question: 'Comment consulter mes données de chronotachygraphe ?',
      answer: 'Vous pouvez consulter vos données de chronotachygraphe dans la section "Sessions" de votre espace personnel. Les données incluent vos temps de conduite, périodes de repos, distances parcourues et éventuelles infractions détectées.',
      category: 'chronotachygraphe'
    },

    // Compte et profil
    {
      id: '8',
      question: 'Comment modifier mes informations personnelles ?',
      answer: 'Pour modifier vos informations personnelles, rendez-vous dans la section "Profil" de votre espace. Vous pouvez y mettre à jour votre adresse, numéro de téléphone et autres informations. Certaines modifications peuvent nécessiter une validation.',
      category: 'compte'
    },
    {
      id: '9',
      question: 'J\'ai oublié mon mot de passe, que faire ?',
      answer: 'Sur la page de connexion, cliquez sur "Mot de passe oublié", saisissez votre adresse email et vous recevrez un lien pour créer un nouveau mot de passe. Si vous ne recevez pas l\'email, vérifiez vos spams.',
      category: 'compte'
    },
    {
      id: '10',
      question: 'Comment supprimer mon compte ?',
      answer: 'Pour supprimer votre compte, contactez notre service client à l\'adresse support@transport.nzile.ga en précisant votre demande. Attention : cette action est irréversible et entraînera la perte de toutes vos données.',
      category: 'compte'
    },

    // Problèmes techniques
    {
      id: '11',
      question: 'Je n\'arrive pas à télécharger ma carte, que faire ?',
      answer: 'Vérifiez d\'abord que votre carte a bien été validée. Si c\'est le cas, essayez avec un autre navigateur ou videz le cache de votre navigateur. Si le problème persiste, contactez notre support technique.',
      category: 'technique'
    },
    {
      id: '12',
      question: 'Le site ne fonctionne pas correctement sur mobile',
      answer: 'Notre site est optimisé pour mobile. Si vous rencontrez des problèmes, assurez-vous d\'utiliser la dernière version de votre navigateur mobile. Pour une meilleure expérience, nous recommandons Chrome ou Safari.',
      category: 'technique'
    }
  ];

  const categories = [
    { id: 'all', label: 'Toutes les questions', icon: HelpCircle },
    { id: 'cartes', label: 'Cartes conducteur', icon: CreditCard },
    { id: 'chronotachygraphe', label: 'Chronotachygraphe', icon: Clock },
    { id: 'compte', label: 'Compte et profil', icon: User },
    { id: 'technique', label: 'Problèmes techniques', icon: FileText }
  ];

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout title="Foire aux questions">
      <div className="space-y-6">
        {/* En-tête */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Centre d'aide</h2>
          <p className="text-muted-foreground mt-2">
            Trouvez rapidement des réponses à vos questions les plus fréquentes
          </p>
        </div>

        {/* Recherche */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans la FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Catégories */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedCategory === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="flex items-center gap-3 p-4">
                  <Icon className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">{category.label}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Questions et réponses */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedCategory === 'all' 
                ? `Toutes les questions (${filteredFAQ.length})`
                : `${categories.find(c => c.id === selectedCategory)?.label} (${filteredFAQ.length})`
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFAQ.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQ.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Aucune question ne correspond à votre recherche
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Aide supplémentaire */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Vous ne trouvez pas votre réponse ?</h3>
              <p className="text-muted-foreground mb-4">
                Notre équipe support est là pour vous aider
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Card className="p-4 bg-white">
                  <div className="text-center">
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-muted-foreground">support@transport.nzile.ga</p>
                  </div>
                </Card>
                <Card className="p-4 bg-white">
                  <div className="text-center">
                    <h4 className="font-medium">Téléphone</h4>
                    <p className="text-sm text-muted-foreground">+241 01 23 45 67</p>
                  </div>
                </Card>
                <Card className="p-4 bg-white">
                  <div className="text-center">
                    <h4 className="font-medium">Horaires</h4>
                    <p className="text-sm text-muted-foreground">Lun-Ven 8h-17h</p>
                  </div>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default FAQ;
