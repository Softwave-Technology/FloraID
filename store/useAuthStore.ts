// store/useAuthStore.ts
import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { authService, databaseService } from '../utils/services';

import { useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface AuthStore {
  user: User | null;
  profile: any;
  loading: boolean;
  initialized: boolean;

  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setProfile: (profile: any) => void;
  loadProfile: () => Promise<void>;
  setInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  profile: null,
  loading: false,
  initialized: false,

  signIn: async (email: string, password: string) => {
    set({ loading: true });
    const result = await authService.signIn(email, password);
    if (result.data?.user) {
      set({ user: result.data.user });
      await get().loadProfile();
    }
    set({ loading: false });
    return result;
  },

  signUp: async (email: string, password: string, fullName: string) => {
    set({ loading: true });
    const result = await authService.signUp(email, password, fullName);
    set({ loading: false });
    return result;
  },

  signOut: async () => {
    await authService.signOut();
    set({ user: null, profile: null });
  },

  setUser: (user: User | null) => set({ user }),

  setProfile: (profile: any) => set({ profile }),

  setInitialized: (initialized: boolean) => set({ initialized }),

  loadProfile: async () => {
    const { user } = get();
    if (user) {
      const { data } = await authService.getProfile(user.id);
      if (data) set({ profile: data });
    }
  },
}));

interface PlantStore {
  plants: any[];
  currentPlant: any;
  loading: boolean;
  searchTerm: string;

  loadPlants: () => Promise<void>;
  searchPlants: (term: string) => Promise<void>;
  setCurrentPlant: (plant: any) => void;
}

export const usePlantStore = create<PlantStore>((set, get) => ({
  plants: [],
  currentPlant: null,
  loading: false,
  searchTerm: '',

  loadPlants: async () => {
    set({ loading: true });
    const { data } = await databaseService.getPlants();
    if (data) set({ plants: data });
    set({ loading: false });
  },

  searchPlants: async (term: string) => {
    set({ loading: true, searchTerm: term });
    const { data } = await databaseService.searchPlants(term);
    if (data) set({ plants: data });
    set({ loading: false });
  },

  setCurrentPlant: (plant: any) => set({ currentPlant: plant }),
}));

interface IdentificationStore {
  identifications: any[];
  currentIdentification: any;
  loading: boolean;

  loadIdentifications: (userId: string) => Promise<void>;
  addIdentification: (identification: any) => Promise<any>;
  setCurrentIdentification: (identification: any) => void;
}

export const useIdentificationStore = create<IdentificationStore>((set, get) => ({
  identifications: [],
  currentIdentification: null,
  loading: false,

  loadIdentifications: async (userId: string) => {
    set({ loading: true });
    const { data } = await databaseService.getUserIdentifications(userId);
    if (data) set({ identifications: data });
    set({ loading: false });
  },

  addIdentification: async (identification: any) => {
    set({ loading: true });
    const result = await databaseService.createIdentification(identification);
    if (result.data) {
      const { identifications } = get();
      set({ identifications: [result.data, ...identifications] });
    }
    set({ loading: false });
    return result;
  },

  setCurrentIdentification: (identification: any) => set({ currentIdentification: identification }),
}));

interface CollectionStore {
  collections: any[];
  loading: boolean;

  loadCollections: (userId: string) => Promise<void>;
  addToCollection: (collection: any) => Promise<any>;
  removeFromCollection: (id: string) => Promise<void>;
}

export const useCollectionStore = create<CollectionStore>((set, get) => ({
  collections: [],
  loading: false,

  loadCollections: async (userId: string) => {
    set({ loading: true });
    const { data } = await databaseService.getUserCollections(userId);
    if (data) set({ collections: data });
    set({ loading: false });
  },

  addToCollection: async (collection: any) => {
    const result = await databaseService.addToCollection(collection);
    if (result.data) {
      const { collections } = get();
      set({ collections: [result.data, ...collections] });
    }
    return result;
  },

  removeFromCollection: async (id: string) => {
    // Implementation for removing from collection
    const { collections } = get();
    set({ collections: collections.filter((c) => c.id !== id) });
  },
}));

export const useAuth = () => {
  const { setUser, loadProfile, setInitialized } = useAuthStore();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile();
      }
      setInitialized(true);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile();
      }
    });

    return () => subscription.unsubscribe();
  }, []);
};
