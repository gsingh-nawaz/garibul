import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const contactSubmissionsTable = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactJobsTable = pgTable("contact_jobs", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id").references(() => contactSubmissionsTable.id).notNull(),
  status: text("status").$type<"pending" | "processing" | "sent" | "failed">().default("pending").notNull(),
  retryCount: integer("retry_count").default(0).notNull(),
  lastError: text("last_error"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissionsTable).omit({ id: true, createdAt: true });
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissionsTable.$inferSelect;

export const insertContactJobSchema = createInsertSchema(contactJobsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertContactJob = z.infer<typeof insertContactJobSchema>;
export type ContactJob = typeof contactJobsTable.$inferSelect;
