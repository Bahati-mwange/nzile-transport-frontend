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
    dateNaissance: '1988-12-05',
    entrepriseId: '2'
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
    documents: ['permis.pdf', 'medical.pdf']
  },
  {
    id: '2',
    driverId: '2',
    numero: 'GAB-2023-005678',
    dateEmission: '2023-03-10',
    dateExpiration: '2028-03-10',
    statut: 'validee',
    type: 'conducteur',
    documents: ['permis.pdf']
  },
  {
    id: '3',
    driverId: '3',
    numero: 'GAB-2023-009012',
    dateEmission: '2023-06-20',
    dateExpiration: '2028-06-20',
    statut: 'en_attente',
    type: 'conducteur',
    documents: ['permis.pdf', 'cni.pdf']
  }
];

const mockSessions: TachographSession[] = [
  {
    id: '1',
    driverId: '1',
    vehicleId: '1',
    carteId: '1',
    dateDebut: '2024-01-15T06:00:00',
    dateFin: '2024-01-15T18:30:00',
    dureeConduite: 450, // en minutes
    dureeRepos: 90,
    distanceParcourue: 485,
    vitesseMoyenne: 65,
    vitesseMax: 90,
    infractions: [],
    trajetDepart: 'Libreville',
    trajetArrivee: 'Franceville'
  },
  {
    id: '2',
    driverId: '2',
    vehicleId: '3',
    carteId: '2',
    dateDebut: '2024-01-16T07:15:00',
    dateFin: '2024-01-16T16:45:00',
    dureeConduite: 330,
    dureeRepos: 120,
    distanceParcourue: 245,
    vitesseMoyenne: 45,
    vitesseMax: 85,
    infractions: ['Excès de vitesse mineur'],
    trajetDepart: 'Libreville',
    trajetArrivee: 'Lambaréné'
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@transport-gabon.ga',
    password: 'password123',
    type: 'entreprise',
    profile: mockCompanies[0]
  },
  {
    id: '2',
    email: 'mc.mbadinga@yahoo.fr',
    password: 'password123',
    type: 'particulier',
    profile: mockDrivers[1]
  }
];

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

  const getDrivers = () => apiCall(mockDrivers);
  const getCompanies = () => apiCall(mockCompanies);
  const getVehicles = () => apiCall(mockVehicles);
  const getDriverCards = () => apiCall(mockDriverCards);
  const getTachographSessions = () => apiCall(mockSessions);

  const getDriverById = (id: string) => apiCall(mockDrivers.find(d => d.id === id));
  const getCompanyById = (id: string) => apiCall(mockCompanies.find(c => c.id === id));
  const getVehicleById = (id: string) => apiCall(mockVehicles.find(v => v.id === id));
  const getDriverCardById = (id: string) => apiCall(mockDriverCards.find(dc => dc.id === id));
  const getSessionById = (id: string) => apiCall(mockSessions.find(s => s.id === id));

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
    mockData: {
      drivers: mockDrivers,
      companies: mockCompanies,
      vehicles: mockVehicles,
      driverCards: mockDriverCards,
      sessions: mockSessions,
      users: mockUsers
    }
  };
};
