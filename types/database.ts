export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      plants: {
        Row: {
          id: string;
          scientific_name: string;
          common_names: string[];
          family: string | null;
          care_level: 'easy' | 'medium' | 'hard' | null;
          light_requirements: string | null;
          water_requirements: string | null;
          description: string | null;
          image_urls: string[];
          toxicity_info: string | null;
          native_regions: string[] | null;
          seasonal_info: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          scientific_name: string;
          common_names?: string[];
          family?: string | null;
          care_level?: 'easy' | 'medium' | 'hard' | null;
          light_requirements?: string | null;
          water_requirements?: string | null;
          description?: string | null;
          image_urls?: string[];
          toxicity_info?: string | null;
          native_regions?: string[] | null;
          seasonal_info?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          scientific_name?: string;
          common_names?: string[];
          family?: string | null;
          care_level?: 'easy' | 'medium' | 'hard' | null;
          light_requirements?: string | null;
          water_requirements?: string | null;
          description?: string | null;
          image_urls?: string[];
          toxicity_info?: string | null;
          native_regions?: string[] | null;
          seasonal_info?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      identifications: {
        Row: {
          id: string;
          user_id: string;
          plant_id: string | null;
          image_url: string;
          ai_response: Json | null;
          confidence_score: number | null;
          identified_name: string;
          is_verified: boolean;
          notes: string | null;
          location: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plant_id?: string | null;
          image_url: string;
          ai_response?: Json | null;
          confidence_score?: number | null;
          identified_name: string;
          is_verified?: boolean;
          notes?: string | null;
          location?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plant_id?: string | null;
          image_url?: string;
          ai_response?: Json | null;
          confidence_score?: number | null;
          identified_name?: string;
          is_verified?: boolean;
          notes?: string | null;
          location?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'identifications_plant_id_fkey';
            columns: ['plant_id'];
            isOneToOne: false;
            referencedRelation: 'plants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'identifications_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      collections: {
        Row: {
          id: string;
          user_id: string;
          identification_id: string;
          is_favorite: boolean;
          custom_name: string | null;
          care_notes: string | null;
          added_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          identification_id: string;
          is_favorite?: boolean;
          custom_name?: string | null;
          care_notes?: string | null;
          added_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          identification_id?: string;
          is_favorite?: boolean;
          custom_name?: string | null;
          care_notes?: string | null;
          added_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'collections_identification_id_fkey';
            columns: ['identification_id'];
            isOneToOne: false;
            referencedRelation: 'identifications';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'collections_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Convenience types for easier usage
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type Plant = Database['public']['Tables']['plants']['Row'];
export type PlantInsert = Database['public']['Tables']['plants']['Insert'];
export type PlantUpdate = Database['public']['Tables']['plants']['Update'];

export type Identification = Database['public']['Tables']['identifications']['Row'];
export type IdentificationInsert = Database['public']['Tables']['identifications']['Insert'];
export type IdentificationUpdate = Database['public']['Tables']['identifications']['Update'];

export type Collection = Database['public']['Tables']['collections']['Row'];
export type CollectionInsert = Database['public']['Tables']['collections']['Insert'];
export type CollectionUpdate = Database['public']['Tables']['collections']['Update'];

// Additional helper types
export type CareLevel = 'easy' | 'medium' | 'hard';

// OpenAI Response structure
export interface AIPlantResponse {
  species: {
    common_name: string;
    scientific_name: string;
  };
  confidence: number;
  alternative_species?: {
    common_name: string;
    scientific_name: string;
    confidence: number;
  }[];
  identifying_features: string[];
  care_instructions?: {
    light: string;
    water: string;
    temperature?: string;
    humidity?: string;
  };
  additional_info?: string;
}

// Seasonal info structure
export interface SeasonalInfo {
  spring?: string;
  summer?: string;
  fall?: string;
  winter?: string;
  flowering_season?: string[];
  dormancy_period?: string;
}

// Extended types with relations
export interface IdentificationWithPlant extends Identification {
  plant?: Plant;
}

export interface CollectionWithIdentification extends Collection {
  identification?: IdentificationWithPlant;
}

export interface CollectionWithFullData extends Collection {
  identification?: {
    id: string;
    image_url: string;
    identified_name: string;
    confidence_score: number | null;
    notes: string | null;
    location: string | null;
    created_at: string;
    plant?: Plant;
  };
}

// Auth types
export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

// API Response types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// Plant search/filter types
export interface PlantFilters {
  family?: string;
  care_level?: CareLevel;
  search_term?: string;
  native_region?: string;
}

export interface IdentificationFilters {
  is_verified?: boolean;
  confidence_min?: number;
  date_from?: string;
  date_to?: string;
  search_term?: string;
}
