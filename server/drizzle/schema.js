import { pgTable, serial, text, uuid, varchar, integer, pgEnum, timestamp, boolean } from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";

// Enums
export const maxActiveCoordinatorsEnum = pgEnum(
  "max_active_coordinators_enum",
  ["5", "7", "9", "11", "20"]
);
export const timeZoneEnum = pgEnum("time_zone_enum", ["UTC", "Asia/Kolkata", "America/New_York", "Europe/London", "Asia/Dubai"]);
export const regionEnum = pgEnum("region_enum", [
  "Asia/Kolkata",
  "Europe/London",
  "America/New_York",
  "Australia/Sydney",
  "Africa/Cairo",
  "Europe/Paris",
  "America/Los_Angeles",
  "Asia/Tokyo",
  "Pacific/Auckland",
  "Asia/Dubai",
]);
export const languageEnum = pgEnum("language_enum", ["English", "Hindi", "French", "Spanish", "Arabic"]);

export const userRoleEnum = pgEnum("user_role_enum", ["co-ordinator", "admin"]);
export const statusEnum = pgEnum("status_enum", ["active", "inactive", "blocked"]);

// Organizations table
export const organizations = pgTable("organizations", {
  org_id: uuid("org_id").defaultRandom().primaryKey(),
  org_name: text("org_name").notNull(),
  org_slug: text("org_slug").notNull().unique(),
  org_mail: text("org_mail").notNull(), // NOT NULL
  org_contact: text("org_contact").notNull(), // NOT NULL
  primary_admin_name: text("primary_admin_name").default(null),
  primary_admin_mailid: text("primary_admin_mailid").default(null),
  support_email: text("support_email").default(null),
  phone_no: text("phone_no").default(null),
  alt_phone_no: text("alt_phone_no").default(null),
  max_active_coordinators_allowed: maxActiveCoordinatorsEnum(
    "max_active_coordinators_allowed"
  ).default("5"),
  timezone_common_name: timeZoneEnum("timezone_common_name").default(null),
  region: regionEnum("region").default(null),
  language: languageEnum("language").default("English"),
  profile_img_url: text("profile_img_url").default(""),
  website_url: text("website_url").default(null),
  status: statusEnum("status").default("active"),
});

export const users = pgTable("users", {
  user_id: uuid("user_id").primaryKey().defaultRandom(),
  org_id: uuid("org_id").references(() => organizations.org_id),
  user_name: text("user_name").notNull(),
  role: userRoleEnum("role"),
});
