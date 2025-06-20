import type { Vehicle } from '@/hooks/useApiData';

export interface Session {
  id: string;
  driverId: string;
  driverName: string;
  vehicleId: string;
  vehicleName: string;
  carteId: string;
  dateDebut: string;
  dateFin: string;
  dureeConduite: number;
  dureeRepos: number;
  distanceParcourue: number;
  vitesseMoyenne: number;
  vitesseMax: number;
  infractions: string[];
  trajetDepart: string;
  trajetArrivee: string;
  conducteurs?: {
    principal: string;
    secondaire?: string;
  };
}

export interface DashboardStats {
  particulier: {
    totalCartes: number;
    cartesValidees: number;
    cartesEnAttente: number;
    cartesExpirees: number;
    prochainExpiration: string;
    carteStatut: 'active' | 'expire_bientot' | 'expiree' | 'aucune';
    carteExpiration: string;
    tempsConduiteTotal: number;
    tempsRepos: number;
    infractions: number;
    sessionsCount: number;
  };
  entreprise: {
    totalConducteurs: number;
    totalVehicules: number;
    totalCartes: number;
    sessionsAujourdhui: number;
    alertesActives: number;
    alertesCritiques: number;
    chauffeursEnLigne: number;
    vehiculesActifs: number;
    vitesseMoyenne: number;
    tempsConduiteTotal: number;
    tempsReposTotal: number;
    infractionsDuJour: number;
  };
}

export interface Alerte {
  id: string;
  type: string;
  titre: string;
  description: string;
  message: string;
  timestamp: string;
  vehicule?: string;
  conducteur?: string;
  gravite: 'critique' | 'warning' | 'info';
  resolu: boolean;
}

// Interface pour les données de sessions chronotachygraphe
export interface ChronoData {
  id: string;
  timestamp: string;
  driverId: string;
  vehicleId: string;
  actionType: 'conduite' | 'pause' | 'arret';
  duration: number; // en minutes
  speed?: number; // km/h
  locationStart: string;
  locationEnd?: string;
  violationType?: string;
}

// Nouvelle interface pour les sessions de conduite avec toutes les propriétés nécessaires
export interface ChronoSessionData {
  id: string;
  date: string;
  driverId: string;
  vehicleId: string;
  typeConduite: 'solo' | 'partage';
  tempsConduite: number;
  distance: number;
  vitesseMoyenne: number;
  infractions: number;
  statut: 'valide' | 'anomalie';
}

export const mockSessions: Session[] = [
  {
    id: '1',
    driverId: '1',
    driverName: 'Jean-Baptiste ONDO',
    vehicleId: '1',
    vehicleName: 'Mercedes-Benz Actros',
    carteId: '1',
    dateDebut: '2024-01-15T06:00:00Z',
    dateFin: '2024-01-15T14:30:00Z',
    dureeConduite: 480,
    dureeRepos: 30,
    distanceParcourue: 420,
    vitesseMoyenne: 68,
    vitesseMax: 85,
    infractions: ['Excès de vitesse mineur'],
    trajetDepart: 'Libreville',
    trajetArrivee: 'Port-Gentil',
    conducteurs: {
      principal: 'Jean-Baptiste ONDO',
      secondaire: 'Paul-Henri NZIGOU'
    }
  },
  {
    id: '2',
    driverId: '2',
    driverName: 'Marie-Claire MBADINGA',
    vehicleId: '3',
    vehicleName: 'Toyota Hiace',
    carteId: '2',
    dateDebut: '2024-01-16T08:00:00Z',
    dateFin: '2024-01-16T12:00:00Z',
    dureeConduite: 240,
    dureeRepos: 0,
    distanceParcourue: 180,
    vitesseMoyenne: 45,
    vitesseMax: 60,
    infractions: [],
    trajetDepart: 'Libreville Centre',
    trajetArrivee: 'Akanda',
    conducteurs: {
      principal: 'Marie-Claire MBADINGA'
    }
  },
  {
    id: '3',
    driverId: '3',
    driverName: 'Paul-Henri NZIGOU',
    vehicleId: '2',
    vehicleName: 'Volvo FH16',
    carteId: '3',
    dateDebut: '2024-01-17T05:30:00Z',
    dateFin: '2024-01-17T16:00:00Z',
    dureeConduite: 540,
    dureeRepos: 90,
    distanceParcourue: 650,
    vitesseMoyenne: 72,
    vitesseMax: 90,
    infractions: ['Conduite continue excessive', 'Temps de repos insuffisant'],
    trajetDepart: 'Port-Gentil',
    trajetArrivee: 'Franceville',
    conducteurs: {
      principal: 'Paul-Henri NZIGOU'
    }
  },
  {
    id: '4',
    driverId: '1',
    driverName: 'Jean-Baptiste ONDO',
    vehicleId: '1',
    vehicleName: 'Mercedes-Benz Actros',
    carteId: '1',
    dateDebut: '2024-01-18T07:00:00Z',
    dateFin: '2024-01-18T19:30:00Z',
    dureeConduite: 600,
    dureeRepos: 150,
    distanceParcourue: 780,
    vitesseMoyenne: 75,
    vitesseMax: 88,
    infractions: [],
    trajetDepart: 'Libreville',
    trajetArrivee: 'Lambaréné',
    conducteurs: {
      principal: 'Jean-Baptiste ONDO',
      secondaire: 'Marie-Claire MBADINGA'
    }
  }
];

export const mockDashboardStats: DashboardStats = {
  particulier: {
    totalCartes: 1,
    cartesValidees: 1,
    cartesEnAttente: 0,
    cartesExpirees: 0,
    prochainExpiration: '2028-03-10',
    carteStatut: 'active',
    carteExpiration: '2028-03-10',
    tempsConduiteTotal: 120,
    tempsRepos: 30,
    infractions: 1,
    sessionsCount: 4
  },
  entreprise: {
    totalConducteurs: 25,
    totalVehicules: 18,
    totalCartes: 23,
    sessionsAujourdhui: 12,
    alertesActives: 3,
    alertesCritiques: 3,
    chauffeursEnLigne: 15,
    vehiculesActifs: 12,
    vitesseMoyenne: 68,
    tempsConduiteTotal: 45,
    tempsReposTotal: 12,
    infractionsDuJour: 2
  }
};

export const mockChartData = {
  tempsConduite: [
    { mois: 'Jan', temps: 120, conduite: 120, repos: 30 },
    { mois: 'Fév', temps: 135, conduite: 135, repos: 35 },
    { mois: 'Mar', temps: 98, conduite: 98, repos: 25 },
    { mois: 'Avr', temps: 167, conduite: 167, repos: 42 },
    { mois: 'Mai', temps: 145, conduite: 145, repos: 36 },
    { mois: 'Jun', temps: 189, conduite: 189, repos: 47 }
  ],
  vitesseSession: [
    { session: 'S1', vitesseMoy: 68, vitesseMax: 85 },
    { session: 'S2', vitesseMoy: 45, vitesseMax: 60 },
    { session: 'S3', vitesseMoy: 72, vitesseMax: 90 },
    { session: 'S4', vitesseMoy: 75, vitesseMax: 88 }
  ],
  evolutionDemandes: [
    { mois: 'Jan', demandes: 12, validees: 10, enCours: 1, rejetees: 1 },
    { mois: 'Fév', demandes: 15, validees: 13, enCours: 1, rejetees: 1 },
    { mois: 'Mar', demandes: 8, validees: 7, enCours: 0, rejetees: 1 },
    { mois: 'Avr', demandes: 18, validees: 16, enCours: 1, rejetees: 1 },
    { mois: 'Mai', demandes: 14, validees: 12, enCours: 1, rejetees: 1 },
    { mois: 'Jun', demandes: 20, validees: 18, enCours: 1, rejetees: 1 }
  ]
};

export const mockAlertes: Alerte[] = [
  {
    id: '1',
    type: 'critique',
    titre: 'Temps de conduite dépassé',
    description: 'Conducteur Jean-Baptiste ONDO a dépassé 9h de conduite continue',
    message: 'Conducteur Jean-Baptiste ONDO a dépassé 9h de conduite continue',
    timestamp: '2024-01-15T14:30:00Z',
    vehicule: 'GA-3456-LV',
    conducteur: 'Jean-Baptiste ONDO',
    gravite: 'critique',
    resolu: false
  },
  {
    id: '2',
    type: 'warning',
    titre: 'Carte expirant bientôt',
    description: 'La carte GAB-2023-005678 expire dans 15 jours',
    message: 'La carte GAB-2023-005678 expire dans 15 jours',
    timestamp: '2024-01-14T09:00:00Z',
    conducteur: 'Marie-Claire MBADINGA',
    gravite: 'warning',
    resolu: false
  },
  {
    id: '3',
    type: 'info',
    titre: 'Maintenance programmée',
    description: 'Véhicule GA-7890-PG programmé pour maintenance demain',
    message: 'Véhicule GA-7890-PG programmé pour maintenance demain',
    timestamp: '2024-01-13T16:45:00Z',
    vehicule: 'GA-7890-PG',
    gravite: 'info',
    resolu: false
  }
];

export const mockVehiculeDetails = {
  '1': {
    maintenance: {
      derniere: '2024-01-01',
      prochaine: '2024-07-01',
      kilometres: 145000
    },
    carburant: {
      consommation: 28.5,
      economie: '+12%'
    },
    chronotachygraphe: {
      numeroSerie: 'CHR-2020-001234',
      derniereTelecharge: '2024-01-15',
      statut: 'Actif'
    },
    prochainControle: '2024-07-01',
    derniereMaintenance: '2024-01-01',
    consommationMoyenne: 28.5,
    kilometrage: 145000,
    coutEntretien: 2500
  },
  '2': {
    maintenance: {
      derniere: '2023-12-15',
      prochaine: '2024-06-15',
      kilometres: 89000
    },
    carburant: {
      consommation: 32.1,
      economie: '+8%'
    },
    chronotachygraphe: {
      numeroSerie: 'CHR-2021-005678',
      derniereTelecharge: '2024-01-17',
      statut: 'Actif'
    },
    prochainControle: '2024-06-15',
    derniereMaintenance: '2023-12-15',
    consommationMoyenne: 32.1,
    kilometrage: 89000,
    coutEntretien: 1800
  },
  '3': {
    maintenance: {
      derniere: '2024-01-10',
      prochaine: '2024-04-10',
      kilometres: 45000
    },
    carburant: {
      consommation: 12.8,
      economie: '+5%'
    },
    chronotachygraphe: null,
    prochainControle: '2024-04-10',
    derniereMaintenance: '2024-01-10',
    consommationMoyenne: 12.8,
    kilometrage: 45000,
    coutEntretien: 800
  }
};

// Données de sessions chronotachygraphe détaillées
export const mockChronoSessionData: ChronoData[] = [
  {
    id: '1',
    timestamp: '2024-01-15T06:00:00Z',
    driverId: '1',
    vehicleId: '1',
    actionType: 'conduite',
    duration: 120,
    speed: 68,
    locationStart: 'Libreville',
    locationEnd: 'Ntoum',
    violationType: null
  },
  {
    id: '2',
    timestamp: '2024-01-15T08:00:00Z',
    driverId: '1',
    vehicleId: '1',
    actionType: 'pause',
    duration: 15,
    locationStart: 'Ntoum',
    violationType: null
  },
  {
    id: '3',
    timestamp: '2024-01-15T08:15:00Z',
    driverId: '1',
    vehicleId: '1',
    actionType: 'conduite',
    duration: 180,
    speed: 72,
    locationStart: 'Ntoum',
    locationEnd: 'Lambaréné',
    violationType: null
  },
  {
    id: '4',
    timestamp: '2024-01-15T11:15:00Z',
    driverId: '1',
    vehicleId: '1',
    actionType: 'conduite',
    duration: 200,
    speed: 75,
    locationStart: 'Lambaréné',
    locationEnd: 'Port-Gentil',
    violationType: 'Excès de vitesse'
  },
  {
    id: '5',
    timestamp: '2024-01-16T08:00:00Z',
    driverId: '2',
    vehicleId: '3',
    actionType: 'conduite',
    duration: 90,
    speed: 45,
    locationStart: 'Libreville Centre',
    locationEnd: 'PK12',
    violationType: null
  },
  {
    id: '6',
    timestamp: '2024-01-16T09:30:00Z',
    driverId: '2',
    vehicleId: '3',
    actionType: 'pause',
    duration: 10,
    locationStart: 'PK12',
    violationType: null
  },
  {
    id: '7',
    timestamp: '2024-01-16T09:40:00Z',
    driverId: '2',
    vehicleId: '3',
    actionType: 'conduite',
    duration: 150,
    speed: 50,
    locationStart: 'PK12',
    locationEnd: 'Akanda',
    violationType: null
  },
  {
    id: '8',
    timestamp: '2024-01-17T05:30:00Z',
    driverId: '3',
    vehicleId: '2',
    actionType: 'conduite',
    duration: 300,
    speed: 78,
    locationStart: 'Port-Gentil',
    locationEnd: 'Mouila',
    violationType: 'Conduite continue excessive'
  },
  {
    id: '9',
    timestamp: '2024-01-17T10:30:00Z',
    driverId: '3',
    vehicleId: '2',
    actionType: 'pause',
    duration: 30,
    locationStart: 'Mouila',
    violationType: 'Temps de repos insuffisant'
  },
  {
    id: '10',
    timestamp: '2024-01-17T11:00:00Z',
    driverId: '3',
    vehicleId: '2',
    actionType: 'conduite',
    duration: 240,
    speed: 85,
    locationStart: 'Mouila',
    locationEnd: 'Franceville',
    violationType: null
  }
];

// Nouvelles données pour les chronotachygraphes
export const mockChronoData = [
  {
    id: '1',
    vehiculeId: '1',
    vehicule: 'Mercedes-Benz Actros - GA-3456-LV',
    numeroSerie: 'CHR-2020-001234',
    dateInstallation: '2020-03-15',
    statut: 'Actif',
    derniereTelecharge: '2024-01-15T08:00:00Z',
    prochaineTelecharge: '2024-01-22T08:00:00Z',
    donneesDisponibles: true,
    version: '1.4.2',
    certificat: 'CERT-GAB-2020-001',
    dateEtalonnage: '2023-03-15',
    prochainEtalonnage: '2025-03-15'
  },
  {
    id: '2',
    vehiculeId: '2',
    vehicule: 'Volvo FH16 - GA-7890-PG',
    numeroSerie: 'CHR-2021-005678',
    dateInstallation: '2021-06-20',
    statut: 'Actif',
    derniereTelecharge: '2024-01-17T09:30:00Z',
    prochaineTelecharge: '2024-01-24T09:30:00Z',
    donneesDisponibles: true,
    version: '1.5.1',
    certificat: 'CERT-GAB-2021-005',
    dateEtalonnage: '2023-06-20',
    prochainEtalonnage: '2025-06-20'
  },
  {
    id: '3',
    vehiculeId: '3',
    vehicule: 'Toyota Hiace - GA-1234-LV',
    numeroSerie: null,
    dateInstallation: null,
    statut: 'Non installé',
    derniereTelecharge: null,
    prochaineTelecharge: null,
    donneesDisponibles: false,
    version: null,
    certificat: null,
    dateEtalonnage: null,
    prochainEtalonnage: null,
    demandeEnCours: true,
    dateDemande: '2024-01-10',
    statutDemande: 'En attente d\'approbation'
  }
];

// Nouvelles données de sessions avec les propriétés attendues
export const mockChronoSessionDataWithDetails: ChronoSessionData[] = [
  {
    id: '1',
    date: '2024-01-15',
    driverId: '1',
    vehicleId: '1',
    typeConduite: 'partage',
    tempsConduite: 8,
    distance: 420,
    vitesseMoyenne: 68,
    infractions: 1,
    statut: 'valide'
  },
  {
    id: '2',
    date: '2024-01-16',
    driverId: '2',
    vehicleId: '3',
    typeConduite: 'solo',
    tempsConduite: 4,
    distance: 180,
    vitesseMoyenne: 45,
    infractions: 0,
    statut: 'valide'
  },
  {
    id: '3',
    date: '2024-01-17',
    driverId: '3',
    vehicleId: '2',
    typeConduite: 'solo',
    tempsConduite: 9,
    distance: 650,
    vitesseMoyenne: 72,
    infractions: 2,
    statut: 'anomalie'
  },
  {
    id: '4',
    date: '2024-01-18',
    driverId: '1',
    vehicleId: '1',
    typeConduite: 'partage',
    tempsConduite: 10,
    distance: 780,
    vitesseMoyenne: 75,
    infractions: 0,
    statut: 'valide'
  },
  {
    id: '5',
    date: '2024-01-19',
    driverId: '2',
    vehicleId: '3',
    typeConduite: 'solo',
    tempsConduite: 6,
    distance: 320,
    vitesseMoyenne: 53,
    infractions: 0,
    statut: 'valide'
  },
  {
    id: '6',
    date: '2024-01-20',
    driverId: '3',
    vehicleId: '2',
    typeConduite: 'solo',
    tempsConduite: 7,
    distance: 480,
    vitesseMoyenne: 69,
    infractions: 1,
    statut: 'valide'
  }
];
