import { supabase } from './supabase';

export const authService = {
  // Sign up
  signUp: async (email: string, password: string, fullName: string) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
  },

  // Sign in
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  // Sign out
  signOut: async () => {
    return await supabase.auth.signOut({ scope: 'local' });
  },

  // Get current user
  getUser: async () => {
    return await supabase.auth.getUser();
  },

  // Get user profile
  getProfile: async (userId: string) => {
    return await supabase.from('profiles').select('*').eq('id', userId).single();
  },

  // Update profile
  updateProfile: async (userId: string, updates: any) => {
    return await supabase.from('profiles').update(updates).eq('id', userId).select().single();
  },
};

export const databaseService = {
  // Plants
  getPlants: async () => {
    return await supabase.from('plants').select('*').order('scientific_name');
  },

  searchPlants: async (searchTerm: string) => {
    return await supabase
      .from('plants')
      .select('*')
      .or(`scientific_name.ilike.%${searchTerm}%,common_names.cs.{${searchTerm}}`)
      .limit(10);
  },

  // Identifications
  createIdentification: async (identification: any) => {
    return await supabase.from('identifications').insert(identification).select().single();
  },

  getUserIdentifications: async (userId: string) => {
    return await supabase
      .from('identifications')
      .select(
        `
        *,
        plant:plants(*)
      `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },

  // Collections
  addToCollection: async (collection: any) => {
    return await supabase.from('collections').insert(collection).select().single();
  },

  getUserCollections: async (userId: string) => {
    return await supabase
      .from('collections')
      .select(
        `
        *,
        identification:identifications(
          *,
          plant:plants(*)
        )
      `
      )
      .eq('user_id', userId)
      .order('added_at', { ascending: false });
  },

  // Image upload
  uploadImage: async (bucket: string, fileName: string, imageUri: string) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const { data, error } = await supabase.storage.from(bucket).upload(fileName, blob);

    if (error) return { data: null, error };

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return { data: publicUrl, error: null };
  },
};
