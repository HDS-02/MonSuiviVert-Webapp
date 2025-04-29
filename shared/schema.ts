import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
  reminderTime: text("reminder_time").default("08:00"), // Heure à laquelle envoyer les rappels (format HH:MM)
});

// Plant table
export const plants = pgTable("plants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  species: text("species"),
  status: text("status").notNull().default("healthy"), // healthy, warning, danger
  image: text("image"),
  gallery: json("gallery").default('[]'), // Array of image URLs
  dateAdded: timestamp("date_added").defaultNow(),
  wateringFrequency: integer("watering_frequency"), // days
  light: text("light"), // indirect, direct, shade
  temperature: text("temperature"), // optimal temperature range
  careNotes: text("care_notes"),
  potSize: text("pot_size"), // Taille du pot recommandée
  commonDiseases: json("common_diseases").default('[]'), // Maladies fréquentes (tableau)
  autoWatering: boolean("auto_watering").default(false), // Arrosage automatique programmé
  reminderTime: text("reminder_time").default("08:00"), // Heure de rappel personnalisée (format HH:MM)
  userId: integer("user_id").notNull().default(1), // Foreign key to users table
});

// Plant analysis history
export const plantAnalyses = pgTable("plant_analyses", {
  id: serial("id").primaryKey(),
  plantId: integer("plant_id").notNull(),
  date: timestamp("date").defaultNow(),
  status: text("status").notNull(),
  image: text("image"),
  aiAnalysis: json("ai_analysis"), // Store full AI response
  healthIssues: text("health_issues"),
  recommendations: text("recommendations"),
});

// Tasks table for reminders and actions
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  plantId: integer("plant_id").notNull(),
  type: text("type").notNull(), // water, fertilize, repot, move, etc.
  description: text("description").notNull(),
  dueDate: timestamp("due_date"),
  completed: boolean("completed").default(false),
  dateCompleted: timestamp("date_completed"),
});

// Journal de croissance
export const growthJournal = pgTable("growth_journal", {
  id: serial("id").primaryKey(),
  plantId: integer("plant_id").notNull(),
  date: timestamp("date").defaultNow(),
  title: text("title").notNull(),
  notes: text("notes"),
  imageUrl: text("image_url"),
  height: integer("height"), // hauteur en cm
  leaves: integer("leaves"), // nombre de feuilles
  healthRating: integer("health_rating"), // note de santé de 1 à 5
  userId: integer("user_id").notNull(),
});

// Définition manuelle des schémas Zod au lieu d'utiliser createInsertSchema
export const insertUserSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6),
  firstName: z.string().optional(),
  email: z.string().email().optional(),
  reminderTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
});

export const insertPlantSchema = z.object({
  name: z.string().min(2).max(100),
  species: z.string().optional(),
  status: z.string().default("healthy"),
  image: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  wateringFrequency: z.number().int().optional(),
  light: z.string().optional(),
  temperature: z.string().optional(),
  careNotes: z.string().optional(),
  potSize: z.string().optional(),
  commonDiseases: z.array(z.any()).optional(),
  autoWatering: z.boolean().default(false),
  reminderTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  userId: z.number().int().default(1),
});

export const insertPlantAnalysisSchema = z.object({
  plantId: z.number().int(),
  status: z.string(),
  image: z.string().optional(),
  aiAnalysis: z.any().optional(),
  healthIssues: z.string().optional(),
  recommendations: z.string().optional(),
});

export const insertTaskSchema = z.object({
  plantId: z.number().int(),
  type: z.string(),
  description: z.string(),
  dueDate: z.union([
    z.string().transform(str => new Date(str)),
    z.date()
  ]).optional(),
  completed: z.boolean().default(false).optional(),
});

export const insertGrowthJournalSchema = z.object({
  plantId: z.number().int(),
  title: z.string(),
  notes: z.string().optional(),
  imageUrl: z.string().optional(),
  height: z.number().int().optional(),
  leaves: z.number().int().optional(),
  healthRating: z.number().int().min(1).max(5).optional(),
  userId: z.number().int(),
});

// Tables pour les fonctionnalités communautaires
export const communityTips = pgTable("community_tips", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  plantSpecies: text("plant_species"),
  rating: integer("rating").default(0),
  votes: integer("votes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  tags: json("tags").$type<string[]>().default([]),
  imageUrl: text("image_url"),
  category: text("category"), // Entretien, Maladies, Arrosage, etc.
  approved: boolean("approved").default(false),
});

export const communityComments = pgTable("community_comments", {
  id: serial("id").primaryKey(),
  tipId: integer("tip_id").notNull(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  likes: integer("likes").default(0),
});

// Schémas pour les fonctionnalités communautaires
export const insertCommunityTipSchema = z.object({
  userId: z.number().int(),
  title: z.string().min(5).max(100),
  content: z.string().min(20).max(5000),
  plantSpecies: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  category: z.string().optional().nullable(),
  approved: z.boolean().default(false).optional(),
});

export const insertCommunityCommentSchema = z.object({
  tipId: z.number().int(),
  userId: z.number().int(),
  content: z.string().min(3).max(1000),
});

// Types 
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Plant = typeof plants.$inferSelect;
export type InsertPlant = z.infer<typeof insertPlantSchema>;

export type PlantAnalysis = typeof plantAnalyses.$inferSelect;
export type InsertPlantAnalysis = z.infer<typeof insertPlantAnalysisSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type GrowthJournalEntry = typeof growthJournal.$inferSelect;
export type InsertGrowthJournalEntry = z.infer<typeof insertGrowthJournalSchema>;

// Badges types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "entretien" | "analyse" | "collection" | "progression";
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

// Types pour les fonctionnalités communautaires
export type CommunityTip = typeof communityTips.$inferSelect;
export type InsertCommunityTip = z.infer<typeof insertCommunityTipSchema>;

export type CommunityComment = typeof communityComments.$inferSelect;
export type InsertCommunityComment = z.infer<typeof insertCommunityCommentSchema>;

// API response types for AI analysis
export interface PlantAnalysisResponse {
  plantName?: string;
  species?: string;
  status: "healthy" | "warning" | "danger";
  healthIssues?: string[];
  recommendations: string[];
  careInstructions: {
    watering?: string;
    light?: string;
    temperature?: string;
    additional?: string[];
  };
}
