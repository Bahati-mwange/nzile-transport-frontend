import { useState, useEffect } from 'react';

// Types pour notre système de transport
export interface Driver {
  id: string;
  nom: string;
  prenom: string;
  cni: string;
  permis: string;
  telephone: string;
  email: string;
  adresse: string;
  ville: string;
  lieuNaissance: string;
  dateNaissance: string;
  photo?: string;
  entrepriseId?: string;
  carteConducteur?: DriverCard;
}

export interface Company {
  id: string;
  denomination: string;
  rccm: string;
  email: string;
  telephone: string;
  responsableLegal: string;
  adresse: string;
  ville: string;
  pays: string;
  dateInscription: string;
  nbChauffeurs: number;
  nbVehicules: number;
}

export interface Vehicle {
  id: string;
  marque: string;
  modele: string;
  immatriculation: string;
  typeVehicule: string;
  annee: number;
  entrepriseId: string;
  chronotachygraphe: boolean;
}

export interface DriverCard {
  id: string;
  driverId: string;
  numero: string;
  dateEmission: string;
  dateExpiration: string;
  statut: 'en_attente' | 'validee' | 'expiree' | 'rejetee';
  type: 'conducteur' | 'entreprise';
  documents: string[];
  typeVehicule?: string;
  autoriteEmission?: string;
}

export interface TachographSession {
  id: string;
  driverId: string;
  vehicleId: string;
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
}

export interface User {
  driverCard: any;
  id: string;
  email: string;
  password: string;
  type: 'particulier' | 'entreprise';
  profile: Driver | Company;
}

// Mock Data Gabonaise
const mockDrivers: Driver[] = [
  {
    id: '1',
    nom: 'ONDO',
    prenom: 'Jean-Baptiste',
    cni: '173456789',
    permis: 'GA-2021-001234',
    telephone: '+241-01-23-45-67',
    email: 'jb.ondo@gmail.com',
    adresse: 'Quartier Glass, Libreville',
    ville: 'Libreville',
    lieuNaissance: 'Libreville',
    dateNaissance: '1985-03-15',
    entrepriseId: '1'
  },
  {
    id: '2',
    nom: 'MBADINGA',
    prenom: 'Marie-Claire',
    cni: '174567890',
    permis: 'GA-2020-005678',
    telephone: '+241-05-67-89-01',
    email: 'mc.mbadinga@yahoo.fr',
    adresse: 'Batterie IV, Libreville',
    ville: 'Libreville',
    lieuNaissance: 'Libreville',
    dateNaissance: '1990-07-22'
  },
  {
    id: '3',
    nom: 'NZIGOU',
    prenom: 'Paul-Henri',
    cni: '175678901',
    permis: 'GA-2022-009012',
    telephone: '+241-07-12-34-56',
    email: 'ph.nzigou@gmail.com',
    adresse: 'Centre-ville, Port-Gentil',
    ville: 'Port-Gentil',
    lieuNaissance: 'Port-Gentil',
    dateNaissance: '1988-12-05',
    entrepriseId: '2'
  },
  {
    id: '4',
    nom: 'MBOUMBA',
    prenom: 'Pierre',
    cni: '176789012',
    permis: 'GA-2023-002345',
    telephone: '+241-06-11-22-33',
    email: 'pierre.mboumba@exemple.ga',
    adresse: 'Akanda, Libreville',
    ville: 'Libreville',
    lieuNaissance: 'Oyem',
    dateNaissance: '1992-04-10',
    entrepriseId: '1'
  },
  {
    id: '5',
    nom: 'ESSONO',
    prenom: 'Sylvie',
    cni: '177890123',
    permis: 'GA-2023-003456',
    telephone: '+241-07-22-33-44',
    email: 'sylvie.essono@exemple.ga',
    adresse: 'Nzeng Ayong, Libreville',
    ville: 'Libreville',
    lieuNaissance: 'Franceville',
    dateNaissance: '1995-09-18',
    entrepriseId: '1'
  },
  {
    id: '6',
    nom: 'BONGO',
    prenom: 'Alain',
    cni: '178901234',
    permis: 'GA-2023-004567',
    telephone: '+241-01-55-66-77',
    email: 'alain.bongo@exemple.ga',
    adresse: 'Owendo, Libreville',
    ville: 'Libreville',
    lieuNaissance: 'Lambaréné',
    dateNaissance: '1987-11-23',
    entrepriseId: '1'
  },
  {
    id: '7',
    nom: 'MVE',
    prenom: 'Chantal',
    cni: '179012345',
    permis: 'GA-2023-005678',
    telephone: '+241-02-88-99-00',
    email: 'chantal.mve@exemple.ga',
    adresse: 'Glass, Libreville',
    ville: 'Libreville',
    lieuNaissance: 'Mouila',
    dateNaissance: '1993-02-14',
    entrepriseId: '1'
  }
];

const mockCompanies: Company[] = [
  {
    id: '1',
    denomination: 'TRANSPORT GABON EXPRESS',
    rccm: 'LBV-2018-B-1234',
    email: 'contact@transport-gabon.ga',
    telephone: '+241-01-77-88-99',
    responsableLegal: 'OBAME NGUEMA François',
    adresse: 'Boulevard Triomphal, Face CCJA',
    ville: 'Libreville',
    pays: 'Gabon',
    dateInscription: '2018-05-15',
    nbChauffeurs: 25,
    nbVehicules: 18
  },
  {
    id: '2',
    denomination: 'CARGO TRANS OGOOUE',
    rccm: 'PG-2019-B-5678',
    email: 'info@cargo-ogooue.ga',
    telephone: '+241-05-44-55-66',
    responsableLegal: 'MOUDOUMA AKUE Sylvie',
    adresse: 'Zone Industrielle SODECO',
    ville: 'Port-Gentil',
    pays: 'Gabon',
    dateInscription: '2019-09-12',
    nbChauffeurs: 15,
    nbVehicules: 12
  }
];

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    marque: 'Mercedes-Benz',
    modele: 'Actros 1845',
    immatriculation: 'GA-3456-LV',
    typeVehicule: 'Poids Lourd',
    annee: 2020,
    entrepriseId: '1',
    chronotachygraphe: true
  },
  {
    id: '2',
    marque: 'Volvo',
    modele: 'FH16',
    immatriculation: 'GA-7890-PG',
    typeVehicule: 'Poids Lourd',
    annee: 2021,
    entrepriseId: '2',
    chronotachygraphe: true
  },
  {
    id: '3',
    marque: 'Toyota',
    modele: 'Hiace',
    immatriculation: 'GA-1234-LV',
    typeVehicule: 'Transport Personnel',
    annee: 2019,
    entrepriseId: '1',
    chronotachygraphe: false
  }
];

const mockDriverCards: DriverCard[] = [
  {
    id: '1',
    driverId: '1',
    numero: 'GAB-2023-001234',
    dateEmission: '2023-01-15',
    dateExpiration: '2028-01-15',
    statut: 'validee',
    type: 'conducteur',
    documents: ['permis.pdf', 'medical.pdf'],
    typeVehicule: 'Poids lourd',
    autoriteEmission: 'Direction Générale des Transports - Gabon'
  },
  {
    id: '2',
    driverId: '2',
    numero: 'GAB-2023-005678',
    dateEmission: '2023-03-10',
    dateExpiration: '2028-03-10',
    statut: 'validee',
    type: 'conducteur',
    documents: ['permis.pdf'],
    typeVehicule: 'Poids lourd',
    autoriteEmission: 'Direction Générale des Transports - Gabon'
  },
  {
    id: '3',
    driverId: '3',
    numero: 'GAB-2023-009012',
    dateEmission: '2023-06-20',
    dateExpiration: '2028-06-20',
    statut: 'en_attente',
    type: 'conducteur',
    documents: ['permis.pdf', 'cni.pdf'],
    typeVehicule: 'Poids lourd',
    autoriteEmission: 'Direction Générale des Transports - Gabon'
  },
  {
    id: '4',
    driverId: '2', // correspond à Marie-Claire MBADINGA (particulier)
    numero: 'GAB-2024-007777',
    dateEmission: '2024-06-01',
    dateExpiration: '2029-06-01',
    statut: 'validee',
    type: 'conducteur',
    documents: ['permis.pdf', 'cni.pdf'],
    typeVehicule: 'Véhicule léger',
    autoriteEmission: 'Direction Générale des Transports - Gabon'
  },
  {
    id: '5',
    driverId: '4',
    numero: 'GAB-2024-010001',
    dateEmission: '2024-01-10',
    dateExpiration: '2029-01-10',
    statut: 'validee',
    type: 'conducteur',
    documents: ['permis.pdf', 'cni.pdf'],
    typeVehicule: 'Poids lourd',
    autoriteEmission: 'Direction Générale des Transports - Gabon'
  },
  {
    id: '6',
    driverId: '5',
    numero: 'GAB-2024-010002',
    dateEmission: '2024-02-15',
    dateExpiration: '2029-02-15',
    statut: 'validee',
    type: 'conducteur',
    documents: ['permis.pdf', 'cni.pdf'],
    typeVehicule: 'Véhicule léger',
    autoriteEmission: 'Direction Générale des Transports - Gabon'
  },
  {
    id: '7',
    driverId: '6',
    numero: 'GAB-2024-010003',
    dateEmission: '2024-03-20',
    dateExpiration: '2029-03-20',
    statut: 'en_attente',
    type: 'conducteur',
    documents: ['permis.pdf', 'cni.pdf'],
    typeVehicule: 'Poids lourd',
    autoriteEmission: 'Direction Générale des Transports - Gabon'
  },
  {
    id: '8',
    driverId: '7',
    numero: 'GAB-2024-010004',
    dateEmission: '2024-04-25',
    dateExpiration: '2029-04-25',
    statut: 'validee',
    type: 'conducteur',
    documents: ['permis.pdf', 'cni.pdf'],
    typeVehicule: 'Véhicule léger',
    autoriteEmission: 'Direction Générale des Transports - Gabon'
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@transport-gabon.ga',
    password: 'password123',
    type: 'entreprise',
    profile: mockCompanies[0],
    driverCard: null
  },
  {
    id: '2',
    email: 'mc.mbadinga@yahoo.fr',
    password: 'password123',
    type: 'particulier',
    profile: mockDrivers[1],
    driverCard: mockDriverCards.find(card => card.driverId === '2') || null
  }
];

// Import des données mockées depuis le fichier séparé
import {
  mockSessions,
  mockDashboardStats,
  mockChartData,
  mockAlertes,
  mockVehiculeDetails,
  mockChronoData,
  mockChronoSessionData,
  mockChronoSessionDataWithDetails,
  Session,
  DashboardStats,
  ChronoData,
  ChronoSessionData
} from '../data/mockData';

export const useApiData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Simulation d'API avec délai
  const apiCall = async <T>(data: T): Promise<T> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    return data;
  };

  const login = async (email: string, password: string): Promise<User | null> => {
    console.log('Tentative de connexion:', { email, password });
    setIsLoading(true);

    // Simulation d'un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email && u.password === password);
    console.log('Utilisateur trouvé:', user);

    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('Connexion réussie, utilisateur sauvegardé:', user);
    }

    setIsLoading(false);
    return user || null;
  };

  const logout = () => {
    console.log('Déconnexion utilisateur');
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Fixed: Return the array directly, not wrapped in apiCall
  const getDrivers = (): Driver[] => mockDrivers;
  const getCompanies = () => apiCall(mockCompanies);
  const getVehicles = () => apiCall(mockVehicles);
  const getDriverCards = () => apiCall(mockDriverCards);
  const getTachographSessions = () => apiCall(mockSessions);

  const getDriverById = (id: string) => apiCall(mockDrivers.find(d => d.id === id));
  const getCompanyById = (id: string) => apiCall(mockCompanies.find(c => c.id === id));
  const getVehicleById = (id: string) => apiCall(mockVehicles.find(v => v.id === id));
  const getDriverCardById = (id: string) => apiCall(mockDriverCards.find(dc => dc.id === id));

  // Fixed function with proper typing
  const getDashboardStats = <T extends 'particulier' | 'entreprise'>(type: T): DashboardStats[T] => {
    return mockDashboardStats[type];
  };

  const getChartData = (type: 'tempsConduite' | 'vitesseSession' | 'evolutionDemandes') => {
    return mockChartData[type];
  };

  const getSessions = (): Session[] => {
    return mockSessions;
  };

  const getSessionById = (id: string): Session | undefined => {
    return mockSessions.find(s => s.id === id);
  };

  const getAlertes = () => {
    return mockAlertes;
  };

  const getVehiculeDetails = (vehiculeId: string) => {
    return mockVehiculeDetails[vehiculeId as keyof typeof mockVehiculeDetails];
  };

  const getSessionsByDriver = (driverId: string): Session[] => {
    return mockSessions.filter(s => s.driverId === driverId);
  };

  const getSessionsByVehicle = (vehicleId: string): Session[] => {
    return mockSessions.filter(s => s.vehicleId === vehicleId);
  };

  const getInfractionsByDriver = (driverId: string) => {
    const sessions = getSessionsByDriver(driverId);
    const infractions = sessions.flatMap(s => s.infractions);
    return infractions;
  };

  const getChronoData = () => {
    return mockChronoData;
  };

  const getChronoSessionData = (): ChronoSessionData[] => {
    return mockChronoSessionDataWithDetails;
  };

  const getChronoDataByVehicle = (vehicleId: string) => {
    return mockChronoData.find(c => c.vehiculeId === vehicleId);
  };

  const getChronoSessionsByVehicle = (vehicleId: string): ChronoData[] => {
    return mockChronoSessionData.filter(c => c.vehicleId === vehicleId);
  };

  const getChronoSessionsByDriver = (driverId: string): ChronoData[] => {
    return mockChronoSessionData.filter(c => c.driverId === driverId);
  };

  // Chargement initial des données utilisateur
  useEffect(() => {
    const loadUserFromStorage = () => {
      const savedUser = localStorage.getItem('currentUser');
      console.log('Vérification localStorage au démarrage:', savedUser ? 'Utilisateur trouvé' : 'Aucun utilisateur');

      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          console.log('Utilisateur chargé depuis localStorage:', parsedUser.email, parsedUser.type);
          setCurrentUser(parsedUser);
        } catch (error) {
          console.error('Erreur lors du parsing de l\'utilisateur sauvegardé:', error);
          localStorage.removeItem('currentUser');
        }
      }
      setIsInitialized(true);
    };

    loadUserFromStorage();
  }, []);

  return {
    isLoading,
    currentUser,
    isInitialized,
    login,
    logout,
    getDrivers,
    getCompanies,
    getVehicles,
    getDriverCards,
    getTachographSessions,
    getDriverById,
    getCompanyById,
    getVehicleById,
    getDriverCardById,
    getSessionById,
    getDashboardStats,
    getChartData,
    getSessions,
    getAlertes,
    getVehiculeDetails,
    getSessionsByDriver,
    getSessionsByVehicle,
    getInfractionsByDriver,
    getChronoData,
    getChronoSessionData,
    getChronoDataByVehicle,
    getChronoSessionsByVehicle,
    getChronoSessionsByDriver,
    mockData: {
      drivers: mockDrivers,
      companies: mockCompanies,
      vehicles: mockVehicles,
      driverCards: mockDriverCards,
      sessions: mockSessions,
      dashboardStats: mockDashboardStats,
      chartData: mockChartData,
      alertes: mockAlertes,
      vehiculeDetails: mockVehiculeDetails,
      chronoData: mockChronoData,
      chronoSessionData: mockChronoSessionData
    }
  };
};
