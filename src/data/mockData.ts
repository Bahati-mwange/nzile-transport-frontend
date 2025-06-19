
// Données mockées pour la plateforme transport.nzile.ga

export interface Session {
  id: string;
  driverId: string;
  vehicleId: string;
  carteId: string; // Ajout du champ manquant
  dateDebut: string;
  dateFin: string;
  dureeConduite: number; // minutes
  dureeRepos: number; // minutes
  dureeAutre: number; // minutes
  distanceParcourue: number; // km
  vitesseMoyenne: number;
  vitesseMax: number;
  infractions: string[];
  trajetDepart: string;
  trajetArrivee: string;
  activites: SessionActivity[];
  statut: 'en_cours' | 'terminee' | 'suspendue';
}

export interface SessionActivity {
  id: string;
  heure: string;
  type: 'conduite' | 'repos' | 'autre' | 'pause';
  duree: number; // minutes
  vitesse?: number;
  localisation: string;
}

export interface DashboardStats {
  particulier: {
    tempsConduiteTotal: number; // heures ce mois
    tempsRepos: number; // heures ce mois
    infractions: number;
    sessionsCount: number;
    derniereSSession?: Session;
    carteStatut: 'active' | 'expire_bientot' | 'expiree';
    carteExpiration: string;
  };
  entreprise: {
    sessionsAujourdhui: number;
    chauffeursEnLigne: number;
    vehiculesActifs: number;
    tempsConduiteTotal: number; // heures aujourd'hui
    tempsReposTotal: number; // heures aujourd'hui
    infractionsDuJour: number;
    vitesseMoyenne: number;
    alertesCritiques: number;
  };
}

// Sessions mockées détaillées
export const mockSessions: Session[] = [
  {
    id: '1',
    driverId: '1',
    vehicleId: '1',
    carteId: '1',
    dateDebut: '2025-01-19T06:00:00',
    dateFin: '2025-01-19T18:30:00',
    dureeConduite: 450, // 7h30
    dureeRepos: 120, // 2h
    dureeAutre: 180, // 3h
    distanceParcourue: 485,
    vitesseMoyenne: 65,
    vitesseMax: 90,
    infractions: [],
    trajetDepart: 'Libreville',
    trajetArrivee: 'Franceville',
    statut: 'terminee',
    activites: [
      { id: '1-1', heure: '06:00', type: 'conduite', duree: 120, vitesse: 70, localisation: 'Libreville' },
      { id: '1-2', heure: '08:00', type: 'repos', duree: 45, localisation: 'Ndjolé' },
      { id: '1-3', heure: '08:45', type: 'conduite', duree: 180, vitesse: 65, localisation: 'Ndjolé' },
      { id: '1-4', heure: '11:45', type: 'repos', duree: 60, localisation: 'Booué' },
      { id: '1-5', heure: '12:45', type: 'conduite', duree: 150, vitesse: 60, localisation: 'Booué' },
    ]
  },
  {
    id: '2',
    driverId: '2',
    vehicleId: '3',
    carteId: '2',
    dateDebut: '2025-01-19T07:15:00',
    dateFin: '2025-01-19T16:45:00',
    dureeConduite: 330, // 5h30
    dureeRepos: 120, // 2h
    dureeAutre: 120, // 2h
    distanceParcourue: 245,
    vitesseMoyenne: 45,
    vitesseMax: 85,
    infractions: ['Excès de vitesse mineur'],
    trajetDepart: 'Libreville',
    trajetArrivee: 'Lambaréné',
    statut: 'terminee',
    activites: [
      { id: '2-1', heure: '07:15', type: 'conduite', duree: 90, vitesse: 50, localisation: 'Libreville' },
      { id: '2-2', heure: '08:45', type: 'repos', duree: 30, localisation: 'Kango' },
      { id: '2-3', heure: '09:15', type: 'conduite', duree: 120, vitesse: 45, localisation: 'Kango' },
      { id: '2-4', heure: '11:15', type: 'repos', duree: 45, localisation: 'Lambaréné' },
      { id: '2-5', heure: '12:00', type: 'conduite', duree: 120, vitesse: 40, localisation: 'Lambaréné' },
    ]
  },
  {
    id: '3',
    driverId: '1',
    vehicleId: '1',
    carteId: '1',
    dateDebut: '2025-01-20T08:00:00',
    dateFin: '2025-01-20T17:00:00',
    dureeConduite: 300, // 5h
    dureeRepos: 180, // 3h
    dureeAutre: 60, // 1h
    distanceParcourue: 320,
    vitesseMoyenne: 64,
    vitesseMax: 95,
    infractions: ['Excès de vitesse grave'],
    trajetDepart: 'Franceville',
    trajetArrivee: 'Moanda',
    statut: 'terminee',
    activites: [
      { id: '3-1', heure: '08:00', type: 'conduite', duree: 150, vitesse: 70, localisation: 'Franceville' },
      { id: '3-2', heure: '10:30', type: 'repos', duree: 90, localisation: 'Bakoumba' },
      { id: '3-3', heure: '12:00', type: 'conduite', duree: 150, vitesse: 58, localisation: 'Bakoumba' },
    ]
  }
];

// Stats dashboard mockées
export const mockDashboardStats: DashboardStats = {
  particulier: {
    tempsConduiteTotal: 45.5, // heures ce mois
    tempsRepos: 15.2,
    infractions: 2,
    sessionsCount: 8,
    derniereSSession: mockSessions[0],
    carteStatut: 'active',
    carteExpiration: '2028-01-15'
  },
  entreprise: {
    sessionsAujourdhui: 12,
    chauffeursEnLigne: 8,
    vehiculesActifs: 6,
    tempsConduiteTotal: 86.5,
    tempsReposTotal: 28.3,
    infractionsDuJour: 3,
    vitesseMoyenne: 62,
    alertesCritiques: 2
  }
};

// Données pour graphiques
export const mockChartData = {
  tempsConduite: [
    { jour: 'Lun', conduite: 8.5, repos: 2.5 },
    { jour: 'Mar', conduite: 7.2, repos: 3.1 },
    { jour: 'Mer', conduite: 9.1, repos: 2.8 },
    { jour: 'Jeu', conduite: 6.8, repos: 3.5 },
    { jour: 'Ven', conduite: 8.9, repos: 2.2 },
    { jour: 'Sam', conduite: 5.5, repos: 4.0 },
    { jour: 'Dim', conduite: 0, repos: 0 }
  ],
  vitesseSession: [
    { temps: '06:00', vitesse: 0 },
    { temps: '06:30', vitesse: 65 },
    { temps: '07:00', vitesse: 72 },
    { temps: '07:30', vitesse: 68 },
    { temps: '08:00', vitesse: 0 },
    { temps: '08:30', vitesse: 0 },
    { temps: '09:00', vitesse: 58 },
    { temps: '09:30', vitesse: 62 },
    { temps: '10:00', vitesse: 71 },
    { temps: '10:30', vitesse: 69 },
    { temps: '11:00', vitesse: 0 },
  ],
  evolutionDemandes: [
    { mois: 'Jan', validees: 45, enCours: 12, rejetees: 3 },
    { mois: 'Fév', validees: 52, enCours: 8, rejetees: 2 },
    { mois: 'Mar', validees: 38, enCours: 15, rejetees: 5 },
    { mois: 'Avr', validees: 61, enCours: 9, rejetees: 1 },
    { mois: 'Mai', validees: 55, enCours: 11, rejetees: 4 },
    { mois: 'Juin', validees: 48, enCours: 14, rejetees: 2 }
  ]
};

// Alertes critiques pour entreprises
export const mockAlertes = [
  {
    id: '1',
    type: 'temps_depassement',
    message: 'Chauffeur ONDO: temps de conduite dépassé (9h30)',
    gravite: 'critique' as const,
    timestamp: '2025-01-19T15:30:00',
    driverId: '1',
    resolu: false
  },
  {
    id: '2',
    type: 'vitesse_excessive',
    message: 'Véhicule GA-3456-LV: excès de vitesse détecté (95 km/h)',
    gravite: 'moyenne' as const,
    timestamp: '2025-01-19T14:15:00',
    vehicleId: '1',
    resolu: false
  }
];

export const mockVehiculeDetails = {
  '1': {
    prochainControle: '2025-03-15',
    derniereMaintenance: '2024-12-10',
    kilometrage: 89450,
    consommationMoyenne: 28.5, // L/100km
    coutEntretien: 145000 // FCFA
  },
  '2': {
    prochainControle: '2025-05-22',
    derniereMaintenance: '2025-01-05',
    kilometrage: 76230,
    consommationMoyenne: 32.1,
    coutEntretien: 98000
  }
};
